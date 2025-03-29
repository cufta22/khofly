import { Container, Tabs, useMantineTheme } from "@mantine/core";

import DocsTitle from "./common/DocsTitle";
import DocsNextPrev from "./common/DocsNextPrev";
import { DOCS_CARD_DATA } from "./common/docsCardData";
import { IconBrandCloudflare, IconMusic, IconSparkles } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import SectionAIWorker from "./components/self-host-cf-workers/SectionAIWorker";
import SectionLyricsWorker from "./components/self-host-cf-workers/SectionLyricsWorker";

const DocsSelfHostCFWorkers = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconBrandCloudflare color={theme.colors.orange[5]} />}>
        Cloudflare Workers
      </DocsTitle>

      <Tabs variant="default" defaultValue="ai" keepMounted={false}>
        <Tabs.List className={classes.tabs_scroll}>
          <Tabs.Tab
            value="ai"
            leftSection={
              <IconSparkles style={{ ...getIconStyle(28), color: theme.colors.pink[5] }} />
            }
            fz={15}
          >
            AI Worker
          </Tabs.Tab>
          <Tabs.Tab
            value="lyrics"
            leftSection={
              <IconMusic style={{ ...getIconStyle(28), color: theme.colors.indigo[5] }} />
            }
            fz={15}
          >
            Lyrics Worker
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ai">
          <SectionAIWorker />
        </Tabs.Panel>
        <Tabs.Panel value="lyrics">
          <SectionLyricsWorker />
        </Tabs.Panel>
      </Tabs>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["selfHostSearXNG"] }}
        next={{ ...DOCS_CARD_DATA(theme)["selfHostKhofly"] }}
      />
    </Container>
  );
};

export default DocsSelfHostCFWorkers;
