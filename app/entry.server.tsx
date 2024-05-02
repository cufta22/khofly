import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import ClientServerProvider from "@store/client-server";
import reactDom from "react-dom/server";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";

import { handleRequest as handleVercelRequest } from "@vercel/remix";

import type { EntryContext } from "@remix-run/cloudflare";
import { getCookie } from "@utils/functions/cookies";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
  // loadContext: AppLoadContext
) {
  // All i18n stuff - server side
  const userLang = getCookie("khofly-language", request, "");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // Check if user accept-language exists as option
  const existingPrefLang = ["en"].includes(prefLang) ? prefLang : "en";

  // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || existingPrefLang || "en";

  // Get app theme
  const appTheme = getCookie("khofly-app-theme", request, "Mantine-Old");

  // Dynamically import content JSON
  const contentImport = (await import(`../public/locales/${appLang}.json`))
    .default;

  const remixServer = (
    <ClientServerProvider
      content={contentImport}
      language={appLang}
      theme={appTheme}
    >
      <RemixServer context={remixContext} url={request.url} />
    </ClientServerProvider>
  );

  // -------------------------------------------------
  // Handle Vercel request
  // -------------------------------------------------
  if (process.env.HOST_TARGET === "vercel") {
    return handleVercelRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixServer
    );
  }

  const body = await reactDom.renderToReadableStream(remixServer, {
    signal: request.signal,
    onError() {
      responseStatusCode = 500;
    },
  });

  // -------------------------------------------------
  // Handle Bot request
  // -------------------------------------------------
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  // -------------------------------------------------
  // Handle browser request
  // -------------------------------------------------
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
