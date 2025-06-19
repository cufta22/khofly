import { Container, Transition } from "@mantine/core";
import classes from "./styles.module.scss";
import { useState } from "react";

import SettingsMSearchBar from "./components/common/SettingsMSearchBar";
import SettingsMInitial from "./components/initial";
import SettingsMGeneral from "./components/_general/General";
import clsx from "clsx";
import SettingsMAI from "./components/_general/AI";
import SettingsMCategories from "./components/_interface/Categories";
import SettingsMInterface from "./components/_interface/Interface";
import SettingsSearXNG from "@module/Settings/components/_instances/SearXNG";
import SettingsAPI from "@module/Settings/components/_instances/API";
import SettingsAI from "@module/Settings/components/_general/AI";
import SettingsAIWorker from "@module/Settings/components/_instances/AIWorker";
import SettingsNominatim from "@module/Settings/components/_instances/Nominatim";
import SettingsMEngines from "./components/_engines/Engines";
import SettingsWallpaper from "@module/Settings/components/_homepage/Wallpaper";
import SettingsShortcuts from "@module/Settings/components/_homepage/Shortcuts";
import SettingsMTitle from "./components/common/SettingsTitle";

export type IOpenSection =
  // Initial layout
  | "initial"
  // General
  | "general"
  | "ai"
  // Interface
  | "categories"
  | "interface"
  // Instances
  | "searxng"
  | "api"
  | "pv"
  | "worker"
  | "nominatim"
  // Engines
  | "engines"
  // Homepage
  | "wallpaper"
  | "shortcuts";

const PageSettingsMobile = () => {
  // Keep local state so app feels faster
  const [openSection, setOpenSection] = useState<IOpenSection>("initial");

  const handleChangeSection = (next: IOpenSection) => {
    if (!next) return;

    setOpenSection(next);
  };

  return (
    <Container className={classes.settings_m_page} size="sm" pt={40} pb={80}>
      <SettingsMSearchBar handleChangeSection={handleChangeSection} />

      <div className={clsx(classes.settings_m_container)}>
        {/* Initial navigation */}
        <div
          className={clsx(classes.left, {
            [classes.hidden]: openSection !== "initial",
          })}
        >
          <SettingsMInitial handleChangeSection={handleChangeSection} />
        </div>

        {/* Settings options */}
        <div
          className={clsx(classes.right, {
            [classes.visible]: openSection !== "initial",
          })}
        >
          {openSection === "general" ? (
            <SettingsMGeneral handleChangeSection={handleChangeSection} />
          ) : openSection === "ai" ? (
            <SettingsMAI handleChangeSection={handleChangeSection} />
          ) : openSection === "categories" ? (
            <SettingsMCategories handleChangeSection={handleChangeSection} />
          ) : openSection === "interface" ? (
            <SettingsMInterface handleChangeSection={handleChangeSection} />
          ) : openSection === "searxng" ? (
            <SettingsSearXNG isM={true} handleChangeSection={handleChangeSection} />
          ) : openSection === "api" ? (
            <SettingsAPI isM={true} handleChangeSection={handleChangeSection} />
          ) : openSection === "worker" ? (
            <SettingsAIWorker isM={true} handleChangeSection={handleChangeSection} />
          ) : openSection === "nominatim" ? (
            <SettingsNominatim isM={true} handleChangeSection={handleChangeSection} />
          ) : openSection === "engines" ? (
            <SettingsMEngines handleChangeSection={handleChangeSection} />
          ) : openSection === "wallpaper" ? (
            <SettingsWallpaper isM={true} handleChangeSection={handleChangeSection} />
          ) : openSection === "shortcuts" ? (
            <SettingsShortcuts isM={true} handleChangeSection={handleChangeSection} />
          ) : (
            <SettingsMTitle
              title="pages.settings._common.general"
              handleChangeSection={handleChangeSection}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default PageSettingsMobile;
