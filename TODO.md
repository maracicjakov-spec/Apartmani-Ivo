# Apartmani Ivo — što treba potvrditi ili poslati

Stranica prikazuje **samo podatke s oglasa na Apartmanija.hr** (preuzeto 13. 10. 2026.). Sve ispod je ili pretpostavka iz briefa, ili nedostaje, ili je na oglasu nejasno.

## 1. Tekst za potvrdu (vlasnica)

- [ ] **Priča „Kuća koja nosi očevo ime“** (sekcija ispod heroja). Napisana je iz briefa i iz teksta dobrodošlice s oglasa (kava ili sok na dolasku, prospekti, kava na terasi, peršin iz vrta). Treba potvrditi:
  - da su apartmani dobili ime po Štefkinu ocu Ivi (na oglasu toga nema),
  - smije li se Štefka spomenuti imenom i potpisati („Dobro došli, Štefka“).
- [ ] Kratki opisi apartmana („Najprostraniji apartman u kući…“ itd.). Sastavljeni su iz fotografija i tlocrta.
- [ ] Engleski i njemački prijevodi. Dobro bi bilo da ih pročita izvorni govornik.

## 2. Podaci kojih nema na oglasu

- [ ] **Katovi.** Prikazano je: A4+1 kat, A2+1 kat, A2 prizemlje (prema briefu). Oglas kat ne navodi.
- [ ] **Raspored kreveta** za svaki apartman (npr. 1 bračni + 1 kauč na razvlačenje). Sada piše „raspored potvrđujemo na upit“.
- [ ] Broj soba: za A4+1 („2 spavaće sobe“) i A2+1 („spavaća soba i dnevni boravak“) očitano je s tlocrta na oglasu. A2 nema tlocrt.
- [x] **Kupaonice u A4+1:** dvije kupaonice, iz svake spavaće sobe ulaz u svoju (vlasnica, 9. 11. 2026.). Istaknuto na stranici.
- [ ] **Klima u A2:** na oglasu NIJE označena, a na fotografijama se vidi klima-uređaj. Ako je ima, dodajemo je.
- [ ] **Ljubimci:** prema oglasu dozvoljeni u A2 i A2+1, ali ne i u A4+1. Treba potvrditi.
- [ ] **Parking:** je li besplatan? Sada piše samo „Parking u dvorištu“.
- [ ] **E-mail adresa** (na oglasu je nema). Ako postoji, dodajemo je u kontakt i footer.
- [ ] **Jezici koje Štefka govori** (oglas navodi samo hrvatski). Važno je za goste koji pišu na engleskom ili njemačkom.

## 3. Cijene i uvjeti

- [ ] Cijene se namjerno ne prikazuju („Cijena na upit“), jer su na oglasu nedosljedne. Na oglasu piše: od 40 € (A2), 50 € (A2+1) i 70 € (A4+1) po noći. Ako vlasnica želi, može poslati točan cjenik po sezonama.
- [ ] Uvjeti iz sekcije „Dobro je znati“ (s oglasa): dolazak od 14 h, odlazak do 10 h, akontacija 30 %, turistička pristojba uključena, nadoplata 30 % za manje od 3 noći, 10 % popusta za više od 10 noći. Jesu li još aktualni?
- [ ] Na oglasu su očito pogrešne tri udaljenosti: željeznički kolodvor „450 km“, zračna luka „300 km“, disco klub „100 km“. Nisu prikazane na stranici. Vlasnica ih može ispraviti i na oglasu.

## 4. Fotografije

- [x] **9. 11. 2026.: nove profesionalne fotke od Štefke** (2 e-maila). A2 i A4+1 imaju potpuno nove galerije. Hero, otočić, dvorište, ognjište i natkriveni kutak zamijenjeni su originalima u punoj rezoluciji. Stare slike su sačuvane u mapi `stare slike/`, a stari originali u `images/original/_zamijenjeno`.
- [ ] Za **A2+1** i **okolicu** nove fotke nisu stigle, pa su ostale stare.
- [x] **9. 11. 2026., povratna informacija vlasnice:** „slike razbacane, ponavljaju se, ima starih, uz svaki apartman samo slike tog apartmana“. Riješeno:
  - slideri apartmana sadrže samo fotke tog apartmana (A4+1: 12, A2+1: 6, A2: 8), poredane kao šetnja kroz apartman, s opisom na svakoj fotki (HR/EN/DE)
  - galerija prikazuje samo kuću, vrt i pogled (6 fotki), bez apartmana i bez filtera
  - nijedna fotka se ne pojavljuje dvaput; `_tools/build.js` to provjerava i javlja grešku
  - maknute stare fotke s mobitela (2021./2023.), okolica (oko 2010.) i gotovo iste fotke iz starijeg snimanja (balkon, otočić)

- [ ] **Originali u punoj rezoluciji.** Oglas daje najviše 1024 px, pa su na velikim ekranima fotke malo mekane. Hero je blago povećan (1920 px) uz izoštravanje. Originali s fotoaparata ili mobitela bi to riješili.
- [ ] Nedostaje: **kupaonica A2+1**, **pogled iz A2** (oglas tvrdi „pogled na more“ i za A2), **spavaća soba A4+1 s oba kreveta**, kuća u predvečerje ili zalazak (idealno za hero).
- [ ] Fotografije okolice (gradska plaža, šetnica, vidikovac) su stare i malene (oko 600 px, oko 2010.). Nove fotke plaže Lišanj i šetnice bi puno podigle dojam.
- [ ] Izostavljeno s oglasa: 12 zastarjelih ili loših fotki i fotografije na kojima su prepoznatljive osobe (vidi `images/original/_izostavljeno`).

## 5. Tehničko (Jakov)

- [ ] **Domena.** U `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` i `sitemap.xml` stoji privremena domena `https://apartmani-ivo.vercel.app/`. Zamijeniti pravom domenom.
- [ ] Nakon objave: provjeriti Open Graph karticu (WhatsApp/Facebook pregled linka) i Google Search Console.
- [ ] Ako vlasnica pošalje nove fotke: staviti ih u `images/original/<kategorija>/`, dodati ih u `_tools/classify.js`, pa pokrenuti `node classify.js && node optimize.js && node build.js` (u mapi `_tools`).
- [ ] Nakon svake promjene `styles.css` pokrenuti `node _tools/build.js`, jer se CSS ubacuje inline u `index.html`.
