import {
  Anchor,
  Badge,
  Flex,
  HoverCard,
  Image,
  Stack,
  Switch,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { DotNestedKeys, ITranslations } from "@ts/global.types";
import React from "react";
import classes from "./styles.module.scss";
import { IHoverData } from "../../hover-data";
import { useTranslate } from "@hooks/translate/use-translate";
import { IconCheck, IconX } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

interface Props {
  type: "divider" | "engine";
  iconSrc: string;
  iconAlt: string;
  label: DotNestedKeys<ITranslations>;
  checked: boolean;
  onChange: (next: boolean) => void;
  hoverData?: IHoverData;
  safeSearch: boolean;
  timeRange: boolean;
  variant?: "settings" | "quick_settings";
}

const EngineComponent: React.FC<Props> = ({
  type,
  checked,
  iconAlt,
  iconSrc,
  label,
  onChange,
  hoverData,
  safeSearch,
  timeRange,
  variant = "settings",
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
            <Table.Td className={classes.table_responsive}></Table.Td>
            <Table.Td className={classes.table_responsive}></Table.Td>
            <Table.Td className={classes.table_responsive}></Table.Td>
          </>
        )}
        <Table.Td></Table.Td>
      </Table.Tr>
    );
  }

  // If type = engine
  return (
    <Table.Tr>
      {/* Engine */}
      <Table.Td>
        <HoverCard
          width={600}
          shadow="md"
          position="right"
          disabled={!hoverData}
        >
          <HoverCard.Target>
            <Flex
              align="center"
              gap="sm"
              onClick={() => onChange(!checked)}
              className={classes.engine_component}
            >
              <Image
                src={iconSrc}
                w={20}
                h={20}
                alt={iconAlt}
                fit="contain"
                fallbackSrc="https://placehold.co/200x200?text=Placeholder"
              />

              <Text size="md" fw={400}>
                {t(label)}
              </Text>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Stack gap={0}>
              <Text size="sm">{hoverData?.description}</Text>

              <Text mt="xs" component="span" c="blue.4">
                <Anchor
                  size="sm"
                  href={hoverData?.linkUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {hoverData?.linkUrl}
                </Anchor>
              </Text>

              {hoverData?.wikiUrl && (
                <Text component="span" c="blue.4">
                  <Anchor
                    size="sm"
                    href={"https://www." + hoverData?.wikiUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {hoverData?.wikiUrl}
                  </Anchor>
                </Text>
              )}

              <Flex my="xs" align="center" justify="space-between">
                <Flex align="center" justify="space-between" gap="xs">
                  {hoverData?.bangsEngine.map((bang, i) => (
                    <Badge key={i} size="lg" color="gray" tt="lowercase">
                      {bang}
                    </Badge>
                  ))}
                </Flex>

                <Text size="sm">!bang for this engine</Text>
              </Flex>

              <Flex align="center" justify="space-between">
                <Flex align="center" justify="space-between" gap="xs">
                  {hoverData?.bangsCategory.map((bang, i) => (
                    <Badge key={i} size="lg" color="gray" tt="lowercase">
                      {bang}
                    </Badge>
                  ))}
                </Flex>

                <Text size="sm">!bang for its category</Text>
              </Flex>
            </Stack>
          </HoverCard.Dropdown>
        </HoverCard>
      </Table.Td>

      {variant === "settings" && (
        <>
          {/* Safe search */}
          <Table.Td className={classes.table_responsive}>
            {safeSearch && (
              <IconCheck
                style={getIconStyle(22)}
                stroke={2}
                color={theme.colors.teal[6]}
              />
            )}
          </Table.Td>
          {/* Time range */}
          <Table.Td className={classes.table_responsive}>
            {timeRange && (
              <IconCheck
                style={getIconStyle(22)}
                stroke={2}
                color={theme.colors.teal[6]}
              />
            )}
          </Table.Td>
          {/* Status */}
          <Table.Td className={classes.table_responsive}></Table.Td>
        </>
      )}

      {/* Active */}
      <Table.Td ta="right">
        <Switch
          ml="auto"
          w={42}
          style={{ cursor: "pointer" }}
          checked={checked}
          onChange={(e) => onChange(e.currentTarget.checked)}
          color="teal"
          thumbIcon={
            checked ? (
              <IconCheck
                style={getIconStyle(12)}
                color={theme.colors.teal[6]}
                stroke={3}
              />
            ) : (
              <IconX
                style={getIconStyle(12)}
                color={theme.colors.red[6]}
                stroke={3}
              />
            )
          }
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default EngineComponent;
