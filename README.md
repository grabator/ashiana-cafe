# Café Ashiana, Derby

Web stranica za **Café Ashiana**, shisha lounge i halal restoran na adresi 30-32 Curzon Street, Derby (Instagram: [@cafeashiana](https://www.instagram.com/cafeashiana/)). Njihov stari sajt (cafeashiana.com) se trenutno ne otvara, pa je ovo nova stranica u njihovom stilu: crna i zlatna sa loga, plavi neon "There's no place like home", krošnja od greda sa Edison sijalicama.

Demo: https://ashiana-cafe.grabafaceit.workers.dev

Čisti HTML, CSS i JavaScript, bez frameworka, build koraka, kolačića i vanjskih skripti. Tekst na stranici je na engleskom (britanskom). Rezervacija nema.

## Status: demo

Sve u `data/` označeno sa **PRIVREMENO** je okvirno i mora se potvrditi sa vlasnikom. Dok je `demo: true`, u podnožju piše "Menu and prices are indicative".

Provjereno (upisano):
- [x] naziv, opis "Derby's most luxurious shisha lounge & restaurant", halal (Instagram)
- [x] adresa 30-32 Curzon Street, Derby DE1 1LL, telefon 01332 291212
- [x] radno vrijeme: nedjelja do četvrtak 15:00 do 02:00, petak i subota 15:00 do 03:00 (Instagram)
- [x] Instagram, X, Uber Eats
- [x] cijene sa Uber Eatsa: Dynamite Shrimp £7.95, Nachos £7.95, Masala Fries £5.45, Grilled Halloumi £4.95
- [x] jela i pića koja se pominju na javnim stranicama (bez cijena): steak i pomfrit, grilana piletina, chicken burger, Oreo waffle, Desi chai, cappuccino, arapski čaj od mente, mojito bez alkohola; nargila Frozen Apple (gosti je hvale)
- [x] recenzija sa Tripadvisora: "A great vibe, decor is amazing."

### Od vlasnika treba
- [ ] **puni meni sa cijenama** (sa Instagram highlighta "Food Menu" ili od vlasnika); sad većina stavki ima "ask us" umjesto cijene, a opisi jela su okvirni
- [ ] **okusi nargile i cijene** (classic i premium); sad je potvrđen samo Frozen Apple, ostali okusi i opisi okusa su okvirni
- [ ] **fotografije** u dobroj rezoluciji (fasada noću, sala sa sijalicama, neon, plafon sa cvjetovima, rooftop, ekipa, hrana) i **dozvola** da se koriste; sadašnje su isječci sa javnih stranica (Tripadvisor, Facebook, Instagram), samo za demo
- [ ] gdje se puši nargila (terasa, rooftop) i radno vrijeme rooftopa, sezona
- [ ] tačan link Facebook stranice (sad vodi na pretragu "Cafe Ashiana Derby", u `data/site.js`)
- [ ] email, ako žele da ga prikažemo
- [ ] dostava: samo Uber Eats ili i Deliveroo / Just Eat
- [ ] potvrda da ne služe alkohol (na stranici piše "alcohol-free drinks", to kaže jedan javni opis lokala)
- [ ] odgovori za dio "Good to know" (halal, alkohol, godine za nargilu, dostava, parking)
- [ ] pravi domen (stari je cafeashiana.com)
- [ ] još pravih recenzija sa izvorom, ako žele dio sa recenzijama

### Prije objave
- [ ] `demo: false` u `data/site.js`
- [ ] obrisati red `<meta name="robots" content="noindex, nofollow">` u `index.html`
- [ ] adresa stranice u `index.html` (canonical, og, JSON-LD), `robots.txt` i `sitemap.xml` (sad `ashiana-cafe.grabafaceit.workers.dev`)
- [ ] nova `assets/og.jpg` ako stignu nove fotografije
- [ ] dozvola za fotografije

## Šta ima (v2)

v2 je redizajn sa fokusom na dizajn, ne na efekte: tamno, toplo i mirno, kao lokal navečer.

- **Tipografija:**
  - naslovi u serifu Cormorant Garamond, kurziv za isticanje;
  - tekst u Manropeu;
  - Quicksand samo za logo i natpis "café ashiana";
  - neon rukopis (Sacramento) samo jednom, u dijelu Shisha.
- **Zlatna samo** za logo, glavno dugme, cijene i tanke linije. Uz crnu ide topla tamna (`#14110d`) i plavi somot u dijelu Shisha.
- **Prvi ekran:** naslov lijevo, fotografija sale desno (nikad šira od svoje rezolucije), traka sa tri podatka: današnji status (živi, London), adresa, halal.
- **Uvod:** tekst o lokalu, fotografija plafona sa cvjetovima i veliki citat gosta sa Tripadvisora.
- **Meni kao u restoranu:**
  - sve kategorije odjednom, sa indeksom sa strane (na mobitelu traka koja se lijepi);
  - pretraga na ikonicu;
  - oznake ★ Popular, V Vegetarian, S Spicy.
  - Stavke bez potvrđene cijene nemaju cijenu; na vrhu piše "Prices on request for items without a price".
- **Shisha:** lista okusa kao vinska karta (Frozen Apple istaknut), 18+ i upozorenje o nikotinu, statičan neon.
- **The lounge:** naslov lijevo, mreža fotografija desno (3:2 i 1:1, na mobitelu sve 1:1), uvećanje na klik (strelice, prevlačenje, Esc).
- **The crew** i **Visit:**
  - fotografija fasade (ostaje vidljiva pri skrolu) vodi na Google Maps;
  - pored nje adresa, radno vrijeme sa istaknutim današnjim danom i kontakt.
- **Pitanja (Good to know):** spremno u `data/site.js` (`faq`), prikazuje se tek kad se upišu odgovori koje je potvrdio vlasnik.
- **Mobitel:** meni preko cijelog ekrana (veliki serif linkovi, adresa, radno vrijeme, poziv) i tanka donja traka Call · Directions · Menu · Order.
- **Bez dekorativnih animacija:** nema sijalica, dima, crtanja loga, treptanja neona ni pojavljivanja pri skrolu. Ostali su samo prelazi boje na hover i zatamnjenje pri otvaranju menija i fotografije.

Mapa: OpenStreetMap slika nije mogla da se iscrta u ovom okruženju, pa je umjesto mape fotografija fasade sa dugmetom za Google Maps (prompt to dozvoljava). Ako se kasnije doda statična mapa, ide u `assets/img/` sa natpisom "© OpenStreetMap contributors".

## Pokretanje

```
node serve.mjs
```

Zatim otvori http://localhost:8080. Za provjeru statusa u određeno vrijeme (londonsko): `?now=2026-10-17T01:30`.

## Kako se mijenja

**Meni** je u `data/menu.js`. Jedna stavka:

```js
{ name: 'Dynamite Shrimp', desc: 'Crispy shrimp in a creamy chilli sauce.', price: 7.95, tags: ['popular', 'spicy'] }
```

`price: null` znači da se cijena ne prikazuje. Oznake (`tags`) su `popular`, `spicy` i `veg`. Okusi nargile su u istom fajlu, u `ASHIANA_SHISHA`.

**Radno vrijeme, telefon, adresa, linkovi i recenzije** su u `data/site.js`. Ako se radno vrijeme promijeni, promijeni ga i u JSON-LD dijelu u `index.html` (zbog Googlea) i u podnožju.

**Fotografije** su u `assets/img/` (WebP). Nova fotografija iste namjene se može samo zamijeniti pod istim imenom; ako su druge dimenzije, popravi `width` i `height` u `index.html`.

## Tehnika

- `index.html`: sadržaj, SVG logo (`#logo`), ikonice, JSON-LD `Restaurant` sa radnim vremenom preko ponoći, `acceptsReservations: false`.
- `css/style.css`:
  - dizajn tokeni u `:root` (boje, tipografska skala, razmaci 4 do 160, radijus 12px), mreža od 12 kolona do 1320px;
  - fontovi lokalno u `assets/fonts/` (SIL OFL, licence uz fontove): Cormorant Garamond, Manrope, Quicksand, Sacramento.
- `js/app.js`: status, meni (indeks, pretraga), okusi, recenzija, pitanja, zaglavlje, mobilni meni, uvećanje fotografija.
- `_headers`: CSP bez `unsafe-inline` za skripte, sigurnosna zaglavlja; keš: fontovi godinu dana, slike sedmicu, css, js i data se uvijek provjere.

## Provjera

- Status testiran za ključna vremena (London):
  - utorak 14:59 zatvoreno, 15:00 otvoreno;
  - subota 01:00 i 02:30 otvoreno (petak do 03:00), 03:01 zatvoreno;
  - nedjelja 01:59 i 02:00 otvoreno (subota do 03:00);
  - ponedjeljak 01:59 "Closing soon", 02:00 zatvoreno.
- Dizajnerska provjera sa screenshotovima na 360, 390, 768, 1024, 1440 i 1920:
  - nigdje nema horizontalnog skrola ni grešaka u konzoli;
  - fotografije nisu šire od svoje rezolucije (na 1920 je slika na prvom ekranu oko 5% uvećana po visini);
  - skokovi na dijelove (Menu, Shisha, The lounge, Visit) pogađaju tačno mjesto.
- axe bez ozbiljnih problema. Indeks menija, pretraga, uvećanje fotografija, mobilni meni i sva dugmad rade.
- Lighthouse (mobitel, lokalno): Performance 97 do 99, Accessibility 100, Best Practices 100, SEO 69 samo zbog namjernog `noindex` za demo (bez njega 100). CLS 0, blokiranje 0 do 50 ms, LCP oko 2.3 s.
