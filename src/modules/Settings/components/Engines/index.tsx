import { Flex, Paper, Space, Stack, Tabs, Text } from "@mantine/core";
import {
  IconCpu,
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
import classesParent from "../../styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { useState } from "react";
import { DotNestedKeys, ITranslations } from "@ts/global.types";
import SettingsEnginesWrapper from "./components/Wrapper";
import classes from "./styles.module.scss";

import { DATA_ENGINES_GENERAL } from "./components/data/general";
import { DATA_ENGINES_IMAGES } from "./components/data/images";
import { DATA_ENGINES_VIDEOS } from "./components/data/videos";
import { DATA_ENGINES_NEWS } from "./components/data/news";
import { DATA_ENGINES_MUSIC } from "./components/data/music";
import { DATA_ENGINES_IT } from "./components/data/it";
import { DATA_ENGINES_SCIENCE } from "./components/data/science";
import { DATA_ENGINES_FILES } from "./components/data/files";
import { DATA_ENGINES_SOCIAL_MEDIA } from "./components/data/social_media";

const TAB_DATA: {
  [key: string]: {
    label: DotNestedKeys<ITranslations>;
    icon: any;
  };
} = {
  general: {
    label: "pages.settings.engines.title",
    icon: <IconSearch size={32} />,
  },
  images: {
    label: "pages.settings.engines.titleImg",
    icon: <IconPhoto size={32} />,
  },
  videos: {
    label: "pages.settings.engines.titleVid",
    icon: <IconPlayerPlay size={32} />,
  },
  news: {
    label: "pages.settings.engines.titleNews",
    icon: <IconNews size={32} />,
  },

  music: {
    label: "pages.settings.engines.titleMusic",
    icon: <IconMusic size={32} />,
  },
  it: {
    label: "pages.settings.engines.titleIT",
    icon: <IconCpu size={32} />,
  },
  science: {
    label: "pages.settings.engines.titleScience",
    icon: <IconSchool size={32} />,
  },
  files: {
    label: "pages.settings.engines.titleFiles",
    icon: <IconFiles size={32} />,
  },
  social_media: {
    label: "pages.settings.engines.titleSocial",
    icon: <IconUsers size={32} />,
  },
};

const Engines = () => {
  const t = useTranslate();

  const [tab, setTab] = useState("general");

  return (
    <Paper radius="md" withBorder>
      <Flex className={classes.settings_engines_title} p="lg" mb={0}>
        <Flex align="center">
          {TAB_DATA[tab].icon}

          <Text fz={26} fw={600} ml="sm">
            {t(TAB_DATA[tab].label)}
          </Text>
        </Flex>

        <div style={{ flex: 1 }}></div>

        <Text>Currently selected engines</Text>
      </Flex>

      <Stack w="100%" px="lg" gap={6}>
        <Tabs
          variant="default"
          value={tab}
          onChange={(val) => setTab(val || "general")}
          keepMounted={false}
        >
          <Tabs.List mb="lg" className={classesParent.tabs_scroll}>
            <Tabs.Tab
              value="general"
              leftSection={<IconSearch style={getIconStyle(20)} />}
            >
              General
            </Tabs.Tab>
            <Tabs.Tab
              value="images"
              leftSection={<IconPhoto style={getIconStyle(20)} />}
            >
              Images
            </Tabs.Tab>
            <Tabs.Tab
              value="videos"
              leftSection={<IconPlayerPlay style={getIconStyle(20)} />}
            >
              Videos
            </Tabs.Tab>
            <Tabs.Tab
              value="news"
              leftSection={<IconNews style={getIconStyle(20)} />}
            >
              News
            </Tabs.Tab>
            <Tabs.Tab
              value="music"
              leftSection={<IconMusic style={getIconStyle(20)} />}
            >
              Music
            </Tabs.Tab>
            <Tabs.Tab
              value="it"
              leftSection={<IconCpu style={getIconStyle(20)} />}
            >
              IT
            </Tabs.Tab>
            <Tabs.Tab
              value="science"
              leftSection={<IconSchool style={getIconStyle(20)} />}
            >
              Science
            </Tabs.Tab>
            <Tabs.Tab
              value="files"
              leftSection={<IconFiles style={getIconStyle(20)} />}
            >
              Files
            </Tabs.Tab>
            <Tabs.Tab
              value="social_media"
              leftSection={<IconUsers style={getIconStyle(20)} />}
            >
              Social Media
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general">
            <SettingsEnginesWrapper
              category="general"
              data={DATA_ENGINES_GENERAL}
            />
          </Tabs.Panel>

          <Tabs.Panel value="images">
            <SettingsEnginesWrapper
              category="images"
              data={DATA_ENGINES_IMAGES}
            />
          </Tabs.Panel>

          <Tabs.Panel value="videos">
            <SettingsEnginesWrapper
              category="videos"
              data={DATA_ENGINES_VIDEOS}
            />
          </Tabs.Panel>

          <Tabs.Panel value="news">
            <SettingsEnginesWrapper category="news" data={DATA_ENGINES_NEWS} />
          </Tabs.Panel>

          <Tabs.Panel value="music">
            <SettingsEnginesWrapper
              category="music"
              data={DATA_ENGINES_MUSIC}
            />
          </Tabs.Panel>

          <Tabs.Panel value="it">
            <SettingsEnginesWrapper category="it" data={DATA_ENGINES_IT} />
          </Tabs.Panel>

          <Tabs.Panel value="science">
            <SettingsEnginesWrapper
              category="science"
              data={DATA_ENGINES_SCIENCE}
            />
          </Tabs.Panel>

          <Tabs.Panel value="files">
            <SettingsEnginesWrapper
              category="files"
              data={DATA_ENGINES_FILES}
            />
          </Tabs.Panel>

          <Tabs.Panel value="social_media">
            <SettingsEnginesWrapper
              category="social_media"
              data={DATA_ENGINES_SOCIAL_MEDIA}
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Space h="xl" />
    </Paper>
  );
};

export default Engines;
