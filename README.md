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
- [ ] **okusi nargile i cijene** (classic i premium); sad je potvrđen samo Frozen Apple
- [ ] **fotografije** u dobroj rezoluciji (fasada noću, sala sa sijalicama, neon, plafon sa cvjetovima, rooftop, ekipa, hrana) i **dozvola** da se koriste; sadašnje su isječci sa javnih stranica (Tripadvisor, Facebook, Instagram), samo za demo
- [ ] gdje se puši nargila (terasa, rooftop) i radno vrijeme rooftopa, sezona
- [ ] tačan link Facebook stranice (sad vodi na pretragu "Cafe Ashiana Derby", u `data/site.js`)
- [ ] email, ako žele da ga prikažemo
- [ ] dostava: samo Uber Eats ili i Deliveroo / Just Eat
- [ ] pravi domen (stari je cafeashiana.com)
- [ ] još pravih recenzija sa izvorom, ako žele dio sa recenzijama

### Prije objave
- [ ] `demo: false` u `data/site.js`
- [ ] obrisati red `<meta name="robots" content="noindex, nofollow">` u `index.html`
- [ ] adresa stranice u `index.html` (canonical, og, JSON-LD), `robots.txt` i `sitemap.xml` (sad `ashiana-cafe.grabafaceit.workers.dev`)
- [ ] nova `assets/og.jpg` ako stignu nove fotografije
- [ ] dozvola za fotografije

## Šta ima

- **Prvi ekran:** fotografija sale, Edison sijalice koje se njišu i trepere, dim koji se diže (canvas), njihov logo koji se nacrta (zlatni krug, pa "café"), oznaka Halal, dugmad za meni, put i poziv.
- **Status "Open now · until 2AM"** po londonskom vremenu. Radi i iza ponoći: u subotu u 01:00 je otvoreno do 03:00, jer još traje petak. Zadnjih 30 minuta piše "Closing soon".
- **Meni:**
  - tri kartice sa fotografijama omiljenih jela;
  - kategorije kao dugmad (strelice na tastaturi rade) i pretraga sa porukom kad nema rezultata;
  - cijene sa tačkicama kao na pravom meniju i oznake Popular, Spicy, Veg;
  - dugme za Uber Eats.
- **Shisha:** tamnoplavi somot, plavi neon, kartice okusa (Frozen Apple istaknut), oznaka 18+ i upozorenje o nikotinu.
- **Lounge:**
  - neon "There's no place like home" koji zatreperi kad se dođe do njega;
  - galerija sa uvećanjem (strelice, prevlačenje prstom, Esc; fokus ostaje unutra);
  - prava rečenica gosta sa linkom na Tripadvisor.
- **Ekipa:** osoblje u prslucima i kačketima.
- **Find us:** mapa sa pinom (vodi na Google Maps), adresa, telefon, radno vrijeme po danima sa istaknutim današnjim danom, društvene mreže.
- **Mobitel:** meni preko cijelog ekrana i donja traka Call · Directions · Menu · Uber Eats.

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

`price: null` prikazuje "ask us". Oznake (`tags`) su `popular`, `spicy` i `veg`. Okusi nargile su u istom fajlu, u `ASHIANA_SHISHA`.

**Radno vrijeme, telefon, adresa, linkovi i recenzije** su u `data/site.js`. Ako se radno vrijeme promijeni, promijeni ga i u JSON-LD dijelu u `index.html` (zbog Googlea) i u podnožju.

**Fotografije** su u `assets/img/` (WebP). Nova fotografija iste namjene se može samo zamijeniti pod istim imenom; ako su druge dimenzije, popravi `width` i `height` u `index.html`.

## Tehnika

- `index.html`: sadržaj, SVG logo (`#logo`), ikonice, JSON-LD `Restaurant` sa radnim vremenom preko ponoći, `acceptsReservations: false`.
- `css/style.css`:
  - boje sa loga i fotografija: crna `#0a0a0a`, zlatna `#c8a769`, krem `#f3ece0`, somot `#18224a`, neon `#5fb4ff`, sijalice `#ffb45a`;
  - fontovi: Quicksand (naslovi, najbliži njihovom logu), Manrope (tekst), Sacramento (neon), svi lokalno u `assets/fonts/` (SIL OFL, licence uz fontove).
- `js/app.js`: status, meni, pretraga, okusi, galerija, dim, zaglavlje.
  - Dim se crta u pola rezolucije i staje kad nije na ekranu ili tab nije aktivan; na slabom uređaju se sam ugasi.
  - Sijalice se samo rotiraju (bez ponovnog crtanja).
  - "Smanji pokrete" gasi sve animacije.
- `_headers`: CSP bez `unsafe-inline` za skripte, sigurnosna zaglavlja; keš: fontovi godinu dana, slike sedmicu, css, js i data se uvijek provjere.

## Provjera

- Status testiran za ključna vremena (London):
  - utorak 14:59 zatvoreno, 15:00 otvoreno;
  - subota 01:00 i 02:30 otvoreno (petak do 03:00), 03:01 zatvoreno;
  - nedjelja 01:59 i 02:00 otvoreno (subota do 03:00);
  - ponedjeljak 01:59 "Closing soon", 02:00 zatvoreno.
- 390x844, 768x1024, 1440x900 i 1920x1080: bez horizontalnog skrola, bez grešaka u konzoli, axe bez ozbiljnih problema. Kategorije, pretraga, galerija, mobilni meni i sva dugmad rade.
- Lighthouse (mobitel, lokalno): Performance 95, Accessibility 100, Best Practices 100, SEO 69. SEO je niži samo zbog namjernog `noindex` za demo; bez njega je 100.
