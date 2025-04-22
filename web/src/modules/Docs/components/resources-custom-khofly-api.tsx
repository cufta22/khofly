import { Blockquote, Code, Container, Text, useMantineTheme } from "@mantine/core";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import RemixLink from "@components/RemixLink";
import DocsTitle from "./common/DocsTitle";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import { IconApiApp } from "@tabler/icons-react";
import { usePrimaryColor } from "@hooks/use-primary-color";

const DocsResourcesCustomKhoflyAPI = () => {
  const theme = useMantineTheme();

  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconApiApp color={theme.colors.blue[5]} />}>
        Custom API instance
      </DocsTitle>

      <Blockquote
        color="blue"
        // cite="- https://docs.searxng.org/"
        mt="xl"
        radius="sm"
      >
        This page will show you settings that you need if you want to use your own API instance with
        Khofly. If you don't have your own API instance hosted check out{" "}
        <RemixLink to="/docs/self-host-khofly-api">
          <Text component="span" c={linkTextColor}>
            the hosting guide
          </Text>
        </RemixLink>
        .
      </Blockquote>

      <DocsSubtitle>1. Make sure that you have ENV set up correctly</DocsSubtitle>

      <DocsText>
        Check if you have <Code>.env.local</Code> or just <Code>.env</Code> file in{" "}
        <Code>/api</Code> folder.
      </DocsText>

      <DocsText>
        Get all the necessary API keys, the guides can be found in 3rd-party section.
      </DocsText>

      <DocsText>
        Make sure that <Code>IS_SELF_HOST</Code> is set to <Code>1</Code> and you have all your web
        client domains added in <Code>CORS_URLS</Code>.
      </DocsText>

      <DocsSubtitle>Finally - Add your instance to Khofly</DocsSubtitle>

      <DocsText>
        Go to{" "}
        <RemixLink to="/settings?tab=instances">
          <Text component="span" c={linkTextColor}>
            Settings/Instances/API URL
          </Text>
        </RemixLink>{" "}
        and set your instances domain in the following format <Code>https://example.com</Code>
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["customSearXNG"] }}
        next={{ ...DOCS_CARD_DATA(theme)["i18n"] }}
      />
    </Container>
  );
};

export default DocsResourcesCustomKhoflyAPI;
