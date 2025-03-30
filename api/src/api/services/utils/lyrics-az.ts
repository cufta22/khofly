import type { Context } from "elysia";
import type { IGeniusSearchResponse, ILyricsResponse } from "../../../types/lyrics.types";

import html from "node-html-parser/dist/index";

const AZ_HEADERS = {
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

// Get lyrics from AZLyrics
export const getLyricsFromAZ = async (
  ctx: Context,
  firstRes: IGeniusSearchResponse["response"]["hits"][0]
): Promise<ILyricsResponse> => {
  const artist = firstRes.result.primary_artist.name
    .replaceAll(" ", "")
    .replaceAll(/[\W_]+/gi, "")
    .toLocaleLowerCase();
  const song = firstRes.result.title
    .replaceAll(" ", "")
    .replaceAll(/[\W_]+/gi, "")
    .toLocaleLowerCase();

  // Fetch the song html
  const songRes = await fetch(`https://www.azlyrics.com/lyrics/${artist}/${song}.html`, {
    headers: AZ_HEADERS,
  });

  const songHtml = await songRes.text();

  //   return {
  //     lyrics: songHtml,
  //     title: firstRes?.result.title,
  //     artist: firstRes?.result.artist_names,
  //     releaseDate: firstRes?.result?.release_date_for_display,
  //     image: firstRes?.result?.header_image_url,
  //   };

  const document = html.parse(songHtml);

  const lyricsRoot = document?.querySelector("div.col-xs-12.col-lg-8.text-center");

  if (!lyricsRoot) {
    throw ctx.error(400, "Lyrics not found, try another song!");
  }

  const lyrics = lyricsRoot
    ?.querySelectorAll("div")
    .filter((obj) => obj["rawAttrs"] === "")[0]
    .innerHTML.replace("\r\n\r\n", "")
    .replaceAll("<br><br>", "\n")
    .replaceAll("<br>", "")
    .replaceAll("&quot;", `"`);

  if (!lyrics) {
    throw ctx.error(400, "Lyrics not found, try another song!");
  }

  return {
    lyrics: lyrics,
    title: firstRes?.result.title,
    artist: firstRes?.result.artist_names,
    releaseDate: firstRes?.result?.release_date_for_display,
    image: firstRes?.result?.header_image_url,
  };
};
