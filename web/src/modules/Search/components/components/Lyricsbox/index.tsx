import { Anchor, Divider, Flex, Image, LoadingOverlay, Paper, Spoiler, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useInstanceStore } from "@store/instance";
import { useEffect } from "react";
import useSearchQuery from "@hooks/use-search-query";

const Lyricsbox: React.FC = () => {
  const { data, mutate, isLoading, isValidating } = useLyricsSWR({ initialQ: "" });

  const linkTextColor = usePrimaryColor(4);

  const hydrated = useInstanceStore((state) => state.hydrated);

  const q = useSearchQuery();

  useEffect(() => {
    // Handle for general & music tab
    if (q?.includes("lyrics") && hydrated) mutate();
  }, [hydrated]);

  if (!data?.title || !q.includes("lyrics")) return null;

  return (
    <Paper className={classes.search_lyricsbox} ml={80} withBorder radius="md">
      <LoadingOverlay visible={isLoading || isValidating} />

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
            <Text component="span" c={linkTextColor}>
              Genius
            </Text>
          </Anchor>
        </Text>
      </Flex>
    </Paper>
  );
};

export default Lyricsbox;
