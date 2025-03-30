import { Blockquote, Code, Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconMusic } from "@tabler/icons-react";
import DocsText from "./common/DocsText";
import DocsLink from "./common/DocsLink";
import DocsSubtitle from "./common/DocsSubtitle";

const Docs3rdPartyLyrics = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconMusic color={theme.colors.indigo[5]} />}>Song lyrics</DocsTitle>

      <Blockquote color="yellow" mt="xl" radius="sm">
        This applies only if you want to self-host Khofly API.
      </Blockquote>

      <DocsText>
        Genius Search API is used to find song data before lyrics are fetched. To use this API go to{" "}
        <DocsLink href="https://genius.com/api-clients" label="this link" /> , sign up, create new
        API Client and get your access token. Once you have the token paste in into APIs{" "}
        <Code>.env.local</Code> in <Code>GENIUS_ACCESS_TOKEN</Code>.
      </DocsText>
    </Container>
  );
};

export default Docs3rdPartyLyrics;
