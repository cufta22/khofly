import type { Context } from "elysia";

import fs from "node:fs";
import path from "node:path";

import dayjs from "dayjs";

// GET - /download
export const handleDownload = async (ctx: Context) => {
  const { searchParams } = new URL(ctx.request.url);
  const url = searchParams.get("url") || "";
  const from = searchParams.get("from") || "";
  const format = searchParams.get("format") || "";

  // Error handling
  if (!url) {
    ctx.set.status = 400;
    return { error: true, message: "URL is required!", data: null };
  }
  if (!["youtube"].includes(from)) {
    ctx.set.status = 400;
    return { error: true, message: "Invalid platform!", data: null };
  }
  if (from === "youtube" && !["mp4", "mp3"].includes(format)) {
    ctx.set.status = 400;
    return { error: true, message: "Invalid arguments!", data: null };
  }

  const tempDir = path.join(__dirname, `/../../../temp/media`);

  const randomNumbers = Math.floor(Math.random() * 100000);
  const dateNow = dayjs().format("YYYY-MM-DD-HH:mm");

  const staticUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/media"
      : "https://api-eu1.khofly.com/media";

  const fileNameYT = `${dateNow}-${randomNumbers}.${format}`;
  const outputPathYT = `${tempDir}/${fileNameYT}`;

  try {
    // -----------------------------------------------
    // Handle Youtube
    // -----------------------------------------------

    if (from === "youtube") {
      // Validate YouTube URL
      // if (false) {
      //   return { error: true, message: "Invalid YouTube URL", data: null };
      // }
    }

    // -----------------------------------------------
    // Handle Instagram
    // -----------------------------------------------

    if (from === "instagram") {
    }
  } catch (error) {
    console.log("failed catch");
    console.log(error);

    ctx.set.status = 400;
    return { error: true, message: "Download failed", data: null };
  }

  // ctx.set.status = 200;
  // return {
  //   error: false,
  //   message: "Download successful",
  //   data: {
  //     url: from === "youtube" ? `${staticUrl}/${fileNameYT}` : "",
  //     filename: from === "youtube" ? fileNameYT : "",
  //   },
  // };
};
