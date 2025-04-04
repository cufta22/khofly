import { Container, Space, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconBrowser, IconBrush, IconLink, IconRadar, IconSettings2 } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getIconStyle } from "@utils/functions/iconStyle";

import SettingsGeneral from "./components/_general/General";
import SettingsInterface from "./components/_interface/Interface";
import SettingsEngines from "./components/_engines/Engines";
import SettingsCategories from "./components/_general/Categories";
import SettingsThemeEditor from "./components/_interface/ThemeEditor";

import SettingsSearXNG from "./components/_instances/SearXNG";
import SettingsAIWorker from "./components/_instances/AIWorker";
import SettingsNominatim from "./components/_instances/Nominatim";

import SettingsShortcuts from "./components/_startpage/Shortcuts";
import SettingsWidgets from "./components/_startpage/Widgets";
import SettingsAPI from "./components/_instances/API";
import SettingsWallpaper from "./components/_startpage/Wallpaper";

const PageSettings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paramTab = searchParams.get("tab");

  // Keep local state so app feels faster
  const [stateTab, setStateTab] = useState(paramTab || "general");

  const [displayThemeEdit, setDisplayThemeEdit] = useState(false);

  const handleChangeTab = (next: string | null) => {
    if (!next) return;

    setStateTab(next);
    navigate(`/settings?tab=${next}`, { replace: true });
  };

  return (
    <Container className={classes.settings_page} size="lg" pt={40} pb={80}>
      <Tabs variant="default" value={stateTab} onChange={handleChangeTab} keepMounted={false}>
        <Tabs.List mb="xl" className={classes.tabs_scroll}>
          <Tabs.Tab value="general" leftSection={<IconSettings2 style={getIconStyle(20)} />}>
            General
          </Tabs.Tab>
          <Tabs.Tab value="interface" leftSection={<IconBrush style={getIconStyle(20)} />}>
            Interface
          </Tabs.Tab>
          <Tabs.Tab value="instances" leftSection={<IconLink style={getIconStyle(20)} />}>
            Instances
          </Tabs.Tab>
          <Tabs.Tab value="engines" leftSection={<IconRadar style={getIconStyle(20)} />}>
            Engines
          </Tabs.Tab>
          <Tabs.Tab value="startpage" leftSection={<IconBrowser style={getIconStyle(20)} />}>
            Startpage
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="interface">
          <SettingsInterface setDisplayThemeEdit={setDisplayThemeEdit} />
          <Space h={40} />
          {displayThemeEdit && <SettingsThemeEditor setDisplayThemeEdit={setDisplayThemeEdit} />}
        </Tabs.Panel>

        <Tabs.Panel value="general">
          <SettingsCategories />
          <Space h={40} />
          <SettingsGeneral />
        </Tabs.Panel>

        <Tabs.Panel value="instances">
          <SettingsSearXNG />
          <Space h={40} />
          <SettingsAPI />
          <Space h={40} />
          <SettingsAIWorker />
          <Space h={40} />
          <SettingsNominatim />
        </Tabs.Panel>

        <Tabs.Panel value="engines">
          <SettingsEngines />
        </Tabs.Panel>

        <Tabs.Panel value="startpage">
          <SettingsWallpaper />
          <Space h={40} />
          <SettingsShortcuts />
          <Space h={40} />
          <SettingsWidgets />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageSettings;
