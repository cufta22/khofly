import {
  Blockquote,
  Code,
  Container,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import RemixLink from "@components/RemixLink";
import DocsTitle from "./common/DocsTitle";
import DocsCodeHighlightTabs from "./common/DocsCodeHighlight/DocsCodeHighlightTabs";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import { IconSearch } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const CODE_SEARXNG_CONFIG = `
search:
  formats:
    - html
    - json # add this

server:
  secret_key: "sercet" # make sure to change this
`;

const DocsResourcesCustomSearxng = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={
          <IconSearch style={getIconStyle(48)} color={theme.colors.blue[5]} />
        }
      >
        Custom SearXNG instance
      </DocsTitle>

      <Blockquote
        color="blue"
        // cite="- https://docs.searxng.org/"
        mt="xl"
        radius="sm"
      >
        This page will show you settings that you need if you want to use your
        own SearXNG instance with Khofly. If you don't have your own SearXNG
        instance hosted check out{" "}
        <RemixLink to="/docs/self-host-searxng">
          <Text component="span" c="blue.4">
            the hosting guide
          </Text>
        </RemixLink>
        .
      </Blockquote>

      <DocsSubtitle>
        1. Change settings yaml to include the following changes
      </DocsSubtitle>

      <DocsText>
        Add output format <Code>json</Code>, this will allow you to use the
        search as API and return a JSON response, and make sure to set a long
        randomly generated string for server secret ( ex. run{" "}
        <Code>openssl rand -hex 32</Code> )
      </DocsText>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlightTabs
          code={[
            {
              code: CODE_SEARXNG_CONFIG,
              language: "yaml",
              fileName: "/etc/searxng/settings.yml",
            },
          ]}
        />
      </Paper>

      <DocsText>
        After this change restart your SearXNG instance with{" "}
        <Code>sudo service uwsgi restart searxng</Code>
      </DocsText>

      <DocsSubtitle>2. Add your instance to Khofly</DocsSubtitle>

      <DocsText>
        Go to Settings/Instances/SearXNG Domain and set your instances domain in
        the following format <Code>https://domain.com</Code>
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["setDefault"] }}
        next={{ ...DOCS_CARD_DATA(theme)["i18n"] }}
      />
    </Container>
  );
};

export default DocsResourcesCustomSearxng;
