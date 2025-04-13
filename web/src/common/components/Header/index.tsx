import classes from "./styles.module.scss";
import { Group, Text } from "@mantine/core";

import clsx from "clsx";
import { useTranslate } from "@hooks/translate/use-translate";
import { useLocation, useSearchParams } from "react-router";

import HeaderLogo from "./components/HeaderLogo";

import SearchSection from "@module/Search/components/components/SearchSection";

import HeaderSearchSettings from "./components/HeaderSearchSettings";
import HeaderOrganize from "./components/HeaderOrganize";
import HeaderCode from "./components/HeaderCode";
import HeaderIndexSettings from "./components/HeaderIndexSettings";
import HeaderIndexChat from "./components/HeaderIndexChat";
import { useSettingsStore } from "@store/settings";
import HeaderAISettings from "./components/HeaderAISettings";

interface Props {
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const Header: React.FC<Props> = ({ openNavbar, toggleNavbar }) => {
  const t = useTranslate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  const enableAIChat = useSettingsStore((state) => state.enableAIChat);

  const isChangelog = pathname.startsWith("/changelog");
  const isSettings = pathname.startsWith("/settings");
  const isPrivacy = pathname.startsWith("/privacy");
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");
  const isChat = pathname.startsWith("/chat");

  const isIndex = pathname === "/";

  const pageTitle = isChangelog
    ? "Changelog"
    : isSettings
    ? "Settings"
    : isPrivacy
    ? "Privacy"
    : isDocs
    ? "Docs"
    : isChat
    ? "AI Chat"
    : "";

  // If /search
  const tab = searchParams.get("tab");

  return (
    <Group
      className={clsx(classes.header, {
        [classes.header_search]: pathname.startsWith("/search"),
      })}
      h="100%"
      px="md"
      pt="md"
      pb={pathname.startsWith("/search") ? 0 : "md"}
      gap={0}
    >
      {/* Header: /search?q= */}
      {isSearch && <SearchSection />}

      {/* Header with title */}
      {(isDocs || isSettings || isChangelog || isPrivacy || isChat) && (
        <>
          <HeaderLogo
            isChat={isChat}
            hasBurger={isDocs}
            openNavbar={openNavbar}
            toggleNavbar={toggleNavbar}
          />
          <Text className={classes.header_title} ml="sm" fw={700}>
            / {pageTitle}
          </Text>
        </>
      )}

      <div className={classes.divider} />

      {isIndex && enableAIChat && <HeaderIndexChat />}
      {isIndex && <HeaderIndexSettings />}

      {isSearch && tab === "general" && <HeaderOrganize />}
      {isSearch && <HeaderSearchSettings />}

      {isChat && <HeaderAISettings />}

      {(isDocs || isChangelog) && <HeaderCode />}
    </Group>
  );
};

export default Header;
