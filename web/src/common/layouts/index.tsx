import Footer from "@components/Footer";
import Header from "@components/Header";
import { AppShell, MantineProvider } from "@mantine/core";
import { IAppTheme, IFC } from "@ts/global.types";
import React, { useEffect } from "react";

import classes from "./styles.module.scss";
import clsx from "clsx";
import DocsNavbar from "@components/Navbar/Docs";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { getMantineTheme } from "@utils/resources/mantineTheme";
import NProgress from "@module/NProgress";
import { useSearchStore } from "@store/search";
import DevInterface from "./DevInterface";
import useInstanceInit from "./use-instance-init";
import useTitleQuery from "./use-title-query";
import { useLocation, useRouteError, useRouteLoaderData, useSearchParams } from "react-router";
import { useClientServerState } from "@store/client-server";

const AppLayout: React.FC<IFC> = ({ children }) => {
  // const loaderData = useRouteLoaderData("root") as RootLoaderData;

  const { theme } = useClientServerState();

  const error = useRouteError();
  const [openNavbar, { toggle: toggleNavbar }] = useDisclosure(false);

  const resetVisitedLinks = useSearchStore((state) => state.resetVisitedLinks);

  const appTheme: IAppTheme = theme; // loaderData?.theme

  const pinned = useHeadroom({ fixedAt: 120 });

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  // Adjust layout for pages
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");
  const isIndex = pathname === "/";

  const isFooterOffset = isSearch || isDocs;
  const isSearchMaps = isSearch && tab === "maps";
  const headerHeight = isSearch ? 100 : 70;
  const isHeaderCollapsed = isSearch && !pinned;
  const isHeaderOffset = !isSearch;

  useEffect(() => {
    if (!["/search"].includes(pathname)) {
      resetVisitedLinks();
    }

    if (openNavbar) toggleNavbar();
  }, [pathname]);

  // Adjust document title for query
  useTitleQuery(isSearch);

  // Initialize instance URLs
  useInstanceInit();

  return (
    <MantineProvider theme={getMantineTheme(appTheme)} defaultColorScheme="dark">
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
