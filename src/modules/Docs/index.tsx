import { useParams } from "@remix-run/react";

import DocsIndex from "./components";
import DocsWIP from "./components/wip";

import DocsSearchInstantAnswer from "./components/search-instant-answer";
import DocsSearchPrivateSearch from "./components/search-private-search";

import DocsResourcesSetDefault from "./components/resources-set-default";
import DocsResourcesCustomSearxng from "./components/resources-custom-searxng";
import DocsResourcesInternationalization from "./components/resources-i18n";

import DocsSelfHostSearxng from "./components/self-host-searxng";
import DocsSelfHostKhofly from "./components/self-host-khofly";
import DocsResourcesSiteData from "./components/resources-site-data";
import Docs3rdPartyWeather from "./components/3rdparty-weather";
import Docs3rdPartyCurrency from "./components/3rdparty-currency";
import DocsSelfHostOXR from "./components/self-host-oxr";

const Docs = () => {
  const params = useParams();

  const page = params.page;

  // Basic first redirect
  if (!page) return <DocsIndex />;

  const docsPage = {
    "instant-answers": <DocsSearchInstantAnswer />,
    "private-search": <DocsSearchPrivateSearch />,

    "set-default": <DocsResourcesSetDefault />,
    "custom-searxng": <DocsResourcesCustomSearxng />,
    internationalization: <DocsResourcesInternationalization />,
    "site-data": <DocsResourcesSiteData />,

    "self-host-searxng": <DocsSelfHostSearxng />,
    "self-host-khofly": <DocsSelfHostKhofly />,
    "self-host-oxr-api": <DocsSelfHostOXR />,

    "3rd-party-weather": <Docs3rdPartyWeather />,
    "3rd-party-currency": <Docs3rdPartyCurrency />,
  }[page];

  return <>{docsPage || <DocsIndex />}</>;
};

export default Docs;
