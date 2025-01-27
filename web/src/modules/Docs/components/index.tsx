import { Container, Grid, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import DocsCard from "./common/DocsCard";
import DocsText from "./common/DocsText";
import {
  IconLanguage,
  IconMessageCode,
  IconServer,
  IconShield,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsSubtitle from "./common/DocsSubtitle";
import { DOCS_CARD_DATA } from "./common/docsCardData";

const DocsIndex = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Khofly documentation</DocsTitle>

      <DocsText>
        Here you'll find all the important technical information regarding
        Khofly. Documentation is always being updated so if you notice any
        missing/wrong information make sure to report it either on GitHub or
        Discord.
      </DocsText>

      <DocsSubtitle>Getting started</DocsSubtitle>

      <DocsText>You can start by following any of the links below:</DocsText>

      <Grid gutter="lg" mt={50}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard {...DOCS_CARD_DATA(theme)["IA"]} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard {...DOCS_CARD_DATA(theme)["i18n"]} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard {...DOCS_CARD_DATA(theme)["privateSearch"]} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard {...DOCS_CARD_DATA(theme)["selfHostSearXNG"]} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DocsIndex;
