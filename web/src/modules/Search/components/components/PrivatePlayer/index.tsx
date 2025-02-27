import { Flex, Modal, Text, useMantineTheme } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import classes from "./styles.module.scss";

const PrivatePlayer = () => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={true}
      onClose={() => {}}
      size="60%"
      h={500}
      centered
      title={
        <Flex align="center" gap="sm">
          <IconPlayerPlay style={getIconStyle(32)} color={theme.colors.orange[5]} />
          <Text size="xl">Private Player</Text>
        </Flex>
      }
      closeButtonProps={{
        size: "lg",
      }}
    >
      <video className={classes.media_player} controls>
        <source
          src="https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4"
          type="video/mp4"
        />
        <track kind="captions" />
      </video>
    </Modal>
  );
};

export default PrivatePlayer;
