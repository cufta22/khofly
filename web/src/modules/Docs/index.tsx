import DocsIndex from "./components";
import DocsWIP from "./components/wip";
import { useParams } from "react-router";

import DocsSearchSearchSyntax from "./components/search-search-syntax";
import DocsSearchInstantAnswer from "./components/search-instant-answer";
import DocsSearchAIAnswers from "./components/search-ai-answers";
import DocsSearchPrivateSearch from "./components/search-private-search";
import DocsSearchPrivatePlayer from "./components/search-private-player";

import DocsResourcesSetDefault from "./components/resources-set-default";
import DocsResourcesCustomSearxng from "./components/resources-custom-searxng";
import DocsResourcesInternationalization from "./components/resources-i18n";
import DocsResourcesSiteData from "./components/resources-site-data";

import DocsSelfHostSearxng from "./components/self-host-searxng";
import DocsSelfHostAiWorker from "./components/self-host-ai-worker";
import DocsSelfHostKhofly from "./components/self-host-khofly";
import DocsSelfHostKhoflyAPI from "./components/self-host-khofly-api";

import Docs3rdPartyWeather from "./components/3rdparty-weather";
import Docs3rdPartyCurrency from "./components/3rdparty-currency";

const Docs = () => {
  const params = useParams();

  const page = params.page;

  // Basic first redirect
  if (!page) return <DocsIndex />;

  const docsPage = {
    "search-syntax": <DocsSearchSearchSyntax />,
    "instant-answers": <DocsSearchInstantAnswer />,
    "ai-answers": <DocsSearchAIAnswers />,
    "private-search": <DocsSearchPrivateSearch />,
    "private-player": <DocsSearchPrivatePlayer />,

    "set-default": <DocsResourcesSetDefault />,
    "custom-searxng": <DocsResourcesCustomSearxng />,
    internationalization: <DocsResourcesInternationalization />,
    "site-data": <DocsResourcesSiteData />,

    "self-host-searxng": <DocsSelfHostSearxng />,
    "self-host-ai-worker": <DocsSelfHostAiWorker />,
    "self-host-khofly": <DocsSelfHostKhofly />,
    "self-host-khofly-api": <DocsSelfHostKhoflyAPI />,

    "3rd-party-weather": <Docs3rdPartyWeather />,
    "3rd-party-currency": <Docs3rdPartyCurrency />,
  }[page];

  return <>{docsPage || <DocsIndex />}</>;
};

export default Docs;
