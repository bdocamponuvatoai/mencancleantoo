// Generates the resized images that src/lib/image-loader.ts points at.
// Scans the exported HTML and RSC payloads in out/ for "<file>.w<width>.<ext>" references
// under /_next/static/ (Next writes media to /_next/static/media/ locally and to
// /_next/static/immutable/media/ on some hosts, e.g. Vercel) and writes each one from its
// original, never enlarging past the source width. Fails the build if an original is missing,
// so a broken image can never ship silently.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("out");
const VARIANT =
  /(\/_next\/static\/[^"'\s,)\\]+?)\.w(\d+)\.(webp|png|jpe?g|avif)/gi;

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

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false,
  );

const wanted = new Map(); // variant url path -> { original, width }
for (const file of await listFiles(OUT_DIR)) {
  if (!/\.(html|txt)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  for (const [, base, width, ext] of text.matchAll(VARIANT)) {
    wanted.set(`${base}.w${width}.${ext}`, {
      original: `${base}.${ext}`,
      width: Number(width),
    });
  }
}

const missing = [];
let written = 0;
for (const [variant, { original, width }] of wanted) {
  // The file may sit at the referenced path or, on hosts that remap /_next/static/immutable/
  // at deploy time, at the plain /_next/static/ path. Write the variant beside whichever exists.
  const candidates = [
    original,
    original.replace("/_next/static/immutable/", "/_next/static/"),
  ];
  let found = null;
  for (const c of candidates)
    if (await exists(path.join(OUT_DIR, c))) {
      found = c;
      break;
    }
  if (!found) {
    missing.push(original);
    continue;
  }
  const source = path.join(OUT_DIR, found);
  const target = path.join(
    OUT_DIR,
    found === original
      ? variant
      : variant.replace("/_next/static/immutable/", "/_next/static/"),
  );
  if (await exists(target)) continue;
  const image = sharp(source).resize({ width, withoutEnlargement: true });
  const ext = path.extname(original).toLowerCase();
  if (ext === ".webp") image.webp({ quality: 78, effort: 5 });
  else if (ext === ".png") image.png({ compressionLevel: 9 });
  else if (ext === ".avif") image.avif({ quality: 60 });
  else image.jpeg({ quality: 80, mozjpeg: true });
  await image.toFile(target);
  written++;
}

if (missing.length) {
  console.error(
    `Image originals not found in out/:\n  ${[...new Set(missing)].join("\n  ")}`,
  );
  process.exit(1);
}
if (wanted.size === 0) {
  console.error(
    "No resized image references found in out/. Is src/lib/image-loader.ts in use?",
  );
  process.exit(1);
}
console.log(
  `Generated ${written} image variants (${wanted.size} referenced) in out/`,
);
