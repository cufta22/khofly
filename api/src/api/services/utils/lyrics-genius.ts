import type { Context } from "elysia";
import type { IGeniusSearchResponse, ILyricsResponse } from "../../../types/lyrics.types";

import html, { type HTMLElement } from "node-html-parser/dist/index";

const GENIUS_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Cache-Control": "max-age=0",
  TE: "Trailers",
};

// Get lyrics from Genius
export const getLyricsFromGenius = async (
  ctx: Context,
  firstRes: IGeniusSearchResponse["response"]["hits"][0]
): Promise<ILyricsResponse> => {
  console.log(firstRes.result.url);

  // Fetch the song html
  const songRes = await fetch(firstRes.result.url, {
    headers: GENIUS_HEADERS,
  });

  const songHtml = await songRes.text();

  const document = html(songHtml);

  const lyricsRoot = document?.getElementById("lyrics-root");

  // First, remove any contributor/translation elements
  const contributorElements = lyricsRoot?.querySelectorAll('[data-exclude-from-selection="true"]');
  for (const el of contributorElements || []) {
    el.remove();
  }
  // Then extract just the lyrics
  const lyrics = lyricsRoot
    ?.querySelectorAll("[data-lyrics-container='true']")
    .map((x: HTMLElement) => {
      for (const y of x.querySelectorAll("br")) {
        y.replaceWith(new html.TextNode("\n"));
      }

      return x.text;
    })
    .join("\n")
    .trim();

  if (!lyrics) {
    throw ctx.error(400, "Lyrics not found, try another song");
  }

  return {
    error: false,
    message: "Data from Genius",
    data: {
      lyrics: lyrics,
      title: firstRes?.result.title,
      artist: firstRes?.result.artist_names,
      releaseDate: firstRes?.result?.release_date_for_display,
      image: firstRes?.result?.header_image_url,
    },
  };
};
