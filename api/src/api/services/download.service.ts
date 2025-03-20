import type { Context } from "elysia";
import { __dirname } from "../../config";

import path from "node:path";

import dayjs from "dayjs";
import { checkFileExists } from "./utils/fileExists";

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

  const tempDir = path.join(__dirname, `/../temp/media`);

  const randomNumbers = Math.floor(Math.random() * 100000);
  const dateNow = dayjs().format("YYYY-MM-DD-HH:mm");

  const staticUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/media"
      : `${process.env.HOST}/media`;

  const fileNameYT = `${dateNow}-${randomNumbers}.${format}`;
  const outputPathYT = `${tempDir}/${fileNameYT}`;

  try {
    // -----------------------------------------------
    // Handle Youtube
    // -----------------------------------------------
    if (from === "youtube") {
      // Validate YouTube URL
      const youtubeRegex =
        /^(https?:\/\/)?(www\.|m\.|music\.)?((youtube\.com\/(watch\?v=|shorts\/|playlist\?list=))|youtu\.be\/)[a-zA-Z0-9_-]{1,}(&.*)?$/;
      if (!youtubeRegex.test(url)) {
        return { error: true, message: "Invalid YouTube URL", data: null };
      }

      // Build the command
      const ytCommand = [`yt-dlp`];

      // If mp3 is selected
      if (format === "mp3") {
        ytCommand.push("-x");
        ytCommand.push("--audio-format");
        ytCommand.push("mp3");
      }

      // If mp4 is selected
      if (format === "mp4") {
        ytCommand.push("-f");
        // Takes forever to download ~2min
        // ytCommand.push("bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]");
        // Should be normal
        ytCommand.push(
          "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]"
        );
      }

      // Avoid captcha - add cookies
      const ytCookiesFilePath = path.join(__dirname, `/../yt-cookies.txt`);
      const ytCookiesFileExists = await checkFileExists(ytCookiesFilePath);
      if (ytCookiesFileExists) {
        ytCommand.push("--cookies");
        ytCommand.push(ytCookiesFilePath);
      }

      // Avoid captcha - add PO token
      if (process.env.YT_DLP_PO_TOKEN) {
        ytCommand.push(
          `--extractor-args "youtube:po_token=web.gvs+${process.env.YT_DLP_PO_TOKEN}"`
        );
      }

      ytCommand.push("-o");
      ytCommand.push(outputPathYT);
      ytCommand.push(url);

      // console.log(ytCommand.join(" "));

      const proc = Bun.spawn(ytCommand, {
        cwd: tempDir, // working directory
        onExit() {
          // exit handler
        },
      });

      // Wait for process to exit
      const exitCode = await proc.exited;

      if (exitCode === 0) {
        return {
          error: false,
          message: "Download successful",
          data: {
            url: `${staticUrl}/${fileNameYT}`,
            filename: fileNameYT,
          },
        };
      } else {
        ctx.set.status = 400;
        return { error: true, message: "Download failed", data: null };
      }
    }

    // -----------------------------------------------
    // Handle Instagram
    // -----------------------------------------------
    if (from === "instagram") {
    }
  } catch (error) {
    ctx.set.status = 400;
    return { error: true, message: "Download failed", data: null };
  }
};
