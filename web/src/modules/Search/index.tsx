import { lazy } from "react";

import { useSearchParams } from "react-router";
import { useMounted } from "@mantine/hooks";

import TabGeneral from "./components/TabGeneral";
import TabImages from "./components/TabImages";
import TabVideos from "./components/TabVideos";
import TabNews from "./components/TabNews";
import TabMusic from "./components/TabMusic";
import TabIT from "./components/TabIT";
import TabScience from "./components/TabScience";
import TabFiles from "./components/TabFiles";
import TabSocialMedia from "./components/TabSocialMedia";

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
    music: <TabMusic />,
    it: <TabIT />,
    science: <TabScience />,
    files: <TabFiles />,
    social_media: <TabSocialMedia />,
  }[tab];

  return renderTab;
};

export default PageSearch;
