import classes from './styles.module.scss';
import { Group, Text } from '@mantine/core';

import clsx from 'clsx';
import { useTranslate } from '@hooks/translate/use-translate';
import { useLocation, useSearchParams } from 'react-router';
import { useSettingsStore } from '@store/settings';
import { HAS_SUPPORT } from '@utils/resources/hasSupport';
import type { DotNestedKeys, ITranslations } from '@ts/global.types';

import HeaderLogo from './components/HeaderLogo';
import SearchSection from '@module/Search/components/components/SearchSection';

import HeaderSearchSettings from './components/HeaderSearchSettings';
import HeaderOrganize from './components/HeaderOrganize';
import HeaderCode from './components/HeaderCode';
import HeaderIndexSettings from './components/HeaderIndexSettings';
// import HeaderIndexTools from './components/HeaderIndexTools';
import HeaderIndexChat from './components/HeaderIndexChat';
import HeaderAISettings from './components/HeaderAISettings';
import HeaderSupport from './components/HeaderSupport';

const Header = () => {
  const t = useTranslate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  const AIChat = useSettingsStore((state) => state.AIChat);

  const isChangelog = pathname.startsWith('/changelog');
  const isInstances = pathname.startsWith('/instances');
  const isSettings = pathname.startsWith('/settings');
  const isSupport = pathname.startsWith('/support');
  const isPrivacyScore = pathname.startsWith('/privacy-score');
  const isPrivacy = pathname.startsWith('/privacy');
  const isSearch = pathname.startsWith('/search');
  const isDocs = pathname.startsWith('/docs');
  const isChat = pathname.startsWith('/chat');

  const isIndex = pathname === '/';

  const ROUTE_MAP: { [key in string]: DotNestedKeys<ITranslations> } = {
    '/changelog': 'header.changelog',
    '/instances': 'header.instances',
    '/settings': 'header.settings',
    '/support': 'header.support',
    '/privacy-score': 'header.privacy_scan',
    '/privacy': 'header.privacy',
    '/search': 'header.search',
    '/docs': 'header.docs',
    '/chat': 'header.chat',
  };

  const matchedPath = Object.keys(ROUTE_MAP).find((path) => pathname.startsWith(path));
  const pageTitle = matchedPath ? ROUTE_MAP[matchedPath] : '';

  // If /search
  const tab = searchParams.get('tab') || 'general';

  return (
    <Group
      className={clsx(classes.header, {
        [classes.header_search]: pathname.startsWith('/search'),
      })}
      h='100%'
      px='md'
      pt='md'
      pb={pathname.startsWith('/search') ? 0 : 'md'}
      gap={0}
    >
      {/* Header: /search?q= */}
      {isSearch && <SearchSection />}

      {/* Header with title */}
      {(isDocs || isSettings || isChangelog || isPrivacy || isChat || isInstances || isSupport) && (
        <>
          <HeaderLogo
            hasBurger={isDocs}
            hasBack={isPrivacyScore}
            isChat={isChat}
            isSupport={isSupport}
            isPrivacyScore={isPrivacyScore}
          />
          <Text className={classes.header_title} ml='sm' fw={700}>
            / {pageTitle ? t(pageTitle) : ''}
          </Text>
        </>
      )}

      <div className={classes.divider} />

      {isIndex && AIChat.enabled && <HeaderIndexChat />}
      {/* {isIndex && <HeaderIndexTools />} */}
      {isIndex && <HeaderIndexSettings />}

      {isSearch && tab === 'general' && <HeaderOrganize />}
      {isSearch && <HeaderSearchSettings />}

      {isChat && <HeaderAISettings />}

      {isDocs && HAS_SUPPORT && <HeaderSupport />}
      {(isDocs || isChangelog || isSettings) && <HeaderCode />}
    </Group>
  );
};

export default Header;
