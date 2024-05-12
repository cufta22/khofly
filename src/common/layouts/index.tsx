import Footer from "@components/Footer";
import Header from "@components/Header";
import { AppShell, MantineProvider } from "@mantine/core";
import { IAppTheme, IFC, RootLoaderData } from "@ts/global.types";
import React, { useEffect } from "react";

import classes from "./styles.module.scss";
import clsx from "clsx";
import DocsNavbar from "@components/Navbar/Docs";
import { useDisclosure, useDocumentTitle, useHeadroom } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { getMantineTheme } from "@utils/resources/mantineTheme";
import NProgress from "@module/NProgress";
import {
  useLocation,
  useRouteError,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useTranslate } from "@hooks/translate/use-translate";
import { useSearchStore } from "@store/search";
import DevInterface from "./DevInterface";
import { useInstanceStore } from "@store/instance";
import { getDefaultSearXNG } from "@store/instance/utils";

const AppLayout: React.FC<IFC> = ({ children }) => {
  const loaderData = useRouteLoaderData("root") as RootLoaderData;

  const error = useRouteError();
  const t = useTranslate();
  const [openNavbar, { toggle: toggleNavbar }] = useDisclosure(false);

  const { resetVisitedLinks, searchQuery } = useSearchStore((state) => ({
    resetVisitedLinks: state.resetVisitedLinks,
    searchQuery: state.searchQuery,
  }));
  const {
    hydrated,
    nominatimDomain,
    setNominatimDomain,
    searXNGDomain,
    setSearXNGDomain,
  } = useInstanceStore((state) => ({
    hydrated: state.hydrated,
    nominatimDomain: state.nominatimDomain,
    setNominatimDomain: state.setNominatimDomain,
    searXNGDomain: state.searXNGDomain,
    setSearXNGDomain: state.setSearXNGDomain,
  }));

  const appTheme: IAppTheme = loaderData?.theme;

  const pinned = useHeadroom({ fixedAt: 120 });

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const q = searchQuery || searchParams.get("q") || "";

  // Adjust layout for pages
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");
  const isIndex = pathname === "/";

  const isFooterOffset = isSearch || isDocs;
  const isSearchMaps = isSearch && tab === "maps";
  const headerHeight = isSearch ? 100 : 70;
  const isHeaderCollapsed = isSearch && !pinned;
  const isHeaderOffset = !isSearch;

  const appName =
    loaderData.env.IS_SELF_HOST === "0"
      ? t("_common.app_name")
      : loaderData.env.APP_NAME;

  useDocumentTitle(isSearch ? `${q} at ${appName}` : `${appName}`);

  useEffect(() => {
    if (!["/search"].includes(pathname)) {
      resetVisitedLinks();
    }

    if (openNavbar) toggleNavbar();
  }, [pathname]);

  useEffect(() => {
    if (!hydrated) return;

    // Set instance URL initially
    if (!nominatimDomain) setNominatimDomain(loaderData.env.NOMINATIM_URL);
    if (!searXNGDomain) setSearXNGDomain(getDefaultSearXNG(loaderData.env));
  }, [hydrated]);

  return (
    <MantineProvider
      theme={getMantineTheme(appTheme)}
      defaultColorScheme="auto"
    >
      <Notifications />

      <NProgress />

      <DevInterface />

      <AppShell
        header={{
          height: headerHeight,
          offset: isHeaderOffset,
          collapsed: isHeaderCollapsed,
        }}
        footer={{ height: 60, offset: isFooterOffset ? false : true }}
        navbar={
          isDocs
            ? {
                width: { xs: isDocs ? 200 : 0, sm: isDocs ? 300 : 0 },
                breakpoint: "sm",
                collapsed: { mobile: !openNavbar, desktop: false },
              }
            : undefined
        }
        classNames={{
          root: classes.app_root,
          main: classes.app_main,
          navbar: classes.app_navbar,
          header: clsx(classes.app_header, {
            [classes.app_header_transparent]: ["/"].includes(pathname),
          }),
          footer: classes.app_footer,
        }}
        id="root"
      >
        {!isSearchMaps && (
          <AppShell.Header>
            <Header openNavbar={openNavbar} toggleNavbar={toggleNavbar} />
          </AppShell.Header>
        )}

        <AppShell.Main>{children}</AppShell.Main>

        {isDocs && (
          <AppShell.Navbar p="md">
            <DocsNavbar />
          </AppShell.Navbar>
        )}

        {isIndex && !error && (
          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        )}
      </AppShell>
    </MantineProvider>
  );
};

export default AppLayout;
