import { Anchor, Divider, Flex, Image, Paper, Spoiler, Text } from "@mantine/core";
import type { ISearXNGResultsGeneral } from "@ts/searxng.types";

import classes from "./styles.module.scss";
import { usePrimaryColor } from "@hooks/use-primary-color";

const Infobox: React.FC<ISearXNGResultsGeneral["infoboxes"][0]> = ({
  img_src,
  infobox,
  content,
  urls,
}) => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <Paper className={classes.search_infobox} ml={80} withBorder radius="md">
      <Image src={img_src} radius="md" fit="contain" />

      <Flex p="md" direction="column">
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text size="sm">{content}</Text>
        </Spoiler>

        {urls?.length >= 1 && <Divider orientation="horizontal" my="sm" />}

        {urls?.length >= 1 &&
          urls.map((item, i) => (
            <Anchor key={i} href={item.url} target="_self" rel="noreferrer noopener">
              <Text c={linkTextColor}>{item.title}</Text>
            </Anchor>
          ))}
      </Flex>
    </Paper>
  );
};

export default Infobox;
