import {
  ActionIcon,
  Anchor,
  Button,
  Code,
  Container,
  Flex,
  List,
  useMantineTheme,
} from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconAppWindow, IconBrandGithub, IconDots } from "@tabler/icons-react";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import RemixLink from "@components/RemixLink";
import { useInstanceStore } from "@store/instance";

const DocsSearchPrivateView = () => {
  const theme = useMantineTheme();

  const pvDomain = useInstanceStore((state) => state.pvDomain);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconAppWindow color={theme.colors.indigo[5]} />}>
        Private View
      </DocsTitle>

      <DocsSubtitle>What is it</DocsSubtitle>

      <DocsText>
        Private View is a full website proxy. That includes the initial html document and all other
        assets that are fetched after it.
      </DocsText>

      <DocsText>
        To access it first enable it in settings then on any row in /search click{" "}
        <ActionIcon size="md" color="blue.5" variant="subtle">
          <IconDots />
        </ActionIcon>{" "}
        and then{" "}
        <Button
          size="sm"
          variant="subtle"
          color="gray"
          leftSection={<IconAppWindow color={theme.colors.indigo[5]} />}
        >
          Private View
        </Button>
      </DocsText>

      <DocsSubtitle>Usage</DocsSubtitle>

      <DocsText>
        You can use PV as a standalone app by visiting this URL{" "}
        <Code>{`${pvDomain}/proxy/page?url=*`}</Code> where the <Code>*</Code> is the full URL of
        the website that you want to visit. You can also use it in an iframe and embed into any
        website that you want.
      </DocsText>

      <DocsSubtitle>How it works - technical stuff</DocsSubtitle>

      <DocsText>1. The initial request to fetch the page document</DocsText>

      <DocsText>
        API url: <Code>{`${pvDomain}/proxy/page?url=*`}</Code>
      </DocsText>

      <DocsText>There's a lot of work that needs to be done here:</DocsText>

      <List mt="md" withPadding>
        <List.Item>
          Rewrite all <Code>{`<a>`}</Code> tag hrefs with{" "}
          <Code>{`${process.env.HOST}/pv/proxy?url=*`}</Code>
        </List.Item>

        <List.Item>
          Rewrite all <Code>{`<script>`}</Code> tag src attributes to{" "}
          <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
        </List.Item>

        <List.Item>
          Rewrite all <Code>{`<style>`}</Code> tag ( embedded css ) <Code>{`url()`}</Code> to{" "}
          <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
        </List.Item>

        <List.Item>
          Rewrite all <Code>{`[style]`}</Code> attributes ( inline styles ) <Code>{`url()`}</Code>{" "}
          to <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
        </List.Item>

        <List.Item>
          Rewrite all <Code>{`<img>`}</Code> tag src attributes to{" "}
          <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
        </List.Item>

        <List.Item>
          Rewrite all <Code>{`<link[rel="*"]>`}</Code> tag href attributes to{" "}
          <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
        </List.Item>
      </List>

      <DocsText>
        <Code>{`{uuid}`}</Code> is saved as key-value for every unique domain since websites
        sometimes load assets from external URLs, CDNs, etc.
      </DocsText>

      <DocsText>2. Assets that are fetched after the initial document loads</DocsText>

      <DocsText>
        API url: <Code>{`${pvDomain}/proxy/{uuid}/{assetPath}`}</Code>
      </DocsText>

      <DocsText>Here we need to handle different asset types:</DocsText>

      <List mt="md" withPadding>
        <List.Item>
          Handle with <Code>{`response.arrayBuffer()`}</Code> for{" "}
          <Code>content-type = font | application/octet-stream</Code> ( icons, fonts )
        </List.Item>

        <List.Item>
          Handle with <Code>{`response.text()`}</Code> for{" "}
          <Code>content-type = application/javascript | text/javascript</Code> ( JS files )
        </List.Item>

        <List.Item>
          Handle with <Code>{`response.json()`}</Code> for{" "}
          <Code>content-type = application/json</Code> ( JSON files )
        </List.Item>
      </List>

      <Flex mt="xl" align="center" justify="center" gap="lg">
        <Anchor
          href="https://github.com/cufta22/khofly/tree/staging/pv"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Button size="lg" leftSection={<IconBrandGithub />} color="dark.9">
            PV Source code
          </Button>
        </Anchor>

        <RemixLink to="/pv/proxy?url=https://en.wikipedia.org/wiki/Cat" target="_blank">
          <Button
            size="lg"
            leftSection={<IconAppWindow color={theme.colors.indigo[5]} />}
            color="dark.9"
          >
            PV Example
          </Button>
        </RemixLink>
      </Flex>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["privateSearch"] }}
        next={{ ...DOCS_CARD_DATA(theme)["setDefault"] }}
      />
    </Container>
  );
};

export default DocsSearchPrivateView;
