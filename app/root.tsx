import "@styles/base.css";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import AppLayout from "@layout/index";
import { ColorSchemeScript } from "@mantine/core";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import { LoaderFunctionArgs } from "@remix-run/cloudflare";

import ErrorPage from "@module/Error";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";
import { useClientServerState } from "@store/client-server";
import { ROOT_META_FUNCTION } from "./platform/meta";
import { getCookie } from "@utils/functions/cookies";
import { getEnv } from "./platform/getEnv";

export async function loader({ request, context }: LoaderFunctionArgs) {
  // // Get user language
  const userLang = getCookie("khofly-language", request, "en");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || prefLang || "en";

  const appTheme = getCookie("khofly-app-theme", request, "Mantine-Old");

  return {
    language: appLang,
    theme: appTheme,

    // Browser ENV variables
    env: {
      NODE_ENV: getEnv("NODE_ENV", context),
      HOST: getEnv("HOST", context),
      SEARXNG_URL_EU1: getEnv("SEARXNG_URL_EU1", context),
      SEARXNG_URL_US1: getEnv("SEARXNG_URL_US1", context),
      NOMINATIM_URL: getEnv("NOMINATIM_URL", context),
      IS_SELF_HOST: getEnv("IS_SELF_HOST", context),
      APP_NAME: getEnv("APP_NAME", context),
      SEARXNG_URL_SELF_HOST: getEnv("SEARXNG_URL_SELF_HOST", context),
    },

    // Platform variables
    nodeVersion: typeof process !== "undefined" ? process?.versions?.node : "",
    // Vercel stuff
    vercelRegion: getEnv("VERCEL_REGION"),
    // Fly.io stuff
    flyAppName: getEnv("FLY_APP_NAME"),
    flyRegion: getEnv("FLY_REGION"),
    flyMachineId: getEnv("FLY_MACHINE_ID"),
    // Cloudflare stuff
  };
}

// Meta tags
export const meta = ROOT_META_FUNCTION;

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useClientServerState();

  return (
    <html lang={language || "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="auto" />

        {/* OpenSearch XML */}
        <link
          rel="search"
          href={"/opensearch.xml"}
          type="application/opensearchdescription+xml"
          title="Search khofly.com"
        />

        {/* Leaflet styles */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppLayout>
          {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
          {children}
        </AppLayout>

        {/* Leaflet script */}
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />

        {/* Manages scroll position for client-side transitions */}
        <ScrollRestoration />
        {/* Script tags go here */}
        <Scripts />
      </body>
    </html>
  );
}

// Default app
export default function App() {
  return <Outlet />;
}

// Default error
export function ErrorBoundary() {
  const error: any = useRouteError();

  return (
    <ErrorPage
      code={error?.status || 500}
      title="You have found a secret place"
      message={error?.data || error?.message || "Unknown Error"}
      stack={error?.stack}
    />
  );
}
