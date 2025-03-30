import { Flex, Group, Image, Skeleton } from "@mantine/core";

import classes from "./styles.module.scss";

import RemixLink from "@components/RemixLink";
import { useSettingsStore } from "@store/settings";
import useSearchQuery from "@hooks/use-search-query";

import SearchSectionInput from "./components/SearchSectionInput";

import SearchSectionTabs from "./components/SearchSectionTabs";

const SearchSection = () => {
  const hydrated = useSettingsStore((state) => state.hydrated);

  const q = useSearchQuery();

  return (
    <Group className={classes.search_section} align="flex-start" h="100%" gap="md">
      {/* Logo desktop */}
      <RemixLink className={classes.app_logo} to="/">
        {q.includes("doge") ? (
          <Image w={42} h={42} src={"/assets/doge.svg"} alt="Doge image" fit="contain" />
        ) : (
          // <IconTriangleFilled style={getIconStyle(42)} />
          <Image src="/assets/logo.svg" w={42} h={42} />
        )}
      </RemixLink>

      <Flex className={classes.flex} direction="column" justify="space-between" h="100%">
        {/* Search Input */}
        <SearchSectionInput />

        {/* Search Tabs */}
        {hydrated ? <SearchSectionTabs /> : <Skeleton w="100%" h={26} />}
      </Flex>
    </Group>
  );
};

export default SearchSection;
