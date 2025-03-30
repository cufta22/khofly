import "@styles/base.scss";
import "@styles/utility.scss";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";

import AppLayout from "@layout/index";
import { ColorSchemeScript } from "@mantine/core";

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";
import type { LayoutRouteProps } from "react-router";

import ErrorPage from "@module/Error";
import { useClientServerState } from "@store/client-server";
import { ROOT_META_FUNCTION } from "./meta/root";

// Meta tags
export const meta = ROOT_META_FUNCTION;

export function Layout({ children }: LayoutRouteProps) {
  const { language } = useClientServerState();
  return (
    <html lang={language} data-mantine-color-scheme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />

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
