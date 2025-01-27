import { useTranslate } from "@hooks/translate/use-translate";
import { Accordion, Stack, Text } from "@mantine/core";
import { IconRadar } from "@tabler/icons-react";
import classes from "../styles.module.scss";
import { TAB_DATA } from "@module/Settings/components/Engines";
import { ICategories } from "@store/settings";
import SettingsEnginesWrapper from "@module/Settings/components/Engines/components/Wrapper";
import { useSearchParams } from "react-router";

const QSEngines = () => {
  const t = useTranslate();
  const [params] = useSearchParams();

  const tab = (params.get("tab") as ICategories) || "general";

  const DATA = TAB_DATA[tab];

  return (
    <Accordion.Item className={classes.acc_item} value="engines">
      <Accordion.Control className={classes.acc_control} icon={<IconRadar />}>
        <Text size="lg">{t(DATA.label)}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack mt="lg">
          <SettingsEnginesWrapper
            data={DATA.data}
            category={tab}
            variant="quick_settings"
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default QSEngines;
