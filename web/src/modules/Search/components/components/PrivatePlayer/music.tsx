import { ActionIcon, Flex, Loader, Text, useMantineTheme } from '@mantine/core';

import classes from './styles.module.scss';
import { IconPlayerPlay, IconX } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import { useEffect, useRef } from 'react';
import useDownloadSWR from 'src/api/download/use-download-query';
import { useSettingsStore } from '@store/settings';

const PrivateMusicPlayer = () => {
  const theme = useMantineTheme();

  const { data, trigger, isMutating } = useDownloadSWR({ shouldDownload: false });

  const audioRef = useRef<HTMLAudioElement>(null);

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);
  const setPrivatePlayer = useSettingsStore((state) => state.setPrivatePlayer);

  const { musicData } = privatePlayer;

  useEffect(() => {
    if (musicData?.url && !isMutating) {
      trigger({
        format: 'mp3',
        from: 'youtube',
        url: musicData?.url,
      });
    }
  }, [musicData]);

  if (!musicData) return null;

  return (
    <Flex className={classes.private_music_player} align='center' justify='space-between' p='md'>
      <Flex className={classes.title_text} align='center'>
        <IconPlayerPlay style={getIconStyle(36)} color={theme.colors.orange[5]} />

        <Text size='xl' ml='md'>
          Private Player
        </Text>
      </Flex>

      {/* Audio element for player */}
      {isMutating ? (
        <Loader />
      ) : data?.data?.url ? (
        <audio
          ref={audioRef}
          src={data?.data?.url || undefined}
          controls
          className='w-full mt-2'
          title={musicData?.title}
        />
      ) : null}

      <Flex>
        <ActionIcon
          size='xl'
          variant='light'
          color='red.5'
          onClick={() => {
            setPrivatePlayer({ musicData: null });
          }}
        >
          <IconX />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default PrivateMusicPlayer;
