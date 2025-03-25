import { Flex, Text } from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";

interface Props {
  icon?: React.ReactNode;
  desc: DotNestedKeys<ITranslations>;
  tooltip?: React.ReactNode;
  control: React.ReactNode;
}

const SettingsRow: React.FC<Props> = ({ icon, desc, tooltip, control }) => {
  const t = useTranslate();

  return (
    <Flex w="100%" className={classes.settings_row} justify="space-between">
      <Flex align="center" gap="sm">
        {icon && icon}

        <Text size="md" fw={400}>
          {t(desc)}
        </Text>

        {tooltip && tooltip}
      </Flex>

      {control && control}
    </Flex>
  );
};

export default SettingsRow;
