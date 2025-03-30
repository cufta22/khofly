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
    linkUrl: "https://search.brave.com",
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
    linkUrl: "https://duckduckgo.com",
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
      other: ["!other", "!weather"],
    },
  },
  google: {
    description:
      "Google Search is a search engine operated by Google. It allows users to search for information on the Internet by entering keywords or phrases. Google Search uses algorithms to analyze and rank websites based on their relevance to the search query. It is the most popular search engine worldwide. (Source: wikipedia)",
    linkUrl: "https://google.com",
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
    linkUrl: "https://www.mojeek.com",
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
    linkUrl: "https://www.qwant.com",
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
    linkUrl: "https://wiby.me",
    wikiUrl: "",
    bangsEngine: ["!wiby", "!wib"],
    bangsCategory: ["!general", "!web"],
  },
  yahoo: {
    description:
      "The search engine that helps you find exactly what you're looking for. Find the most relevant information, video, images, and answers from all across the Web. (Source: https://search.yahoo.com/)",
    linkUrl: "https://search.yahoo.com",
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
    linkUrl: "https://alexandria.org",
    wikiUrl: "",
    bangsEngine: ["!alexandria", "!alx"],
    bangsCategory: ["!general"],
  },
  ask: {
    description:
      "Ask.com is an internet-based business with a question answering format initiated during 1996 by Garrett Gruener and David Warthen in Berkeley, California. (Source: wikipedia)",
    linkUrl: "https://www.ask.com",
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
    linkUrl: "https://www.deviantart.com",
    wikiUrl: "wikidata.org/wiki/Q46523",
    bangsEngine: ["!deviantart", "!da"],
    bangsCategory: ["!images"],
  },
  flickr: {
    description:
      "Flickr is an image hosting and video hosting service, as well as an online community, founded in Canada and headquartered in the United States. It was created by Ludicorp in 2004 and was previously a common way for amateur and professional photographers to host high-resolution photos. It has changed ownership several times and has been owned by SmugMug since April 20, 2018. (Source: wikipedia)",
    linkUrl: "https://www.flickr.com",
    wikiUrl: "wikidata.org/wiki/Q103204",
    bangsEngine: ["!flickr", "!fl"],
    bangsCategory: ["!images"],
  },
  pinterest: {
    description:
      "Pinterest is an American social media service for publishing and discovery of information in the form of pinboards. This includes recipes, home, style, motivation, and inspiration on the Internet using image sharing. Pinterest, Inc. was founded by Ben Silbermann, Paul Sciarra, and Evan Sharp, and is headquartered in San Francisco. (Source: wikipedia)",
    linkUrl: "https://www.pinterest.com",
    wikiUrl: "wikidata.org/wiki/Q255381",
    bangsEngine: ["!pinterest", "!pin"],
    bangsCategory: ["!images"],
  },
  unsplash: {
    description:
      "Unsplash is a website dedicated to proprietary stock photography. Since 2021, it has been owned by Getty Images. The website claims over 330,000 contributing photographers and generates more than 13 billion photo impressions per month on their growing library of over 5 million photos. Unsplash has been cited as one of the world's leading photography websites by Forbes, Design Hub, CNET, Medium and The Next Web. (Source: wikipedia)",
    linkUrl: "https://unsplash.com",
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
    linkUrl: "https://www.dailymotion.com",
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
    linkUrl: "https://github.com/TeamPiped/Piped",
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
    linkUrl: "https://rumble.com",
    wikiUrl: "wikidata.org/wiki/Q104765127",
    bangsEngine: ["!rumble", "!ru"],
    bangsCategory: ["!videos"],
  },
  vimeo: {
    description:
      "Vimeo, Inc. is an American video hosting, sharing, and services provider headquartered in New York City. Vimeo focuses on the delivery of high-definition video across a range of devices. Vimeo's business model is through software as a service (SaaS). They derive revenue by providing subscription plans for businesses and content creators. Vimeo provides its subscribers with tools for video creation, editing, and broadcasting, enterprise software solutions, as well as the means for video professionals to connect with clients and other professionals. As of December 2021, the site has 260 million users, with around 1.6 million subscribers to its services. (Source: wikipedia)",
    linkUrl: "https://vimeo.com",
    wikiUrl: "wikidata.org/wiki/Q156376",
    bangsEngine: ["!vimeo", "!vm"],
    bangsCategory: ["!videos"],
  },
  youtube: {
    description:
      "YouTube is an American social media and online video sharing platform owned by Google. YouTube was founded on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim, three former employees of PayPal. Headquartered in San Bruno, California, it is the second-most-visited website in the world, after Google Search. In January 2024, YouTube had more than 2.7 billion monthly active users, who collectively watched more than one billion hours of videos every day. As of May 2019, videos were being uploaded to the platform at a rate of more than 500 hours of content per minute, and as of 2023, there were approximately 14 billion videos in total. (Source: wikipedia)",
    linkUrl: "https://www.youtube.com",
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
    linkUrl: "https://genius.com",
    wikiUrl: "wikidata.org/wiki/Q3419343",
    bangsEngine: ["!genius", "!gen"],
    bangsCategory: ["!music", "!lyrics"],
  },
  radiobrowser: {
    description: "online database of internet radio stations (Source: wikidata)",
    linkUrl: "https://www.radio-browser.info",
    wikiUrl: "wikidata.org/wiki/Q111664849",
    bangsEngine: ["!radio_browser", "!rb"],
    bangsCategory: ["!music", "!radio"],
  },
  bandcamp: {
    description:
      "Bandcamp is an online music distribution platform founded in 2008 by Oddpost co-founder Ethan Diamond and programmers Shawn Grunberger, Joe Holt and Neal Tucker, with an office and record store in Oakland, California. Acquired by Epic Games in March 2022, the company was sold to Songtradr in 2023. (Source: wikipedia)",
    linkUrl: "https://bandcamp.com",
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
    linkUrl: "https://www.mixcloud.com",
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
  // IT
  // -------------------------------------------------------------------------------------------------------------------------------

  crates: {
    description: "crates.io: Rust Package Registry (Source: https://crates.io/)",
    linkUrl: "https://crates.io",
    wikiUrl: "",
    bangsEngine: ["!crates.io", "!crates"],
    bangsCategory: ["!it", "!packages", "!cargo"],
  },
  dockerhub: {
    description: "hosting service for Docker repository (Source: wikidata)",
    linkUrl: "https://hub.docker.com",
    wikiUrl: "wikidata.org/wiki/Q100769064",
    bangsEngine: ["!docker_hub", "!dh"],
    bangsCategory: ["!it", "!packages"],
  },
  npm: {
    description:
      "npm is a package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub. npm is the default package manager for the JavaScript runtime environment Node.js and is included as a recommended feature in the Node.js installer. (Source: wikipedia)",
    linkUrl: "https://npms.io",
    wikiUrl: "wikidata.org/wiki/Q7067518",
    bangsEngine: ["!npm"],
    bangsCategory: ["!it", "!packages"],
  },
  packagist: {
    description:
      "The main Composer repository, aggregating public PHP packages installable with Composer (Source: wikidata)",
    linkUrl: "https://packagist.org",
    wikiUrl: "wikidata.org/wiki/Q108311377",
    bangsEngine: ["!packagist", "!pack"],
    bangsCategory: ["!it", "!packages"],
  },
  pkggodev: {
    description:
      "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software. (Source: https://pkg.go.dev/)",
    linkUrl: "https://pkg.go.dev",
    wikiUrl: "",
    bangsEngine: ["!pkg.go.dev", "!pgo"],
    bangsCategory: ["!it", "!packages"],
  },
  pypi: {
    description:
      "The Python Package Index, abbreviated as PyPI and also known as the Cheese Shop, is the official third-party software repository for Python. It is analogous to the CPAN repository for Perl and to the CRAN repository for R. PyPI is run by the Python Software Foundation, a charity. Some package managers, including pip, use PyPI as the default source for packages and their dependencies. (Source: wikipedia)",
    linkUrl: "https://pypi.org",
    wikiUrl: "wikidata.org/wiki/Q2984686",
    bangsEngine: ["!pypi"],
    bangsCategory: ["!it", "!packages"],
  },
  rubygems: {
    description:
      "RubyGems is a package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries, a tool designed to easily manage the installation of gems, and a server for distributing them. It was created by Chad Fowler, Jim Weirich, David Alan Black, Paul Brannan and Richard Kilmer in 2004. (Source: wikipedia)",
    linkUrl: "https://rubygems.org",
    wikiUrl: "wikidata.org/wiki/Q1853420",
    bangsEngine: ["!rubygems", "!rbg"],
    bangsCategory: ["!it", "!packages"],
  },
  void: {
    description:
      "Void Linux is an independent Linux distribution that uses the X Binary Package System (XBPS) package manager, which was designed and implemented from scratch, and the runit init system. Excluding binary kernel blobs, a base install is composed entirely of free software. (Source: wikipedia)",
    linkUrl: "https://voidlinux.org/packages",
    wikiUrl: "wikidata.org/wiki/Q19310966",
    bangsEngine: ["!voidlinux", "!void"],
    bangsCategory: ["!it", "!packages"],
  },
  askubuntu: {
    description:
      "Stack Exchange is a network of question-and-answer (Q&A) websites on topics in diverse fields, each site covering a specific topic, where questions, answers, and users are subject to a reputation award process. The reputation system allows the sites to be self-moderating. Currently, Stack Exchange is comprised of 173 communities bringing in over 100 million unique visitors each month. As of February 2025 the three most active sites in the network are Stack Overflow, Mathematics, and Ask Ubuntu (focusing on the Linux distribution Ubuntu. (Source: wikipedia)",
    linkUrl: "https://stackexchange.com",
    wikiUrl: "wikidata.org/wiki/Q3495447",
    bangsEngine: ["!askubuntu", "!ubuntu"],
    bangsCategory: ["!it", "!q&a"],
  },
  stackoverflow: {
    description:
      "Stack Exchange is a network of question-and-answer (Q&A) websites on topics in diverse fields, each site covering a specific topic, where questions, answers, and users are subject to a reputation award process. The reputation system allows the sites to be self-moderating. Currently, Stack Exchange is comprised of 173 communities bringing in over 100 million unique visitors each month. As of February 2025 the three most active sites in the network are Stack Overflow, Mathematics, and Ask Ubuntu (focusing on the Linux distribution Ubuntu. (Source: wikipedia)",
    linkUrl: "https://stackexchange.com",
    wikiUrl: "wikidata.org/wiki/Q3495447",
    bangsEngine: ["!stackoverflow", "!st"],
    bangsCategory: ["!it", "!q&a"],
  },
  superuser: {
    description:
      "Stack Exchange is a network of question-and-answer (Q&A) websites on topics in diverse fields, each site covering a specific topic, where questions, answers, and users are subject to a reputation award process. The reputation system allows the sites to be self-moderating. Currently, Stack Exchange is comprised of 173 communities bringing in over 100 million unique visitors each month. As of February 2025 the three most active sites in the network are Stack Overflow, Mathematics, and Ask Ubuntu (focusing on the Linux distribution Ubuntu. (Source: wikipedia)",
    linkUrl: "https://stackexchange.com",
    wikiUrl: "wikidata.org/wiki/Q3495447",
    bangsEngine: ["!superuser", "!su"],
    bangsCategory: ["!it", "!q&a"],
  },
  bitbucket: {
    description:
      "Bitbucket is a Git-based source code repository hosting service owned by Atlassian. Bitbucket offers both commercial plans and free accounts with an unlimited number of private repositories. (Source: wikipedia)",
    linkUrl: "https://bitbucket.org",
    wikiUrl: "wikidata.org/wiki/Q2493781",
    bangsEngine: ["!bitbucket", "!bb"],
    bangsCategory: ["!it", "!repos"],
  },
  codeberg: {
    description:
      "Gitea - Git with a cup of tea! Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD (Source: https://about.gitea.com)",
    linkUrl: "https://about.gitea.com",
    wikiUrl: "",
    bangsEngine: ["!codeberg", "!cb"],
    bangsCategory: ["!it", "!repos"],
  },
  github: {
    description:
      "GitHub is a proprietary developer platform that allows developers to create, store, manage, and share their code. It uses Git to provide distributed version control and GitHub itself provides access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project. Headquartered in California, it has been a subsidiary of Microsoft since 2018. (Source: wikipedia)",
    linkUrl: "https://github.com",
    wikiUrl: "wikidata.org/wiki/Q364",
    bangsEngine: ["!github", "!gh"],
    bangsCategory: ["!it", "!repos"],
  },
  gitlab: {
    description:
      "GitLab Inc. is a company that operates and develops GitLab, an open-core DevOps software package that can develop, secure, and operate software. GitLab includes a distributed version control system based on Git, including features such as access control, bug tracking, software feature requests, task management, and wikis for every project, as well as snippets. (Source: wikipedia)",
    linkUrl: "https://gitlab.com",
    wikiUrl: "wikidata.org/wiki/Q16639197",
    bangsEngine: ["!gitlab", "!gl"],
    bangsCategory: ["!it", "!repos"],
  },
  archwiki: {
    description: "Arch Linux documentation on the web (Source: wikidata)",
    linkUrl: "https://wiki.archlinux.org",
    wikiUrl: "wikidata.org/wiki/Q101445877",
    bangsEngine: ["!arch_linux_wiki", "!al"],
    bangsCategory: ["!it", "!software_wikis"],
  },
  gentoo: {
    description: "Gentoo Wiki (Source: https://wiki.gentoo.org/)",
    linkUrl: "https://wiki.gentoo.org",
    wikiUrl: "",
    bangsEngine: ["!gentoo", "!ge"],
    bangsCategory: ["!it", "!software_wikis"],
  },
  nixoswiki: {
    description: "NixOS Wiki (Source: https://wiki.nixos.org/)",
    linkUrl: "https://wiki.nixos.org",
    wikiUrl: "",
    bangsEngine: ["!nixos_wiki", "!nixw"],
    bangsCategory: ["!it", "!software_wikis"],
  },
  hackernews: {
    description: `Hacker News (HN) is a social news website focusing on computer science and entrepreneurship. It is run by the investment fund and startup incubator Y Combinator. In general, content that can be submitted is defined as "anything that gratifies one's intellectual curiosity." (Source: wikipedia)`,
    linkUrl: "https://news.ycombinator.com/",
    wikiUrl: "wikidata.org/wiki/Q686797",
    bangsEngine: ["!hackernews", "!hn"],
    bangsCategory: ["!it"],
  },
  mankier: {
    description:
      "An extensive and up-to-date collection of beautifully formatted man pages. (Source: https://www.mankier.com/)",
    linkUrl: "https://www.mankier.com",
    wikiUrl: "",
    bangsEngine: ["!mankier", "!man"],
    bangsCategory: ["!it"],
  },
  mdn: {
    description:
      "MDN Web Docs, previously Mozilla Developer Network and formerly Mozilla Developer Center, is a documentation repository and learning resource for web developers. It was started by Mozilla in 2005 as a unified place for documentation about open web standards, Mozilla's own projects, and developer guides. (Source: wikipedia)",
    linkUrl: "https://developer.mozilla.org",
    wikiUrl: "wikidata.org/wiki/Q3273508",
    bangsEngine: ["!mdn"],
    bangsCategory: ["!it"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // SCIENCE
  // -------------------------------------------------------------------------------------------------------------------------------
  arxiv: {
    description:
      "arXiv is an open-access repository of electronic preprints and postprints approved for posting after moderation, but not peer review. It consists of scientific papers in the fields of mathematics, physics, astronomy, electrical engineering, computer science, quantitative biology, statistics, mathematical finance, and economics, which can be accessed online. In many fields of mathematics and physics, almost all scientific papers are self-archived on the arXiv repository before publication in a peer-reviewed journal. Some publishers also grant permission for authors to archive the peer-reviewed postprint. Begun on August 14, 1991, arXiv.org passed the half-million-article milestone on October 3, 2008, had hit a million by the end of 2014 and two million by the end of 2021. As of November 2024, the submission rate is about 24,000 articles per month. (Source: wikipedia)",
    linkUrl: "https://arxiv.org",
    wikiUrl: "wikidata.org/wiki/Q118398",
    bangsEngine: ["!arxiv", "!arx"],
    bangsCategory: ["!science", "!scientific_publications"],
  },
  crossref: {
    description:
      "Crossref is a nonprofit open digital infrastructure organization for the global scholarly research community. It is the largest digital object identifier (DOI) Registration Agency of the International DOI Foundation. It has 19,000 members from 150 countries representing publishers, libraries, research institutions, and funders and was launched in early 2000 as a cooperative effort among publishers to enable persistent cross-platform citation linking in online academic journals. As of July 2023, Crossref identifies and connects 150 million records of metadata about research objects made openly available for reuse without restriction. They facilitate an average of 1.1 billion DOI resolutions every month, and they see 1 billion queries of the metadata every month. (Source: wikipedia)",
    linkUrl: "https://www.crossref.org",
    wikiUrl: "wikidata.org/wiki/Q5188229",
    bangsEngine: ["!crossref", "!cr"],
    bangsCategory: ["!science", "!scientific_publications"],
  },
  googlescholar: {
    description:
      "Google Scholar is a freely accessible web search engine that indexes the full text or metadata of scholarly literature across an array of publishing formats and disciplines. Released in beta in November 2004, the Google Scholar index includes peer-reviewed online academic journals and books, conference papers, theses and dissertations, preprints, abstracts, technical reports, and other scholarly literature, including court opinions and patents. (Source: wikipedia)",
    linkUrl: "https://scholar.google.com",
    wikiUrl: "wikidata.org/wiki/Q494817",
    bangsEngine: ["!google_scholar", "!gos"],
    bangsCategory: ["!science", "!scientific_publications"],
  },
  pubmed: {
    description:
      "MEDLINE is a bibliographic database of life sciences and biomedical information. It includes bibliographic information for articles from academic journals covering medicine, nursing, pharmacy, dentistry, veterinary medicine, and health care. MEDLINE also covers much of the literature in biology and biochemistry, as well as fields such as molecular evolution. (Source: wikipedia)",
    linkUrl: "https://www.ncbi.nlm.nih.gov/pubmed",
    wikiUrl: "wikidata.org/wiki/Q1540899",
    bangsEngine: ["!pubmed", "!pub"],
    bangsCategory: ["!science", "!scientific_publications"],
  },
  semanticscholar: {
    description:
      "Semantic Scholar is a research tool for scientific literature. It is developed at the Allen Institute for AI and was publicly released in November 2015. Semantic Scholar uses modern techniques in natural language processing to support the research process, for example by providing automatically generated summaries of scholarly papers. The Semantic Scholar team is actively researching the use of artificial intelligence in natural language processing, machine learning, human–computer interaction, and information retrieval. (Source: wikipedia)",
    linkUrl: "https://www.semanticscholar.org",
    wikiUrl: "wikidata.org/wiki/Q22908627",
    bangsEngine: ["!semantic_scholar", "!se"],
    bangsCategory: ["!science", "!scientific_publications"],
  },
  openairedatasets: {
    description:
      "The Framework Programmes for Research and Technological Development, also called Framework Programmes or abbreviated FP1 to FP9, are funding programmes created by the European Union/European Commission to support and foster research in the European Research Area (ERA). Starting in 2014, the funding programmes were named Horizon. (Source: wikipedia)",
    linkUrl: "https://www.openaire.eu",
    wikiUrl: "wikidata.org/wiki/Q25106053",
    bangsEngine: ["!openairedatasets", "!oad"],
    bangsCategory: ["!science"],
  },
  openairepublications: {
    description:
      "The Framework Programmes for Research and Technological Development, also called Framework Programmes or abbreviated FP1 to FP9, are funding programmes created by the European Union/European Commission to support and foster research in the European Research Area (ERA). Starting in 2014, the funding programmes were named Horizon. (Source: wikipedia)",
    linkUrl: "https://www.openaire.eu",
    wikiUrl: "wikidata.org/wiki/Q25106053",
    bangsEngine: ["!openairepublications", "!oap"],
    bangsCategory: ["!science"],
  },
  pdbe: {
    description: "European data center for the global PDB archive (Source: wikidata)",
    linkUrl: "https://www.ebi.ac.uk/pdbe",
    wikiUrl: "wikidata.org/wiki/Q55823905",
    bangsEngine: ["!pdbe", "!pdb"],
    bangsCategory: ["!science"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // FILES
  // -------------------------------------------------------------------------------------------------------------------------------

  apkmirror: {
    description: "Free and safe Android APK downloads (Source: https://www.apkmirror.com)",
    linkUrl: "https://www.apkmirror.com",
    wikiUrl: "wikidata.org/wiki/Q55823905",
    bangsEngine: ["!apk_mirror", "!apkm"],
    bangsCategory: ["!files", "!apps"],
  },
  appstore: {
    description:
      "The App Store is an app marketplace developed and maintained by Apple, for mobile apps on its iOS and iPadOS operating systems. The store allows users to browse and download approved apps developed within Apple's iOS SDK. Apps can be downloaded on the iPhone, iPod Touch, or iPad, and some can be transferred to the Apple Watch smartwatch or 4th-generation or newer Apple TVs as extensions of iPhone apps. (Source: wikipedia)",
    linkUrl: "https://www.apple.com/app-store",
    wikiUrl: "wikidata.org/wiki/Q368215",
    bangsEngine: ["!apple_app_store", "!aps"],
    bangsCategory: ["!files", "!apps"],
  },
  fdroid: {
    description: `F-Droid is a free and open source app store and software repository for Android, serving a similar function to the Google Play store. The main repository, hosted by the project, contains only free and open source apps. Applications can be browsed, downloaded and installed from the F-Droid website or client app without the need to register an account. "Anti-features" such as advertising, user tracking, or dependence on non-free software are flagged in app descriptions. (Source: wikipedia)`,
    linkUrl: "https://f-droid.org/",
    wikiUrl: "wikidata.org/wiki/Q1386210",
    bangsEngine: ["!fdroid", "!fd"],
    bangsCategory: ["!files", "!apps"],
  },
  playstore: {
    description:
      "Google Play, which is also known as the Google Play Store, Play Store, or sometimes the Android Store (and was formerly known as the Android Market), is a digital distribution service operated and developed by Google. It serves as the official app store for certified devices running on the Android operating system and its derivatives, as well as ChromeOS, allowing users to browse and download applications developed with the Android software development kit and published through Google. Google Play has also served as a digital media store, with it offering various media for purchase such as books, movies, musical singles, television programs, and video games. (Source: wikipedia)",
    linkUrl: "https://play.google.com",
    wikiUrl: "wikidata.org/wiki/Q79576",
    bangsEngine: ["!google_play_apps", "!gpa"],
    bangsCategory: ["!files", "!apps"],
  },
  "1337x": {
    description:
      "1337x is an online website that provides a directory of torrent files and magnet links used for peer-to-peer file sharing through the BitTorrent protocol. According to the TorrentFreak news blog, 1337x is the second-most popular torrent website as of 2024. The U.S. Trade Representative flagged it as one of the most notorious pirate sites earlier in 2024. The site and its variants have been blocked in a variety of nations including Australia, and Portugal. (Source: wikipedia)",
    linkUrl: "https://1337x.to",
    wikiUrl: "wikidata.org/wiki/Q28134166",
    bangsEngine: ["!1337x"],
    bangsCategory: ["!files"],
  },
  annas: {
    description: `Anna's Archive is an open source search engine for shadow libraries that was launched by the pseudonymous Anna shortly after law enforcement efforts to shut down Z-Library in 2022. The site aggregates records from major shadow libraries including Z-Library, Sci-Hub, and Library Genesis, among other sources. It calls itself "the largest truly open library in human history", and has said it aims to "catalog all the books in existence" and "track humanity's progress toward making all these books easily available in digital form". It claims not to be responsible for downloads of copyrighted materials, since it indexes metadata and links to third-party downloads but does not directly host any files. However, it has faced government blocks and legal action from publishers and anti-piracy groups for engaging in large-scale copyright infringement. (Source: wikipedia)`,
    linkUrl: "https://annas-archive.org",
    wikiUrl: "wikidata.org/wiki/Q115288326",
    bangsEngine: ["!annas_archive", "!aa"],
    bangsCategory: ["!files"],
  },
  bt4g: {
    description: "a Search Engine based on DHT protocol (Source: https://bt4gprx.com)",
    linkUrl: "https://bt4gprx.com",
    wikiUrl: "",
    bangsEngine: ["!bt4g"],
    bangsCategory: ["!files"],
  },
  kickass: {
    description:
      "KickassTorrents was a website that provided a directory for torrent files and magnet links to facilitate peer-to-peer file sharing using the BitTorrent protocol. It was founded in 2008 and by November 2014, KAT became the most visited BitTorrent directory in the world, overtaking The Pirate Bay, according to the site's Alexa ranking. KAT went offline on 20 July 2016 when the domain was seized by the U.S. government. The site's proxy servers were shut down by its staff at the same time. (Source: wikipedia)",
    linkUrl: "https://kickasstorrents.to",
    wikiUrl: "wikidata.org/wiki/Q17062285",
    bangsEngine: ["!kickass", "!kc"],
    bangsCategory: ["!files"],
  },
  librarygenesis: {
    description: `Library Genesis is a shadow library project for file-sharing access to scholarly journal articles, academic and general-interest books, images, comics, audiobooks, and magazines. The site enables free access to content that is otherwise paywalled or not digitized elsewhere. LibGen describes itself as a "links aggregator", providing a searchable database of items "collected from publicly available public Internet resources" as well as files uploaded "from users". The URL libgen.is is currently down, and many websites are claiming to be the new domain, though none have been officially verified yet. (Source: wikipedia)`,
    linkUrl: "https://libgen.fun",
    wikiUrl: "wikidata.org/wiki/Q22017206",
    bangsEngine: ["!library_genesis", "!lg"],
    bangsCategory: ["!files"],
  },
  nyaa: {
    description:
      "A BitTorrent community focused on Eastern Asian media including anime, manga, music, and more (Source: https://nyaa.si/)",
    linkUrl: "https://nyaa.si",
    wikiUrl: "",
    bangsEngine: ["!nyaa", "!ny"],
    bangsCategory: ["!files"],
  },
  piratebay: {
    description:
      "The Pirate Bay, commonly abbreviated as TPB, is a free searchable online index of movies, music, video games, pornography and software. Founded in 2003 by Swedish think tank Piratbyrån, The Pirate Bay facilitates the connection among users of the peer-to-peer torrent protocol, which are able to contribute to the site through the addition of magnet links. The Pirate Bay has consistently ranked as one of the most visited torrent websites in the world. (Source: wikipedia)",
    linkUrl: "https://thepiratebay.org",
    wikiUrl: "wikidata.org/wiki/Q22663",
    bangsEngine: ["!piratebay", "!tpb"],
    bangsCategory: ["!files"],
  },
  zlibrary: {
    description:
      "Z-Library is a shadow library project for file-sharing access to scholarly journal articles, academic texts and general-interest books. It began as a mirror of Library Genesis, but has expanded dramatically. (Source: wikipedia)",
    linkUrl: "https://zlibrary-global.se",
    wikiUrl: "wikidata.org/wiki/Q104863992",
    bangsEngine: ["!z-library", "!zlib"],
    bangsCategory: ["!files"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // SOCIAL MEDIA
  // -------------------------------------------------------------------------------------------------------------------------------

  "9gag": {
    description:
      "9gag is an online platform and social media website based in Hong Kong, which allows its users to upload and share user-generated content or other content from external social media websites. Since the platform for collections of Internet memes was launched on April 11, 2008, it has grown in popularity across social media such as Facebook, Twitter, and Instagram. (Source: wikipedia)",
    linkUrl: "https://9gag.com",
    wikiUrl: "wikidata.org/wiki/Q277421",
    bangsEngine: ["!9gag", "!9g"],
    bangsCategory: ["!social_media"],
  },
  lemmycomments: {
    description: `Lemmy is a free and open-source software for running self-hosted social news aggregation and discussion forums. These hosts, known as "instances", communicate with each other using the ActivityPub protocol. (Source: wikipedia)`,
    linkUrl: "https://lemmy.ml",
    wikiUrl: "wikidata.org/wiki/Q84777032",
    bangsEngine: ["!lemmy_comments", "!lecom"],
    bangsCategory: ["!social_media"],
  },
  lemmycommunities: {
    description: `Lemmy is a free and open-source software for running self-hosted social news aggregation and discussion forums. These hosts, known as "instances", communicate with each other using the ActivityPub protocol. (Source: wikipedia)`,
    linkUrl: "https://lemmy.ml",
    wikiUrl: "wikidata.org/wiki/Q84777032",
    bangsEngine: ["!lemmy_communities", "!leco"],
    bangsCategory: ["!social_media"],
  },
  lemmyposts: {
    description: `Lemmy is a free and open-source software for running self-hosted social news aggregation and discussion forums. These hosts, known as "instances", communicate with each other using the ActivityPub protocol. (Source: wikipedia)`,
    linkUrl: "https://lemmy.ml",
    wikiUrl: "wikidata.org/wiki/Q84777032",
    bangsEngine: ["!lemmy_posts", "!lepo"],
    bangsCategory: ["!social_media"],
  },
  lemmyusers: {
    description: `Lemmy is a free and open-source software for running self-hosted social news aggregation and discussion forums. These hosts, known as "instances", communicate with each other using the ActivityPub protocol. (Source: wikipedia)`,
    linkUrl: "https://lemmy.ml",
    wikiUrl: "wikidata.org/wiki/Q84777032",
    bangsEngine: ["!lemmy_users", "!leus"],
    bangsCategory: ["!social_media"],
  },
  mastodonhashtags: {
    description:
      "Mastodon is an open source and self-hosted social networking service with microblogging features similar to Twitter, alongside platforms like Threads and Bluesky. (Source: wikipedia)",
    linkUrl: "https://joinmastodon.org",
    wikiUrl: "wikidata.org/wiki/Q27986619",
    bangsEngine: ["!mastodon_hashtags", "!mah"],
    bangsCategory: ["!social_media"],
  },
  mastodonusers: {
    description:
      "Mastodon is an open source and self-hosted social networking service with microblogging features similar to Twitter, alongside platforms like Threads and Bluesky. (Source: wikipedia)",
    linkUrl: "https://joinmastodon.org",
    wikiUrl: "wikidata.org/wiki/Q27986619",
    bangsEngine: ["!mastodon_users", "!mau"],
    bangsCategory: ["!social_media"],
  },
  reddit: {
    description: `Reddit is an American social news aggregation, content rating, and forum social network. Registered users submit content to the site such as links, text posts, images, and videos, which are then voted up or down by other members. Posts are organized by subject into user-created boards called "subreddits". Submissions with more upvotes appear towards the top of their subreddit and, if they receive enough upvotes, ultimately on the site's front page. Reddit administrators moderate the communities. Moderation is also conducted by community-specific moderators, who are unpaid volunteers. It is operated by Reddit, Inc., based in San Francisco. (Source: wikipedia)`,
    linkUrl: "https://www.reddit.com",
    wikiUrl: "wikidata.org/wiki/Q1136",
    bangsEngine: ["!reddit", "!re"],
    bangsCategory: ["!social_media"],
  },
  tootfinder: {
    description: "Opt-in global Mastodon full text search.",
    linkUrl: "https://www.tootfinder.ch",
    wikiUrl: "",
    bangsEngine: ["!tootfinder", "!toot"],
    bangsCategory: ["!social_media"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // Other
  // -------------------------------------------------------------------------------------------------------------------------------

  etymonline: {
    description:
      "Etymonline, or Online Etymology Dictionary, sometimes abbreviated as OED, is a free online dictionary that describes the origins of English words, written and compiled by Douglas R. Harper. (Source: wikipedia)",
    linkUrl: "https://www.etymonline.com",
    wikiUrl: "wikidata.org/wiki/Q1188617",
    bangsEngine: ["!etymonline", "!et"],
    bangsCategory: ["!other", "!dictionaries"],
  },
  wiktionary: {
    description: `Wiktionary is a multilingual, web-based project to create a free content dictionary of terms in all natural languages and in a number of artificial languages. These entries may contain definitions, images for illustration, pronunciations, etymologies, inflections, usage examples, quotations, related terms, and translations of terms into other languages, among other features. It is collaboratively edited via a wiki. Its name is a portmanteau of the words wiki and dictionary. It is available in 196 languages and in Simple English. Like its sister project Wikipedia, Wiktionary is run by the Wikimedia Foundation, and is written collaboratively by volunteers, dubbed "Wiktionarians". Its wiki software, MediaWiki, allows almost anyone with access to the website to create and edit entries. (Source: wikipedia)`,
    linkUrl: "https://www.wiktionary.org",
    wikiUrl: "wikidata.org/wiki/Q151",
    bangsEngine: ["!wiktionary", "!wt"],
    bangsCategory: ["!other", "!dictionaries"],
  },
  wordnik: {
    description:
      "Wordnik, a nonprofit organization, is an online English dictionary and language resource that provides dictionary and thesaurus content. Some of the content is based on print dictionaries such as the Century Dictionary, the American Heritage Dictionary, WordNet, and GCIDE. Wordnik has collected a corpus of billions of words which it uses to display example sentences, allowing it to provide information on a much larger set of words than a typical dictionary. Wordnik uses as many real examples as possible when defining a word. (Source: wikipedia)",
    linkUrl: "https://www.wordnik.com",
    wikiUrl: "wikidata.org/wiki/Q8034401",
    bangsEngine: ["!wordnik", "!def"],
    bangsCategory: ["!other", "!dictionaries"],
  },
  imdb: {
    description: `The Internet Movie Database (IMDb) is an online database of information related to films, television series, podcasts, home videos, video games, and streaming content online – including cast, production crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews. IMDb began as a fan-operated movie database on the Usenet group "rec.arts.movies" in 1990, and moved to the Web in 1993. Since 1998, it has been owned and operated by IMDb.com, Inc., a subsidiary of Amazon. (Source: wikipedia)`,
    linkUrl: "https://imdb.com",
    wikiUrl: "wikidata.org/wiki/Q37312",
    bangsEngine: ["!imdb"],
    bangsCategory: ["!other", "!movies"],
  },
  rottentomatoes: {
    description: `Rotten Tomatoes is an American review-aggregation website for film and television. The company was launched in August 1998 by three undergraduate students at the University of California, Berkeley: Senh Duong, Patrick Y. Lee, and Stephen Wang. Although the name "Rotten Tomatoes" connects to the practice of audiences throwing rotten tomatoes in disapproval of a poor stage performance, the direct inspiration for the name from Duong, Lee, and Wang came from an equivalent scene in the 1992 Canadian film Léolo. (Source: wikipedia)`,
    linkUrl: "https://www.rottentomatoes.com",
    wikiUrl: "wikidata.org/wiki/Q105584",
    bangsEngine: ["!rottentomatoes", "!rt"],
    bangsCategory: ["!other", "!movies"],
  },
  openmeteo: {
    description:
      "Open-Source ☀️️️️️️️️️️️️️️️️️️️️️️️️️️️️️ Weather API with free access for non-commercial use. No API Key required ✅. Accurate weather forecasts for any location. Open-Meteo provides high-resolution open data ranging from 1 to 11 kilometers from national weather services. With a user-friendly JSON API, integrating weather data has never been easier. Experience the precision and convenience of Open-Meteo's Forecast API for reliable and comprehensive weather information worldwide. (Source: https://open-meteo.com)",
    linkUrl: "https://open-meteo.com",
    wikiUrl: "",
    bangsEngine: ["!openmeteo", "!om"],
    bangsCategory: ["!other", "!weather"],
  },
  emojipedia: {
    description:
      "Emojipedia is an emoji reference website which documents the meaning and common usage of emoji characters in the Unicode Standard. Most commonly described as an emoji encyclopedia or emoji dictionary, Emojipedia also publishes articles and provides tools for tracking new emoji characters, design changes and usage trends. It has been owned by Zedge since 2021. (Source: wikipedia)",
    linkUrl: "https://emojipedia.org",
    wikiUrl: "wikidata.org/wiki/Q22908129",
    bangsEngine: ["!emojipedia", "!em"],
    bangsCategory: ["!other"],
  },
  goodreads: {
    description:
      "Goodreads is an American social cataloging website and a subsidiary of Amazon that allows individuals to search its database of books, annotations, quotes, and reviews. Users can sign up and register books to generate library catalogs and reading lists. They can also create their own groups of book suggestions, surveys, polls, blogs, and discussions. The website's offices are located in San Francisco. (Source: wikipedia)",
    linkUrl: "https://www.goodreads.com",
    wikiUrl: "wikidata.org/wiki/Q2359213",
    bangsEngine: ["!goodreads", "!good"],
    bangsCategory: ["!other"],
  },
  openlibrary: {
    description: `Open Library is an online project intended to create "one web page for every book ever published". Created by Aaron Swartz, Brewster Kahle, Alexis Rossi, Anand Chitipothu, and Rebecca Hargrave Malamud, Open Library is a project of the Internet Archive, a nonprofit organization. It has been funded in part by grants from the California State Library and the Kahle/Austin Foundation. Open Library provides online digital copies in multiple formats, created from images of many public domain, out-of-print, and in-print books. (Source: wikipedia)`,
    linkUrl: "https://openlibrary.org",
    wikiUrl: "wikidata.org/wiki/Q1201876",
    bangsEngine: ["!openlibrary", "!ol"],
    bangsCategory: ["!other"],
  },
  podcastindex: {
    description:
      "The Podcast Index is here to preserve, protect and extend the open, independent podcasting ecosystem. (Source: https://podcastindex.org)",
    linkUrl: "https://podcastindex.org",
    wikiUrl: "",
    bangsEngine: ["!podcastindex", "!podcast"],
    bangsCategory: ["!other"],
  },

  // -------------------------------------------------------------------------------------------------------------------------------
  // WIKI STUFF
  // -------------------------------------------------------------------------------------------------------------------------------

  wikipedia: {
    description:
      "Wikipedia is a free-content online encyclopedia written and maintained by a community of volunteers, known as Wikipedians, through open collaboration and the use of the wiki-based editing system MediaWiki. Wikipedia is the largest and most-read reference work in history. It is consistently ranked as one of the ten most popular websites in the world, and as of 2024 is ranked the fifth most visited website on the Internet by Semrush. Founded by Jimmy Wales and Larry Sanger on January 15, 2001, Wikipedia is hosted by the Wikimedia Foundation, an American nonprofit organization that employs a staff of over 700 people. (Source: wikipedia)",
    linkUrl: "https://www.wikipedia.org",
    wikiUrl: "wikidata.org/wiki/Q52",
    bangsEngine: ["!wikipedia", "!wp"],
    bangsCategory: ["!general"],
  },
  wikidata: {
    description:
      "Wikidata is a collaboratively edited multilingual knowledge graph hosted by the Wikimedia Foundation. It is a common source of open data that Wikimedia projects such as Wikipedia, and anyone else, is able to use under the CC0 public domain license. Wikidata is a wiki powered by the software MediaWiki, including its extension for semi-structured data, the Wikibase. (Source: wikipedia)",
    linkUrl: "https://wikidata.org",
    wikiUrl: "wikidata.org/wiki/Q2013",
    bangsEngine: ["!wikidata", "!wd"],
    bangsCategory: ["!general"],
  },
  wikibooks: {
    description:
      "Wikibooks is a wiki-based Wikimedia project hosted by the Wikimedia Foundation for the creation of free content digital textbooks and annotated texts that anyone can edit. (Source: wikipedia)",
    linkUrl: "https://www.wikibooks.org",
    wikiUrl: "wikidata.org/wiki/Q367",
    bangsEngine: ["!wikibooks", "!wb"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikiquote: {
    description:
      "Wikiquote is part of a family of wiki-based projects run by the Wikimedia Foundation using MediaWiki software. The project's objective is to collaboratively produce a vast reference of quotations from prominent people, books, films, proverbs, etc. and writings about them. The website aims to be as accurate as possible regarding the provenance and sourcing of the quotations. (Source: wikipedia)",
    linkUrl: "https://www.wikiquote.org",
    wikiUrl: "wikidata.org/wiki/Q369",
    bangsEngine: ["!wikiquote", "!wq"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikisource: {
    description:
      "Wikisource is an online digital library of free-content textual sources on a wiki, operated by the Wikimedia Foundation. Wikisource is the name of the project as a whole and the name for each instance of that project ; multiple Wikisources make up the overall project of Wikisource. The project's aim is to host all forms of free text, in many languages, and translations. Originally conceived as an archive to store useful or important historical texts, it has expanded to become a general-content library. The project officially began on November 24, 2003, under the name Project Sourceberg, a play on the famous Project Gutenberg. The name Wikisource was adopted later that year and it received its own domain name. (Source: wikipedia)",
    linkUrl: "https://www.wikisource.org",
    wikiUrl: "wikidata.org/wiki/Q263",
    bangsEngine: ["!wikisource", "!ws"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikispecies: {
    description:
      "Wikispecies is a wiki-based online project supported by the Wikimedia Foundation. Its aim is to create a comprehensive open content catalogue of all species; the project is directed at scientists, rather than at the general public. Jimmy Wales stated that editors are not required to fax in their degrees, but that submissions will have to pass muster with a technical audience. Wikispecies is available under the GNU Free Documentation License and CC BY-SA 3.0. (Source: wikipedia)",
    linkUrl: "https://species.wikimedia.org",
    wikiUrl: "wikidata.org/wiki/Q13679",
    bangsEngine: ["!wikispecies", "!wsp"],
    bangsCategory: ["!general", "!science", "!wikimedia"],
  },
  wikiversity: {
    description:
      "Wikiversity is a Wikimedia Foundation project that supports learning communities, their learning materials, and resulting activities. It differs from Wikipedia in that it offers tutorials and other materials for the fostering of learning, rather than an encyclopedia. It is available in many languages. (Source: wikipedia)",
    linkUrl: "https://species.wikimedia.org",
    wikiUrl: "wikidata.org/wiki/Q370",
    bangsEngine: ["!wikiversity", "!wv"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikivoyage: {
    description:
      'Wikivoyage is a free web-based travel guide for travel destinations and travel topics written by volunteer authors. It is a sister project of Wikipedia and supported and hosted by the same non-profit Wikimedia Foundation (WMF). Wikivoyage has been called the "Wikipedia of travel guides". (Source: wikipedia)',
    linkUrl: "https://www.wikivoyage.org",
    wikiUrl: "wikidata.org/wiki/Q373",
    bangsEngine: ["!wikivoyage", "!wy"],
    bangsCategory: ["!general", "!wikimedia"],
  },
  wikinews: {
    description: `Wikinews is a free-content news wiki and a project of the Wikimedia Foundation that works through collaborative journalism through user-created content. Wikipedia co-founder Jimmy Wales has distinguished Wikinews from Wikipedia by saying, "On Wikinews, each story is to be written as a news story as opposed to an encyclopedia article." Wikinews's neutral point of view policy aims to distinguish it from other citizen journalism efforts such as Indymedia and OhmyNews. In contrast to most Wikimedia Foundation projects, Wikinews allows original work in the form of original reporting and interviews. In contrast to newspapers, Wikinews does not permit op-ed. (Source: wikipedia)`,
    linkUrl: "https://www.wikinews.org",
    wikiUrl: "wikidata.org/wiki/Q964",
    bangsEngine: ["!wikinews", "!wn"],
    bangsCategory: ["!news", "!wikimedia"],
  },
  wikicommons: {
    description:
      "Wikimedia Commons, or simply Commons, is a wiki-based media repository of free-to-use images, sounds, videos and other media. It is a project of the Wikimedia Foundation. (Source: wikipedia)",
    linkUrl: "https://commons.wikimedia.org",
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
