import { ActionIcon, Center, Flex, Loader, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";
import { ICategories, useSettingsStore } from "@store/settings";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { CATEGORIES_DATA, sortCategories } from "./data";
import { useHotkeys, useMounted } from "@mantine/hooks";

const SearchSectionTabs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mounted = useMounted();

  const { isSearchOptionsOpen, setIsSearchOptionsOpen } = useSearchStore(
    (state) => ({
      setIsSearchOptionsOpen: state.setIsSearchOptionsOpen,
      isSearchOptionsOpen: state.isSearchOptionsOpen,
    })
  );
  const { categories, privateSearch, hydrated } = useSettingsStore((state) => ({
    categories: state.categories,
    privateSearch: state.privateSearch,
    hydrated: state.hydrated,
  }));

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("tab") || "general"
  );

  const iconSize = 16;

  const handleChangeTab = (tab: ICategories) => {
    nprogress.start();
    setSelectedTab(tab);

    const query = searchParams.get("q") || "";

    // Handle Private Search
    if (privateSearch) {
      return navigate(`/search?tab=${tab}`);
    }
    navigate(`/search?q=${encodeURIComponent(query)}&tab=${tab}`);
  };

  useHotkeys([
    [
      "ArrowLeft",
      () => {
        const currentIdx = categories.findIndex((val) => val === selectedTab);
        if (currentIdx !== 0) handleChangeTab(categories[currentIdx - 1]);
      },
    ],
    [
      "ArrowRight",
      () => {
        const currentIdx = categories.findIndex((val) => val === selectedTab);
        if (currentIdx !== categories.length - 1)
          handleChangeTab(categories[currentIdx + 1]);
      },
    ],
  ]);

  return (
    <Flex align="center" justify="space-between">
      {hydrated && (
        <Tabs
          classNames={{
            root: classes.tab_root,
            list: classes.tab_list,
          }}
          // value={selectedTab || "general"}
          value={selectedTab}
          onChange={(tab) => handleChangeTab(tab as ICategories)}
          variant="default"
          w="fit-content"
        >
          <Tabs.List className={classes.tabs_scroll}>
            {sortCategories(categories).map((cat, i) => {
              const Icon = CATEGORIES_DATA[cat].icon;

              return (
                <Tabs.Tab
                  key={i}
                  value={cat}
                  leftSection={<Icon style={getIconStyle(iconSize)} />}
                >
                  {CATEGORIES_DATA[cat].title}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs>
      )}

      <ActionIcon
        className={classes.search_options}
        size="md"
        variant="subtle"
        color="gray"
        onClick={() => setIsSearchOptionsOpen(!isSearchOptionsOpen)}
      >
        <IconAdjustmentsHorizontal style={getIconStyle(20)} stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
};

export default SearchSectionTabs;