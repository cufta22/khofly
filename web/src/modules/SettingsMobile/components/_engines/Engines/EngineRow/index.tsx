import {
  Anchor,
  Badge,
  Box,
  Code,
  Flex,
  HoverCard,
  Image,
  Stack,
  Switch,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { DotNestedKeys, ITranslations } from "@ts/global.types";
import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { IconCheck } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { usePrimaryColor } from "@hooks/use-primary-color";
import type { ICategories } from "@store/settings";

interface Props {
  type: "divider" | "engine";
  iconSrc: string;
  iconAlt: string;
  label: DotNestedKeys<ITranslations>;
  checked: boolean;
  onChange: (next: boolean) => void;
  variant?: "settings" | "quick_settings";
  bang: string;
  category: ICategories;
}

const EngineMComponent: React.FC<Props> = ({
  type,
  checked,
  iconAlt,
  iconSrc,
  label,
  onChange,
  variant = "settings",
  bang,
  category,
}) => {
  const theme = useMantineTheme();
  const t = useTranslate();

  // If type = divider
  if (type === "divider") {
    return (
      <Table.Tr bg="dark.8">
        <Table.Td>
          <Text fw={500} c="teal">
            {t(label)}
          </Text>
        </Table.Td>

        {variant === "settings" && (
          <>
            <Table.Td className={classes.table_responsive}>{bang && <Code>{bang}</Code>}</Table.Td>
            <Table.Td className={classes.table_responsive} />
            <Table.Td className={classes.table_responsive} />
            <Table.Td className={classes.table_responsive} />
          </>
        )}
        <Table.Td />
      </Table.Tr>
    );
  }

  // If type = engine
  return (
    <Table.Tr>
      {/* Engine */}
      <Table.Td style={{ whiteSpace: "nowrap" }}>
        <Flex
          align="center"
          gap="sm"
          onClick={() => {
            if (category !== "other") onChange(!checked);
          }}
          className={classes.engine_component}
        >
          <Box w={20} h={20}>
            <Image
              src={iconSrc}
              w={20}
              h={20}
              alt={iconAlt}
              fit="contain"
              fallbackSrc="/assets/placeholder.svg"
            />
          </Box>

          <Text size="md" fw={400}>
            {t(label)}
          </Text>
        </Flex>
      </Table.Td>

      {/* Active */}
      <Table.Td ta="right">
        {category !== "other" && (
          <Switch
            ml="auto"
            w={42}
            style={{ cursor: "pointer" }}
            checked={checked}
            onChange={(e) => onChange(e.currentTarget.checked)}
            color="teal"
            withThumbIndicator={false}
            size={"md"}
            // thumbIcon={
            //   checked ? (
            //     <IconCheck style={getIconStyle(12)} color={theme.colors.teal[6]} stroke={3} />
            //   ) : (
            //     <IconX style={getIconStyle(12)} color={theme.colors.red[6]} stroke={3} />
            //   )
            // }
          />
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export default EngineMComponent;
