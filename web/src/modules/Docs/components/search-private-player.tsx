import { Code, Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconPlayerPlay } from "@tabler/icons-react";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";

const DocsSearchPrivatePlayer = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle leftSection={<IconPlayerPlay color={theme.colors.orange[5]} />}>
        Private Player
      </DocsTitle>

      <DocsSubtitle>Videos</DocsSubtitle>

      <DocsText>
        Works in <Code>Videos</Code> tab. Allows you to watch YouTube videos in Khofly by
        downloading the video on the server where API is located and serving it to the browser.
        Downloaded media is deleted after 1h to avoid filling up the <Code>/temp/media</Code> folder
        with too many large files.
      </DocsText>

      <DocsSubtitle>Music</DocsSubtitle>

      <DocsText>
        Works in <Code>Music</Code> tab. Allows you to listen YouTube music or audio from any video
        in Khofly by downloading the audio on the server where API is located and serving it to the
        browser. Downloaded media is deleted after 1h to avoid filling up the{" "}
        <Code>/temp/media</Code> folder with too many large files.
      </DocsText>

      <DocsSubtitle>Pros & Cons</DocsSubtitle>

      <DocsText>You can watch videos without any YouTube ads or trackers.</DocsText>

      <DocsText>Unfortunately this process can be slower for longer videos.</DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["privateSearch"] }}
        next={{ ...DOCS_CARD_DATA(theme)["setDefault"] }}
      />
    </Container>
  );
};

export default DocsSearchPrivatePlayer;
