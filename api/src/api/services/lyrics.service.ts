import { Context } from "elysia";
import { IGeniusSearchResponse } from "../../types/genius.types";

import html from "node-html-parser/dist/index";

// GET - /lyrics
export const handleGetLyrics = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const q = searchParams.get("q") || "";

  console.log("q: " + q);

  if (!q) {
    ctx.set.status = 400;
    return "No query provided!";
  }

  const searchRes = await fetch(`https://api.genius.com/search?q=${q}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_API_KEY}`,
    },
  });

  console.log("searchRes");

  const searchData = (await searchRes.json()) as IGeniusSearchResponse;

  console.log("searchData");
  console.log("searchData.length: " + searchData.response.hits.length);

  if (!searchData) {
    ctx.set.status = 400;
    return "Song not found, try another song!";
  }

  // Find one with lyrics
  const firstRes = searchData.response.hits.filter(
    (song) => song.type === "song" && song.result.lyrics_state === "complete"
  )[0];
  console.log("firstRes");
  console.log("firstRes URL: " + firstRes.result.url);

  if (!firstRes) {
    ctx.set.status = 400;
    return "Song not found, try another song!";
  }

  // Fetch the song html
  const songRes = await fetch(firstRes.result.url);
  const songHtml = await songRes.text();

  console.log("songHtml");
  console.log("songHtml.length: " + songHtml?.length);
  // console.log(songHtml?.substring(0, 200));

  const document = html(songHtml);

  console.log(
    "lyricsRoot fould?? " + document.toString().indexOf("lyrics-root")
  );

  const lyricsRoot = document?.getElementById("lyrics-root");

  console.log("lyricsRoot");
  console.log(lyricsRoot?.toString().substring(0, 200));

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

  console.log("lyrics");
  console.log(lyrics?.substring(1, 50));

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
