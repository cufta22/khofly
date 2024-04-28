import { Flex, Group, Image, Loader } from "@mantine/core";
import { Suspense, lazy } from "react";

import classes from "./styles.module.scss";

import { IconTriangleFilled } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import RemixLink from "@components/RemixLink";

import SearchSectionInput from "./components/SearchSectionInput";
import { useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";

const SearchSectionTabsWithoutSSR = lazy(
  () => import(`./components/SearchSectionTabs`)
);

const SearchSection = () => {
  const [searchParams] = useSearchParams();

  const { hydrated } = useSettingsStore((state) => ({
    hydrated: state.hydrated,
  }));

  const { searchQuery } = useSearchStore((state) => ({
    searchQuery: state.searchQuery,
  }));
  const q = searchQuery || searchParams.get("q") || "";

  return (
    <Group
      className={classes.search_section}
      align="flex-start"
      h="100%"
      gap="md"
    >
      <RemixLink className={classes.app_logo} to="/">
        {q.includes("doge") ? (
          <Image
            w={42}
            h={42}
            src={"/assets/doge.svg"}
            alt="Doge image"
            fit="contain"
          />
        ) : (
          <IconTriangleFilled style={getIconStyle(42)} />
        )}
      </RemixLink>

      <Flex
        className={classes.flex}
        direction="column"
        justify="space-between"
        h="100%"
      >
        {/* Search Input */}
        <SearchSectionInput />

        {/* Search Tabs */}
        {hydrated && (
          <Suspense fallback={null}>
            <SearchSectionTabsWithoutSSR />
          </Suspense>
        )}
      </Flex>
    </Group>
  );
};

export default SearchSection;
