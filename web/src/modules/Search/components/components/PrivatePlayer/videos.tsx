import { Center, Flex, Loader, Modal, Text, useMantineTheme } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import classes from './styles.module.scss';
import useDownloadSWR from 'src/api/download/use-download-query';
import { useEffect } from 'react';
import { useSettingsStore } from '@store/settings';
import { useResponsive } from '@hooks/use-responsive';

const PrivateVideoPlayer = () => {
  const { data, trigger, isMutating, reset } = useDownloadSWR({ shouldDownload: false });

  const theme = useMantineTheme();

  const isMobile = useResponsive('max', 'sm');

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);
  const setPrivatePlayer = useSettingsStore((state) => state.setPrivatePlayer);
  const { videoData } = privatePlayer;

  useEffect(() => {
    if (videoData?.url && !isMutating) {
      trigger({
        format: 'mp4',
        from: 'youtube',
        url: videoData?.url,
      });
    }
  }, [videoData]);

  if (!videoData) return null;

  return (
    <Modal
      withinPortal={true}
      opened={!!videoData?.url}
      onClose={() => {
        reset();
        setPrivatePlayer({ videoData: null });
      }}
      closeOnClickOutside={false}
      size={isMobile ? '90%' : '60%'}
      centered
      title={
        <Flex align='center' gap='sm'>
          <IconPlayerPlay style={getIconStyle(32)} color={theme.colors.orange[5]} />
          <Text size='xl'>Private Player</Text>
        </Flex>
      }
      closeButtonProps={{
        size: 'lg',
      }}
    >
      {isMutating ? (
        <Center className={classes.media_player} p='xl'>
          <Loader size='xl' />
        </Center>
      ) : data?.error && !data?.data?.url ? (
        <Center className={classes.media_player} p='xl'>
          <Text>Download failed</Text>
        </Center>
      ) : (
        <video className={classes.media_player} controls>
          <source src={data?.data.url} type='video/mp4' />
          {/* <track kind="captions" /> */}
        </video>
      )}
    </Modal>
  );
};

export default PrivateVideoPlayer;
