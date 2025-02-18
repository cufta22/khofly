import { Anchor, Spoiler, Text } from "@mantine/core";
import React, { useEffect } from "react";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";

import classes from "./styles.module.scss";
import { IAWrapper } from "../../wrapper";
import { useInstanceStore } from "@store/instance";
import useSearchQuery from "@hooks/use-search-query";
import { usePrimaryColor } from "@hooks/use-primary-color";

interface Props {
  initialQ?: string;
}

const IALyrics: React.FC<Props> = ({ initialQ }) => {
  const { data, mutate } = useLyricsSWR({ initialQ });

  const hydrated = useInstanceStore((state) => state.hydrated);

  const q = useSearchQuery();

  const linkTextColor = usePrimaryColor(4);

  useEffect(() => {
    // Trigger for initialQ ( for Docs )
    if (initialQ && hydrated) mutate();

    // Trigger for query change
    if (q && !initialQ && hydrated) mutate();
  }, [q, hydrated]);

  return (
    <IAWrapper
      className={classes.song_ia}
      label={
        <Text size="sm" c="dimmed">
          Lyrics provided by{" "}
          <Anchor href="https://genius.com" rel="noreferrer noopener">
            <Text component="span" c={linkTextColor}>
              Genius
            </Text>
          </Anchor>
        </Text>
      }
    >
      {data && (
        <Spoiler maxHeight={170} showLabel="Show more" hideLabel="Hide">
          <Text className={classes.song_title} fz={22} fw={600}>
            {data.title}
          </Text>
          <Text size="md" mb="xl">
            {data.artist}
          </Text>

          <Text className={classes.song_lyrics}>{data?.lyrics}</Text>
        </Spoiler>
      )}
    </IAWrapper>
  );
};

export default IALyrics;
