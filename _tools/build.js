// Ubacuje <picture> markup za slidere apartmana i galeriju u index.html
// između oznaka <!-- gen:x --> ... <!-- /gen:x -->. Ostatak index.html se uređuje ručno.
// Pokretanje: node build.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const IMG = 'images/optimized';
const M = JSON.parse(fs.readFileSync(path.join(ROOT, IMG, 'manifest.json'), 'utf8'));
const bySlug = Object.fromEntries(M.map(m => [m.slug, m]));
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function picture(slug, sizes, { lazy = true, cls = '' } = {}) {
  const m = bySlug[slug];
  if (!m) throw new Error('Nema slike: ' + slug);
  const ws = m.widths.filter(w => w <= m.w); // bez povećanih verzija
  const set = ext => ws.map(w => `${IMG}/${slug}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `${IMG}/${slug}-${ws[ws.length - 1]}.jpg`;
  return `<picture><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">` +
    `<img${cls ? ` class="${cls}"` : ''} src="${fallback}" srcset="${set('jpg')}" sizes="${sizes}" width="${m.w}" height="${m.h}"` +
    `${lazy ? ' loading="lazy"' : ''} decoding="async" alt="${esc(m.alt)}"></picture>`;
}
const largest = slug => { const m = bySlug[slug]; return `${IMG}/${slug}-${Math.max(...m.widths.filter(w => w <= m.w))}.webp`; };

// --- Slideri apartmana (redoslijed: najjača fotka prva) ---
const SLIDERS = {
  'slider-a4': ['a4-terasa-pergola', 'a4-kuhinja-boravak', 'pogled-balkon-siroki', 'a4-dnevni', 'a4-spavaca-balkon', 'a4-terasa',
    'a4-kuhinja', 'a4-spavaca', 'a4-blagovaonica', 'a4-spavaca-2', 'a4-terasa-zelenilo', 'a4-spavaca-kreveti', 'a4-kupaonica',
    'a4-spavaca-3', 'a4-kupaonica-2', 'natkriveni-kutak'],
  'slider-a2plus1': ['a2p1-spavaca-balkon', 'pogled-balkon-more', 'a2p1-dnevni', 'a2p1-boravak', 'a2p1-spavaca', 'a2p1-blagovaonica',
    'a2p1-kuhinja', 'a2p1-balkon-ulaz', 'a2p1-dnevni-2', 'a2p1-spavaca-2', 'pogled-balkon-stol'],
  'slider-a2': ['a2-soba-terasa', 'a2-boravak', 'a2-kuhinja-terasa', 'a2-terasa', 'a2-krevet', 'a2-kuhinja', 'a2-tv-kauc',
    'a2-terasa-ulaz', 'a2-kupaonica', 'a2-kupaonica-2'],
};
const SIZES_SLIDER = '(min-width: 64em) 58vw, 100vw';

// --- Galerija: kurirani redoslijed, filteri kuca / apartmani / okolica ---
const filterOf = c => (['kuca', 'pogled', 'okucnica'].includes(c) ? 'kuca' : c === 'okolica' ? 'okolica' : 'apartmani');
const LEAD = ['pogled-balkon-hero', 'dvoriste-ulazi', 'a4-terasa-pergola', 'pogled-otocic', 'a4-kuhinja-boravak', 'kuca-cijela',
  'a4-spavaca-balkon', 'a2-soba-terasa', 'a4-terasa-zelenilo', 'vanjsko-ognjiste', 'a4-dnevni', 'a2p1-spavaca-balkon',
  'a2-kuhinja-terasa', 'pogled-balkon-siroki', 'a4-terasa', 'dvoriste-smokva', 'vrt-odrina-pogled', 'okolica-gradska-plaza'];
const rest = M.filter(m => m.category !== 'tlocrt' && !LEAD.includes(m.slug))
  .sort((a, b) => ['kuca', 'apartmani', 'okolica'].indexOf(filterOf(a.category)) - ['kuca', 'apartmani', 'okolica'].indexOf(filterOf(b.category)));
const GALLERY = [...LEAD.map(s => bySlug[s]), ...rest];
const SIZES_GRID = '(min-width: 82em) 420px, (min-width: 64em) 31vw, 47vw';

const blocks = {};
for (const [key, slugs] of Object.entries(SLIDERS)) {
  blocks[key] = slugs.map((s, i) =>
    `              <div class="slider__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${slugs.length}">` +
    picture(s, SIZES_SLIDER) + `</div>`).join('\n');
}
blocks.gallery = GALLERY.map((m, i) =>
  `          <li class="masonry__item${m.h > m.w ? ' is-tall' : ''}" data-cat="${filterOf(m.category)}">` +
  `<a class="masonry__link" href="${largest(m.slug)}" data-index="${i}" data-caption="${esc(m.alt)}">` +
  picture(m.slug, SIZES_GRID) + `</a></li>`).join('\n');

// Inline CSS (izvor: styles.css) — uklanja render-blocking zahtjev
const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').replace(/\n+/g, '\n').trim();
blocks.css = '  <style>\n' + css + '\n  </style>';

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const [key, markup] of Object.entries(blocks)) {
  const re = new RegExp(`(<!-- gen:${key} -->)[\\s\\S]*?(<!-- /gen:${key} -->)`);
  if (!re.test(html)) throw new Error('Nema oznake gen:' + key);
  html = html.replace(re, `$1\n${markup}\n$2`);
}
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('OK —', Object.entries(SLIDERS).map(([k, v]) => `${k}: ${v.length}`).join(', '), `| galerija: ${GALLERY.length}`);
console.log('story kuca-oleandri:', bySlug['kuca-oleandri'].w + 'x' + bySlug['kuca-oleandri'].h, bySlug['kuca-oleandri'].widths);
