export interface IHoverData {
  description: string;
  linkUrl: string;
  wikiUrl: string;
  bangsEngine: string[];
  bangsCategory: string[];
}

export const HOVER_DATA: { [key in string]: IHoverData } = {
  // -------------------------------------------------------------------------------------------------------------------------------
  // WEB
  // -------------------------------------------------------------------------------------------------------------------------------
  bing: {
    description:
      "Microsoft Bing, commonly referred to as Bing, is a web search engine owned and operated by Microsoft. The service traces its roots back to Microsoft's earlier search engines, including MSN Search, Windows Live Search, and Live Search. Bing offers a broad spectrum of search services, encompassing web, video, image, and map search products, all developed using ASP.NET. (Source: wikipedia)",
    linkUrl: "https://www.bing.com",
    wikiUrl: "wikidata.org/wiki/Q182496",
    bangsEngine: ["!bing", "!bi"],
    bangsCategory: ["!general", "!web"],
  },
  brave: {
    description:
      "Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. Brave is a privacy-focused browser, which automatically blocks most advertisements and website trackers in its default settings. Users can turn on optional ads that reward them for their attention in the form of Basic Attention Tokens (BAT), which can be used as a cryptocurrency or to make payments to registered websites and content creators. (Source: wikipedia)",
    linkUrl: "https://search.brave.com/",
    wikiUrl: "wikidata.org/wiki/Q22906900",
    bangsEngine: ["!brave", "!br"],
    bangsCategory: ["!general", "!web"],
  },
  duckduckgo: {
    description:
      "DuckDuckGo is an American software company that offers a number of software products oriented towards helping people protect their privacy online. The company also provides a private search engine, a tracker-blocking browser extension, email protection, and app tracking protection. (Source: wikipedia)",
    linkUrl: "https://duckduckgo.com/",
    wikiUrl: "wikidata.org/wiki/Q12805",
    bangsEngine: ["!duckduckgo", "!ddg"],
    bangsCategory: ["!general", "!web"],
  },
  google: {
    description:
      "Google Search is a search engine operated by Google. It allows users to search for information on the Internet by entering keywords or phrases. Google Search uses algorithms to analyze and rank websites based on their relevance to the search query. It is the most popular search engine worldwide. (Source: wikipedia)",
    linkUrl: "https://google.com/",
    wikiUrl: "wikidata.org/wiki/Q9366",
    bangsEngine: ["!google", "!go"],
    bangsCategory: ["!general", "!web"],
  },
  mojeek: {
    description:
      "Mojeek is a search engine based in the United Kingdom. The search results provided by Mojeek come from its own index of web pages, created by crawling the web. (Source: wikipedia)",
    linkUrl: "https://www.mojeek.com/",
    wikiUrl: "wikidata.org/wiki/Q60747299",
    bangsEngine: ["!mojeek", "!mjk"],
    bangsCategory: ["!general", "!web"],
  },
  presearch: {
    description:
      "Presearch is a decentralized search engine that provides search choice, quality results, privacy and rewards to those who want to end the search monopoly and take back the web. (Source: https://presearch.io)",
    linkUrl: "https://presearch.io",
    wikiUrl: "",
    bangsEngine: ["!presearch", "!ps"],
    bangsCategory: ["!general", "!web"],
  },
  qwant: {
    description:
      "Qwant is a French search engine that launched in February 2013. Qwant claims to respect the privacy of its users by not tracking them for advertising purposes or reselling their personal data, as well as being unbiased in the display of results. (Source: wikipedia)",
    linkUrl: "https://www.qwant.com/",
    wikiUrl: "wikidata.org/wiki/Q14657870",
    bangsEngine: ["!qwant", "!qw"],
    bangsCategory: ["!general", "!web"],
  },
  startpage: {
    description:
      "Startpage is a Dutch search engine company that highlights privacy as its distinguishing feature. The website advertises that it allows users to obtain Google Search results while protecting users' privacy by not storing personal information or search data and removing all trackers. Startpage.com also includes an Anonymous View browsing feature that allows users the option to open search results via proxy for increased anonymity. (Source: wikipedia)",
    linkUrl: "https://startpage.com",
    wikiUrl: "wikidata.org/wiki/Q2333295",
    bangsEngine: ["!startpage", "!sp"],
    bangsCategory: ["!general", "!web"],
  },
  yahoo: {
    description:
      "The search engine that helps you find exactly what you're looking for. Find the most relevant information, video, images, and answers from all across the Web. (Source: https://search.yahoo.com/)",
    linkUrl: "https://search.yahoo.com/",
    wikiUrl: "",
    bangsEngine: ["!yahoo", "!yh"],
    bangsCategory: ["!general", "!web"],
  },

  wikibooks: {
    description:
      "Wikibooks is a wiki-based Wikimedia project hosted by the Wikimedia Foundation for the creation of free content digital textbooks and annotated texts that anyone can edit. (Source: wikipedia)",
    linkUrl: "https://www.wikibooks.org/",
    wikiUrl: "wikidata.org/wiki/Q367",
    bangsEngine: ["!wikibooks", "!wb"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikisource: {
    description:
      "Wikisource is an online digital library of free-content textual sources on a wiki, operated by the Wikimedia Foundation. Wikisource is the name of the project as a whole and the name for each instance of that project ; multiple Wikisources make up the overall project of Wikisource. The project's aim is to host all forms of free text, in many languages, and translations. Originally conceived as an archive to store useful or important historical texts, it has expanded to become a general-content library. The project officially began on November 24, 2003, under the name Project Sourceberg, a play on the famous Project Gutenberg. The name Wikisource was adopted later that year and it received its own domain name. (Source: wikipedia)",
    linkUrl: "https://www.wikisource.org/",
    wikiUrl: "wikidata.org/wiki/Q263",
    bangsEngine: ["!wikisource", "!ws"],
    bangsCategory: ["!general", "!wikimedia"],
  },

  alexandria: {
    description:
      "Search the web with alexandria.org - the open source search engine (Source: https://alexandria.org/)",
    linkUrl: "https://alexandria.org/",
    wikiUrl: "",
    bangsEngine: ["!alexandria", "!alx"],
    bangsCategory: ["!general"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // GENERAL
  // -------------------------------------------------------------------------------------------------------------------------------
  wikipedia: {
    description:
      "Wikipedia is a free-content online encyclopedia written and maintained by a community of volunteers, known as Wikipedians, through open collaboration and the use of the wiki-based editing system MediaWiki. Wikipedia is the largest and most-read reference work in history. It is consistently ranked as one of the ten most popular websites in the world, and as of 2024 is ranked the fifth most visited website on the Internet by Semrush. Founded by Jimmy Wales and Larry Sanger on January 15, 2001, Wikipedia is hosted by the Wikimedia Foundation, an American nonprofit organization that employs a staff of over 700 people. (Source: wikipedia)",
    linkUrl: "https://www.wikipedia.org/",
    wikiUrl: "wikidata.org/wiki/Q52",
    bangsEngine: ["!wikipedia", "!wp"],
    bangsCategory: ["!general"],
  },
  wikidata: {
    description:
      "Wikidata is a collaboratively edited multilingual knowledge graph hosted by the Wikimedia Foundation. It is a common source of open data that Wikimedia projects such as Wikipedia, and anyone else, is able to use under the CC0 public domain license. Wikidata is a wiki powered by the software MediaWiki, including its extension for semi-structured data, the Wikibase. (Source: wikipedia)",
    linkUrl: "https://wikidata.org/",
    wikiUrl: "wikidata.org/wiki/Q2013",
    bangsEngine: ["!wikidata", "!wd"],
    bangsCategory: ["!general"],
  },

  wikispecies: {
    description:
      "Wikispecies is a wiki-based online project supported by the Wikimedia Foundation. Its aim is to create a comprehensive open content catalogue of all species; the project is directed at scientists, rather than at the general public. Jimmy Wales stated that editors are not required to fax in their degrees, but that submissions will have to pass muster with a technical audience. Wikispecies is available under the GNU Free Documentation License and CC BY-SA 3.0. (Source: wikipedia)",
    linkUrl: "https://species.wikimedia.org/",
    wikiUrl: "wikidata.org/wiki/Q370",
    bangsEngine: ["!wikispecies", "!wsp"],
    bangsCategory: ["!general", "!science", "!wikimedia"],
  },
};
