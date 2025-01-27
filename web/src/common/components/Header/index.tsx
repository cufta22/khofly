import classes from "./styles.module.scss";
import { Group, Text } from "@mantine/core";

import React from "react";
import SearchSection from "@module/Search/components/components/SearchSection";
import clsx from "clsx";
import HeaderLogo from "./components/HeaderLogo";
import HeaderSettings from "./components/HeaderSettings";
import { useTranslate } from "@hooks/translate/use-translate";
import HeaderCode from "./components/HeaderCode";
import { useLocation } from "react-router";

interface Props {
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const Header: React.FC<Props> = ({ openNavbar, toggleNavbar }) => {
  const t = useTranslate();
  const { pathname } = useLocation();

  const isChangelog = pathname.startsWith("/changelog");
  const isSettings = pathname.startsWith("/settings");
  const isPrivacy = pathname.startsWith("/privacy");
  const isSearch = pathname.startsWith("/search");
  const isDocs = pathname.startsWith("/docs");

  const pageTitle = isChangelog
    ? "Changelog"
    : isSettings
    ? "Settings"
    : isPrivacy
    ? "Privacy"
    : isDocs
    ? "Docs"
    : "";

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
      {(isDocs || isSettings || isChangelog || isPrivacy) && (
        <>
          <HeaderLogo
            hasBurger={isDocs}
            openNavbar={openNavbar}
            toggleNavbar={toggleNavbar}
          />
          <Text ml="sm" size="xl" fw={700}>
            / {pageTitle}
          </Text>
        </>
      )}

      <div className={classes.divider}></div>

      {isSearch && <HeaderSettings />}

      {(isDocs || isChangelog) && <HeaderCode />}
    </Group>
  );
};

export default Header;
