import { Context } from "elysia";
import { IGeniusSearchResponse } from "../../types/genius.types";

import html from "node-html-parser/dist/index";

// GET - /lyrics
export const handleGetLyrics = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    ctx.set.status = 400;
    return "No query provided!";
  }

  const searchRes = await fetch(`https://api.genius.com/search?q=${q}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_API_KEY}`,
    },
  });

  const searchData = (await searchRes.json()) as IGeniusSearchResponse;

  if (!searchData) {
    ctx.set.status = 400;
    return "Song not found, try another song!";
  }

  // Find one with lyrics
  const firstRes = searchData.response.hits.filter(
    (song) => song.type === "song" && song.result.lyrics_state === "complete"
  )[0];

  if (!firstRes) {
    ctx.set.status = 400;
    return "Song not found, try another song!";
  }

  // Fetch the song html
  const songRes = await fetch(firstRes.result.url);
  const songHtml = await songRes.text();

  const document = html(songHtml);
  const lyricsRoot = document?.getElementById("lyrics-root");

  const lyrics = lyricsRoot
    ?.querySelectorAll("[data-lyrics-container='true']")
    .map((x) => {
      x.querySelectorAll("br").forEach((y) => {
        y.replaceWith(new html.TextNode("\n"));
      });
      return x.text;
    })
    .join("\n")
    .trim();

  if (!lyrics) {
    ctx.set.status = 400;
    return "Lyrics not found, try another song!";
  }

  return {
    lyrics: lyrics,
    title: firstRes?.result.title,
    artist: firstRes?.result.artist_names,
    releaseDate: firstRes?.result?.release_date_for_display,
    image: firstRes?.result?.header_image_url,
  };
};
