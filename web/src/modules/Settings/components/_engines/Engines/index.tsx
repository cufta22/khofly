import { Button, Flex, Paper, Space, Stack, Tabs, Text } from "@mantine/core";
import {
  IconCpu,
  IconDotsCircleHorizontal,
  IconFiles,
  IconMusic,
  IconNews,
  IconPhoto,
  IconPlayerPlay,
  IconSchool,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import classesParent from "../../../styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { useState } from "react";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";
import SettingsEnginesWrapper from "./components/Wrapper";

import {
  DATA_ENGINES_SOCIAL_MEDIA,
  DATA_ENGINES_GENERAL,
  DATA_ENGINES_IMAGES,
  DATA_ENGINES_VIDEOS,
  DATA_ENGINES_NEWS,
  DATA_ENGINES_MUSIC,
  DATA_ENGINES_IT,
  DATA_ENGINES_SCIENCE,
  DATA_ENGINES_FILES,
  DATA_ENGINES_OTHER,
} from "./components/data";

import { useEnginesStore } from "@store/engines";
import { DEFAULT_ENGINES } from "@store/engines/default_engines";
import type { ICategories } from "@store/settings";
import type { IDataEngine } from "./components/data";
import { CATEGORY_TO_STORE } from "./components/Wrapper/utils";
import SettingsTitle from "../../common/SettingsTitle";

export const TAB_DATA: {
  [key in ICategories]: {
    label: DotNestedKeys<ITranslations>;
    icon: any;
    data: IDataEngine[];
  };
} = {
  general: {
    label: "pages.settings.engines.title",
    icon: <IconSearch size={32} />,
    data: DATA_ENGINES_GENERAL,
  },
  images: {
    label: "pages.settings.engines.title_img",
    icon: <IconPhoto size={32} />,
    data: DATA_ENGINES_IMAGES,
  },
  videos: {
    label: "pages.settings.engines.title_vid",
    icon: <IconPlayerPlay size={32} />,
    data: DATA_ENGINES_VIDEOS,
  },
  news: {
    label: "pages.settings.engines.title_news",
    icon: <IconNews size={32} />,
    data: DATA_ENGINES_NEWS,
  },
  music: {
    label: "pages.settings.engines.title_music",
    icon: <IconMusic size={32} />,
    data: DATA_ENGINES_MUSIC,
  },
  it: {
    label: "pages.settings.engines.title_IT",
    icon: <IconCpu size={32} />,
    data: DATA_ENGINES_IT,
  },
  science: {
    label: "pages.settings.engines.title_science",
    icon: <IconSchool size={32} />,
    data: DATA_ENGINES_SCIENCE,
  },
  files: {
    label: "pages.settings.engines.title_files",
    icon: <IconFiles size={32} />,
    data: DATA_ENGINES_FILES,
  },
  social_media: {
    label: "pages.settings.engines.title_SM",
    icon: <IconUsers size={32} />,
    data: DATA_ENGINES_SOCIAL_MEDIA,
  },

  other: {
    label: "pages.settings.engines.title_other",
    icon: <IconDotsCircleHorizontal size={32} />,
    data: DATA_ENGINES_OTHER,
  },

  // Won't be used
  maps: {
    label: "_common.app_name",
    icon: null,
    data: [],
  },
};

const Engines = () => {
  const t = useTranslate();

  const [tab, setTab] = useState<ICategories>("general");

  // const engines = useEnginesStore((state) => state[CATEGORY_TO_STORE[tab].data] as string[])
  const setEngines = useEnginesStore(
    (state) => state[CATEGORY_TO_STORE[tab].set] as (next: string[]) => void
  );

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle
        icon={TAB_DATA[tab].icon}
        title={TAB_DATA[tab].label}
        rightSection={
          <Flex align="center" justify="flex-end" gap="sm">
            <Button
              size="xs"
              onClick={() => {
                setEngines(DEFAULT_ENGINES[tab]);
              }}
            >
              Set default
            </Button>
            <Button
              size="xs"
              onClick={() => {
                setEngines(TAB_DATA[tab].data.filter((row) => row.value).map((eng) => eng.value));
              }}
            >
              Enable all
            </Button>
            <Button
              size="xs"
              onClick={() => {
                setEngines([]);
              }}
            >
              Disable all
            </Button>
          </Flex>
        }
      />

      <Stack w="100%" px="lg" gap={6}>
        <Tabs
          variant="default"
          value={tab}
          onChange={(val) => setTab((val as ICategories) || "general")}
          keepMounted={false}
        >
          <Tabs.List mb="lg" className={classesParent.tabs_scroll}>
            <Tabs.Tab value="general" leftSection={<IconSearch style={getIconStyle(20)} />}>
              General
            </Tabs.Tab>
            <Tabs.Tab value="images" leftSection={<IconPhoto style={getIconStyle(20)} />}>
              Images
            </Tabs.Tab>
            <Tabs.Tab value="videos" leftSection={<IconPlayerPlay style={getIconStyle(20)} />}>
              Videos
            </Tabs.Tab>
            <Tabs.Tab value="news" leftSection={<IconNews style={getIconStyle(20)} />}>
              News
            </Tabs.Tab>
            <Tabs.Tab value="music" leftSection={<IconMusic style={getIconStyle(20)} />}>
              Music
            </Tabs.Tab>
            <Tabs.Tab value="it" leftSection={<IconCpu style={getIconStyle(20)} />}>
              IT
            </Tabs.Tab>
            <Tabs.Tab value="science" leftSection={<IconSchool style={getIconStyle(20)} />}>
              Science
            </Tabs.Tab>
            <Tabs.Tab value="files" leftSection={<IconFiles style={getIconStyle(20)} />}>
              Files
            </Tabs.Tab>
            <Tabs.Tab value="social_media" leftSection={<IconUsers style={getIconStyle(20)} />}>
              Social Media
            </Tabs.Tab>
            <Tabs.Tab
              value="other"
              // leftSection={<IconDotsCircleHorizontal style={getIconStyle(20)} />}
            >
              Other
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general">
            <SettingsEnginesWrapper category="general" data={DATA_ENGINES_GENERAL} />
          </Tabs.Panel>

          <Tabs.Panel value="images">
            <SettingsEnginesWrapper category="images" data={DATA_ENGINES_IMAGES} />
          </Tabs.Panel>

          <Tabs.Panel value="videos">
            <SettingsEnginesWrapper category="videos" data={DATA_ENGINES_VIDEOS} />
          </Tabs.Panel>

          <Tabs.Panel value="news">
            <SettingsEnginesWrapper category="news" data={DATA_ENGINES_NEWS} />
          </Tabs.Panel>

          <Tabs.Panel value="music">
            <SettingsEnginesWrapper category="music" data={DATA_ENGINES_MUSIC} />
          </Tabs.Panel>

          <Tabs.Panel value="it">
            <SettingsEnginesWrapper category="it" data={DATA_ENGINES_IT} />
          </Tabs.Panel>

          <Tabs.Panel value="science">
            <SettingsEnginesWrapper category="science" data={DATA_ENGINES_SCIENCE} />
          </Tabs.Panel>

          <Tabs.Panel value="files">
            <SettingsEnginesWrapper category="files" data={DATA_ENGINES_FILES} />
          </Tabs.Panel>

          <Tabs.Panel value="social_media">
            <SettingsEnginesWrapper category="social_media" data={DATA_ENGINES_SOCIAL_MEDIA} />
          </Tabs.Panel>

          <Tabs.Panel value="other">
            <Text size="md" mb="xs">
              This tab does not exists in the user interface, but you can search in these engines by
              its !bangs.
            </Text>
            <SettingsEnginesWrapper category="other" data={DATA_ENGINES_OTHER} />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default Engines;
