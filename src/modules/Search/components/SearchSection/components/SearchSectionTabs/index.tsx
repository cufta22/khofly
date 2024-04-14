import { ActionIcon, Flex, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import {
  IconAdjustmentsHorizontal,
  IconCpu,
  IconFiles,
  IconMapPin,
  IconMusic,
  IconNews,
  IconPhoto,
  IconPlayerPlay,
  IconSchool,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";
import { ICategories, useSettingsStore } from "@store/settings";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";

const SearchSectionTabs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isSearchOptionsOpen, setIsSearchOptionsOpen, setSearchQuery } =
    useSearchStore((state) => ({
      setIsSearchOptionsOpen: state.setIsSearchOptionsOpen,
      isSearchOptionsOpen: state.isSearchOptionsOpen,
      setSearchQuery: state.setSearchQuery,
    }));
  const { categories, privateSearch } = useSettingsStore((state) => ({
    categories: state.categories,
    privateSearch: state.privateSearch,
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

  return (
    <Flex align="center" justify="space-between">
      <Tabs
        classNames={{
          root: classes.tab_root,
          list: classes.tab_list,
        }}
        defaultValue="general"
        // value={selectedTab || "general"}
        value={selectedTab}
        onChange={(tab) => handleChangeTab(tab as ICategories)}
        variant="default"
        w="fit-content"
      >
        <Tabs.List className={classes.tabs_scroll}>
          {categories.includes("general") && (
            <Tabs.Tab
              value="general"
              leftSection={<IconSearch style={getIconStyle(iconSize)} />}
            >
              General
            </Tabs.Tab>
          )}
          {categories.includes("images") && (
            <Tabs.Tab
              value="images"
              leftSection={<IconPhoto style={getIconStyle(iconSize)} />}
            >
              Images
            </Tabs.Tab>
          )}
          {categories.includes("videos") && (
            <Tabs.Tab
              value="videos"
              leftSection={<IconPlayerPlay style={getIconStyle(iconSize)} />}
            >
              Videos
            </Tabs.Tab>
          )}
          {categories.includes("news") && (
            <Tabs.Tab
              value="news"
              leftSection={<IconNews style={getIconStyle(iconSize)} />}
            >
              News
            </Tabs.Tab>
          )}
          {categories.includes("maps") && (
            <Tabs.Tab
              value="maps"
              leftSection={<IconMapPin style={getIconStyle(iconSize)} />}
            >
              Maps
            </Tabs.Tab>
          )}
          {categories.includes("music") && (
            <Tabs.Tab
              value="music"
              leftSection={<IconMusic style={getIconStyle(iconSize)} />}
            >
              Music
            </Tabs.Tab>
          )}

          {categories.includes("it") && (
            <Tabs.Tab
              value="it"
              leftSection={<IconCpu style={getIconStyle(iconSize)} />}
            >
              IT
            </Tabs.Tab>
          )}

          {categories.includes("science") && (
            <Tabs.Tab
              value="science"
              leftSection={<IconSchool style={getIconStyle(iconSize)} />}
            >
              Science
            </Tabs.Tab>
          )}

          {categories.includes("files") && (
            <Tabs.Tab
              value="files"
              leftSection={<IconFiles style={getIconStyle(iconSize)} />}
            >
              Files
            </Tabs.Tab>
          )}

          {categories.includes("social_media") && (
            <Tabs.Tab
              value="social_media"
              leftSection={<IconUsers style={getIconStyle(iconSize)} />}
            >
              Social Media
            </Tabs.Tab>
          )}
        </Tabs.List>
      </Tabs>

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
