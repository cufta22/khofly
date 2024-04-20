import { lazy } from "react";

import TabGeneral from "./components/TabGeneral";
import TabImages from "./components/TabImages";
import TabVideos from "./components/TabVideos";
import TabNews from "./components/TabNews";
import { useSearchParams } from "@remix-run/react";
import { useMounted } from "@mantine/hooks";

const TabMapsWithoutSSR = lazy(() => import("./components/TabMaps"));

const PageSearch = () => {
  const mounted = useMounted();

  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "general";

  // Render tab
  const renderTab = {
    general: <TabGeneral />,
    images: <TabImages />,
    videos: <TabVideos />,
    news: <TabNews />,
    maps: mounted ? <TabMapsWithoutSSR /> : null,

    // WIP
    music: null,
    it: null,
    science: null,
    files: null,
    social_media: null,
  }[tab];

  return renderTab;
};

export default PageSearch;
