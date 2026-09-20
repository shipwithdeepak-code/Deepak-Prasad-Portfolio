import fs from "fs";
import path from "path";
import sharp from "sharp";

const ASSETS_SRC_DIR = path.resolve("assets-src/images");
const PUBLIC_IMAGES_DIR = path.resolve("public/images");

const VALID_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const VARIANTS = [
  { suffix: "", width: 1600, quality: 82 },
  { suffix: "-1200", width: 1200, quality: 81 },
  { suffix: "-800", width: 800, quality: 80 },
  { suffix: "-480", width: 480, quality: 78 },
];

async function run() {
  if (!fs.existsSync(ASSETS_SRC_DIR)) {
    console.log(`[image-pipeline] Directory ${ASSETS_SRC_DIR} does not exist. Creating...`);
    fs.mkdirSync(ASSETS_SRC_DIR, { recursive: true });
  }

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  }

  const files = fs.readdirSync(ASSETS_SRC_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return VALID_EXTS.has(ext);
  });

  if (files.length === 0) {
    console.log("[image-pipeline] No master images found in assets-src/images/. Skipping.");
    return;
  }

  console.log(`[image-pipeline] Found ${files.length} master image(s) in assets-src/images/`);

  // Step 1: Validate all masters first (must be 2:1 within 1%)
  for (const file of files) {
    const masterPath = path.join(ASSETS_SRC_DIR, file);
    const metadata = await sharp(masterPath).metadata();

    if (!metadata.width || !metadata.height) {
      console.error(`❌ [image-pipeline] Error: Could not read image dimensions for "${file}".`);
      process.exit(1);
    }

    const ratio = metadata.width / metadata.height;
    const deviation = Math.abs(ratio - 2.0) / 2.0;

    // Tolerance is 1% (ratio must be between 1.98 and 2.02)
    if (deviation > 0.01) {
      console.error(
        `\n❌ [image-pipeline] REJECTED: Master "${file}" has aspect ratio ${ratio.toFixed(4)} (${metadata.width}x${metadata.height}).`
      );
      console.error(
        `   Tolerance is within 1% of 2:1 (expected ~2.000, got ${ratio.toFixed(4)} with ${(deviation * 100).toFixed(2)}% deviation).`
      );
      console.error(
        `   Non-2:1 master images crop badly in card containers. Refusing build.\n`
      );
      process.exit(1);
    }
  }

  // Step 2: Generate variants for each master
  const tableRows = [];

  for (const file of files) {
    const masterPath = path.join(ASSETS_SRC_DIR, file);
    const masterStat = fs.statSync(masterPath);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);

    for (const variant of VARIANTS) {
      const outputFileName = `${baseName}${variant.suffix}.webp`;
      const outputPath = path.join(PUBLIC_IMAGES_DIR, outputFileName);

      let needsBuild = true;
      if (fs.existsSync(outputPath)) {
        const outStat = fs.statSync(outputPath);
        if (outStat.mtimeMs > masterStat.mtimeMs) {
          needsBuild = false;
        }
      }

      if (needsBuild) {
        // Preserve aspect ratio — do NOT force a height
        await sharp(masterPath)
          .resize({ width: variant.width, withoutEnlargement: true })
          .webp({ quality: variant.quality, effort: 6 })
          .toFile(outputPath);
      }

      const outStat = fs.statSync(outputPath);
      const outMeta = await sharp(outputPath).metadata();
      const sizeKb = (outStat.size / 1024).toFixed(1);

      tableRows.push({
        Master: file,
        Output: outputFileName,
        Width: outMeta.width,
        Height: outMeta.height,
        "Size (KB)": `${sizeKb} KB`,
        Status: needsBuild ? "Built" : "Cached",
      });
    }
  }

  console.log("\n[image-pipeline] Variant Generation Summary:");
  console.table(tableRows);
  console.log(`[image-pipeline] Completed processing ${files.length} master(s) into ${tableRows.length} variant(s).\n`);
}

run().catch((err) => {
  console.error("❌ [image-pipeline] Unexpected error:", err);
  process.exit(1);
});
