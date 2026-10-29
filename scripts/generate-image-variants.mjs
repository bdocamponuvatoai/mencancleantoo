// Generates the resized images that src/lib/image-loader.ts points at.
// Scans the exported HTML and RSC payloads in out/ for ".w<width>." references and
// writes each one from its original, never enlarging past the source width.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("out");
const MEDIA = "/_next/static/media/";
const VARIANT =
  /\/_next\/static\/media\/([^"'\s,)\\]+?)\.w(\d+)\.(webp|png|jpe?g)/gi;

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? listFiles(p) : [p];
    }),
  );
  return nested.flat();
}

const wanted = new Map(); // variant path -> { original, width }
for (const file of await listFiles(OUT_DIR)) {
  if (!/\.(html|txt)$/.test(file)) continue;
  for (const [, base, width, ext] of (await readFile(file, "utf8")).matchAll(
    VARIANT,
  )) {
    wanted.set(`${base}.w${width}.${ext}`, {
      original: `${base}.${ext}`,
      width: Number(width),
    });
  }
}

let written = 0;
for (const [variant, { original, width }] of wanted) {
  const source = path.join(OUT_DIR, MEDIA, original);
  const target = path.join(OUT_DIR, MEDIA, variant);
  if (await stat(target).catch(() => null)) continue;
  const image = sharp(source).resize({ width, withoutEnlargement: true });
  const ext = path.extname(original).toLowerCase();
  if (ext === ".webp") image.webp({ quality: 78, effort: 5 });
  else if (ext === ".png") image.png({ compressionLevel: 9 });
  else image.jpeg({ quality: 80, mozjpeg: true });
  await image.toFile(target);
  written++;
}
console.log(
  `Generated ${written} image variants (${wanted.size} referenced) in out/`,
);
