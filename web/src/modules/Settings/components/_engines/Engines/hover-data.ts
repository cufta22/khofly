export interface IHoverData {
  description: string;
  linkUrl: string;
  wikiUrl: string;
  bangsEngine: string[] | { [key in string]: string[] };
  bangsCategory: string[] | { [key in string]: string[] };
}

export const HOVER_DATA: { [key in string]: IHoverData } = {
  // -------------------------------------------------------------------------------------------------------------------------------
  // GENERAL
  // -------------------------------------------------------------------------------------------------------------------------------

  dictzone: {
    description:
      "Online dictionaries: English, Spanish, German, French, Italian, Hungarian... Select your favorite dictionary! (Source: https://dictzone.com/)",
    linkUrl: "https://dictzone.com",
    wikiUrl: "",
    bangsEngine: ["!dictzone", "!dz"],
    bangsCategory: ["!general", "!translate"],
  },
  libretranslate: {
    description:
      "Free and Open Source Machine Translation API. Self-hosted, offline capable and easy to setup. Run your own API server in just a few minutes.Free and Open Source Machine Translation API. Self-hosted, offline capable and easy to setup. Run your own API server in just a few minutes. (Source: https://libretranslate.com)",
    linkUrl: "https://libretranslate.com",
    wikiUrl: "",
    bangsEngine: ["!libretranslate", "!lt"],
    bangsCategory: ["!general", "!translate"],
  },
  lingva: {
    description: "",
    linkUrl: "https://lingva.ml",
    wikiUrl: "",
    bangsEngine: ["!lingva", "!lv"],
    bangsCategory: ["!general", "!translate"],
  },
  bing: {
    description:
      "Microsoft Bing, commonly referred to as Bing, is a web search engine owned and operated by Microsoft. The service traces its roots back to Microsoft's earlier search engines, including MSN Search, Windows Live Search, and Live Search. Bing offers a broad spectrum of search services, encompassing web, video, image, and map search products, all developed using ASP.NET. (Source: wikipedia)",
    linkUrl: "https://www.bing.com",
    wikiUrl: "wikidata.org/wiki/Q182496",
    bangsEngine: {
      general: ["!bing", "!bi"],
      images: ["!bing_images", "!bii"],
      videos: ["!bing_videos", "!biv"],
      news: ["!bing_news", "!bin"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      videos: ["!videos", "!web"],
      news: ["!news"],
    },
  },
  brave: {
    description:
      "Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. Brave is a privacy-focused browser, which automatically blocks most advertisements and website trackers in its default settings. Users can turn on optional ads that reward them for their attention in the form of Basic Attention Tokens (BAT), which can be used as a cryptocurrency or to make payments to registered websites and content creators. (Source: wikipedia)",
    linkUrl: "https://search.brave.com/",
    wikiUrl: "wikidata.org/wiki/Q22906900",
    bangsEngine: {
      general: ["!brave", "!br"],
      images: ["!brave.images", "!brimg"],
      videos: ["!brave.videos", "!brvid"],
      news: ["!brave.news", "!brnews"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      videos: ["!videos", "!web"],
      news: ["!news"],
    },
  },
  duckduckgo: {
    description:
      "DuckDuckGo is an American software company that offers a number of software products oriented towards helping people protect their privacy online. The company also provides a private search engine, a tracker-blocking browser extension, email protection, and app tracking protection. (Source: wikipedia)",
    linkUrl: "https://duckduckgo.com/",
    wikiUrl: "wikidata.org/wiki/Q12805",
    bangsEngine: {
      general: ["!duckduckgo", "!ddg"],
      images: ["!duckduckgo_images", "!ddi"],
      videos: ["!duckduckgo_videos", "!ddv"],
      news: ["!duckduckgo_news", "!ddn"],
      other: ["!duckduckgo_weather", "!ddw"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      videos: ["!videos", "!web"],
      news: ["!news", "!web"],
      other: ["!weather", "!other"],
    },
  },
  google: {
    description:
      "Google Search is a search engine operated by Google. It allows users to search for information on the Internet by entering keywords or phrases. Google Search uses algorithms to analyze and rank websites based on their relevance to the search query. It is the most popular search engine worldwide. (Source: wikipedia)",
    linkUrl: "https://google.com/",
    wikiUrl: "wikidata.org/wiki/Q9366",
    bangsEngine: {
      general: ["!google", "!go"],
      images: ["!google_images", "!goi"],
      videos: ["!google_videos", "!gov"],
      news: ["!google_news", "!gon"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      videos: ["!videos", "!web"],
      news: ["!news"],
    },
  },
  mojeek: {
    description:
      "Mojeek is a search engine based in the United Kingdom. The search results provided by Mojeek come from its own index of web pages, created by crawling the web. (Source: wikipedia)",
    linkUrl: "https://www.mojeek.com/",
    wikiUrl: "wikidata.org/wiki/Q60747299",
    bangsEngine: {
      general: ["!mojeek", "!mjk"],
      news: ["!mojeek_news", "!mjknews"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      news: ["!news", "!web"],
    },
  },
  presearch: {
    description:
      "Presearch is a decentralized search engine that provides search choice, quality results, privacy and rewards to those who want to end the search monopoly and take back the web. (Source: https://presearch.io)",
    linkUrl: "https://presearch.io",
    wikiUrl: "",
    bangsEngine: {
      general: ["!presearch", "!ps"],
      images: ["!presearch_images", "!psimg"],
      news: ["!presearch_news", "!psnews"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      news: ["!news", "!web"],
    },
  },
  qwant: {
    description:
      "Qwant is a French search engine that launched in February 2013. Qwant claims to respect the privacy of its users by not tracking them for advertising purposes or reselling their personal data, as well as being unbiased in the display of results. (Source: wikipedia)",
    linkUrl: "https://www.qwant.com/",
    wikiUrl: "wikidata.org/wiki/Q14657870",
    bangsEngine: {
      general: ["!qwant", "!qw"],
      images: ["!qwant_images", "!qwi"],
      videos: ["!qwant_videos", "!qwv"],
      news: ["!qwant_news", "!qwn"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      videos: ["!videos", "!web"],
      news: ["!news"],
    },
  },
  startpage: {
    description:
      "Startpage is a Dutch search engine company that highlights privacy as its distinguishing feature. The website advertises that it allows users to obtain Google Search results while protecting users' privacy by not storing personal information or search data and removing all trackers. Startpage.com also includes an Anonymous View browsing feature that allows users the option to open search results via proxy for increased anonymity. (Source: wikipedia)",
    linkUrl: "https://startpage.com",
    wikiUrl: "wikidata.org/wiki/Q2333295",
    bangsEngine: {
      general: ["!startpage", "!sp"],
      images: ["!startpage_images", "!spi"],
      news: ["!startpage_news", "!spn"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      images: ["!images", "!web"],
      news: ["!news", "!web"],
    },
  },
  wiby: {
    description:
      "Wiby is a search engine for older style pages, lightweight and based on a subject of interest. Building a web more reminiscent of the early internet. (Source: https://wiby.me/)",
    linkUrl: "https://wiby.me/",
    wikiUrl: "",
    bangsEngine: ["!wiby", "!wib"],
    bangsCategory: ["!general", "!web"],
  },
  yahoo: {
    description:
      "The search engine that helps you find exactly what you're looking for. Find the most relevant information, video, images, and answers from all across the Web. (Source: https://search.yahoo.com/)",
    linkUrl: "https://search.yahoo.com/",
    wikiUrl: "",

    bangsEngine: {
      general: ["!yahoo", "!yh"],
      news: ["!yahoo_news", "!yhn"],
    },
    bangsCategory: {
      general: ["!general", "!web"],
      news: ["!news"],
    },
  },
  alexandria: {
    description:
      "Search the web with alexandria.org - the open source search engine (Source: https://alexandria.org/)",
    linkUrl: "https://alexandria.org/",
    wikiUrl: "",
    bangsEngine: ["!alexandria", "!alx"],
    bangsCategory: ["!general"],
  },
  ask: {
    description:
      "Ask.com is an internet-based business with a question answering format initiated during 1996 by Garrett Gruener and David Warthen in Berkeley, California. (Source: wikipedia)",
    linkUrl: "https://www.ask.com/",
    wikiUrl: "wikidata.org/wiki/Q847564",
    bangsEngine: ["!ask", "!ask"],
    bangsCategory: ["!general"],
  },
  cloudflareai: {
    description: "",
    linkUrl: "https://ai.cloudflare.com",
    wikiUrl: "",
    bangsEngine: ["!cloudflareai", "!cfai"],
    bangsCategory: ["!general"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // IMAGES
  // -------------------------------------------------------------------------------------------------------------------------------

  deviantart: {
    description:
      "DeviantArt is an American online community that features artwork, videography, photography, and literature, launched on August 7, 2000, by Angelo Sotira, Scott Jarkoff, and Matthew Stephens, among others. (Source: wikipedia)",
    linkUrl: "https://www.deviantart.com/",
    wikiUrl: "wikidata.org/wiki/Q46523",
    bangsEngine: ["!deviantart", "!da"],
    bangsCategory: ["!images"],
  },
  flickr: {
    description:
      "Flickr is an image hosting and video hosting service, as well as an online community, founded in Canada and headquartered in the United States. It was created by Ludicorp in 2004 and was previously a common way for amateur and professional photographers to host high-resolution photos. It has changed ownership several times and has been owned by SmugMug since April 20, 2018. (Source: wikipedia)",
    linkUrl: "https://www.flickr.com/",
    wikiUrl: "wikidata.org/wiki/Q103204",
    bangsEngine: ["!flickr", "!fl"],
    bangsCategory: ["!images"],
  },
  pinterest: {
    description:
      "Pinterest is an American social media service for publishing and discovery of information in the form of pinboards. This includes recipes, home, style, motivation, and inspiration on the Internet using image sharing. Pinterest, Inc. was founded by Ben Silbermann, Paul Sciarra, and Evan Sharp, and is headquartered in San Francisco. (Source: wikipedia)",
    linkUrl: "https://www.pinterest.com/",
    wikiUrl: "wikidata.org/wiki/Q255381",
    bangsEngine: ["!pinterest", "!pin"],
    bangsCategory: ["!images"],
  },
  unsplash: {
    description:
      "Unsplash is a website dedicated to proprietary stock photography. Since 2021, it has been owned by Getty Images. The website claims over 330,000 contributing photographers and generates more than 13 billion photo impressions per month on their growing library of over 5 million photos. Unsplash has been cited as one of the world's leading photography websites by Forbes, Design Hub, CNET, Medium and The Next Web. (Source: wikipedia)",
    linkUrl: "https://unsplash.com/",
    wikiUrl: "wikidata.org/wiki/Q28233552",
    bangsEngine: ["!unsplash", "!us"],
    bangsCategory: ["!images"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // VIDEOS
  // -------------------------------------------------------------------------------------------------------------------------------

  dailymotion: {
    description:
      "Dailymotion is a French online video sharing platform owned by Canal+. Prior to 2024, the company was owned by Vivendi. North American launch partners included Vice Media, Bloomberg, and Hearst Digital Media. It is among the earliest known platforms to support HD (720p) resolution video. Dailymotion is available worldwide in 183 languages and 43 localised versions featuring local home pages and local content. (Source: wikipedia)",
    linkUrl: "https://www.dailymotion.com/",
    wikiUrl: "wikidata.org/wiki/Q769222",
    bangsEngine: ["!dailymotion", "!dm"],
    bangsCategory: ["!videos"],
  },
  odysee: {
    description:
      "Odysee is an American decentralized video hosting platform built on the LBRY blockchain. It positions itself as an alternative to mainstream services like YouTube, but with a focus on free speech and decentralization. (Source: wikipedia)",
    linkUrl: "https://odysee.com",
    wikiUrl: "wikidata.org/wiki/Q102046570",
    bangsEngine: ["!odysee", "!od"],
    bangsCategory: ["!videos"],
  },
  piped: {
    description: "alternative front end for YouTube (Source: wikidata)",
    linkUrl: "https://github.com/TeamPiped/Piped/",
    wikiUrl: "wikidata.org/wiki/Q107565255",
    bangsEngine: {
      videos: ["!piped", "!ppd"],
      music: ["!piped.music", "!ppdm"],
    },
    bangsCategory: {
      videos: ["!videos"],
      music: ["!music"],
    },
  },
  rumble: {
    description: `Rumble is an online video platform, web hosting, and cloud services business headquartered in Toronto, Ontario, Canada, with its U.S. headquarters in Longboat Key, Florida, United States. It was founded in 2013 by Chris Pavlovski, a Macedonian Canadian technology entrepreneur. Rumble's cloud services business hosts Truth Social, and the video platform is popular among American conservative and far-right users. Rumble has been described as "alt-tech". (Source: wikipedia)`,
    linkUrl: "https://rumble.com/",
    wikiUrl: "wikidata.org/wiki/Q104765127",
    bangsEngine: ["!rumble", "!ru"],
    bangsCategory: ["!videos"],
  },
  vimeo: {
    description:
      "Vimeo, Inc. is an American video hosting, sharing, and services provider headquartered in New York City. Vimeo focuses on the delivery of high-definition video across a range of devices. Vimeo's business model is through software as a service (SaaS). They derive revenue by providing subscription plans for businesses and content creators. Vimeo provides its subscribers with tools for video creation, editing, and broadcasting, enterprise software solutions, as well as the means for video professionals to connect with clients and other professionals. As of December 2021, the site has 260 million users, with around 1.6 million subscribers to its services. (Source: wikipedia)",
    linkUrl: "https://vimeo.com/",
    wikiUrl: "wikidata.org/wiki/Q156376",
    bangsEngine: ["!vimeo", "!vm"],
    bangsCategory: ["!videos"],
  },
  youtube: {
    description:
      "YouTube is an American social media and online video sharing platform owned by Google. YouTube was founded on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim, three former employees of PayPal. Headquartered in San Bruno, California, it is the second-most-visited website in the world, after Google Search. In January 2024, YouTube had more than 2.7 billion monthly active users, who collectively watched more than one billion hours of videos every day. As of May 2019, videos were being uploaded to the platform at a rate of more than 500 hours of content per minute, and as of 2023, there were approximately 14 billion videos in total. (Source: wikipedia)",
    linkUrl: "https://www.youtube.com/",
    wikiUrl: "wikidata.org/wiki/Q866",
    bangsEngine: {
      videos: ["!youtube", "!yt"],
      music: ["!youtube", "!yt"],
    },
    bangsCategory: {
      videos: ["!videos", "!music"],
      music: ["!videos", "!music"],
    },
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // NEWS
  // -------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------
  // MUSIC
  // -------------------------------------------------------------------------------------------------------------------------------

  genius: {
    description:
      "Genius is an American digital media company founded on August 27, 2009, by Tom Lehman, Ilan Zechory, and Mahbod Moghadam. Its website serves as an online music encyclopedia allowing users to provide annotations and interpretation to song lyrics, news stories, sources, poetry, and documents. (Source: wikipedia)",
    linkUrl: "https://genius.com/",
    wikiUrl: "wikidata.org/wiki/Q3419343",
    bangsEngine: ["!genius", "!gen"],
    bangsCategory: ["!music", "!lyrics"],
  },
  radiobrowser: {
    description: "online database of internet radio stations (Source: wikidata)",
    linkUrl: "https://www.radio-browser.info/",
    wikiUrl: "wikidata.org/wiki/Q111664849",
    bangsEngine: ["!radio_browser", "!rb"],
    bangsCategory: ["!music", "!radio"],
  },
  bandcamp: {
    description:
      "Bandcamp is an online music distribution platform founded in 2008 by Oddpost co-founder Ethan Diamond and programmers Shawn Grunberger, Joe Holt and Neal Tucker, with an office and record store in Oakland, California. Acquired by Epic Games in March 2022, the company was sold to Songtradr in 2023. (Source: wikipedia)",
    linkUrl: "https://bandcamp.com/",
    wikiUrl: "wikidata.org/wiki/Q545966",
    bangsEngine: ["!bandcamp", "!bc"],
    bangsCategory: ["!music"],
  },
  deezer: {
    description:
      "Deezer is a French music streaming service founded in 2007 that provides users with access to a vast library of music tracks, podcasts, and radio stations. The company has been a subsidiary of Access Industries since 2016. It offers streaming services in over 180 countries and features a catalog of more than 90 million licensed tracks, making it one of the largest streaming platforms available. Deezer is available on various devices, including Android, iOS, macOS and others. (Source: wikipedia)",
    linkUrl: "https://deezer.com",
    wikiUrl: "wikidata.org/wiki/Q602243",
    bangsEngine: ["!deezer", "!dz"],
    bangsCategory: ["!music"],
  },
  mixcloud: {
    description:
      "Mixcloud is a popular British online music streaming service that allows for the listening and distribution of radio shows, DJ mixes and podcasts, which are crowdsourced by its registered users. (Source: wikipedia)",
    linkUrl: "https://www.mixcloud.com/",
    wikiUrl: "wikidata.org/wiki/Q6883832",
    bangsEngine: ["!mixcloud", "!mc"],
    bangsCategory: ["!music"],
  },
  soundcloud: {
    description:
      "SoundCloud is a German audio streaming service owned and operated by SoundCloud Global Limited & Co. KG. The service enables its users to upload, promote, and share audio. Founded in 2007 by Alexander Ljung and Eric Wahlforss, SoundCloud is one of the largest music streaming services in the world and is available in 190 countries and territories. The service has more than 76 million active monthly users and over 200 million audio tracks as of November 2021. SoundCloud offers both free and paid memberships on the platform, available for mobile, desktop and Xbox devices. SoundCloud has evolved from a traditional online streaming platform to an entertainment company. (Source: wikipedia)",
    linkUrl: "https://soundcloud.com",
    wikiUrl: "wikidata.org/wiki/Q568769",
    bangsEngine: ["!soundcloud", "!sc"],
    bangsCategory: ["!music"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // WIKI STUFF
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
  wikibooks: {
    description:
      "Wikibooks is a wiki-based Wikimedia project hosted by the Wikimedia Foundation for the creation of free content digital textbooks and annotated texts that anyone can edit. (Source: wikipedia)",
    linkUrl: "https://www.wikibooks.org/",
    wikiUrl: "wikidata.org/wiki/Q367",
    bangsEngine: ["!wikibooks", "!wb"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikiquote: {
    description:
      "Wikiquote is part of a family of wiki-based projects run by the Wikimedia Foundation using MediaWiki software. The project's objective is to collaboratively produce a vast reference of quotations from prominent people, books, films, proverbs, etc. and writings about them. The website aims to be as accurate as possible regarding the provenance and sourcing of the quotations. (Source: wikipedia)",
    linkUrl: "https://www.wikiquote.org/",
    wikiUrl: "wikidata.org/wiki/Q369",
    bangsEngine: ["!wikiquote", "!wq"],
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
  wikispecies: {
    description:
      "Wikispecies is a wiki-based online project supported by the Wikimedia Foundation. Its aim is to create a comprehensive open content catalogue of all species; the project is directed at scientists, rather than at the general public. Jimmy Wales stated that editors are not required to fax in their degrees, but that submissions will have to pass muster with a technical audience. Wikispecies is available under the GNU Free Documentation License and CC BY-SA 3.0. (Source: wikipedia)",
    linkUrl: "https://species.wikimedia.org/",
    wikiUrl: "wikidata.org/wiki/Q13679",
    bangsEngine: ["!wikispecies", "!wsp"],
    bangsCategory: ["!general", "!science", "!wikimedia"],
  },
  wikiversity: {
    description:
      "Wikiversity is a Wikimedia Foundation project that supports learning communities, their learning materials, and resulting activities. It differs from Wikipedia in that it offers tutorials and other materials for the fostering of learning, rather than an encyclopedia. It is available in many languages. (Source: wikipedia)",
    linkUrl: "https://species.wikimedia.org/",
    wikiUrl: "wikidata.org/wiki/Q370",
    bangsEngine: ["!wikiversity", "!wv"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikivoyage: {
    description:
      'Wikivoyage is a free web-based travel guide for travel destinations and travel topics written by volunteer authors. It is a sister project of Wikipedia and supported and hosted by the same non-profit Wikimedia Foundation (WMF). Wikivoyage has been called the "Wikipedia of travel guides". (Source: wikipedia)',
    linkUrl: "https://www.wikivoyage.org/",
    wikiUrl: "wikidata.org/wiki/Q373",
    bangsEngine: ["!wikivoyage", "!wy"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikinews: {
    description: `Wikinews is a free-content news wiki and a project of the Wikimedia Foundation that works through collaborative journalism through user-created content. Wikipedia co-founder Jimmy Wales has distinguished Wikinews from Wikipedia by saying, "On Wikinews, each story is to be written as a news story as opposed to an encyclopedia article." Wikinews's neutral point of view policy aims to distinguish it from other citizen journalism efforts such as Indymedia and OhmyNews. In contrast to most Wikimedia Foundation projects, Wikinews allows original work in the form of original reporting and interviews. In contrast to newspapers, Wikinews does not permit op-ed. (Source: wikipedia)`,
    linkUrl: "https://www.wikinews.org/",
    wikiUrl: "wikidata.org/wiki/Q964",
    bangsEngine: ["!wikinews", "!wn"],
    bangsCategory: ["!news", "!wikimedia"],
  },
  wikicommons: {
    description:
      "Wikimedia Commons, or simply Commons, is a wiki-based media repository of free-to-use images, sounds, videos and other media. It is a project of the Wikimedia Foundation. (Source: wikipedia)",
    linkUrl: "https://commons.wikimedia.org/",
    wikiUrl: "wikidata.org/wiki/Q565",
    bangsEngine: {
      images: ["!wikicommons.images", "!wc"],
      files: ["!wikicommons.files", "!wcf"],
      music: ["!wikicommons.audio", "!wca"],
    },
    bangsCategory: {
      images: ["!images"],
      files: ["!files"],
      music: ["!music"],
    },
  },
};
