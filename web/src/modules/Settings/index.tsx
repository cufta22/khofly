import SettingsSearXNG from "./components/SearXNG";
import { Container, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import {
  IconApps,
  IconBrush,
  IconLink,
  IconRadar,
  IconSettings2,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import SettingsGeneral from "./components/General";
import SettingsInterface from "./components/Interface";
import SettingsEngines from "./components/Engines";
import SettingsCategories from "./components/Categories";
import SettingsNominatim from "./components/Nominatim";
import { useState } from "react";
import SettingsShortcuts from "./components/Shortcuts";
import { useNavigate, useSearchParams } from "react-router";
import SettingsAIWorker from "./components/AIWorker";
import SettingsThemeEditor from "./components/ThemeEditor";

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
      <Tabs
        variant="default"
        value={stateTab}
        onChange={handleChangeTab}
        keepMounted={false}
      >
        <Tabs.List mb="xl" className={classes.tabs_scroll}>
          <Tabs.Tab
            value="general"
            leftSection={<IconSettings2 style={getIconStyle(20)} />}
          >
            General
          </Tabs.Tab>
          <Tabs.Tab
            value="interface"
            leftSection={<IconBrush style={getIconStyle(20)} />}
          >
            Interface
          </Tabs.Tab>
          <Tabs.Tab value="instances" leftSection={<IconLink style={getIconStyle(20)} />}>
            Instances
          </Tabs.Tab>
          <Tabs.Tab value="engines" leftSection={<IconRadar style={getIconStyle(20)} />}>
            Engines
          </Tabs.Tab>
          <Tabs.Tab value="shortcuts" leftSection={<IconApps style={getIconStyle(20)} />}>
            Shortcuts
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="interface">
          <>
            <SettingsInterface setDisplayThemeEdit={setDisplayThemeEdit} />
            {displayThemeEdit && <SettingsThemeEditor />}
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
            <SettingsNominatim />
            <SettingsAIWorker />
          </>
        </Tabs.Panel>

        <Tabs.Panel value="engines">
          <SettingsEngines />
        </Tabs.Panel>

        <Tabs.Panel value="shortcuts">
          <SettingsShortcuts />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageSettings;
