import "@mantine/code-highlight/styles.css";

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
  }[page];

  return <>{docsPage || <DocsIndex />}</>;
};

export default Docs;
