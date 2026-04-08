import { ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import classes from '../styles.module.scss';
import RemixLink from '@components/RemixLink';

const HeaderSupport = () => {
  const theme = useMantineTheme();

  return (
    <RemixLink to='/support'>
      <ActionIcon
        className={classes.action_button}
        variant='subtle'
        color='red'
        size={rem(36)}
        ml='md'
      >
        <IconHeart style={getIconStyle(24)} color={theme.colors.red[5]} />
      </ActionIcon>
    </RemixLink>
  );
};

export default HeaderSupport;
