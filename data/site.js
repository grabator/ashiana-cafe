/*
 * Podaci o lokalu. Sve što piše ovdje vidi se na stranici.
 * PRIVREMENO: true znači da podatak još nije potvrdio vlasnik (vidi README, "Od vlasnika treba").
 */
window.ASHIANA = {
  demo: true,                       // dok je true: u podnožju piše "Menu and prices are indicative"
  name: 'Café Ashiana',
  tagline: "Derby's most luxurious shisha lounge & restaurant",
  halal: true,
  address: { street: '30-32 Curzon Street', city: 'Derby', postcode: 'DE1 1LL', country: 'United Kingdom' },
  phone: { display: '01332 291212', tel: '+441332291212' },
  maps: 'https://www.google.com/maps/search/?api=1&query=Cafe+Ashiana+30-32+Curzon+Street+Derby+DE1+1LL',
  social: {
    instagram: 'https://www.instagram.com/cafeashiana/',
    facebook: 'https://www.facebook.com/search/top?q=Cafe%20Ashiana%20Derby',   // PRIVREMENO: tačan link Facebook stranice od vlasnika
    x: 'https://x.com/cafeashiana'
  },
  ubereats: 'https://www.ubereats.com/gb/store/cafe-ashiana/R7T2-jtjUhOYuBcJefEjfQ',
  timeZone: 'Europe/London',
  // radno vrijeme po danima (0 = nedjelja). close manji od open znači da se zatvara iza ponoći, sljedeći dan.
  hours: [
    { day: 'Sunday', open: '15:00', close: '02:00' },
    { day: 'Monday', open: '15:00', close: '02:00' },
    { day: 'Tuesday', open: '15:00', close: '02:00' },
    { day: 'Wednesday', open: '15:00', close: '02:00' },
    { day: 'Thursday', open: '15:00', close: '02:00' },
    { day: 'Friday', open: '15:00', close: '03:00' },
    { day: 'Saturday', open: '15:00', close: '03:00' }
  ],
  // pitanja i odgovori (dio "Good to know"). Samo odgovori iz provjerenih izvora: njihov Instagram (halal, radno vrijeme,
  // Prince of Persia), Uber Eats (dostava), njihova objava o loyalty kartici, i britanski zakon (nargila samo 18+).
  // Kad vlasnik potvrdi još nešto (parking, alkohol, rezervacije, terasa), dodaj ovdje.
  faq: [
    { q: 'Is the food halal?', a: 'Yes. All our meat is halal.' },
    { q: 'What are your opening hours?', a: 'We are open every day from 3PM. Sunday to Thursday until 2AM, Friday and Saturday until 3AM.' },
    { q: 'Where are you?', a: '30-32 Curzon Street, Derby DE1 1LL. Tap Get directions above to open it in Google Maps.' },
    { q: 'Can I order delivery?', a: 'Yes. You can order from us on Uber Eats.' },
    { q: 'Is there an age limit for shisha?', a: 'Yes. Shisha is served to over 18s only, and our team may ask for ID.' },
    { q: 'Do you have vegetarian options?', a: 'Yes, including our Veggie Patty burger, Grilled Halloumi, Houmous and Mixed Olives, plus sides like Skin-on Fries, Garlic Bread and Corn On The Cob.' },
    { q: 'Do you have a loyalty card?', a: 'Yes, and it is now digital. Sign up at rewards.cafeashiana.com and keep your card on your phone.' },
    { q: 'What is the newest shisha flavour?', a: 'Prince of Persia, our new summer favourite. Ask our shisha team for the full flavour list.' }
  ],
  // samo prave rečenice gostiju, sa izvorom
  reviews: [
    { text: 'A great vibe, decor is amazing.', source: 'Tripadvisor', url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g187048-d5504813-Reviews-Cafe_Ashiana-Derby_Derbyshire_England.html' }
  ]
};
