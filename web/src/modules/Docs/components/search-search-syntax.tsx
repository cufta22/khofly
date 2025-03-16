import { Code, Container, Text, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconBracketsAngle, IconPlayerPlay } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";

const DocsSearchPrivatePlayer = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={<IconBracketsAngle style={getIconStyle(48)} color={theme.colors.blue[5]} />}
      >
        Search Syntax
      </DocsTitle>

      <DocsSubtitle>Search syntax</DocsSubtitle>

      <DocsText>
        SearXNG comes with a search syntax by with you can modify the categories, engines, languages
        and more. See the preferences for the list of engines, categories and languages.
      </DocsText>

      <DocsSubtitle>
        <Code fz={20}>!</Code> select engine and category
      </DocsSubtitle>

      <DocsSubtitle>
        <Code fz={20}>:</Code> select language
      </DocsSubtitle>

      <DocsSubtitle>
        <Code fz={20}>{`!!<bang>`}</Code> external bangs
      </DocsSubtitle>

      <DocsSubtitle>
        <Code fz={20}>!!</Code> automatic redirect
      </DocsSubtitle>

      <DocsSubtitle>Special Queries</DocsSubtitle>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["IA"] }}
        next={{ ...DOCS_CARD_DATA(theme)["AI"] }}
      />
    </Container>
  );
};

export default DocsSearchPrivatePlayer;
