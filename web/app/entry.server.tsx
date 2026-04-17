import { PassThrough } from 'node:stream';

import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import ClientServerProvider from '@store/client-server';
import { renderToPipeableStream } from 'react-dom/server';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import { parseAcceptLanguage } from '@utils/functions/parseAcceptLanguage';

// import { handleRequest as handleVercelRequest } from "@vercel/react-router";
import { createReadableStreamFromReadable } from '@react-router/node';

import { getCookie } from '@utils/functions/cookies';
import type { EntryContext } from 'react-router';

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  // loadContext: AppLoadContext
) {
  // Check is bot
  const userAgent = request.headers.get('user-agent');
  const isBotRequest = userAgent && isbot(userAgent);

  // All i18n stuff - server side
  const userLang = getCookie('khofly-language', request, '');
  const prefLang = parseAcceptLanguage(request.headers.get('accept-language'));

  // Priority: 1. user selected lang, 2. browser default | "en", 3. default to "en"
  const appLang = userLang || prefLang || 'en';

  // Get app theme
  const appTheme = getCookie('khofly-app-theme', request, 'Mantine-Old');

  // Get primary color
  const primaryColor = getCookie('khofly-primary-color', request, 'blue');

  // Dynamically import content JSON
  const contentImport = (await import(`../public/locales/${appLang}.json`)).default;

  const serverRouter = (
    <ClientServerProvider
      content={contentImport}
      language={isBotRequest ? 'en' : appLang}
      theme={appTheme}
      primaryColor={primaryColor}
    >
      <ServerRouter context={routerContext} url={request.url} />
    </ClientServerProvider>
  );

  // -------------------------------------------------
  // Handle Vercel request
  // -------------------------------------------------
  // if (process.env.HOST_TARGET === "vercel") {
  //   return handleVercelRequest(
  //     request,
  //     responseStatusCode,
  //     responseHeaders,
  //     serverRouter
  //   );
  // }

  return new Promise((resolve, reject) => {
    let statusCode = responseStatusCode || 200;
    let shellRendered = false;

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      isBotRequest || routerContext.isSpaMode ? 'onAllReady' : 'onShellReady';

    const { pipe, abort } = renderToPipeableStream(serverRouter, {
      [readyOption]() {
        // -------------------------------------------------
        // Handle request ( browser/bot )
        // -------------------------------------------------

        shellRendered = true;
        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);

        // Build CSP header
        const apiUrl = process.env.API_URL_EU1;
        const searXngUrl = process.env.SEARXNG_URL_EU1;

        const cspHeader = [
          "default-src 'self'",
          `connect-src 'self' ${apiUrl} ${searXngUrl}`,
          "script-src 'self' 'unsafe-inline'", // Add 'nonce-...' or hashes in prod if possible
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join('; ');

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(stream, {
            headers: responseHeaders,
            status: statusCode,
          }),
        );

        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(_error: unknown) {
        statusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          // console.error(error);
        }
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}
