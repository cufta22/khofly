import { Flex, Text } from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { IconChevronRight } from "@tabler/icons-react";

interface Props {
  icon?: React.ReactNode;
  desc: DotNestedKeys<ITranslations>;
  onClick: () => void;
}

const SettingsMInitRow: React.FC<Props> = ({ icon, desc, onClick }) => {
  const t = useTranslate();

  return (
    <Flex
      onClick={onClick}
      w="100%"
      className={classes.settings_m_init_row}
      px="lg"
      justify="space-between"
    >
      <Flex align="center" gap="sm">
        {icon && icon}

        <Text size="md" fw={400}>
          {t(desc)}
        </Text>
      </Flex>

      <IconChevronRight />
    </Flex>
  );
};

export default SettingsMInitRow;
