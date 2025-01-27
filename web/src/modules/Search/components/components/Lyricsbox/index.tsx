import { Anchor, Divider, Flex, Image, Paper, Spoiler, Text } from "@mantine/core";
import { useEffect } from "react";

import classes from "./styles.module.scss";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";
import useSearchQuery from "@hooks/use-search-query";
import { useInstanceStore } from "@store/instance";
import { useSearchParams } from "react-router";

const Lyricsbox = () => {
  const [searchParams] = useSearchParams();

  const { data, mutate } = useLyricsSWR({ initialQ: "" });

  const hydrated = useInstanceStore((state) => state.hydrated);

  const q = useSearchQuery();
  const tab = searchParams.get("tab") || "general";

  useEffect(() => {
    // Handle for music tab
    if (tab === "music" && q && hydrated) mutate();

    // Handle for general tab
    if (q && q.includes("lyrics") && hydrated) mutate();
  }, [q, hydrated]);

  if (!data?.title) return null;

  return (
    <Paper className={classes.search_lyricsbox} ml={80} withBorder radius="md">
      <Flex p="md" direction="column">
        <Flex direction="row" align="flex-start" gap="md" mb="xl">
          <Image src={data.image} w={60} h={60} radius="md" fit="contain" />

          <Flex className={classes.top_part} direction="column">
            <Text className={classes.song_title} fz={22} fw={600} truncate="end">
              {data.title}
            </Text>

            <Text size="md" truncate="end">
              {data.artist}
            </Text>
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
