import EngineComponent from "../EngineRow";
import { HOVER_DATA } from "../../hover-data";
import { type IGeneralEngines, useEnginesStore } from "@store/engines";
import type { ICategories } from "@store/settings";
import { Table } from "@mantine/core";

import classes from "./styles.module.scss";
import { CATEGORY_TO_STORE } from "./utils";
import type { IDataEngine } from "../data";

interface Props {
  category: ICategories;
  data: IDataEngine[];
  variant?: "settings" | "quick_settings";
}

const SettingsEnginesWrapper: React.FC<Props> = ({ category, data, variant = "settings" }) => {
  const engines = useEnginesStore((state) => state[CATEGORY_TO_STORE[category].data] as string[]);
  const setEngines = useEnginesStore(
    (state) => state[CATEGORY_TO_STORE[category].set] as (next: string[]) => void
  );

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
      onChange={(next) => handleChangeEngines(item.value as IGeneralEngines, next)}
      hoverData={HOVER_DATA[item.value]}
      safeSearch={item.safeSearch}
      timeRange={item.timeRange}
      bang={item.bang}
      variant={variant || "settings"}
      category={category}
    />
  ));

  return (
    <Table.ScrollContainer minWidth={350}>
      <Table verticalSpacing="sm" px="md" w="100%">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Engine</Table.Th>

            {variant === "settings" && (
              <>
                <Table.Th w="100%" className={classes.table_responsive} pr="xl">
                  !bang
                </Table.Th>
                <Table.Th className={classes.table_responsive} pr="xl">
                  Safe search
                </Table.Th>
                <Table.Th className={classes.table_responsive} pr="xl">
                  Time range
                </Table.Th>
                <Table.Th className={classes.table_responsive} pr="xl">
                  Status
                </Table.Th>
              </>
            )}
            <Table.Th ta="right">Active</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default SettingsEnginesWrapper;
