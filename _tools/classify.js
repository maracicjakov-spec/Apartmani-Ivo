// Ručna klasifikacija nakon vizualnog pregleda svih 120 fotografija s oglasa.
// [datoteka, kategorija, jedinica|null, slug, alt (hr)]
// kategorije: kuca, pogled, okucnica, apartman-a4, apartman-a2plus1, apartman-a2, kupaonica, kuhinja, okolica, interijer, tlocrt
// _duplikati = ista fotka objavljena u više galerija, _izostavljeno = zastarjelo / loše / prepoznatljive osobe
const fs = require('fs'), path = require('path');
const K = [
 ['10210_1065_1692010565.jpg','okucnica',null,'vrt-odrina-pogled','Vrtni stol pod odrinom, travnjak i pogled na more'],
 ['10210_1345_1778958113.jpg','_zamijenjeno'], // vanjsko-ognjiste (stara verzija s oglasa)
 ['10210_1394_1622895718.jpg','_izostavljeno'],
 ['10210_1675_1622895720.jpg','_izostavljeno'],
 ['10210_1952_1692010519.jpg','kuca',null,'kuca-oleandri','Bijela obiteljska kuća s crvenim krovom iza cvjetnih oleandara'],
 ['10210_2384_1778958114.jpg','_zamijenjeno'], // a2-spavaci-kutak (stara verzija s oglasa)
 ['10210_2631_1778958115.jpg','_zamijenjeno'], // a2-kuhinja (stara verzija s oglasa)
 ['10210_2703_1778958112.jpg','_zamijenjeno'], // dvoriste-ulazi (stara verzija s oglasa)
 ['10210_3036_1692010518.jpg','kuca',null,'kuca-ulica','Pročelje kuće pod vedrim nebom'],
 ['10210_3149_1778958116.jpg','_zamijenjeno'], // dvoriste-smokva (stara verzija s oglasa)
 ['10210_3339_1778958114.jpg','_duplikati'],
 ['10210_3848_1778958114.jpg','_zamijenjeno'], // a2-kupaonica (stara verzija s oglasa)
 ['10210_4010_1692010562.jpg','okucnica',null,'prolaz-uz-kucu','Mirni prolaz uz kuću sa stolom'],
 ['10210_4738_1778958113.jpg','_zamijenjeno'], // a2-terasa-ulaz (stara verzija s oglasa)
 ['10210_4957_1778958113.jpg','_zamijenjeno'], // a2-kuhinja-terasa (stara verzija s oglasa)
 ['10210_5488_1778958112.jpg','_zamijenjeno'], // a2-boravak (stara verzija s oglasa)
 ['10210_5772_1778958114.jpg','_zamijenjeno'], // a2-terasa (stara verzija s oglasa)
 ['10210_5972_1622895719.jpg','_izostavljeno'],
 ['10210_6451_1692010567.jpg','okucnica',null,'dvoriste-cvijece','Dvorište s cvijećem u posudama i stubištem prema katu'],
 ['10210_6632_1778958112.jpg','_zamijenjeno'], // a2-krevet (stara verzija s oglasa)
 ['10210_8565_1778958115.jpg','_zamijenjeno'], // a2-kupaonica-2 (stara verzija s oglasa)
 ['10210_8759_1778958115.jpg','_zamijenjeno'], // a2-soba-terasa (stara verzija s oglasa)
 ['10210_8875_1778958113.jpg','_zamijenjeno'], // a2-tv-kauc (stara verzija s oglasa)
 ['10210_9032_1778958112.jpg','_zamijenjeno'], // a2-soba (stara verzija s oglasa)
 ['10211_1014_1778959491.jpg','apartman-a2plus1','a2plus1','a2p1-spavaca-balkon','Spavaća soba apartmana A2+1 s izlazom na balkon i pogledom na more'],
 ['10211_1435_1778958986.jpg','_zamijenjeno'], // pogled-otocic (stara verzija s oglasa)
 ['10211_1548_1778958984.jpg','_duplikati'],
 ['10211_1934_1778959275.jpg','kuca',null,'kuca-cijela','Cijela kuća s vanjskim kamenim stubištem i balkonima'],
 ['10211_2015_1778959492.jpg','apartman-a2plus1','a2plus1','a2p1-boravak','Dnevni boravak s blagovaonicom u apartmanu A2+1'],
 ['10211_3657_1778958989.jpg','pogled',null,'pogled-balkon-kuce','Balkon s pogledom na krovove i more'],
 ['10211_3790_1692011697.jpg','okolica',null,'okolica-plaza-setnica','Šljunčana plaža uz šetnicu u Novom Vinodolskom'],
 ['10211_4113_1778958984.jpg','_zamijenjeno'], // pogled-balkon-hero (stara verzija s oglasa)
 ['10211_4702_1778959491.jpg','apartman-a2plus1','a2plus1','a2p1-blagovaonica','Blagovaonski stol i kuhinjski kutak u apartmanu A2+1'],
 ['10211_4746_1778959373.jpg','pogled',null,'pogled-balkon-more','Balkon s pogledom na more i čempres'],
 ['10211_4959_1778959492.jpg','apartman-a2plus1','a2plus1','a2p1-spavaca','Bračni krevet u spavaćoj sobi apartmana A2+1'],
 ['10211_5148_1778958985.jpg','pogled',null,'pogled-otocic-2','Pogled na otočić s kapelicom iznad crvenih krovova'],
 ['10211_5280_1692011685.jpg','okolica',null,'okolica-plaza-valovi','Šljunčana plaža i bistro more'],
 ['10211_5720_1778958990.jpg','pogled',null,'pogled-krk','Pogled na more i otok Krk iznad krošnji'],
 ['10211_6267_1778959491.jpg','kuhinja','a2plus1','a2p1-kuhinja','Kuhinja s plinskim kuhalom u apartmanu A2+1'],
 ['10211_6303_1778959372.jpg','pogled',null,'pogled-balkon-stol','Balkonski stol s pogledom na more'],
 ['10211_6720_1692012078.jpg','kuca',null,'kuca-brijeg','Kuća na padini s pogledom na more'],
 ['10211_6802_1778959491.jpg','apartman-a2plus1','a2plus1','a2p1-dnevni','Svijetli dnevni boravak apartmana A2+1'],
 ['10211_7740_1778958988.jpg','_zamijenjeno'], // pogled-balkon-siroki (stara verzija s oglasa)
 ['10211_8212_1692011745.jpg','_izostavljeno'],
 ['10211_8795_1778959492.jpg','apartman-a2plus1','a2plus1','a2p1-dnevni-2','Kauč i blagovaonski stol u apartmanu A2+1'],
 ['10211_9176_1778959373.jpg','apartman-a2plus1','a2plus1','a2p1-balkon-ulaz','Izlaz iz apartmana A2+1 na balkon'],
 ['10211_9419_1778959490.jpg','apartman-a2plus1','a2plus1','a2p1-spavaca-2','Spavaća soba apartmana A2+1'],
 ['10211_9434_1692012085.jpg','_duplikati'],
 ['10212_1043_1778958777.jpg','_zamijenjeno'], // a4-kuhinja-boravak (stara verzija s oglasa)
 ['10212_1351_1778958782.jpg','_zamijenjeno'], // a4-terasa-pergola (stara verzija s oglasa)
 ['10212_1847_1778958782.jpg','_duplikati'],
 ['10212_2117_1778958777.jpg','_zamijenjeno'], // a4-blagovaonica (stara verzija s oglasa)
 ['10212_2786_1778958783.jpg','_zamijenjeno'], // a4-spavaca (stara verzija s oglasa)
 ['10212_2851_1778958776.jpg','_zamijenjeno'], // a4-kupaonica (stara verzija s oglasa)
 ['10212_2950_1692010675.jpg','_duplikati'],
 ['10212_3012_1778958778.jpg','pogled',null,'pogled-oleandri','Pogled preko oleandara na more'],
 ['10212_3228_1778958778.jpg','_duplikati'],
 ['10212_3263_1778958778.jpg','okucnica',null,'kamene-stube','Kamene stube kroz vrt s maslinama'],
 ['10212_3295_1778958778.jpg','okucnica',null,'limun','Stablo limuna u vrtu'],
 ['10212_3597_1778958782.jpg','_zamijenjeno'], // a4-kuhinja (stara verzija s oglasa)
 ['10212_3982_1778958778.jpg','_zamijenjeno'], // a4-terasa-lezaljka (stara verzija s oglasa)
 ['10212_4235_1692010717.jpg','_duplikati'],
 ['10212_4452_1778958783.jpg','_zamijenjeno'], // a4-terasa-zelenilo (stara verzija s oglasa)
 ['10212_4873_1778958776.jpg','_zamijenjeno'], // a4-spavaca-2 (stara verzija s oglasa)
 ['10212_5185_1778958782.jpg','_zamijenjeno'], // a4-kupaonica-2 (stara verzija s oglasa)
 ['10212_5550_1778958781.jpg','_zamijenjeno'], // a4-kuhinja-2 (stara verzija s oglasa)
 ['10212_5813_1778958777.jpg','_zamijenjeno'], // a4-spavaca-balkon (stara verzija s oglasa)
 ['10212_6011_1778958780.jpg','_duplikati'],
 ['10212_6098_1778958777.jpg','_zamijenjeno'], // a4-terasa (stara verzija s oglasa)
 ['10212_6647_1622895608.jpg','_izostavljeno'],
 ['10212_6683_1778958779.jpg','_duplikati'],
 ['10212_6988_1778958779.jpg','_zamijenjeno'], // a4-terasa-limun (stara verzija s oglasa)
 ['10212_6995_1778958784.jpg','_duplikati'],
 ['10212_7133_1778958785.jpg','_duplikati'],
 ['10212_7188_1692010699.jpg','okucnica',null,'vrt-cvijece-pogled','Narančasto cvijeće u vrtu i pogled na more'],
 ['10212_7246_1622895514.jpg','_izostavljeno'],
 ['10212_7622_1692010718.jpg','_duplikati'],
 ['10212_8176_1778958779.jpg','_zamijenjeno'], // a4-dnevni (stara verzija s oglasa)
 ['10212_8205_1778958784.jpg','_duplikati'],
 ['10212_8251_1778958782.jpg','_zamijenjeno'], // a4-terasa-2 (stara verzija s oglasa)
 ['10212_8465_1778958783.jpg','_zamijenjeno'], // natkriveni-kutak (stara verzija s oglasa)
 ['10212_9356_1778958784.jpg','pogled',null,'pogled-balkon-cvijece','Balkon s cvijećem i pogledom na more'],
 ['10212_9395_1778958783.jpg','_zamijenjeno'], // a4-kuhinja-3 (stara verzija s oglasa)
 ['4418_5267_1692011311.jpg','okucnica',null,'ulaz-odrina','Ulaz u prizemlje ispod odrine'],
 ['4418_5375_1692011339.jpg','okucnica',null,'ljetna-kuhinja','Vanjsko ognjište i stubište prema katu'],
 ['4418_5515_1692011310.jpg','_duplikati'],
 ['4418_6333_1687717390.jpg','kuca',null,'prilaz-parking','Prilaz kući i parkiralište u dvorištu'],
 ['4418_6416_1692011302.jpg','_duplikati'],
 ['4418_6625_1625838575.jpg','okucnica',null,'vrt-pogled','Vrt s cvijećem i pogledom na more'],
 ['4418_6744_1692011338.jpg','_duplikati'],
 ['4418_6746_1625838652.jpg','okucnica',null,'dvoriste-rostilj','Dvorište s travnjakom, roštiljem i stubištem'],
 ['4418_7340_1692011322.jpg','okucnica',null,'vrt-stube','Kamene stube kroz zeleni vrt'],
 ['4418_8009_1692011293.jpg','_duplikati'],
 ['4418_8104_1692011343.jpg','kuca',null,'kuca-vrt','Kuća iznad terasastog vrta'],
 ['4418_8212_1692011346.jpg','okucnica',null,'odrina-stol','Stol pod odrinom s pogledom na more'],
 ['4418_8340_1625838498.jpg','_izostavljeno'],
 ['4418_8789_1692011341.jpg','okucnica',null,'dvoriste-parking','Dvorište s cvijećem i parkiralištem'],
 ['4418_9528_1692011283.jpg','_duplikati'],
 ['Ivo_14ac6ba9988c.jpg','okolica',null,'okolica-igraliste','Dječje igralište uz plažu'],
 ['Ivo_1709f5cfd828.jpg','_izostavljeno'],
 ['Ivo_172ee2a073a2.jpg','okolica',null,'okolica-setnica-grad','Šetnica uz more s pogledom na grad'],
 ['Ivo_1e28596a42ba.jpg','_izostavljeno'],
 ['Ivo_1eba134f8339.jpg','okolica',null,'okolica-grad-s-mora','Novi Vinodolski gledan s mora'],
 ['Ivo_418a08b94918.jpg','okolica',null,'okolica-stjenovita-plaza','Stjenovita plaža i bistro more'],
 ['Ivo_49f41904ae78.jpg','okolica',null,'okolica-otocic','Otočić s kapelicom ispred obale'],
 ['Ivo_54262f6b88b1.jpg','okolica',null,'okolica-vidikovac','Vidikovac iznad Vinodolske doline'],
 ['Ivo_65319bde83e3.jpg','_izostavljeno'],
 ['Ivo_6c34858aa905.jpg','okolica',null,'okolica-obala','Kamenita obala i šljunak'],
 ['Ivo_6dc7a4ec2414.jpg','okolica',null,'okolica-mol','Mol u predvečerje'],
 ['Ivo_874382072523.jpg','okolica',null,'okolica-tenis','Teniski tereni u borovoj šumi'],
 ['Ivo_b9d9eb772280.jpg','okolica',null,'okolica-gradska-plaza','Gradska plaža sa šetnicom'],
 ['Ivo_cd54db416cf2.jpg','okolica',null,'okolica-bistro-more','Bistro more uz stjenovitu obalu'],
 ['Ivo_d3fe57738637.jpg','_izostavljeno'],
 ['Ivo_e16b715340c1.jpg','okolica',null,'okolica-setnica','Kamena šetnica uz more'],
 ['Ivo_f4c1e28afde4.jpg','_izostavljeno'],
 ['Ivo_f8fe3b85c2a1.jpg','_duplikati'],
 ['Ivo_fdfecb07afa9.jpg','okolica',null,'okolica-park','Park uz more u hladu stabala'],
 ['ivo_10211tlocrt2_2.jpg','tlocrt','a2plus1','tlocrt-a2plus1','Tlocrt apartmana A2+1'],
 ['ivo_10212tlocrt4_2.jpg','tlocrt','a4','tlocrt-a4','Tlocrt apartmana A4+1'],
 ['ivo_4418rivicaipark.jpg','okolica',null,'okolica-rivica-park','Rivica i park uz more'],
 // --- Nove profesionalne fotografije (Štefka, e-mail 8. 11. 2026.) ---
 ['B48A0047.jpg','apartman-a2','a2','a2-soba-terasa','Soba apartmana A2 s bračnim krevetom, kaučem i izlazom na terasu'],
 ['B48A0046.jpg','apartman-a2','a2','a2-boravak','Bračni krevet, kauč i klima-uređaj u apartmanu A2'],
 ['B48A0069.jpg','apartman-a2','a2','a2-krevet','Bračni krevet, televizor i ormar u apartmanu A2'],
 ['B48A0048.jpg','apartman-a2','a2','a2-tv-kauc','Kauč, televizor i ormar u apartmanu A2'],
 ['B48A0076.jpg','kuhinja','a2','a2-kuhinja-terasa','Kuhinja apartmana A2 s vratima prema terasi'],
 ['B48A0073.jpg','kuhinja','a2','a2-kuhinja','Kuhinja s blagovaonskim stolom u apartmanu A2'],
 ['B48A0080.jpg','apartman-a2','a2','a2-terasa','Terasa apartmana A2 sa stolom i stolicama'],
 ['B48A0072.jpg','apartman-a2','a2','a2-terasa-ulaz','Terasa uz kameni zid ispred ulaza u apartman A2'],
 ['B48A0077.jpg','kupaonica','a2','a2-kupaonica','Kupaonica apartmana A2 s tušem i perilicom rublja'],
 ['B48A2125.jpg','kupaonica','a2','a2-kupaonica-2','Kupaonica apartmana A2'],
 ['B48A0081.jpg','okucnica',null,'vanjsko-ognjiste','Zidano vanjsko ognjište s roštiljem i sudoperom u dvorištu'],
 ['B48A0102.jpg','okucnica',null,'dvoriste-smokva','Dvorište u sjeni smokve ispred kuće'],
 ['B48A0103.jpg','okucnica',null,'dvoriste-ulazi','Popločeno dvorište s ulazima u apartmane i vanjskim stubištem'],
 ['B48A0012_3_4.jpg','apartman-a4','a4','a4-terasa-pergola','Natkrivena terasa apartmana A4+1 s ležaljkom i vrtnom garniturom'],
 ['B48A0015_6_7.jpg','okucnica',null,'natkriveni-kutak','Natkriveni kutak uz kameni zid s izlazom na terasu'],
 ['B48A0018.jpg','pogled',null,'pogled-otocic','Pogled kroz krošnju cedra na otočić s kapelicom i mirno more'],
 ['B48A2176.jpg','kuhinja','a4','a4-kuhinja-boravak','Kuhinja, blagovaonica i dnevni boravak apartmana A4+1'],
 ['B48A2188.jpg','kuhinja','a4','a4-blagovaonica','Postavljen blagovaonski stol i kuhinja u apartmanu A4+1'],
 ['B48A2190.jpg','apartman-a4','a4','a4-spavaca-kreveti','Spavaća soba apartmana A4+1 s krevetima i ormarom'],
 ['B48A2198.jpg','apartman-a4','a4','a4-spavaca-3','Bračni krevet i pogled prema kupaonici i dnevnom boravku apartmana A4+1'],
 ['B48A9912.jpg','kuhinja','a4','a4-kuhinja','Kuhinja s blagovaonicom i pogledom prema dnevnom boravku apartmana A4+1'],
 ['B48A9926.jpg','apartman-a4','a4','a4-spavaca-balkon','Spavaća soba apartmana A4+1 s izlazom na balkon i pogledom na more'],
 ['B48A9927.jpg','apartman-a4','a4','a4-spavaca','Spavaća soba apartmana A4+1 s bračnim krevetom'],
 ['B48A9957.jpg','apartman-a4','a4','a4-spavaca-2','Druga spavaća soba apartmana A4+1'],
 ['B48A9968.jpg','apartman-a4','a4','a4-dnevni','Dnevni boravak apartmana A4+1 s kaučima, televizorom i izlazom na balkon'],
 ['B48A9932.jpg','kupaonica','a4','a4-kupaonica','Kupaonica apartmana A4+1 s tušem i perilicom rublja'],
 ['B48A9956.jpg','kupaonica','a4','a4-kupaonica-2','Druga kupaonica apartmana A4+1 s tuš-kabinom'],
 ['B48A9978_79_80.jpg','apartman-a4','a4','a4-terasa','Natkrivena terasa apartmana A4+1 s vrtnim stolom i maslinom'],
 ['B48A9984_5_6.jpg','apartman-a4','a4','a4-terasa-zelenilo','Terasa apartmana A4+1 okružena zelenilom i limunom u posudi'],
 ['B48A9967.jpg','pogled',null,'pogled-balkon-hero','Pogled s natkrivenog balkona na Kvarner i otok Krk'],
 ['B48A9966.jpg','pogled',null,'pogled-balkon-siroki','Široki pogled s balkona na Kvarner'],
];
const dir = '../images/original';
const manifest = [];
for (const [f, cat, unit, slug, alt] of K) {
  const src = path.join(dir, f), dstDir = path.join(dir, cat);
  fs.mkdirSync(dstDir, { recursive: true });
  if (fs.existsSync(src)) fs.renameSync(src, path.join(dstDir, f));
  if (!cat.startsWith('_')) manifest.push({ file: `${cat}/${f}`, category: cat, unit, slug, alt });
}
const left = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 1));
const count = {}; for (const [, c] of K) count[c] = (count[c] || 0) + 1;
console.log(count, 'unclassified:', left, 'total', K.length);
