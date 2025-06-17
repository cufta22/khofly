import { useTranslate } from "@hooks/translate/use-translate";
import { ActionIcon, Flex, Text } from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";
import classes from "./styles.module.scss";
import { IconChevronLeft } from "@tabler/icons-react";
import { IOpenSection } from "@module/SettingsMobile";

interface Props {
  title: DotNestedKeys<ITranslations>;
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMTitle: React.FC<Props> = ({ handleChangeSection, title }) => {
  const t = useTranslate();

  return (
    <Flex
      className={classes.settings_m_title_wrapper}
      align="center"
      justify="space-between"
      my="lg"
    >
      <Flex className={classes.settings_title_content} align="center" gap="sm">
        <ActionIcon
          variant="light"
          size="lg"
          onClick={() => {
            handleChangeSection("initial");
          }}
        >
          <IconChevronLeft />
        </ActionIcon>

        <Text className={classes.settings_title_text}>{t(title)}</Text>
      </Flex>
    </Flex>
  );
};

export default SettingsMTitle;
