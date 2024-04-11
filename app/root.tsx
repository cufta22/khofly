import "@styles/base.css";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";

import AppLayout from "@layout/index";
import { ColorSchemeScript, useMantineColorScheme } from "@mantine/core";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useRouteError,
} from "@remix-run/react";
import { getCookieProperty } from "@utils/functions/getCookieProperty";

import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ErrorPage from "@module/Error";
import { ROOT_META } from "./meta/root";
import { parseAcceptLanguage } from "@utils/functions/parseAcceptLanguage";
import { useClientServerState } from "@store/client-server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = request.headers.get("Cookie");

  // // Get user language
  const userLang = getCookieProperty(cookies || "", "khofly-language", "en");
  const prefLang = parseAcceptLanguage(request.headers.get("accept-language"));

  // // Priority: 1. user selected lang, 2. browser default, 3. default to "en"
  const appLang = userLang || prefLang || "en";

  const appTheme = getCookieProperty(
    cookies || "",
    "khofly-app-theme",
    "Mantine-Old"
  );

  return json({
    language: appLang,
    theme: appTheme,
  });
}

// Meta tags
export const meta: MetaFunction = () => {
  return ROOT_META;
};

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

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        code={error.status}
        title="You have found a secret place"
        message={error.data}
      />
    );
  } else if (error instanceof Error) {
    return (
      <ErrorPage
        code={500}
        title="You have found a secret place"
        message={error.message}
        stack={error.stack}
      />
    );
  } else {
    return (
      <ErrorPage
        code={500}
        title="You have found a secret place"
        message="Unknown Error"
      />
    );
  }
}
