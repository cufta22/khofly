import { Text, Container, Group, Anchor, Flex } from "@mantine/core";

import classes from "./styles.module.scss";

import packageJson from "package.json";
import RemixLink from "@components/RemixLink";
import { useGeneralStore } from "@store/general";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

const Footer = () => {
  const devMode = useGeneralStore((state) => state.devMode);
  const setDevMode = useGeneralStore((state) => state.setDevMode);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count && count % 5 === 0) setDevMode(!devMode);
  }, [count]);

  return (
    <Container size="xl" py="sm" className={clsx("responsive_container", classes.after_footer)}>
      <Flex gap={4} align="center">
        <Text
          c="dimmed"
          className={classes.footer_text}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Version {packageJson.version} beta, powered by{" "}
        </Text>

        <Text c="dimmed" className={classes.footer_text}>
          <Anchor
            className={classes.footer_text}
            href="https://docs.searxng.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            SearXNG
          </Anchor>
        </Text>
      </Flex>

      <Group gap="sm" justify="flex-end">
        <RemixLink to="/instances" prefetch="intent">
          <Text className={classes.footer_text}>Instances</Text>
        </RemixLink>

        <RemixLink to="/docs" prefetch="intent">
          <Text className={classes.footer_text}>Docs</Text>
        </RemixLink>

        {!IS_SELF_HOST ? (
          <RemixLink to="/privacy" prefetch="intent">
            <Text className={classes.footer_text}>Privacy</Text>
          </RemixLink>
        ) : null}

        <RemixLink to="/changelog" prefetch="intent">
          <Text className={classes.footer_text}>Changelog</Text>
        </RemixLink>

        <RemixLink to="/settings" prefetch="intent">
          <Text className={classes.footer_text}>Settings</Text>
        </RemixLink>
      </Group>
    </Container>
  );
};

export default Footer;
