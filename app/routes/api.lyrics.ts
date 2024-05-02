// import { Client } from "genius-lyrics";

import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { IGeniusSearchResponse } from "@ts/lyrics.types";
import { platformJson } from "app/platform/json";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const client = new Client();

  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") || "";
  console.log(q);

  // Search for song
  const searchRes = await fetch(`https://api.genius.com/search?q=${q}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_API_KEY}`,
    },
  });

  const searchData = (await searchRes.json()) as IGeniusSearchResponse;

  if (!searchData) return platformJson(null);

  const firstRes = searchData.response.hits[0].result;
  console.log(firstRes.lyrics_state);

  // Fetch song data
  const songRes = await fetch(`https://api.genius.com${firstRes.api_path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_API_KEY}`,
    },
  });

  const songData = (await songRes.json()) as any;

  console.log(songData["response"]["song"]?.url);
  // const searches = await client.songs.search(q);
  // const song = searches[0];

  // const lyrics = await song?.lyrics();

  return platformJson({
    lyrics: "",
    title: "",
    artist: "",
    album: "",
    albumArt: "",
    releaseDate: "",
    image: "",
  });
  // return {
  //   lyrics: lyrics,
  //   title: song?.title,
  //   artist: song?.artist.name,
  //   album: song?.album?.name,
  //   albumArt: song?.album?.image,
  //   releaseDate: song?.releasedAt,
  //   image: song?.image,
  // };
};
