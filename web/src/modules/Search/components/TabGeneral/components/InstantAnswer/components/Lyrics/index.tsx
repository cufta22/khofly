import { Anchor, LoadingOverlay, Spoiler, Text } from "@mantine/core";
import useLyricsSWR from "src/api/lyrics/use-lyrics-query";

import classes from "./styles.module.scss";
import { IAWrapper } from "../../wrapper";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useEffect } from "react";
import { useInstanceStore } from "@store/instance";
import useSearchQuery from "@hooks/use-search-query";

interface Props {
  initialQ?: string;
}

const IALyrics: React.FC<Props> = ({ initialQ }) => {
  const { data: dataLyrics, mutate, isLoading, isValidating } = useLyricsSWR({ initialQ });

  const hydrated = useInstanceStore((state) => state.hydrated);

  const linkTextColor = usePrimaryColor(4);

  const q = useSearchQuery();

  const queryToUse = initialQ || q;

  useEffect(() => {
    if (dataLyrics?.data || isLoading || isValidating) return;

    // Trigger for query change
    if (queryToUse?.includes("lyrics") && hydrated) mutate();
  }, [hydrated]);

  if (!dataLyrics?.data?.title || !queryToUse.includes("lyrics")) return null;

  return (
    <IAWrapper
      className={initialQ ? classes.song_ia_docs : classes.song_ia}
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
      <LoadingOverlay visible={isLoading || isValidating} />

      {dataLyrics?.data && (
        <Spoiler maxHeight={170} showLabel="Show more" hideLabel="Hide">
          <Text className={classes.song_title} fz={22} fw={600}>
            {dataLyrics?.data?.title}
          </Text>
          <Text size="md" mb="xl">
            {dataLyrics?.data?.artist}
          </Text>

          <Text className={classes.song_lyrics}>{dataLyrics?.data?.lyrics}</Text>
        </Spoiler>
      )}
    </IAWrapper>
  );
};

export default IALyrics;
