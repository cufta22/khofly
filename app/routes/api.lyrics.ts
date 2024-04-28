import { Client } from "genius-lyrics";

import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const client = new Client();

  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") || "";

  const searches = await client.songs.search(q);
  const song = searches[0];

  const lyrics = await song?.lyrics();

  return {
    lyrics: lyrics,
    title: song?.title,
    artist: song?.artist.name,
    album: song?.album?.name,
    albumArt: song?.album?.image,
    releaseDate: song?.releasedAt,
    image: song?.image,
  };
};
