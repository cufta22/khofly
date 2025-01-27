import ClientServerProvider from "@store/client-server";
import { ILanguage, ITranslations } from "@ts/global.types";
import { getCookie } from "@utils/functions/cookies";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

async function hydrate() {
  // // All i18n stuff - client side
  const htmlLang = document.querySelector("html")?.getAttribute("lang") as ILanguage;

  // // Get app theme
  const appTheme = getCookie("khofly-app-theme", undefined, "Mantine-Old");

  // // Dynamically fetch content JSON
  const contentFetch = await fetch(`/locales/${htmlLang}.json`);
  const content: ITranslations = await contentFetch.json();

  startTransition(() => {
    hydrateRoot(
      document,
      <ClientServerProvider content={content} language={htmlLang} theme={appTheme}>
        {/* <StrictMode> */}
        <HydratedRouter />
        {/* </StrictMode> */}
      </ClientServerProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
