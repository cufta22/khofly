import { Anchor, Spoiler, Text } from "@mantine/core";
import React, { useEffect } from "react";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";

import classes from "./styles.module.scss";
import { IAWrapper } from "../../wrapper";
import { useSearchParams } from "@remix-run/react";
import { useSearchStore } from "@store/search";

interface Props {
  initialQ?: string;
}

const IALyrics: React.FC<Props> = ({ initialQ }) => {
  const [searchParams] = useSearchParams();

  const { data, trigger, isMutating } = useLyricsSWR();

  const { searchQuery } = useSearchStore((state) => ({
    searchQuery: state.searchQuery,
  }));

  const q = searchQuery || searchParams.get("q") || "";

  useEffect(() => {
    if (initialQ) {
      trigger(initialQ);
    }
  }, []);

  useEffect(() => {
    if (q && !initialQ) {
      trigger(q.replace("lyrics", ""));
    }
  }, [q]);

  if (!data?.title && !isMutating) return null;

  return (
    <IAWrapper
      className={classes.song_ia}
      label={
        <Text size="sm" c="dimmed">
          Lyrics provided by{" "}
          <Anchor href="https://genius.com" rel="noreferrer noopener">
            <Text component="span" c="blue.4">
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
