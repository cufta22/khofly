import {
  Anchor,
  Divider,
  Flex,
  Image,
  Paper,
  Spoiler,
  Text,
} from "@mantine/core";
import { useEffect } from "react";

import classes from "./styles.module.scss";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";
import { useSearchParams } from "@remix-run/react";

const Lyricsbox = () => {
  const [searchParams] = useSearchParams();

  const { data, trigger } = useLyricsSWR();

  const q = searchParams.get("q");

  useEffect(() => {
    const q = searchParams.get("q");

    if (q && q.includes("lyrics")) trigger(q.replace("lyrics", ""));
  }, [q]);

  if (!data || !q?.includes("lyrics")) return null;

  return (
    <Paper
      className={classes.search_lyricsbox}
      mt="xl"
      ml={80}
      mr={80}
      withBorder
      radius="md"
    >
      <Flex p="md" direction="column">
        <Flex direction="row" align="flex-start" gap="md" mb="xl">
          <Image src={data.image} w={60} h={60} radius="md" fit="contain" />

          <Flex direction="column">
            <Text
              className={classes.song_title}
              fz={22}
              fw={600}
              lineClamp={1}
              truncate="end"
            >
              {data.title}
            </Text>
            <Text size="md">{data.artist}</Text>
          </Flex>
        </Flex>

        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text className={classes.song_lyrics} size="sm">
            {data?.lyrics}
          </Text>
        </Spoiler>

        <Divider orientation="horizontal" my="sm" />

        <Text size="sm" c="dimmed">
          Lyrics provided by{" "}
          <Anchor href="https://genius.com" rel="noreferrer noopener">
            <Text component="span" c="blue.4">
              Genius
            </Text>
          </Anchor>
        </Text>
      </Flex>
    </Paper>
  );
};

export default Lyricsbox;
