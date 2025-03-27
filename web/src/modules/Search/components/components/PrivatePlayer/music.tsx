import { ActionIcon, Flex, Loader, Text, useMantineTheme } from "@mantine/core";

import classes from "./styles.module.scss";
import type { ISearXNGResultsMusic } from "@ts/searxng.types";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useEffect, useRef } from "react";
import useDownloadSWR from "src/api/download/use-download-query";

interface Props {
  musicData: ISearXNGResultsMusic["results"][0];
  onClose: () => void;
}

const PrivateMusicPlayer: React.FC<Props> = ({ musicData, onClose }) => {
  const { url, img_src, thumbnail, title } = musicData;
  const theme = useMantineTheme();

  const { data, trigger, isMutating } = useDownloadSWR({ shouldDownload: false });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (url && !isMutating) {
      trigger({
        format: "mp3",
        from: "youtube",
        url: url,
      });
    }
  }, [url]);

  return (
    <Flex className={classes.private_music_player} align="center" justify="space-between" p="md">
      <Flex className={classes.title_text} align="center">
        <IconPlayerPlay style={getIconStyle(36)} color={theme.colors.orange[5]} />

        <Text size="xl" ml="md">
          Private Player
        </Text>
      </Flex>

      {/* Audio element for player */}
      {isMutating ? (
        <Loader />
      ) : (
        <audio
          ref={audioRef}
          src={data?.data?.url || ""}
          controls
          className="w-full mt-2"
          title={title}
        />
      )}

      <Flex>
        <ActionIcon size="xl" variant="light" color="red.5" onClick={onClose}>
          <IconX />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default PrivateMusicPlayer;
