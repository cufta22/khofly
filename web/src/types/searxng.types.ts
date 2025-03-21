// General tab

export interface ISearXNGResultsGeneral {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    img_src: string;
    score: number;
    category: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<{
    infobox: string;
    id: string;
    content: string;
    img_src: string;
    urls: {
      title: string;
      url: string;
    }[];
    attributes: Array<any>;
    engine: string;
    engines: Array<string>;
  }>;
  suggestions: Array<any>;
  unresponsive_engines: Array<string[]>;
}

// Images tab

export interface ISearXNGResultsImages {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    thumbnail_src: string;
    img_src: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    source: string;
    img_format: string;
    resolution: string;
    score: number;
    category: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<any>;
  unresponsive_engines: Array<string[]>;
}

// Videos tab

export interface ISearXNGResultsVideos {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    thumbnail: string;
    iframe_src: string;
    metadata: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    source: string;
    score: number;
    category: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<any>;
  unresponsive_engines: Array<string[]>;
}

// News tab

export interface ISearXNGResultsNews {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    source: string;
    score: number;
    category: string;
    publishedDate: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<any>;
  unresponsive_engines: Array<string[]>;
}

// Music tab

export interface ISearXNGResultsMusic {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    score: number;
    category: string;
    iframe_src: string;
    img_src: string;
    thumbnail: string;
    publishedDate: string | null;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}

// IT tab

export interface ISearXNGResultsIT {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    score: number;
    category: string;

    // docker-hub, github, npm
    img_src?: string;
    publishedDate?: string;
    package_name?: string;
    maintainer?: string;
    tags?: Array<string>;
    popularity?: string | number;

    // github
    license_name?: string;
    license_url?: string;
    homepage?: string;
    source_code_url?: string;

    // npm
    version?: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}

// Science tab

export interface ISearXNGResultsScience {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    score: number;
    category: string;
    img_src?: string;

    // Article data
    authors?: Array<string>;
    tags?: Array<string>;
    pdf_url?: string;
    doi?: string;
    publishedDate?: string;
    publisher?: string;
    journal?: string;
    type?: string;
    isbn?: Array<string>;
    issn?: Array<string>;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}

export interface ISearXNGResultsFiles {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;

    // File data
    magnetlink?: string;
    seed?: string;
    leech?: string;
    filesize?: number;
    publishedDate?: string;
    img_src?: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}

// Social Media tab

export interface ISearXNGResultsSocialMedia {
  query: string;
  number_of_results: number;
  results: Array<{
    title: string;
    url: string;
    template: string;
    engine: string;
    parsed_url: Array<string>;
    engines: Array<string>;
    positions: Array<number>;
    content: string;
    score: number;
    category: string;
    publishedDate: string;
  }>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}

// Blank response

export interface ISearXNGResultsBlank {
  query: string;
  number_of_results: number;
  results: Array<any>;
  answers: Array<any>;
  corrections: Array<any>;
  infoboxes: Array<any>;
  suggestions: Array<string>;
  unresponsive_engines: Array<string[]>;
}
