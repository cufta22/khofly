// Common response
export interface ISearXNGResultsCommon {
  query: string;
  number_of_results: number;
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

// General tab

export interface ISearXNGResultsGeneral extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;
  }>;
}

// Images tab

export interface ISearXNGResultsImages extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // For images
    thumbnail_src: string;
    source: string;
    img_format: string;
    resolution: string;
  }>;
}

// Videos tab

export interface ISearXNGResultsVideos extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // For videos
    thumbnail: string;
    iframe_src: string;
    metadata: string;
    source: string;
  }>;
}

// News tab

export interface ISearXNGResultsNews extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // For news
    source: string;
    publishedDate: string;
  }>;
}

// Music tab

export interface ISearXNGResultsMusic extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // For music
    iframe_src: string;
    thumbnail: string;
    publishedDate: string | null;
  }>;
}

// IT tab

export interface ISearXNGResultsIT extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // docker-hub, github, npm
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
}

// Science tab

export interface ISearXNGResultsScience extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
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
}

export interface ISearXNGResultsFiles extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content?: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // File data
    magnetlink?: string;
    seed?: string;
    leech?: string;
    filesize?: number;
    publishedDate?: string;
  }>;
}

// Social Media tab

export interface ISearXNGResultsSocialMedia extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content?: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // Post data
    publishedDate: string;
  }>;
}

// Blank response

export interface ISearXNGResultsBlank extends ISearXNGResultsCommon {
  results: Array<any>;
}

// Shared for multiple tabs RowCommon

export interface ISearXNGResultsShared extends ISearXNGResultsCommon {
  results: Array<{
    // common
    title: string;
    url: string;
    content?: string;
    engine: string;
    parsed_url: Array<string>;
    template: string;
    engines: Array<string>;
    positions: Array<number>;
    score: number;
    category: string;
    img_src?: string;

    // For images
    thumbnail_src?: string;
    // source: string;
    img_format?: string;
    resolution?: string;

    // For videos
    // thumbnail: string;
    // iframe_src: string;
    metadata?: string;
    // source: string;

    // For news
    source?: string;
    // publishedDate: string;

    // For music
    iframe_src?: string;
    thumbnail?: string;
    // publishedDate: string | null;

    // docker-hub, github, npm
    // publishedDate?: string;
    package_name?: string;
    maintainer?: string;
    // tags?: Array<string>;
    popularity?: string | number;

    // github
    license_name?: string;
    license_url?: string;
    homepage?: string;
    source_code_url?: string;

    // npm
    version?: string;

    // Article data
    authors?: Array<string>;
    tags?: Array<string>;
    pdf_url?: string;
    doi?: string;
    // publishedDate?: string;
    publisher?: string;
    journal?: string;
    type?: string;
    isbn?: Array<string>;
    issn?: Array<string>;

    // File data
    magnetlink?: string;
    seed?: string;
    leech?: string;
    filesize?: number;
    // publishedDate?: string;

    // Post data, file data, article data
    publishedDate?: string;
  }>;
}
