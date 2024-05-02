import EngineComponent from "../EngineRow";
import { HOVER_DATA } from "../../hover-data";
import { EnginesState, IGeneralEngines, useEnginesStore } from "@store/engines";
import { DotNestedKeys, ITranslations } from "@ts/global.types";
import { ICategories } from "@store/settings";
import { Table } from "@mantine/core";

import classes from "./styles.module.scss";

const CATEGORY_TO_STORE: {
  [key in ICategories]: {
    data:
      | "enginesGeneral"
      | "enginesImages"
      | "enginesVideos"
      | "enginesNews"
      | "enginesMusic"
      | "enginesIT"
      | "enginesScience"
      | "enginesFiles"
      | "enginesSocialMedia";
    set:
      | "setEnginesGeneral"
      | "setEnginesImages"
      | "setEnginesVideos"
      | "setEnginesNews"
      | "setEnginesMusic"
      | "setEnginesIT"
      | "setEnginesScience"
      | "setEnginesFiles"
      | "setEnginesSocialMedia";
  };
} = {
  general: {
    data: "enginesGeneral",
    set: "setEnginesGeneral",
  },
  images: {
    data: "enginesImages",
    set: "setEnginesImages",
  },
  videos: {
    data: "enginesVideos",
    set: "setEnginesVideos",
  },
  news: {
    data: "enginesNews",
    set: "setEnginesNews",
  },
  music: {
    data: "enginesMusic",
    set: "setEnginesMusic",
  },
  it: {
    data: "enginesIT",
    set: "setEnginesIT",
  },
  science: {
    data: "enginesScience",
    set: "setEnginesScience",
  },
  files: {
    data: "enginesFiles",
    set: "setEnginesFiles",
  },
  social_media: {
    data: "enginesSocialMedia",
    set: "setEnginesSocialMedia",
  },

  // Will never be used, so general is fine
  maps: {
    data: "enginesGeneral",
    set: "setEnginesGeneral",
  },
};

interface Props {
  category: ICategories;
  data: {
    type: "divider" | "engine";
    value: string | "";
    alt: string;
    icon: string;
    label: DotNestedKeys<ITranslations>;
    safeSearch: boolean;
    timeRange: boolean;
  }[];
}

const SettingsEnginesWrapper: React.FC<Props> = ({ category, data }) => {
  const { engines, setEngines } = useEnginesStore((state) => ({
    engines: state[
      CATEGORY_TO_STORE[category].data
    ] as EnginesState["enginesGeneral"],
    setEngines: state[
      CATEGORY_TO_STORE[category].set
    ] as EnginesState["setEnginesGeneral"],
  }));

  const handleChangeEngines = (e: IGeneralEngines, next: boolean) => {
    let newEngines = [];

    if (next) {
      newEngines = [...engines, e];
    } else {
      newEngines = engines.filter((eng) => eng !== e);
    }

    setEngines(newEngines);
  };

  const rows = data.map((item, i) => (
    <EngineComponent
      key={i}
      type={item.type}
      checked={!!engines.find((e) => e === item.value)}
      iconAlt={item.alt}
      iconSrc={item.icon}
      label={item.label}
      onChange={(next) =>
        handleChangeEngines(item.value as IGeneralEngines, next)
      }
      hoverData={HOVER_DATA[item.value]}
      safeSearch={item.safeSearch}
      timeRange={item.timeRange}
    />
  ));

  return (
    <Table.ScrollContainer minWidth={350}>
      <Table verticalSpacing="sm" px="md" w="100%">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="100%">Engine</Table.Th>
            <Table.Th className={classes.table_responsive} pr="xl">
              Safe search
            </Table.Th>
            <Table.Th className={classes.table_responsive} pr="xl">
              Time range
            </Table.Th>
            <Table.Th className={classes.table_responsive} pr="xl">
              Status
            </Table.Th>
            <Table.Th ta="right">Active</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default SettingsEnginesWrapper;
