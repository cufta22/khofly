import { Code, Container, List, Text, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconBracketsAngle } from "@tabler/icons-react";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";

const DocsSearchPrivatePlayer = () => {
  const linkTextColor = usePrimaryColor(4);

  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconBracketsAngle color={theme.colors.blue[5]} />}>
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

      <DocsText>
        To set category and/or engine names use a <Code>!</Code> prefix. To give a few examples:
      </DocsText>

      <List mt="sm">
        <List.Item>
          search in Wikipedia for <strong>paris</strong>
          <List>
            <List.Item>
              <RemixLink to={`$/search?q=!wp paris&tab=general`}>
                <Text c={linkTextColor}>!wp paris</Text>
              </RemixLink>
            </List.Item>
            <List.Item>
              <RemixLink to={`/search?q=!wikipedia paris&tab=general`}>
                <Text c={linkTextColor}>!wikipedia paris</Text>
              </RemixLink>
            </List.Item>
          </List>
        </List.Item>

        <List.Item>
          search in category <strong>map</strong> for <strong>paris</strong>
          <List>
            <List.Item>
              <RemixLink to={`/search?q=!maps paris&tab=maps`}>
                <Text c={linkTextColor}>!maps paris</Text>
              </RemixLink>
            </List.Item>
          </List>
        </List.Item>

        <List.Item>
          image search
          <List>
            <List.Item>
              <RemixLink to={`/search?q=!images Wau Holland&tab=images`}>
                <Text c={linkTextColor}>!images Wau Holland</Text>
              </RemixLink>
            </List.Item>
          </List>
        </List.Item>
      </List>

      <DocsText>
        Abbreviations of the engines and languages are also accepted. Engine/category modifiers are
        chain able and inclusive. E.g. with{" "}
        <RemixLink to={`/search?q=!maps !ddg !wp paris&tab=maps`}>
          <Text c={linkTextColor} component="span">
            !maps !ddg !wp paris
          </Text>
        </RemixLink>{" "}
        search in map category and DuckDuckGo and Wikipedia for <strong>paris</strong>.
      </DocsText>

      <DocsSubtitle>
        <Code fz={20}>:</Code> select language
      </DocsSubtitle>

      <DocsText>
        To select language filter use a <Code>:</Code> prefix. To give an example:
      </DocsText>

      <List mt="sm">
        <List.Item>
          search Wikipedia by a custom language
          <List>
            <List.Item>
              <RemixLink to={`/search?q=:fr !wp Wau Holland&tab=general`}>
                <Text c={linkTextColor}>:fr !wp Wau Holland</Text>
              </RemixLink>
            </List.Item>
          </List>
        </List.Item>
      </List>

      <DocsSubtitle>Special Queries</DocsSubtitle>

      <DocsText>
        In the{" "}
        <RemixLink to={`/docs/instant-answers`}>
          <Text c={linkTextColor} component="span">
            Instant Answers
          </Text>
        </RemixLink>{" "}
        section you can find full list of special queries that will give you automatic results.
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["IA"] }}
        next={{ ...DOCS_CARD_DATA(theme)["AI"] }}
      />
    </Container>
  );
};

export default DocsSearchPrivatePlayer;
