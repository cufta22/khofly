import { Container, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconBrowser, IconBrush, IconLink, IconRadar, IconSettings2 } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getIconStyle } from "@utils/functions/iconStyle";

import SettingsGeneral from "./components/General";
import SettingsInterface from "./components/Interface";
import SettingsEngines from "./components/Engines";
import SettingsCategories from "./components/Categories";
import SettingsThemeEditor from "./components/ThemeEditor";

import SettingsSearXNG from "./components/_instances/SearXNG";
import SettingsAIWorker from "./components/_instances/AIWorker";
import SettingsNominatim from "./components/_instances/Nominatim";

import SettingsShortcuts from "./components/_startpage/Shortcuts";
import SettingsWidgets from "./components/_startpage/Widgets";
import SettingsAPI from "./components/_instances/API";

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
          <>
            <SettingsInterface setDisplayThemeEdit={setDisplayThemeEdit} />
            {displayThemeEdit && <SettingsThemeEditor setDisplayThemeEdit={setDisplayThemeEdit} />}
          </>
        </Tabs.Panel>

        <Tabs.Panel value="general">
          <>
            <SettingsCategories />
            <SettingsGeneral />
          </>
        </Tabs.Panel>

        <Tabs.Panel value="instances">
          <>
            <SettingsSearXNG />
            <SettingsAPI />
            <SettingsNominatim />
            <SettingsAIWorker />
          </>
        </Tabs.Panel>

        <Tabs.Panel value="engines">
          <SettingsEngines />
        </Tabs.Panel>

        <Tabs.Panel value="startpage">
          <SettingsShortcuts />
          <SettingsWidgets />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageSettings;
