import { Text, Container, Group, Anchor, Flex } from "@mantine/core";

import classes from "./styles.module.scss";

import packageJson from "package.json";
import RemixLink from "@components/RemixLink";
import { useGeneralStore } from "@store/general";
import { useEffect, useState } from "react";

const Footer = () => {
  const devMode = useGeneralStore((state) => state.devMode);
  const setDevMode = useGeneralStore((state) => state.setDevMode);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count && count % 5 === 0) setDevMode(!devMode);
  }, [count]);

  return (
    <Container size="xl" py="sm" className={classes.after_footer}>
      <Flex gap={4} align="center">
        <Text c="dimmed" size="sm" onClick={() => setCount((prev) => prev + 1)}>
          Version {packageJson.version} beta, powered by{" "}
        </Text>

        <Text c="dimmed" size="sm">
          <Anchor href="https://docs.searxng.org/" target="_blank" rel="noreferrer noopener">
            SearXNG
          </Anchor>
        </Text>
      </Flex>

      <Group gap="sm" justify="flex-end">
        <RemixLink to="/docs">
          <Text size="sm">Docs</Text>
        </RemixLink>

        <RemixLink to="/privacy">
          <Text size="sm">Privacy</Text>
        </RemixLink>

        <RemixLink to="/changelog">
          <Text size="sm">Changelog</Text>
        </RemixLink>

        <RemixLink to="/settings">
          <Text size="sm">Settings</Text>
        </RemixLink>
      </Group>
    </Container>
  );
};

export default Footer;
