// Ubacuje <picture> markup za slidere apartmana, galeriju i sliku priče u index.html
// između oznaka <!-- gen:x --> ... <!-- /gen:x -->. Ostatak index.html se uređuje ručno.
// Pokretanje: node build.js
//
// PRAVILA ZA FOTOGRAFIJE (dogovor s vlasnicom, 9. 11. 2026.):
//  - uz svaki apartman idu ISKLJUČIVO fotografije tog apartmana (bez pogleda/dvorišta koji se ne mogu
//    pouzdano pripisati jednom apartmanu)
//  - nijedna fotografija se ne pojavljuje dvaput na stranici (hero, priča, interludij, slideri, galerija)
//  - galerija prikazuje samo kuću, vrt i pogled, i to samo nove profesionalne fotografije
//  - stare fotografije (mobitel 2021./2023., okolica oko 2010.) se ne prikazuju
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

// --- Slideri apartmana: [slug, i18n ključ opisa, opis (hr)] — redoslijed = šetnja kroz apartman ---
// A4+1: soba 1 (narančasto uzglavlje, balkon) → kupaonica s perilicom; soba 2 (bež uzglavlje) → kupaonica s tuš-kabinom
const SLIDERS = {
  'slider-a4': [
    ['a4-terasa-pergola', 'cap.a4.terrace', 'Natkrivena terasa'],
    ['a4-dnevni', 'cap.a4.living', 'Dnevni boravak s izlazom na balkon'],
    ['a4-kuhinja-boravak', 'cap.a4.kitchen', 'Kuhinja, blagovaonica i boravak'],
    ['a4-blagovaonica', 'cap.a4.dining', 'Blagovaonica'],
    ['a4-spavaca-balkon', 'cap.a4.bed1', 'Spavaća soba 1 · izlaz na balkon'],
    ['a4-spavaca', 'cap.a4.bed1bath', 'Spavaća soba 1 · vrata vlastite kupaonice'],
    ['a4-kupaonica', 'cap.a4.bath1', 'Kupaonica 1 · ulaz iz spavaće sobe 1'],
    ['a4-spavaca-2', 'cap.a4.bed2', 'Spavaća soba 2'],
    ['a4-spavaca-kreveti', 'cap.a4.bed2b', 'Spavaća soba 2 · ormar i prozor'],
    ['a4-kupaonica-2', 'cap.a4.bath2', 'Kupaonica 2 · ulaz iz spavaće sobe 2'],
    ['a4-terasa', 'cap.a4.terrace2', 'Terasa uz maslinu'],
    ['a4-terasa-zelenilo', 'cap.a4.terrace3', 'Terasa okružena zelenilom'],
  ],
  'slider-a2plus1': [
    ['a2p1-spavaca-balkon', 'cap.a2p1.bed', 'Spavaća soba s izlazom na balkon'],
    ['a2p1-dnevni', 'cap.a2p1.living', 'Dnevni boravak'],
    ['a2p1-boravak', 'cap.a2p1.dining', 'Blagovaonica i kuhinjski kutak'],
    ['a2p1-kuhinja', 'cap.a2p1.kitchen', 'Kuhinja'],
    ['a2p1-spavaca', 'cap.a2p1.bed2', 'Spavaća soba'],
    ['a2p1-balkon-ulaz', 'cap.a2p1.balcony', 'Balkon'],
  ],
  'slider-a2': [
    ['a2-soba-terasa', 'cap.a2.room', 'Soba s izlazom na terasu'],
    ['a2-boravak', 'cap.a2.bed', 'Bračni krevet i kauč'],
    ['a2-krevet', 'cap.a2.bed2', 'Spavaći dio s ormarom'],
    ['a2-kuhinja-terasa', 'cap.a2.kitchen', 'Kuhinja s izlazom na terasu'],
    ['a2-kuhinja', 'cap.a2.dining', 'Kuhinja i blagovaonski stol'],
    ['a2-kupaonica', 'cap.a2.bath', 'Kupaonica'],
    ['a2-terasa', 'cap.a2.terrace', 'Vlastita terasa'],
    ['a2-terasa-ulaz', 'cap.a2.entrance', 'Terasa ispred ulaza'],
  ],
};
const SIZES_SLIDER = '(min-width: 64em) 58vw, 100vw';

// --- Galerija: samo kuća, vrt i pogled. [slug, dodatna klasa] ---

const GALLERY = [
  ['kuca-cijela', ''],
  ['vanjsko-ognjiste', ''],
  ['pogled-krk', ''],
  ['kamene-stube', ''],
  ['pogled-oleandri', ''],
  ['limun', ''],
];
const SIZES_GRID = '(min-width: 82em) 420px, (min-width: 64em) 31vw, 47vw';


// --- Slike izvan generiranih blokova (ručno u index.html) — za provjeru ponavljanja ---
const FIXED = ['pogled-balkon-hero', 'pogled-otocic'];
const STORY = 'dvoriste-ulazi';

// Provjera: nijedna fotografija dvaput
const used = [...FIXED, STORY, ...Object.values(SLIDERS).flat().map(([s]) => s), ...GALLERY.map(([s]) => s)];
const dupes = used.filter((s, i) => used.indexOf(s) !== i);
if (dupes.length) throw new Error('Fotografija se ponavlja: ' + dupes.join(', '));
// Provjera: slider apartmana sadrži samo fotke tog apartmana
const UNIT = { 'slider-a4': 'a4', 'slider-a2plus1': 'a2plus1', 'slider-a2': 'a2' };
for (const [key, list] of Object.entries(SLIDERS)) for (const [s] of list) {
  if (!bySlug[s]) throw new Error('Nema slike: ' + s);
  if (bySlug[s].unit !== UNIT[key]) throw new Error(`${s} nije fotografija apartmana ${UNIT[key]}`);
}

const blocks = {};
for (const [key, list] of Object.entries(SLIDERS)) {
  blocks[key] = list.map(([s, capKey, cap], i) =>
    `              <figure class="slider__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${list.length}">` +
    picture(s, SIZES_SLIDER) + `<figcaption class="slider__cap" data-i18n="${capKey}">${esc(cap)}</figcaption></figure>`).join('\n');
}
blocks.gallery = GALLERY.map(([s, cls], i) => {
  const m = bySlug[s];
  return `          <li class="masonry__item${cls ? ' ' + cls : ''}${m.h > m.w ? ' is-tall' : ''}" data-cat="kuca">` +
    `<a class="masonry__link" href="${largest(s)}" data-index="${i}" data-caption="${esc(m.alt)}">` +
    picture(s, SIZES_GRID) + `</a></li>`;
}).join('\n');
blocks.story = '          ' + picture(STORY, '(min-width: 64em) 40vw, 92vw');

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
// Provjera: nijedna slika u index.html se ne referencira iz dva različita mjesta izvan srcseta istog elementa
const refs = [...html.matchAll(/images\/optimized\/([a-z0-9-]+?)-\d+\.(?:jpg|webp)/g)].map(m => m[1]);
const unknown = [...new Set(refs)].filter(s => !used.includes(s));
if (unknown.length) throw new Error('U index.html su slike izvan popisa: ' + unknown.join(', '));
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('OK —', Object.entries(SLIDERS).map(([k, v]) => `${k}: ${v.length}`).join(', '), `| galerija: ${GALLERY.length}`, `| ukupno različitih fotki: ${used.length}`);
