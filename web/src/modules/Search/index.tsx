import { lazy } from "react";

import { useSearchParams } from "react-router";

import { ICategories } from "@store/settings";

import TabCommon from "./components/TabCommon";
const TabMapsWithoutSSR = lazy(() => import("./components/TabMaps"));

const PageSearch = () => {
  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "general";

  if (tab === "maps") {
    return <TabMapsWithoutSSR />;
  } else {
    return <TabCommon tab={tab as ICategories} />;
  }
};

export default PageSearch;
