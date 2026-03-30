import { Container, Space, Tabs } from "@mantine/core";
import classes from "./styles.module.scss";
import {
  IconBrowser,
  IconBrush,
  IconCookie,
  IconLink,
  IconRadar,
  IconSettings2,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useTranslate } from "@hooks/translate/use-translate";

import SettingsGeneral from "./components/_general/General";
// import SettingsAI from "./components/_general/AI";
import SettingsGeolocation from "./components/_general/Geolocation";

import SettingsCategories from "./components/_interface/Categories";
import SettingsInterface from "./components/_interface/Interface";
import SettingsThemeEditor from "./components/_interface/ThemeEditor";

import SettingsSearXNG from "./components/_instances/SearXNG";
import SettingsAIWorker from "./components/_instances/AIWorker";
import SettingsNominatim from "./components/_instances/Nominatim";
import SettingsAPI from "./components/_instances/API";
import SettingsPV from "./components/_instances/PV";

import SettingsEngines from "./components/_engines/Engines";

import SettingsShortcuts from "./components/_homepage/Shortcuts";
import SettingsWidgets from "./components/_homepage/Widgets";
import SettingsWallpaper from "./components/_homepage/Wallpaper";

import SettingsCookies from "./components/_cookies/Cookies";

const PageSettings = () => {
  const t = useTranslate();

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
            {t("pages.settings._common.general")}
          </Tabs.Tab>
          <Tabs.Tab value="interface" leftSection={<IconBrush style={getIconStyle(20)} />}>
            {t("pages.settings._common.interface")}
          </Tabs.Tab>
          <Tabs.Tab value="instances" leftSection={<IconLink style={getIconStyle(20)} />}>
            {t("pages.settings._common.instances")}
          </Tabs.Tab>
          <Tabs.Tab value="engines" leftSection={<IconRadar style={getIconStyle(20)} />}>
            {t("pages.settings._common.engines")}
          </Tabs.Tab>
          <Tabs.Tab value="homepage" leftSection={<IconBrowser style={getIconStyle(20)} />}>
            {t("pages.settings._common.homepage")}
          </Tabs.Tab>
          <Tabs.Tab value="cookies" leftSection={<IconCookie style={getIconStyle(20)} />}>
            {t("pages.settings._common.cookies")}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <SettingsGeneral />
          <Space h={40} />
          {/* <SettingsAI />
          <Space h={40} /> */}
          <SettingsGeolocation />
        </Tabs.Panel>

        <Tabs.Panel value="interface">
          <SettingsCategories />
          <Space h={40} />
          <SettingsInterface setDisplayThemeEdit={setDisplayThemeEdit} />
          <Space h={40} />
          {displayThemeEdit && <SettingsThemeEditor setDisplayThemeEdit={setDisplayThemeEdit} />}
        </Tabs.Panel>

        <Tabs.Panel value="instances">
          <SettingsSearXNG />
          <Space h={40} />
          <SettingsAPI />
          <Space h={40} />
          <SettingsPV />
          <Space h={40} />
          {/* <SettingsAIWorker />
          <Space h={40} /> */}
          <SettingsNominatim />
        </Tabs.Panel>

        <Tabs.Panel value="engines">
          <SettingsEngines />
        </Tabs.Panel>

        <Tabs.Panel value="homepage">
          <SettingsWallpaper />
          <Space h={40} />
          <SettingsShortcuts />
          <Space h={40} />
          <SettingsWidgets />
        </Tabs.Panel>

        <Tabs.Panel value="cookies">
          <SettingsCookies />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PageSettings;
