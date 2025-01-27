export interface IGeniusSearchResponse {
  meta: { status: number };
  response: {
    hits: [
      {
        index: "song";
        type: "song";
        result: {
          api_path: string;
          artist_names: string;
          full_title: string;
          header_image_thumbnail_url: string;
          header_image_url: string;
          lyrics_state: "complete";
          release_date_for_display: string;
          song_art_image_thumbnail_url: string;
          song_art_image_url: string;
          url: string;
          title: string;
          // ...and a few more
        };
      }
    ];
  };
}

export interface IGeniusSongResponse {
  meta: { status: number };
  response: {
    song: {
      artist_names: string;
      description: any;
      full_title: string;
      header_image_thumbnail_url: string;
      header_image_url: string;
    };
  };
}
