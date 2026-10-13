/* ==========================================================================
   Apartmani Ivo — main.js (vanilla, bez ovisnosti)
   Sekcije: konfiguracija → i18n → navigacija → reveal/parallax → slideri →
            galerija + lightbox → recenzije → mapa → WhatsApp + obrazac → ostalo
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- Konfiguracija ---------- */
  const CONFIG = {
    whatsapp: '385958668430',
    storageKey: 'apartmani-ivo-lang',
    languages: ['hr', 'en', 'de'],
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ==========================================================================
     i18n — HR tekst se čita iz HTML-a, EN i DE su ovdje
     ========================================================================== */
  const T = {
    en: {
      'skip': 'Skip to content',
      'menu.open': 'Open menu', 'menu.close': 'Close menu',
      'nav.apartments': 'Apartments', 'nav.gallery': 'Gallery', 'nav.location': 'Location', 'nav.reviews': 'Reviews', 'nav.contact': 'Contact',
      'hero.title': 'A family home overlooking the Kvarner Bay',
      'hero.sub': 'Novi Vinodolski · 5 minutes to the beach · since 2010',
      'hero.cta': 'Check availability', 'hero.cta2': 'See the apartments', 'hero.scroll': 'Scroll down',
      'facts.view': 'Sea view', 'facts.viewNote': 'from all three apartments',
      'facts.beach': '400 m to the beach', 'facts.beachNote': 'about 5 minutes, gently downhill',
      'facts.parking': 'Parking in the yard', 'facts.parkingNote': 'on the property',
      'facts.rating': 'Guest rating 5/5', 'facts.ratingNote': '13 reviews on Apartmanija.hr',
      'story.title': 'A house named after a father',
      'story.p1': 'Apartmani Ivo is named after Štefka’s father. The detached family house in a quiet part of Novi Vinodolski is still her home: Štefka lives here and has been welcoming guests since 2010.',
      'story.p2': 'When you arrive there’s coffee or juice, leaflets on what’s happening in town and tips for day trips. You’re welcome to join her for coffee on the terrace in the morning, or a small drink in the evening. And if there’s parsley in the garden, help yourself.',
      'story.sign': 'Welcome,',
      'story.pt1': 'Every apartment has its own entrance', 'story.pt2': 'A balcony or terrace with garden furniture', 'story.pt3': 'A built-in barbecue and a green garden',
      'units.title': 'Three apartments, each with its own entrance',
      'units.lead': 'All are fully equipped and have a sea view and a balcony or terrace with garden furniture. Send an inquiry for your dates to get the price.',
      'unit.a4.kicker': 'For families and friends',
      'unit.a4.desc': 'The largest apartment in the house: two bedrooms, a living room with kitchen and dining area, and a covered terrace surrounded by greenery.',
      'unit.a2p1.kicker': 'For a couple, plus an extra bed',
      'unit.a2p1.desc': 'A bedroom opening onto the balcony, and a living room with dining area and kitchen. The balcony looks over the rooftops to the sea.',
      'unit.a2.kicker': 'For two, next to the garden',
      'unit.a2.desc': 'A compact ground-floor apartment with its own terrace by the entrance. Access is suitable for wheelchairs.',
      'spec.size': 'Size', 'spec.floor': 'Location', 'spec.upper': 'Upper floor', 'spec.ground': 'Ground floor',
      'spec.guests': 'Guests', 'spec.a4guests': '4 + extra bed', 'spec.a2p1guests': '2 + extra bed', 'spec.a2guests': '2 people',
      'spec.rooms': 'Rooms', 'spec.a4rooms': '2 bedrooms', 'spec.a2p1rooms': 'bedroom and living room',
      'spec.outdoor': 'Outdoors', 'spec.a2outdoor': 'private terrace',
      'spec.beds': 'Beds', 'spec.bedsTbc': 'layout confirmed on request',
      'am.ac': 'Air conditioning', 'am.tv': 'TV and satellite', 'am.kitchen': 'Kitchen', 'am.washer': 'Washing machine',
      'am.dishwasher': 'Dishwasher', 'am.terrace': 'Terrace', 'am.balcony': 'Balcony', 'am.grill': 'Barbecue',
      'am.pets': 'Pets on request', 'am.access': 'Wheelchair access',
      'unit.price': 'Price on request', 'unit.cta': 'Ask about this apartment',
      'slider.prev': 'Previous photo', 'slider.next': 'Next photo',
      'interlude.meta': '· review on Apartmanija.hr, August 2025 (in Croatian)',
      'gallery.title': 'House, garden and view', 'gallery.filterLabel': 'Filter photos',
      'gallery.all': 'All', 'gallery.house': 'House and view', 'gallery.units': 'Apartments', 'gallery.area': 'Surroundings',
      'gallery.more': 'Show all photos',
      'loc.title': 'Third row from the sea, ten minutes from the centre',
      'loc.lead': 'The house is in a quiet part of Novi Vinodolski and easy to reach by car. The sea is a gentle downhill walk of about five minutes.',
      'loc.distances': 'Distances from the house', 'loc.nearby': 'Beaches and places nearby',
      'd.sea': 'Sea and beach', 'd.centre': 'Town centre', 'd.shop': 'Shop', 'd.restaurant': 'Restaurant', 'd.post': 'Post office',
      'd.sport': 'Sports facilities', 'd.doctor': 'Doctor and pharmacy', 'd.bank': 'Bank', 'd.bus': 'Bus station', 'd.fuel': 'Petrol station', 'd.marina': 'Marina',
      'poi.lisanj': 'Lišanj town beach', 'poi.lopar': 'Lopar beach', 'poi.skrpun': 'Škrpun beach', 'poi.oci': 'Oči Vinodola viewpoints',
      'loc.note': 'Beaches nearby are sandy, pebbly, concrete and rocky. The main beach has a diving club and diving school, and you can rent boats and pedal boats along the shore. There are also tennis courts, mini golf, beach volleyball and a children’s playground. Small restaurants line the seaside park and the town centre, and the hinterland has cycling trails, viewpoints and old historic villages.',
      'loc.loadMap': 'Show map', 'loc.openMaps': 'Open in Google Maps',
      'reviews.title': 'What guests say', 'reviews.lang': 'Reviews are quoted from the listing on Apartmanija.hr, in Croatian.',
      'reviews.excellent': 'Excellent', 'reviews.basis': 'based on 13 guest reviews on Apartmanija.hr',
      'reviews.trackLabel': 'Guest reviews', 'reviews.prev': 'Previous reviews', 'reviews.next': 'Next reviews',
      'reviews.source': 'All reviews on Apartmanija.hr',
      'm.jun': 'June', 'm.jul': 'July', 'm.aug': 'August', 'm.sep': 'September',
      'info.title': 'Good to know',
      'info.in': 'Check-in', 'info.inV': 'from 2 pm', 'info.out': 'Check-out', 'info.outV': 'by 10 am',
      'info.deposit': 'Booking', 'info.depositV': '30% deposit by bank transfer, the rest on arrival',
      'info.tax': 'Tourist tax', 'info.taxV': 'included in the price',
      'info.stay': 'Length of stay', 'info.stayV': 'ideally 7 days or more; stays under 3 nights have a 30% surcharge',
      'info.discount': 'Discounts', 'info.discountV': '10% for stays over 10 nights; for over 30 nights and for returning guests by arrangement',
      'info.pets': 'Pets', 'info.petsV': 'on request, in apartments A2 and A2+1',
      'contact.title': 'Book directly with the owner, no commission',
      'contact.lead': 'Send Štefka your dates and number of guests, and she’ll get back to you with availability and the price.',
      'contact.wa': 'Message on WhatsApp', 'contact.call': 'Call',
      'contact.mobile': 'Mobile and WhatsApp', 'contact.landline': 'Landline', 'contact.address': 'Address',
      'form.title': 'Inquiry for your dates', 'form.name': 'Full name', 'form.in': 'Arrival', 'form.out': 'Departure',
      'form.adults': 'Adults', 'form.kids': 'Children', 'form.unit': 'Apartment', 'form.any': 'No preference',
      'form.msg': 'Message (optional)', 'form.submit': 'Send inquiry via WhatsApp',
      'form.note': 'WhatsApp opens with a prepared message. Nothing is sent until you press “Send” yourself.',
      'form.errName': 'Please enter your name.', 'form.errDates': 'Please choose your arrival and departure dates.',
      'form.errOrder': 'Departure must be after arrival.',
      'footer.tag': 'A family house with a sea view in Novi Vinodolski. Welcoming guests since 2010.',
      'footer.contact': 'Contact', 'footer.links': 'Quick links', 'footer.lang': 'Language', 'footer.credit': 'Design:',
      'wa.float': 'Message us on WhatsApp',
      'lb.label': 'Photo viewer', 'lb.close': 'Close', 'lb.prev': 'Previous', 'lb.next': 'Next',
      'wa.general': 'Hello! I’m interested in staying at Apartmani Ivo in Novi Vinodolski. Could you let me know about availability and the price for my dates?',
      'wa.unit': 'Hello! I’m interested in apartment {unit} at Apartmani Ivo in Novi Vinodolski. Could you let me know about availability and the price for my dates?',
      'wa.form': 'Hello! Inquiry for Apartmani Ivo:',
      'wa.f.name': 'Name', 'wa.f.dates': 'Dates', 'wa.f.nights': 'nights', 'wa.f.guests': 'Guests', 'wa.f.adults': 'adults', 'wa.f.kids': 'children',
      'wa.f.unit': 'Apartment', 'wa.f.msg': 'Message',
      'meta.title': 'Apartmani Ivo — family house with a sea view, Novi Vinodolski',
      'meta.desc': 'Three apartments in a family house overlooking the Kvarner Bay, 400 m from the beach in Novi Vinodolski. The owner lives in the house and has welcomed guests since 2010. Book directly, no commission.',
    },
    de: {
      'skip': 'Zum Inhalt springen',
      'menu.open': 'Menü öffnen', 'menu.close': 'Menü schließen',
      'nav.apartments': 'Apartments', 'nav.gallery': 'Galerie', 'nav.location': 'Lage', 'nav.reviews': 'Bewertungen', 'nav.contact': 'Kontakt',
      'hero.title': 'Ein Familienhaus mit Blick auf die Kvarner Bucht',
      'hero.sub': 'Novi Vinodolski · 5 Minuten zum Strand · seit 2010',
      'hero.cta': 'Verfügbarkeit anfragen', 'hero.cta2': 'Apartments ansehen', 'hero.scroll': 'Nach unten scrollen',
      'facts.view': 'Meerblick', 'facts.viewNote': 'aus allen drei Apartments',
      'facts.beach': '400 m zum Strand', 'facts.beachNote': 'etwa 5 Minuten, leicht bergab',
      'facts.parking': 'Parkplatz im Hof', 'facts.parkingNote': 'auf dem Grundstück',
      'facts.rating': 'Gästebewertung 5/5', 'facts.ratingNote': '13 Bewertungen auf Apartmanija.hr',
      'story.title': 'Ein Haus mit dem Namen des Vaters',
      'story.p1': 'Die Apartmani Ivo tragen den Namen von Štefkas Vater. Das freistehende Familienhaus in einem ruhigen Viertel von Novi Vinodolski ist bis heute ihr Zuhause: Štefka wohnt im Haus und empfängt seit 2010 Gäste.',
      'story.p2': 'Zur Ankunft gibt es Kaffee oder Saft, Prospekte über das Geschehen in der Stadt und Tipps für Ausflüge. Morgens sind Sie zum Kaffee auf der Terrasse eingeladen, abends auf ein Gläschen. Und wenn im Garten Petersilie wächst, bedienen Sie sich gern.',
      'story.sign': 'Herzlich willkommen,',
      'story.pt1': 'Jedes Apartment hat einen eigenen Eingang', 'story.pt2': 'Balkon oder Terrasse mit Gartenmöbeln', 'story.pt3': 'Gemauerter Grill und grüner Garten',
      'units.title': 'Drei Apartments, jedes mit eigenem Eingang',
      'units.lead': 'Alle sind komplett ausgestattet, haben Meerblick sowie Balkon oder Terrasse mit Gartenmöbeln. Den Preis für Ihre Daten erhalten Sie auf Anfrage.',
      'unit.a4.kicker': 'Für Familien und Freunde',
      'unit.a4.desc': 'Das größte Apartment im Haus: zwei Schlafzimmer, Wohnzimmer mit Küche und Essbereich sowie eine überdachte Terrasse im Grünen.',
      'unit.a2p1.kicker': 'Für Paare, mit Zustellbett',
      'unit.a2p1.desc': 'Schlafzimmer mit Zugang zum Balkon, Wohnzimmer mit Essbereich und Küche. Vom Balkon blicken Sie über die Dächer aufs Meer.',
      'unit.a2.kicker': 'Für zwei, direkt am Garten',
      'unit.a2.desc': 'Ein kompaktes Apartment im Erdgeschoss mit eigener Terrasse vor dem Eingang. Der Zugang ist rollstuhlgerecht.',
      'spec.size': 'Größe', 'spec.floor': 'Lage im Haus', 'spec.upper': 'Obergeschoss', 'spec.ground': 'Erdgeschoss',
      'spec.guests': 'Gäste', 'spec.a4guests': '4 + Zustellbett', 'spec.a2p1guests': '2 + Zustellbett', 'spec.a2guests': '2 Personen',
      'spec.rooms': 'Zimmer', 'spec.a4rooms': '2 Schlafzimmer', 'spec.a2p1rooms': 'Schlaf- und Wohnzimmer',
      'spec.outdoor': 'Draußen', 'spec.a2outdoor': 'eigene Terrasse',
      'spec.beds': 'Betten', 'spec.bedsTbc': 'Aufteilung auf Anfrage',
      'am.ac': 'Klimaanlage', 'am.tv': 'TV und Satellit', 'am.kitchen': 'Küche', 'am.washer': 'Waschmaschine',
      'am.dishwasher': 'Geschirrspüler', 'am.terrace': 'Terrasse', 'am.balcony': 'Balkon', 'am.grill': 'Grill',
      'am.pets': 'Haustiere nach Absprache', 'am.access': 'Rollstuhlgerecht',
      'unit.price': 'Preis auf Anfrage', 'unit.cta': 'Anfrage für dieses Apartment',
      'slider.prev': 'Vorheriges Foto', 'slider.next': 'Nächstes Foto',
      'interlude.meta': '· Bewertung auf Apartmanija.hr, August 2025 (auf Kroatisch)',
      'gallery.title': 'Haus, Garten und Aussicht', 'gallery.filterLabel': 'Fotos filtern',
      'gallery.all': 'Alle', 'gallery.house': 'Haus und Aussicht', 'gallery.units': 'Apartments', 'gallery.area': 'Umgebung',
      'gallery.more': 'Alle Fotos anzeigen',
      'loc.title': 'In dritter Reihe zum Meer, zehn Minuten ins Zentrum',
      'loc.lead': 'Das Haus liegt in einem ruhigen Viertel von Novi Vinodolski und ist mit dem Auto gut erreichbar. Zum Meer geht es leicht bergab, etwa fünf Minuten zu Fuß.',
      'loc.distances': 'Entfernungen vom Haus', 'loc.nearby': 'Strände und Orte in der Nähe',
      'd.sea': 'Meer und Strand', 'd.centre': 'Zentrum', 'd.shop': 'Geschäft', 'd.restaurant': 'Restaurant', 'd.post': 'Post',
      'd.sport': 'Sportangebote', 'd.doctor': 'Arzt und Apotheke', 'd.bank': 'Bank', 'd.bus': 'Busbahnhof', 'd.fuel': 'Tankstelle', 'd.marina': 'Marina',
      'poi.lisanj': 'Stadtstrand Lišanj', 'poi.lopar': 'Strand Lopar', 'poi.skrpun': 'Strand Škrpun', 'poi.oci': 'Aussichtspunkte Oči Vinodola',
      'loc.note': 'Die Strände in der Umgebung sind Sand-, Kies-, Beton- und Felsstrände. Am Hauptstrand gibt es einen Tauchclub mit Tauchschule, am Ufer kann man Boote und Tretboote mieten. Außerdem gibt es Tennisplätze, Minigolf, Beachvolleyball und einen Kinderspielplatz. Entlang des Stadtparks am Meer und im Zentrum liegen viele kleine Restaurants, im Hinterland Radwege, Aussichtspunkte und alte historische Orte.',
      'loc.loadMap': 'Karte anzeigen', 'loc.openMaps': 'In Google Maps öffnen',
      'reviews.title': 'Was Gäste sagen', 'reviews.lang': 'Die Bewertungen stammen aus dem Inserat auf Apartmanija.hr (auf Kroatisch).',
      'reviews.excellent': 'Ausgezeichnet', 'reviews.basis': 'aus 13 Gästebewertungen auf Apartmanija.hr',
      'reviews.trackLabel': 'Gästebewertungen', 'reviews.prev': 'Vorherige Bewertungen', 'reviews.next': 'Nächste Bewertungen',
      'reviews.source': 'Alle Bewertungen auf Apartmanija.hr',
      'm.jun': 'Juni', 'm.jul': 'Juli', 'm.aug': 'August', 'm.sep': 'September',
      'info.title': 'Gut zu wissen',
      'info.in': 'Anreise', 'info.inV': 'ab 14 Uhr', 'info.out': 'Abreise', 'info.outV': 'bis 10 Uhr',
      'info.deposit': 'Buchung', 'info.depositV': '30 % Anzahlung per Überweisung, der Rest bei Ankunft',
      'info.tax': 'Kurtaxe', 'info.taxV': 'im Preis inbegriffen',
      'info.stay': 'Aufenthaltsdauer', 'info.stayV': 'ideal ab 7 Tagen; bei weniger als 3 Nächten 30 % Aufschlag',
      'info.discount': 'Rabatte', 'info.discountV': '10 % ab 10 Nächten; ab 30 Nächten und für Stammgäste nach Absprache',
      'info.pets': 'Haustiere', 'info.petsV': 'nach Absprache, in den Apartments A2 und A2+1',
      'contact.title': 'Direkt bei der Gastgeberin buchen, ohne Provision',
      'contact.lead': 'Schicken Sie Štefka Ihre Reisedaten und die Anzahl der Gäste – sie meldet sich mit Verfügbarkeit und Preis.',
      'contact.wa': 'Per WhatsApp schreiben', 'contact.call': 'Anrufen',
      'contact.mobile': 'Mobil und WhatsApp', 'contact.landline': 'Festnetz', 'contact.address': 'Adresse',
      'form.title': 'Anfrage für Ihre Reisedaten', 'form.name': 'Vor- und Nachname', 'form.in': 'Anreise', 'form.out': 'Abreise',
      'form.adults': 'Erwachsene', 'form.kids': 'Kinder', 'form.unit': 'Apartment', 'form.any': 'Egal',
      'form.msg': 'Nachricht (optional)', 'form.submit': 'Anfrage per WhatsApp senden',
      'form.note': 'WhatsApp öffnet sich mit einer vorbereiteten Nachricht. Gesendet wird erst, wenn Sie selbst auf „Senden“ tippen.',
      'form.errName': 'Bitte geben Sie Ihren Namen ein.', 'form.errDates': 'Bitte wählen Sie An- und Abreisedatum.',
      'form.errOrder': 'Die Abreise muss nach der Anreise liegen.',
      'footer.tag': 'Ein Familienhaus mit Meerblick in Novi Vinodolski. Gäste kommen seit 2010.',
      'footer.contact': 'Kontakt', 'footer.links': 'Schnellzugriff', 'footer.lang': 'Sprache', 'footer.credit': 'Gestaltung:',
      'wa.float': 'Schreiben Sie uns auf WhatsApp',
      'lb.label': 'Fotoansicht', 'lb.close': 'Schließen', 'lb.prev': 'Zurück', 'lb.next': 'Weiter',
      'wa.general': 'Guten Tag! Ich interessiere mich für einen Aufenthalt in den Apartmani Ivo in Novi Vinodolski. Könnten Sie mir Verfügbarkeit und Preis für meine Reisedaten mitteilen?',
      'wa.unit': 'Guten Tag! Ich interessiere mich für das Apartment {unit} in den Apartmani Ivo in Novi Vinodolski. Könnten Sie mir Verfügbarkeit und Preis für meine Reisedaten mitteilen?',
      'wa.form': 'Guten Tag! Anfrage für die Apartmani Ivo:',
      'wa.f.name': 'Name', 'wa.f.dates': 'Reisedaten', 'wa.f.nights': 'Nächte', 'wa.f.guests': 'Gäste', 'wa.f.adults': 'Erwachsene', 'wa.f.kids': 'Kinder',
      'wa.f.unit': 'Apartment', 'wa.f.msg': 'Nachricht',
      'meta.title': 'Apartmani Ivo — Familienhaus mit Meerblick, Novi Vinodolski',
      'meta.desc': 'Drei Apartments in einem Familienhaus mit Blick auf die Kvarner Bucht, 400 m vom Strand in Novi Vinodolski. Die Gastgeberin wohnt im Haus und empfängt seit 2010 Gäste. Direkt buchen, ohne Provision.',
    },
    // HR tekstovi koji nisu u HTML-u (poruke, greške, aria)
    hr: {
      'menu.open': 'Otvori izbornik', 'menu.close': 'Zatvori izbornik',
      'form.errName': 'Upišite svoje ime.', 'form.errDates': 'Odaberite datume dolaska i odlaska.',
      'form.errOrder': 'Datum odlaska mora biti nakon dolaska.',
      'wa.general': 'Pozdrav! Zanima me smještaj u Apartmanima Ivo u Novom Vinodolskom. Možete li mi javiti dostupnost i cijenu za moje datume?',
      'wa.unit': 'Pozdrav! Zanima me apartman {unit} u Apartmanima Ivo u Novom Vinodolskom. Možete li mi javiti dostupnost i cijenu za moje datume?',
      'wa.form': 'Pozdrav! Upit za Apartmane Ivo:',
      'wa.f.name': 'Ime', 'wa.f.dates': 'Datumi', 'wa.f.nights': 'noćenja', 'wa.f.guests': 'Gosti', 'wa.f.adults': 'odraslih', 'wa.f.kids': 'djece',
      'wa.f.unit': 'Apartman', 'wa.f.msg': 'Poruka',
    },
  };

  let lang = 'hr';
  const t = key => (T[lang] && T[lang][key]) || T.hr[key] || key;

  // Zapamti izvorni HR sadržaj iz HTML-a
  $$('[data-i18n]').forEach(el => { T.hr[el.dataset.i18n] ??= el.innerHTML; });
  $$('[data-i18n-aria]').forEach(el => { T.hr[el.dataset.i18nAria] ??= el.getAttribute('aria-label'); });
  T.hr['meta.title'] = document.title;
  const metaDesc = $('meta[name="description"]');
  T.hr['meta.desc'] = metaDesc.content;

  function setLang(next, persist = true) {
    if (!CONFIG.languages.includes(next)) next = 'hr';
    lang = next;
    document.documentElement.lang = next;
    $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('.lang__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    document.title = t('meta.title');
    metaDesc.content = t('meta.desc');
    updateWhatsAppLinks();
    syncMenuLabel();
    if (persist) { try { localStorage.setItem(CONFIG.storageKey, next); } catch (e) { /* privatni način */ } }
  }
  $$('.lang__btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ==========================================================================
     Navigacija: solidna na scroll, aktivna sekcija, mobilni izbornik
     ========================================================================== */
  const header = $('.site-header');
  const hero = $('.hero');
  const menuBtn = $('.menu-toggle');
  const menu = $('#mobile-menu');

  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function syncMenuLabel() {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
  }
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    syncMenuLabel();
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      $('a', menu).focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduceMotion ? 0 : 400);
    }
  }
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  // Fokus ostaje unutar otvorenog izbornika (uključujući gumb za zatvaranje)
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || menuBtn.getAttribute('aria-expanded') !== 'true') return;
    const items = [menuBtn, ...$$('a, button', menu)];
    const i = items.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
  });
  window.matchMedia('(min-width: 64em)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Aktivna sekcija u navigaciji
  const navLinks = $$('.nav__links a');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['apartmani', 'galerija', 'lokacija', 'recenzije', 'kontakt'].forEach(id => { const s = document.getElementById(id); if (s) sectionObs.observe(s); });

  /* ==========================================================================
     Reveal na scroll + lagani parallax heroja
     ========================================================================== */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in'));
  } else {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveals.forEach(el => ro.observe(el));
  }

  const heroMedia = $('[data-parallax]');
  if (heroMedia && !reduceMotion) {
    let ticking = false;
    const parallax = () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      heroMedia.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  }

  /* ==========================================================================
     Slideri apartmana (scroll-snap + gumbi + brojač)
     ========================================================================== */
  $$('[data-slider]').forEach(slider => {
    const track = $('.slider__track', slider);
    const slides = $$('.slider__slide', track);
    const cur = $('[data-current]', slider);
    $('[data-total]', slider).textContent = slides.length;
    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = i => track.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    $('[data-prev]', slider).addEventListener('click', () => go(index() - 1));
    $('[data-next]', slider).addEventListener('click', () => go(index() + 1));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    });
    let raf;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = index();
        cur.textContent = i + 1;
        // učitaj sljedeću sliku unaprijed
        const next = slides[i + 1] && $('img', slides[i + 1]);
        if (next) next.loading = 'eager';
      });
    }, { passive: true });
  });

  /* ==========================================================================
     Galerija: filteri, "prikaži sve", lightbox
     ========================================================================== */
  const grid = $('#gallery-grid');
  const items = $$('.masonry__item', grid);
  const moreBtn = $('#gallery-more');
  let filter = 'all';
  let expanded = false;

  // Prije "Prikaži sve" prikazujemo onoliko fotki koliko stane u pune redove (uspravne zauzimaju 2 ćelije)
  const budget = () => {
    const cols = parseInt(getComputedStyle(grid).getPropertyValue('--cols'), 10) || 2;
    return cols * (cols >= 3 ? 5 : 6);
  };

  function applyGallery(animate) {
    const max = budget();
    let cells = 0, hiddenCount = 0;
    items.forEach(li => {
      const match = filter === 'all' || li.dataset.cat === filter;
      li.classList.toggle('is-filtered', !match);
      const size = li.classList.contains('is-tall') ? 2 : 1;
      const hide = match && !expanded && cells + size > max;
      li.classList.toggle('is-hidden', hide);
      if (hide) hiddenCount++;
      if (match && !hide) {
        cells += size;
        if (animate && !reduceMotion) { li.classList.remove('is-entering'); void li.offsetWidth; li.classList.add('is-entering'); }
      }
    });
    moreBtn.parentElement.hidden = expanded || hiddenCount === 0;
  }
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (!expanded) applyGallery(false); }, 200); });
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    $$('.filter').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    applyGallery(true);
  }));
  moreBtn.addEventListener('click', () => {
    const firstNew = items.find(li => li.classList.contains('is-hidden'));
    expanded = true; applyGallery(false);
    if (firstNew) $('a', firstNew).focus({ preventScroll: true });
  });
  applyGallery(false);

  // --- Lightbox ---
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-caption');
  const lbCount = $('#lb-count');
  let lbList = [];
  let lbIndex = 0;
  let lastFocus = null;
  const preloaded = new Set();

  const preload = src => { if (src && !preloaded.has(src)) { const i = new Image(); i.src = src; preloaded.add(src); } };

  function showImage(i, dir = 1) {
    lbIndex = (i + lbList.length) % lbList.length;
    const a = lbList[lbIndex];
    const render = () => {
      lbImg.src = a.href;
      lbImg.alt = a.dataset.caption;
      lbCap.textContent = a.dataset.caption;
      lbCount.textContent = `${lbIndex + 1} / ${lbList.length}`;
    };
    if (reduceMotion || !lb.open || !lbImg.getAttribute('src')) { render(); }
    else {
      lbImg.style.setProperty('--dir', dir);
      lbImg.classList.add('is-leaving');
      setTimeout(() => {
        lbImg.classList.remove('is-leaving');
        lbImg.classList.add('is-entering');
        render();
        const done = () => requestAnimationFrame(() => lbImg.classList.remove('is-entering'));
        if (lbImg.complete) done(); else lbImg.addEventListener('load', done, { once: true });
      }, 200);
    }
    // susjedne slike unaprijed
    preload(lbList[(lbIndex + 1) % lbList.length].href);
    preload(lbList[(lbIndex - 1 + lbList.length) % lbList.length].href);
  }
  function openLightbox(link) {
    // navigacija kroz sve slike aktivnog filtera (i one još skrivene iza "Prikaži sve")
    lbList = items.filter(li => !li.classList.contains('is-filtered')).map(li => $('a', li));
    lastFocus = link;
    lbImg.removeAttribute('src');
    showImage(lbList.indexOf(link));
    lb.showModal();
    document.body.classList.add('lb-open');
    $('#lb-close').focus();
  }
  function closeLightbox() { lb.close(); }
  lb.addEventListener('close', () => {
    document.body.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  });
  grid.addEventListener('click', e => {
    const a = e.target.closest('.masonry__link');
    if (!a) return;
    e.preventDefault();
    openLightbox(a);
  });
  $('#lb-close').addEventListener('click', closeLightbox);
  $('#lb-prev').addEventListener('click', () => showImage(lbIndex - 1, -1));
  $('#lb-next').addEventListener('click', () => showImage(lbIndex + 1, 1));
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); showImage(lbIndex + 1, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showImage(lbIndex - 1, -1); }
    // Esc zatvara nativno (dialog "cancel"); Tab ostaje unutar modala (showModal čini ostatak stranice inertnim)
    if (e.key === 'Tab') {
      const f = $$('button', lb);
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  // Zatvaranje klikom na pozadinu (izvan slike i gumba)
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.classList.contains('lightbox__stage') || e.target.classList.contains('lightbox__figure')) closeLightbox();
  });
  // Swipe na mobitelu
  let sx = 0, sy = 0, swiping = false;
  lb.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') return; sx = e.clientX; sy = e.clientY; swiping = true; });
  lb.addEventListener('pointerup', e => {
    if (!swiping) return; swiping = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) showImage(lbIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) closeLightbox();
  });
  lb.addEventListener('pointercancel', () => { swiping = false; });

  /* ==========================================================================
     Recenzije — gumbi za pomicanje
     ========================================================================== */
  const rTrack = $('.reviews__track');
  if (rTrack) {
    const step = () => (rTrack.firstElementChild?.getBoundingClientRect().width || 300) + 16;
    const rPrev = $('[data-rprev]'), rNext = $('[data-rnext]');
    rPrev.addEventListener('click', () => rTrack.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    rNext.addEventListener('click', () => rTrack.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    const syncR = () => {
      rPrev.disabled = rTrack.scrollLeft < 8;
      rNext.disabled = rTrack.scrollLeft + rTrack.clientWidth >= rTrack.scrollWidth - 8;
    };
    rTrack.addEventListener('scroll', () => requestAnimationFrame(syncR), { passive: true });
    window.addEventListener('resize', syncR);
    syncR();
  }

  /* ==========================================================================
     Google karta — učitava se tek kad uđe u viewport ili na klik
     ========================================================================== */
  const map = $('#map');
  function loadMap() {
    if (!map || map.dataset.loaded) return;
    map.dataset.loaded = '1';
    const f = document.createElement('iframe');
    f.src = map.dataset.src;
    f.title = 'Google karta — Apartmani Ivo, Osap 22a, Novi Vinodolski';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    map.appendChild(f);
    f.addEventListener('load', () => { const b = $('#map-load'); if (b) b.remove(); }, { once: true });
  }
  $('#map-load')?.addEventListener('click', loadMap);
  if (map && 'IntersectionObserver' in window) {
    const mo = new IntersectionObserver(en => { if (en[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: '200px 0px' });
    mo.observe(map);
  }

  /* ==========================================================================
     WhatsApp linkovi i upitni obrazac
     ========================================================================== */
  const waUrl = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  function updateWhatsAppLinks() {
    $$('[data-wa]').forEach(a => {
      const msg = a.dataset.wa === 'unit' ? t('wa.unit').replace('{unit}', a.dataset.unit) : t('wa.general');
      a.href = waUrl(msg);
    });
  }

  const form = $('#inquiry');
  const err = $('#form-error');
  const fIn = $('#f-in'), fOut = $('#f-out');
  const iso = d => d.toISOString().slice(0, 10);
  fIn.min = iso(new Date());
  fIn.addEventListener('change', () => {
    if (fIn.value) {
      const next = new Date(fIn.value); next.setDate(next.getDate() + 1);
      fOut.min = iso(next);
      if (fOut.value && fOut.value <= fIn.value) fOut.value = '';
    }
  });
  const fmt = v => {
    const [y, m, d] = v.split('-');
    return `${Number(d)}. ${Number(m)}. ${y}.`;
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').trim();
    const arr = data.get('arrival'), dep = data.get('departure');
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    let msg = '', bad = null;
    if (!name) { msg = t('form.errName'); bad = $('#f-name'); }
    else if (!arr || !dep) { msg = t('form.errDates'); bad = !arr ? fIn : fOut; }
    else if (dep <= arr) { msg = t('form.errOrder'); bad = fOut; }
    if (msg) {
      err.textContent = msg; err.hidden = false;
      bad.setAttribute('aria-invalid', 'true'); bad.focus();
      return;
    }
    err.hidden = true;
    const nights = Math.round((new Date(dep) - new Date(arr)) / 864e5);
    const adults = Number(data.get('adults')) || 1, kids = Number(data.get('kids')) || 0;
    const lines = [
      t('wa.form'),
      `${t('wa.f.name')}: ${name}`,
      `${t('wa.f.dates')}: ${fmt(arr)} – ${fmt(dep)} (${nights} ${t('wa.f.nights')})`,
      `${t('wa.f.guests')}: ${adults} ${t('wa.f.adults')}${kids ? `, ${kids} ${t('wa.f.kids')}` : ''}`,
    ];
    if (data.get('unit')) lines.push(`${t('wa.f.unit')}: ${data.get('unit')}`);
    const note = (data.get('message') || '').trim();
    if (note) lines.push(`${t('wa.f.msg')}: ${note}`);
    window.open(waUrl(lines.join('\n')), '_blank', 'noopener');
  });

  /* ==========================================================================
     Plutajući WhatsApp gumb — nakon heroja, sakriven u kontakt sekciji i footeru
     ========================================================================== */
  const waFloat = $('.wa-float');
  if (waFloat && 'IntersectionObserver' in window) {
    const state = new Map();
    const sync = () => {
      const heroVisible = state.get(hero);
      const contactVisible = state.get($('#kontakt')) || state.get($('.footer'));
      waFloat.classList.toggle('is-visible', heroVisible === false && !contactVisible);
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => state.set(en.target, en.isIntersecting));
      sync();
    });
    [hero, $('#kontakt'), $('.footer')].forEach(el => io.observe(el));
  }

  /* ---------- Ostalo ---------- */
  $('#year').textContent = new Date().getFullYear();

  // Početni jezik: spremljeni izbor, inače HR (HTML je već na hrvatskom — bez prepisivanja i pomaka layouta)
  let initial = 'hr';
  try { initial = localStorage.getItem(CONFIG.storageKey) || 'hr'; } catch (e) { initial = 'hr'; }
  if (initial !== 'hr' && CONFIG.languages.includes(initial)) setLang(initial, false);
  else updateWhatsAppLinks();
})();
