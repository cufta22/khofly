import { useResponsive } from "@hooks/use-responsive";
import { Anchor } from "@mantine/core";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";
import { IFC } from "@ts/global.types";
import React from "react";

interface Props extends IFC {
  url: string;
}

const SearchAnchor: React.FC<Props> = ({ url, children }) => {
  const updateVisitedLinks = useSearchStore((state) => state.updateVisitedLinks);
  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const isXs = useResponsive("max", "xs");

  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs ? "_blank" : openInNewTab ? "_blank" : "_self";

  return (
    <Anchor
      href={url}
      target={anchorTarget}
      onClick={() => updateVisitedLinks(url)}
      onAuxClick={(e) => {
        if (e.button === 1) {
          // Middle mouse button has been clicked! Do what you will with it...
          updateVisitedLinks(url);
        }
      }}
      rel="noreferrer noopener"
    >
      {children}
    </Anchor>
  );
};

export default SearchAnchor;
