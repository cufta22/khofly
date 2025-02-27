import type { Context } from "elysia";

import fs from "node:fs";
import path from "node:path";

import dayjs from "dayjs";

// Youtube downloader
import ytdl from "@distube/ytdl-core";

// GET - /download
export const handleDownload = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const url = searchParams.get("url") || "";
  const from = searchParams.get("from") || "";
  const format = searchParams.get("format") || "";

  console.log(url);
  console.log(from);

  // Error handling
  if (!url) {
    ctx.set.status = 400;
    return "URL is required!";
  }
  if (!["youtube"].includes(from)) {
    ctx.set.status = 400;
    return "Invalid platform!";
  }
  if (from === "youtube" && !["mp4", "mp3"].includes(from)) {
    ctx.set.status = 400;
    return "Invalid arguments!";
  }

  const tempDir = path.join(__dirname, `/../../../temp/media`);

  const randomNumbers = Math.floor(Math.random() * 100000);
  const dateNow = dayjs().format("YYYY/MM/DD-mm");

  // Handle Youtube
  if (from === "youtube") {
    const outputPathYT = `${tempDir}/${dateNow}-${randomNumbers}.${format}`;

    //   try {
    //     ytdl(url)
    //       .pipe(fs.createWriteStream(outputPathYT))
    //       .on("finish", () => {
    //         ctx.set.status = 200;
    //         return "Download successful";
    //       })
    //       .on("error", () => {
    //         ctx.set.status = 400;
    //         return "Download failed";
    //       });
    //   } catch (error) {
    //     console.log(error);

    //     ctx.set.status = 400;
    //     return "Download failed";
    //   }
  }

  // Handle Instagram

  ctx.set.status = 200;
  return "Something happened";
};
