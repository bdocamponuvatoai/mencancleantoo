// Writes the resized copies of every image in src/assets/images/ to public/images/,
// one per width in src/lib/image-widths.json: photo.webp -> public/images/photo-w720.webp.
// src/lib/image-loader.ts points next/image at these files. They are committed, so any
// static host serves them as-is, whatever it does with the build output.
//
//   npm run images             regenerate (run after adding or replacing an image)
//   npm run images -- --check  fail if any variant is missing (`npm run check` runs this)
import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("src/assets/images");
const OUT = path.resolve("public/images");
const { deviceSizes, imageSizes } = JSON.parse(
  await readFile(path.resolve("src/lib/image-widths.json"), "utf8"),
);
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort(
  (a, b) => a - b,
);
const checkOnly = process.argv.includes("--check");

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false,
  );

await mkdir(OUT, { recursive: true });
const images = (await readdir(SRC)).filter((f) =>
  /\.(webp|png|jpe?g)$/i.test(f),
);
const missing = [];
let written = 0;
for (const file of images) {
  const { name, ext } = path.parse(file);
  for (const width of widths) {
    const target = path.join(OUT, `${name}-w${width}${ext.toLowerCase()}`);
    if (await exists(target)) continue;
    if (checkOnly) {
      missing.push(path.relative(process.cwd(), target));
      continue;
    }
    const image = sharp(path.join(SRC, file)).resize({
      width,
      withoutEnlargement: true,
    });
    if (ext === ".webp") image.webp({ quality: 78, effort: 5 });
    else if (ext === ".png") image.png({ compressionLevel: 9 });
    else image.jpeg({ quality: 80, mozjpeg: true });
    await image.toFile(target);
    written++;
  }
}

if (missing.length) {
  console.error(
    `Missing image variants (run \`npm run images\`):\n  ${missing.join("\n  ")}`,
  );
  process.exit(1);
}
console.log(
  checkOnly
    ? `All ${images.length * widths.length} image variants present.`
    : `Wrote ${written} image variants for ${images.length} images to public/images/.`,
);
