import type { Context } from "elysia";
import type {
  IGeniusSearchResponse,
  ILyricsResponse,
  ILyricsWorkerResponse,
} from "../../../types/lyrics.types";

import html from "node-html-parser/dist/index";

// Get lyrics with CF worker
export const getLyricsWithWorker = async (
  ctx: Context,
  firstRes: IGeniusSearchResponse["response"]["hits"][0]
): Promise<ILyricsResponse> => {
  if (!process.env.LYRICS_WORKER_URL) {
    throw ctx.error(400, "No lyrics worker URL!");
  }

  console.log(`Worker req: ${`${process.env.LYRICS_WORKER_URL}?songUrl=${firstRes.result.url}`}`);
  console.log(`Origin header: ${`${process.env.HOST || "https://example.com"}`}`);

  const lyricsWorkerRes = await fetch(
    `${process.env.LYRICS_WORKER_URL}?songUrl=${firstRes.result.url}`,
    {
      headers: {
        Origin: `${process.env.HOST || "https://example.com"}`,
      },
    }
  );

  const songHtml: ILyricsWorkerResponse = await lyricsWorkerRes.json();

  if (!songHtml?.songHtml) {
    throw ctx.error(400, "Lyrics not found, try another song!");
  }

  console.log(`songHtml length: ${songHtml?.songHtml?.length}`);
  console.log(`songHtml substr: ${songHtml?.songHtml?.substring(0, 5500)}`);

  const document = html(songHtml.songHtml);

  const lyricsRoot = document?.getElementById("lyrics-root");

  const lyrics = lyricsRoot
    ?.querySelectorAll("[data-lyrics-container='true']")
    .map((x: any) => {
      // x.querySelectorAll("br").forEach((y) => {
      //   y.replaceWith(new html.TextNode("\n"));
      // });

      for (const y of x.querySelectorAll("br")) {
        y.replaceWith(new html.TextNode("\n"));
      }

      return x.text;
    })
    .join("\n")
    .trim();

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
