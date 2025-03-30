import type { Context } from "elysia";
import type { IGeniusSearchResponse } from "../../types/lyrics.types";
import { getLyricsFromGenius } from "./utils/lyrics-genius";
import { getLyricsFromLyricsOvh } from "./utils/lyrics-ovh";
import { getLyricsFromAZ } from "./utils/lyrics-az";

// GET - /lyrics
export const handleGetLyrics = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    throw ctx.error(400, "No query provided!");
  }

  const searchRes = await fetch(`https://api.genius.com/search?q=${q}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
    },
  });

  const searchData = (await searchRes.json()) as IGeniusSearchResponse;

  if (!searchData) {
    throw ctx.error(400, "Song not found, try another song!");
  }

  // Find one with lyrics
  const firstRes = searchData.response.hits.filter(
    (song) => song.type === "song" && song.result.lyrics_state === "complete"
  )[0];

  if (!firstRes) {
    throw ctx.error(400, "Song not found, try another song!");
  }

  if (process.env.LYRICS_FETCH_METHOD === "genius") {
    // Gets 403 on VPS :(
    const lyricsData = await getLyricsFromGenius(ctx, firstRes);
    return lyricsData;
  } else if (process.env.LYRICS_FETCH_METHOD === "lyrics-ovh") {
    // Works on VPS
    const lyricsData = await getLyricsFromLyricsOvh(ctx, firstRes);
    return lyricsData;
  } else if (process.env.LYRICS_FETCH_METHOD === "az") {
    // Gets 403 on VPS :(
    const lyricsData = await getLyricsFromAZ(ctx, firstRes);
    return lyricsData;
  } else {
    return ctx.error(400, "Blocked by Genius");
  }
};
