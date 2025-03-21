import { ActionIcon, Center, Flex, Image, Paper, Text, useMantineTheme } from "@mantine/core";

import classes from "./styles.module.scss";
import type { ISearXNGResultsMusic } from "@ts/searxng.types";
import { IconPlayerPlay, IconVinyl, IconX } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

interface Props {
  musicData: ISearXNGResultsMusic["results"][0];
  onClose: () => void;
}

const PrivateMusicPlayer: React.FC<Props> = ({ musicData, onClose }) => {
  const { url, img_src, thumbnail, title } = musicData;
  const theme = useMantineTheme();

  return (
    <Flex className={classes.private_music_player} align="center" justify="space-between" p="md">
      <Flex align="center">
        <ActionIcon size="xl" variant="light" color="orange.5">
          <IconPlayerPlay />
        </ActionIcon>

        <Text size="xl" ml="md">
          Private Player
        </Text>
      </Flex>

      <Flex>
        {img_src || thumbnail ? (
          <Image className={classes.music_img} src={img_src || thumbnail} radius="md" />
        ) : (
          <Paper className={classes.music_img}>
            <Center h="100%">
              <IconVinyl style={getIconStyle(46)} />
            </Center>
          </Paper>
        )}
        <Flex direction="column" ml="md">
          <Text>{title}</Text>
        </Flex>
      </Flex>

      <Flex>
        <ActionIcon size="xl" variant="light" color="red.5" onClick={onClose}>
          <IconX />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default PrivateMusicPlayer;
