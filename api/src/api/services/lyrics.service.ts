import { Context } from "elysia";
import { IGeniusSearchResponse } from "../../types/genius.types";

// GET - /lyrics
export const handleGetLyrics = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    ctx.set.status = 400;
    return "No query provided!";
  }

  ctx.set.status = 400;
  return "WIP Endpoint!";

  // if (!lyrics) {
  //   ctx.set.status = 400;
  //   return "Lyrics not found, try another song!";
  // }

  // return {
  //   lyrics: lyrics,
  //   title: firstRes?.result.title,
  //   artist: firstRes?.result.artist_names,
  //   releaseDate: firstRes?.result?.release_date_for_display,
  //   image: firstRes?.result?.header_image_url,
  // };
};
