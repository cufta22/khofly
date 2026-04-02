import { useResponsive } from '@hooks/use-responsive';
import { Anchor } from '@mantine/core';
import { useSearchStore } from '@store/search';
import { useSettingsStore } from '@store/settings';
import type { IFC } from '@ts/global.types';
import React from 'react';
import classes from './styles.module.scss';

interface Props extends IFC {
  url: string;
  updateVisited?: boolean;
  additionalOnClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const SearchAnchor: React.FC<Props> = ({
  url,
  children,
  updateVisited = true,
  additionalOnClick,
}) => {
  const updateVisitedLinks = useSearchStore((state) => state.updateVisitedLinks);
  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const isXs = useResponsive('max', 'xs');

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? '_blank'
    : openInNewTab
      ? '_blank'
      : '_self';

  return (
    <Anchor
      className={classes.search_anchor}
      href={url}
      target={anchorTarget}
      onClick={(e) => {
        if (updateVisited) updateVisitedLinks(url);

        if (additionalOnClick) additionalOnClick(e);
      }}
      onAuxClick={(e) => {
        if (e.button === 1) {
          // Middle mouse button has been clicked! Do what you will with it...
          updateVisitedLinks(url);
        }
      }}
      rel='noreferrer noopener'
    >
      {children}
    </Anchor>
  );
};

export default SearchAnchor;
