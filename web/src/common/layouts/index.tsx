import { AppShell, createTheme, MantineProvider } from "@mantine/core";
import type { IAppTheme, IFC } from "@ts/global.types";
import { useEffect } from "react";

import classes from "./styles.module.scss";
import clsx from "clsx";
import { useDisclosure, useHeadroom, useHotkeys } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { getMantineTheme } from "@utils/resources/mantineTheme";
import NProgress from "@module/NProgress";
import { useSearchStore } from "@store/search";
import useInstanceInit from "./use-instance-init";
import useTitleQuery from "./use-title-query";
import { useLocation, useRouteError, useSearchParams } from "react-router";
import { useClientServerState } from "@store/client-server";
import { useStatrpageStore } from "@store/startpage";

import Footer from "@components/Footer";
import Header from "@components/Header";
import DocsNavbar from "@components/Navbar/Docs";
import ModalHotkeys from "@components/ModalHotkeys";

const AppLayout: React.FC<IFC> = ({ children }) => {
  const { theme, primaryColor } = useClientServerState();

  const error = useRouteError();
  const [openNavbar, { toggle: toggleNavbar }] = useDisclosure(false);

  const [openHotkeyModal, { toggle: toggleHotkeyModal }] = useDisclosure(false);

  const resetVisitedLinks = useSearchStore((state) => state.resetVisitedLinks);

  const wallpaper = useStatrpageStore((state) => state.wallpaper);

  const appTheme: IAppTheme = theme; // loaderData?.theme

  const pinned = useHeadroom({ fixedAt: 120 });

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  // Adjust layout for pages
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");
  const isChat = pathname.startsWith("/chat");
  const isIndex = pathname === "/";

  const isFooterOffset = isIndex;
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
  useTitleQuery({ isSearch, isChat });

  // Initialize instance URLs
  useInstanceInit();

  // HOTKEYS: Global
  useHotkeys([["h", () => toggleHotkeyModal()]]);

  return (
    <MantineProvider
      theme={createTheme({
        primaryColor: primaryColor,
        ...getMantineTheme(appTheme),
      })}
      defaultColorScheme="dark"
    >
      <ModalHotkeys isOpen={openHotkeyModal} onClose={toggleHotkeyModal} />

      <Notifications />

      <NProgress />

      <AppShell
        header={{
          height: headerHeight,
          offset: isHeaderOffset,
          collapsed: isHeaderCollapsed,
        }}
        footer={{ height: 60, offset: isFooterOffset }}
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
        styles={{
          main: {
            backgroundImage: isIndex ? `url(${wallpaper})` : "",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          },
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
