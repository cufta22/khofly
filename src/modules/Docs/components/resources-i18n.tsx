import { Code, Container, useMantineTheme } from "@mantine/core";
import WikiText from "./common/WikiText";
import WikiSubtitle from "./common/WikiSubtitle";
import WikiTitle from "./common/WikiTitle";
import { IconLanguage } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const DocsResourcesInternationalization = () => {
  const theme = useMantineTheme();

  const LanguageSelectString = "<LanguageSelect />";

  return (
    <Container size="lg" p="xl" pb={100}>
      <WikiTitle
        leftSection={
          <IconLanguage style={getIconStyle(48)} color={theme.colors.blue[5]} />
        }
      >
        Internationalization
      </WikiTitle>

      <WikiSubtitle>1. Adding new language to Khofly</WikiSubtitle>

      <WikiText>
        Languages are saved in <Code>/public/locales</Code> in JSON files. These
        files need to be in sync with each other so every change made to one
        file needs to be added to every other file too.
      </WikiText>

      <WikiText>
        <Code>{LanguageSelectString}</Code> is located in{" "}
        <Code>/src/modules/Settings/components/Interface</Code> and will
        automatically set a cookie for the new language and refresh the page to
        apply the changes. <Code>LANG_DATA</Code> array stores all available
        languages just make sure that <Code>value</Code> prop matches with{" "}
        <Code>{`{value}.json`}</Code> in the public folder.
      </WikiText>
    </Container>
  );
};

export default DocsResourcesInternationalization;
