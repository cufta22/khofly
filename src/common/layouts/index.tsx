import Footer from "@components/Footer";
import Header from "@components/Header";
import { AppShell, MantineProvider } from "@mantine/core";
import { IAppTheme, IFC } from "@ts/global.types";
import React, { useEffect } from "react";

import classes from "./styles.module.scss";
import clsx from "clsx";
import WikiNavbar from "@components/Navbar/Wiki";
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

const AppLayout: React.FC<IFC> = ({ children }) => {
  const data = useRouteLoaderData("root") as { theme: IAppTheme };

  const error = useRouteError();
  const t = useTranslate();
  const [openNavbar, { toggle: toggleNavbar }] = useDisclosure(false);

  const { resetVisitedLinks } = useSearchStore((state) => ({
    resetVisitedLinks: state.resetVisitedLinks,
  }));

  const appTheme: IAppTheme = data?.theme;

  const pinned = useHeadroom({ fixedAt: 120 });

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const q = searchParams.get("q");

  // Adjust layout for pages
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");
  const isIndex = pathname === "/";

  const isFooterOffset = isSearch || isDocs;
  const isSearchMaps = isSearch && tab === "maps";
  const headerHeight = isSearch ? 100 : 70;
  const isHeaderCollapsed = isSearch && !pinned;
  const isHeaderOffset = !isSearch && !isIndex;

  const appName = !+process.env.IS_SELF_HOST!
    ? t("_common.app_name")
    : process.env.APP_NAME;
  useDocumentTitle(isSearch ? `${q} at ${appName}` : `${appName}`);

  useEffect(() => {
    if (!["/search"].includes(pathname)) {
      resetVisitedLinks();
    }

    if (openNavbar) toggleNavbar();
  }, [pathname]);

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
      >
        {!isSearchMaps && (
          <AppShell.Header>
            <Header openNavbar={openNavbar} toggleNavbar={toggleNavbar} />
          </AppShell.Header>
        )}

        <AppShell.Main>{children}</AppShell.Main>

        {isDocs && (
          <AppShell.Navbar p="md">
            <WikiNavbar />
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
