import { Container, Text, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconShield } from "@tabler/icons-react";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import RemixLink from "@components/RemixLink";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import { usePrimaryColor } from "@hooks/use-primary-color";

const DocsSearchPrivateSearch = () => {
  const theme = useMantineTheme();

  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconShield color={theme.colors.green[5]} />}>
        Private Search
      </DocsTitle>

      <DocsText>
        TL;DR this just moves the search query data from URL to local state and removes query from
        title.
      </DocsText>

      <DocsSubtitle>Pros & Cons</DocsSubtitle>

      <DocsText>
        You gain better privacy because no search data will be sent to hosting service or saved in
        browser since the search query lives in state and not in a URL parameter.
      </DocsText>

      <DocsText>
        Drawback is slightly worse user experience, since no data is saved in the URL you will lose
        your search on refresh.
      </DocsText>

      <DocsText>
        For complete privacy you should also setup your own SearXNG instance since the search data
        is still sent to the default one, full guide{" "}
        <RemixLink to="/docs/self-host-searxng">
          <Text component="span" c={linkTextColor}>
            here
          </Text>
        </RemixLink>
        .
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["AI"] }}
        next={{ ...DOCS_CARD_DATA(theme)["privatePlayer"] }}
      />
    </Container>
  );
};

export default DocsSearchPrivateSearch;
