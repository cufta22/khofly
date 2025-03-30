import { Center, Flex, Loader, Modal, Text, useMantineTheme } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import classes from "./styles.module.scss";
import useDownloadSWR from "src/api/download/use-download-query";
import { useEffect } from "react";

interface Props {
  url: string;
  onClose: () => void;
}

const PrivateVideoPlayer: React.FC<Props> = ({ url, onClose }) => {
  const { data, trigger, isMutating, reset } = useDownloadSWR({ shouldDownload: false });

  const theme = useMantineTheme();

  useEffect(() => {
    if (url && !isMutating) {
      trigger({
        format: "mp4",
        from: "youtube",
        url: url,
      });
    }
  }, [url]);

  return (
    <Modal
      opened={!!url}
      onClose={() => {
        reset();
        onClose();
      }}
      closeOnClickOutside={false}
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
      {data?.data.url ? (
        <video className={classes.media_player} controls>
          <source src={data?.data.url} type="video/mp4" />
          {/* <track kind="captions" /> */}
        </video>
      ) : (
        <Center className={classes.media_player} p="xl">
          <Loader size="xl" />
        </Center>
      )}
    </Modal>
  );
};

export default PrivateVideoPlayer;
