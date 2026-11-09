// Optimizacija: WebP (q78) + JPG fallback u širinama 640 / 1280 / 1920.
// Stare fotke s oglasa su najviše 1024 px pa se NE povećavaju: za njih 640 + izvorna širina.
// Nove profesionalne fotke (2800–3000 px) dobivaju 640 / 1280 / 1920; hero još i 2560 za retina ekrane.
const sharp = require('sharp'), fs = require('fs'), path = require('path');
const SRC = '../images/original', OUT = '../images/optimized';
const HERO = 'pogled-balkon-hero';
fs.mkdirSync(OUT, { recursive: true });
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

(async () => {
  const result = [];
  for (const m of manifest) {
    const img = sharp(path.join(SRC, m.file)).rotate();
    const { width, height } = await img.metadata();
    let widths = [640, 1280, 1920].filter(w => w <= width);
    if (width < 1280 && width > 640) widths.push(width);
    if (!widths.length) widths = [width];
    if (m.slug === HERO) widths = [640, 1280, 1920, 2560].filter(w => w <= width);
    widths = [...new Set(widths)].sort((a, b) => a - b);
    for (const w of widths) {
      const base = sharp(path.join(SRC, m.file)).rotate().resize({ width: w, kernel: 'lanczos3', withoutEnlargement: m.slug !== HERO });
      const p = w > width ? base.sharpen({ sigma: 0.6 }) : base;
      await p.clone().webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${m.slug}-${w}.webp`));
      await p.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${m.slug}-${w}.jpg`));
    }
    result.push({ ...m, w: width, h: height, widths });
  }
  // Open Graph kartica 1200×630
  const hero = manifest.find(m => m.slug === HERO);
  await sharp(path.join(SRC, hero.file)).resize(1200, 630, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.5 }).jpeg({ quality: 82, mozjpeg: true }).toFile('../images/og-image.jpg');
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(result, null, 1));
  const bytes = fs.readdirSync(OUT).reduce((s, f) => s + fs.statSync(path.join(OUT, f)).size, 0);
  console.log(result.length, 'slika,', fs.readdirSync(OUT).length, 'datoteka,', (bytes / 1e6).toFixed(1), 'MB');
})();
