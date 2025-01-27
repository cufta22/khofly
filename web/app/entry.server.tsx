import { PassThrough } from "node:stream";

import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import ClientServerProvider from "@store/client-server";
import { renderToPipeableStream } from "react-dom/server";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";

// import { handleRequest as handleVercelRequest } from "@vercel/remix";
import { createReadableStreamFromReadable } from "@react-router/node";

import { getCookie } from "@utils/functions/cookies";
import { EntryContext } from "react-router";

// const { renderToReadableStream } = reactDom;
// console.log(renderToReadableStream);

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext
  // loadContext: AppLoadContext
) {
  // // All i18n stuff - server side
  const userLang = getCookie("khofly-language", request, "");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // // Check if user accept-language exists as option
  const existingPrefLang = ["en"].includes(prefLang) ? prefLang : "en";

  // // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || existingPrefLang || "en";

  // // Get app theme
  const appTheme = getCookie("khofly-app-theme", request, "Mantine-Old");

  // // Dynamically import content JSON
  const contentImport = (await import(`../public/locales/${appLang}.json`)).default;

  const serverRouter = (
    <ClientServerProvider content={contentImport} language={appLang} theme={appTheme}>
      <ServerRouter context={entryContext} url={request.url} />
    </ClientServerProvider>
  );

  // -------------------------------------------------
  // Handle Vercel request
  // -------------------------------------------------
  // if (process?.env?.HOST_TARGET === "vercel") {
  //   return handleVercelRequest(
  //     request,
  //     responseStatusCode,
  //     responseHeaders,
  //     serverRouter
  //   );
  // }

  const isBot = isbot(request.headers.get("user-agent") || "");
  let shellRendered = false;

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(serverRouter, {
      onAllReady() {
        // -------------------------------------------------
        // Handle Bot request
        // -------------------------------------------------
        if (!isBot) return;

        shellRendered = true;
        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);

        responseHeaders.set("Content-Type", "text/html");

        resolve(
          new Response(stream, {
            headers: responseHeaders,
            status: responseStatusCode,
          })
        );

        pipe(body);
      },
      onShellReady() {
        // -------------------------------------------------
        // Handle browser request
        // -------------------------------------------------
        if (isBot) return;

        shellRendered = true;
        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);

        responseHeaders.set("Content-Type", "text/html");

        resolve(
          new Response(stream, {
            headers: responseHeaders,
            status: responseStatusCode,
          })
        );

        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });

  // const body = await renderToReadableStream(remixServer, {
  //   signal: request.signal,
  //   onError() {
  //     responseStatusCode = 500;
  //   },
  // });

  // // -------------------------------------------------
  // // Handle Bot request
  // // -------------------------------------------------
  // if (isbot(request.headers.get("user-agent") || "")) {
  //   await body.allReady;
  // }

  // // -------------------------------------------------
  // // Handle browser request
  // // -------------------------------------------------
  // responseHeaders.set("Content-Type", "text/html");
  // return new Response(body, {
  //   headers: responseHeaders,
  //   status: responseStatusCode,
  // });
}
