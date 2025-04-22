import { Blockquote, Code, Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconSparkles } from "@tabler/icons-react";
import DocsText from "./common/DocsText";
import DocsLink from "./common/DocsLink";
import DocsSubtitle from "./common/DocsSubtitle";

const Docs3rdPartyGemini = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconSparkles color={theme.colors.pink[5]} />}>
        AI Providers
      </DocsTitle>

      <Blockquote color="yellow" mt="xl" radius="sm">
        This applies only if you want to self-host Khofly API.
      </Blockquote>

      <DocsSubtitle>Google Gemini</DocsSubtitle>

      <DocsText>
        If you want to use any of Googles models you'll need to get an API key, you can get it
        <DocsLink href="https://aistudio.google.com/app/apikey" label="here" />. Copy that key and
        paste it in <Code>GEMINI_API_KEY</Code> in <Code>/api/.env.local</Code>.
      </DocsText>

      <DocsText>
        If <Code>GEMINI_API_KEY</Code> is set in API .env the provider option in AI Chat will become
        enabled, otherwise it will appear disabled.
      </DocsText>
    </Container>
  );
};

export default Docs3rdPartyGemini;
