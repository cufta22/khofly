import { useEffect, useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { IconBarrierBlock, IconChevronRight } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import RemixLink from "@components/RemixLink";
import clsx from "clsx";
import { useLocation } from "react-router";

export interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  links?: { label: string; link: string; isWip: boolean }[];
}

const LinksGroup: React.FC<LinksGroupProps> = ({
  icon: Icon,
  label,
  links,
}) => {
  const theme = useMantineTheme();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const shouldOpen = !!links?.find((link) => pathname === link.link);
    if (shouldOpen) setOpened(shouldOpen);
  }, []);

  const items = (hasLinks ? links : []).map((link) => (
    <RemixLink
      className={clsx(classes.link, {
        [classes.link_active]: pathname === link.link,
      })}
      to={link.link}
      key={link.label}
    >
      <Flex align="center" gap="xs">
        {link.label}

        {link.isWip && (
          <IconBarrierBlock
            style={getIconStyle(18)}
            color={theme.colors.orange["5"]}
          />
        )}
      </Flex>
    </RemixLink>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>

            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};

export default LinksGroup;
