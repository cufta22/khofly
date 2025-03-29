import type { Context } from "elysia";
import type {
  IGeniusSearchResponse,
  ILyricsOvhResponse,
  ILyricsResponse,
} from "../../../types/lyrics.types";

// Get lyrics with fetch
export const getLyricsWithLyricsOvh = async (
  ctx: Context,
  firstRes: IGeniusSearchResponse["response"]["hits"][0]
): Promise<ILyricsResponse> => {
  const artist = firstRes.result?.primary_artist?.name || firstRes.result?.artist_names;
  const title = firstRes.result.title;

  const lyricsOvhRes = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

  const lyrics: ILyricsOvhResponse = await lyricsOvhRes.json();

  if (!lyrics?.lyrics) {
    throw ctx.error(400, "Lyrics not found, try another song!");
  }

  const fixedLyrics = lyrics.lyrics.replaceAll("\n\n", "\n");

  return {
    lyrics: fixedLyrics,
    title: title,
    artist: firstRes.result?.artist_names,
    releaseDate: firstRes?.result?.release_date_for_display,
    image: firstRes?.result?.header_image_url,
  };
};
