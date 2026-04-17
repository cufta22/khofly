import { ActionIcon, Burger, Flex, Image, useMantineTheme } from '@mantine/core';
import classes from './styles.module.scss';
import { IconChevronLeft, IconHeart, IconListSearch, IconMessage } from '@tabler/icons-react';
import { useGeneralStore } from '@store/general';
import InternalLink from '@components/Links/InternalLink';
import { useNavigate } from 'react-router';
import { getIconStyle } from '@utils/functions/iconStyle';

interface Props {
  hasBurger: boolean;
  hasBack: boolean;

  // For conditions
  isChat: boolean;
  isSupport: boolean;
  isPrivacyScore: boolean;
}

const HeaderLogo: React.FC<Props> = ({ hasBurger, hasBack, isChat, isSupport, isPrivacyScore }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const openNavbar = useGeneralStore((state) => state.openNavbar);
  const toggleOpenNavbar = useGeneralStore((state) => state.toggleOpenNavbar);

  return (
    <Flex align='center' gap='md'>
      {hasBurger && (
        <Burger
          opened={openNavbar}
          onClick={toggleOpenNavbar}
          // hiddenFrom={isChat ? "" : "sm"}
          size='md'
        />
      )}

      {hasBack && (
        <ActionIcon onClick={() => navigate(-1)} variant='subtle' size='lg' color='gray.2'>
          <IconChevronLeft style={getIconStyle(32)} />
        </ActionIcon>
      )}

      <InternalLink className={classes.link} to='/'>
        {/* <IconTriangleFilled style={getIconStyle(32)} /> */}

        {isChat ? (
          <IconMessage className={classes.header_logo} color={theme.colors.pink[5]} />
        ) : isSupport ? (
          <IconHeart className={classes.header_logo} color={theme.colors.red[5]} />
        ) : isPrivacyScore ? (
          <IconListSearch className={classes.header_logo} color={theme.colors.grape[5]} />
        ) : (
          <Image className={classes.header_logo} src='/assets/logo.svg' />
        )}
      </InternalLink>
    </Flex>
  );
};

export default HeaderLogo;
