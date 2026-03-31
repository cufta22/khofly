import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const LOCALES_DIR = path.join(__dirname, "public", "locales");
const BASE_LANG_FILE = "en.json";

// Takes the default en.json and syncs everything else with it
function syncObjects(base, target) {
  const synced = {};

  Object.keys(base).forEach((key) => {
    if (typeof base[key] === "object" && base[key] !== null && !Array.isArray(base[key])) {
      synced[key] = syncObjects(base[key], target[key] || {});
    } else {
      synced[key] = target.hasOwnProperty(key) ? target[key] : `*${base[key]}`;
    }
  });

  return synced;
}

function runSync() {
  const basePath = path.join(LOCALES_DIR, BASE_LANG_FILE);

  if (!fs.existsSync(basePath)) {
    console.error(`❌ Error: Base file not found at ${basePath}`);
    process.exit(1);
  }

  const baseData = JSON.parse(fs.readFileSync(basePath, "utf8"));

  // Get all .json files in the directory
  const files = fs
    .readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith(".json") && file !== BASE_LANG_FILE);

  console.log(`🔄 Syncing ${files.length} languages based on ${BASE_LANG_FILE}`);

  files.forEach((file) => {
    const filePath = path.join(LOCALES_DIR, file);
    let targetData = {};

    try {
      targetData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
      console.warn(`⚠️  Could not parse ${file}, starting from scratch.`);
    }

    const updatedData = syncObjects(baseData, targetData);

    // Write back with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf8");
    console.log(`➡️  Synced - ${file}`);
  });

  console.log("✅ All translation files are now up to date.");
}

runSync();
