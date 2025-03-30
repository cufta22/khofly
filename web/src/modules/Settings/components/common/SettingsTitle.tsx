import { useTranslate } from "@hooks/translate/use-translate";
import { Flex, Text } from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";
import classes from "./styles.module.scss";

interface Props {
  icon: React.ReactNode;
  title: DotNestedKeys<ITranslations>;
  rightSection?: React.ReactNode;
}

const SettingsTitle: React.FC<Props> = ({ icon, title, rightSection }) => {
  const t = useTranslate();

  return (
    <Flex
      className={classes.settings_title_wrapper}
      align="center"
      justify="space-between"
      p="lg"
      mb={16}
    >
      <Flex className={classes.settings_title_content} align="center">
        {icon && icon}

        <Text className={classes.settings_title_text} ml="sm">
          {t(title)}
        </Text>
      </Flex>

      {rightSection && <Flex className={classes.hide_mobile}>{rightSection}</Flex>}
    </Flex>
  );
};

export default SettingsTitle;
