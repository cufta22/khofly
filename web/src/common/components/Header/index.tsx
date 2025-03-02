import classes from "./styles.module.scss";
import { Group, Text } from "@mantine/core";

import React from "react";
import clsx from "clsx";
import { useTranslate } from "@hooks/translate/use-translate";
import { useLocation } from "react-router";

import HeaderLogo from "./components/HeaderLogo";

import SearchSection from "@module/Search/components/components/SearchSection";

import HeaderSettings from "./components/HeaderSettings";
import HeaderOrganize from "./components/HeaderOrganize";
import HeaderCode from "./components/HeaderCode";

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
          <HeaderLogo hasBurger={isDocs} openNavbar={openNavbar} toggleNavbar={toggleNavbar} />
          <Text ml="sm" size="xl" fw={700}>
            / {pageTitle}
          </Text>
        </>
      )}

      <div className={classes.divider} />

      {isSearch && <HeaderOrganize />}

      {isSearch && <HeaderSettings />}

      {(isDocs || isChangelog) && <HeaderCode />}
    </Group>
  );
};

export default Header;
