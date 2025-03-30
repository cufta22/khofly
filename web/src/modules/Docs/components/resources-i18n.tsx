import { Code, Container, useMantineTheme } from "@mantine/core";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsTitle from "./common/DocsTitle";
import { IconLanguage } from "@tabler/icons-react";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";

const DocsResourcesInternationalization = () => {
  const theme = useMantineTheme();

  const LanguageSelectString = "<LanguageSelect />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconLanguage color={theme.colors.blue[5]} />}>
        Internationalization
      </DocsTitle>

      <DocsSubtitle>1. Adding new language to Khofly</DocsSubtitle>

      <DocsText>
        Languages are saved in <Code>/public/locales</Code> in JSON files. These files need to be in
        sync with each other so every change made to one file needs to be added to every other file
        too.
      </DocsText>

      <DocsText>
        <Code>{LanguageSelectString}</Code> is located in{" "}
        <Code>/src/modules/Settings/components/Interface</Code> and will automatically set a cookie
        for the new language and refresh the page to apply the changes. <Code>LANG_DATA</Code> array
        stores all available languages just make sure that <Code>value</Code> prop matches with{" "}
        <Code>{`{value}.json`}</Code> in the public folder.
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["customSearXNG"] }}
        next={{ ...DOCS_CARD_DATA(theme)["siteData"] }}
      />
    </Container>
  );
};

export default DocsResourcesInternationalization;
