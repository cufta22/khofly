import { ActionIcon, Container, Text, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconSearch, IconSparkles } from "@tabler/icons-react";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import RemixLink from "@components/RemixLink";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import { usePrimaryColor } from "@hooks/use-primary-color";

const DocsSearchAIAnswers = () => {
  const theme = useMantineTheme();

  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconSparkles color={theme.colors.pink[5]} />}>AI Answers</DocsTitle>

      <DocsText>
        AI Answers will appear at the top of the search results when you click on the{" "}
        <ActionIcon size="md" color="pink.5" variant="subtle">
          <IconSparkles />
        </ActionIcon>{" "}
        instead of{" "}
        <ActionIcon size="md" color="blue.5" variant="subtle">
          <IconSearch />
        </ActionIcon>{" "}
        in any search bar. These answers can help when simple answer is needed so that the user
        doesn't have to click through links.
      </DocsText>

      <DocsText>
        Although most of the time the information will be accurate, it is still AI and can give out
        wrong answers so don't take these answers as facts.
      </DocsText>

      <DocsSubtitle>Cloudflare AI Workers</DocsSubtitle>

      <DocsText>
        Cloudflare Workers offer a lot of models for you to try out and can be very useful for this
        purpose.
      </DocsText>

      <DocsText>
        Check out how to deploy your AI worker and use it with Khofly{" "}
        <RemixLink to="/docs/self-host-ai-worker">
          <Text c={linkTextColor} component="span">
            here
          </Text>
        </RemixLink>
        .
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["IA"] }}
        next={{ ...DOCS_CARD_DATA(theme)["privateSearch"] }}
      />
    </Container>
  );
};

export default DocsSearchAIAnswers;
