/*
 * Meni. Jela su prepisana sa njihovog Instagram highlighta "Food Menu" (nazivi kategorija su njihovi).
 * Svaka stavka: { name, desc, price, tags, PRIVREMENO }
 *   price: broj u funtama (7.95) ili null kad cijena još nije potvrđena (tada se cijena ne prikazuje)
 *   tags:  'popular', 'spicy', 'veg'
 *   PRIVREMENO: true = stavka nije sa njihovog menija nego sa drugih javnih izvora (Uber Eats, objave), treba potvrditi
 * Potvrđene cijene (Uber Eats): Dynamite Shrimp, Grilled Halloumi, Nachos, Masala Fries. Ostale cijene treba dobiti od vlasnika.
 */
window.ASHIANA_MENU = [
  {
    id: 'starters', name: 'For starters', note: 'Made to share, or not.',
    items: [
      { name: 'Dynamite Shrimp', price: 7.95, tags: ['popular'] },
      { name: 'Dynamite Chicken', price: null, tags: [] },
      { name: 'Lamb Chops', price: null, tags: [] },
      { name: 'Grilled Halloumi', price: 4.95, tags: [] },
      { name: 'Masala Fries', price: 5.45, tags: [] },
      { name: 'Houmous', price: null, tags: [] },
      { name: 'Mixed Olives', price: null, tags: [] },
      { name: 'Nachos', price: 7.95, tags: [] }
    ]
  },
  {
    id: 'chicken', name: 'Chickenin’ out?', note: 'All our meat is halal.',
    items: [
      { name: 'Quarter-Chicken', price: null, tags: [] },
      { name: 'Half-Chicken', price: null, tags: [] },
      { name: 'Whole-Chicken', price: null, tags: [] },
      { name: 'Chicken Butterfly', price: null, tags: [] },
      { name: 'Boneless Thighs', price: null, tags: [] }
    ]
  },
  {
    id: 'wings', name: 'Wingin’ it?', note: 'For the wing lovers.',
    items: [
      { name: 'Wing Flats', price: null, tags: [] }
    ]
  },
  {
    id: 'burgers', name: 'Burgers & wraps', note: 'Stacked, grilled, wrapped.',
    items: [
      { name: 'Smashed Burger', price: null, tags: [] },
      { name: 'Grilled Peri Fillet', price: null, tags: [] },
      { name: 'Grilled Peri Thigh', price: null, tags: [] },
      { name: 'Veggie Patty', price: null, tags: ['veg'] }
    ]
  },
  {
    id: 'salads', name: 'Salads', note: 'Fresh and simple.',
    items: [
      { name: 'Caesar', price: null, tags: [] },
      { name: 'Chicken Caesar', price: null, tags: [] }
    ]
  },
  {
    id: 'sides', name: 'A bit on the side', note: 'The perfect partners.',
    items: [
      { name: 'Skin-on Fries', price: null, tags: [] },
      { name: 'Peri Fries', price: null, tags: [] },
      { name: 'Coleslaw', price: null, tags: [] },
      { name: 'Garlic Bread', price: null, tags: [] },
      { name: 'Spicy Tomato Rice', price: null, tags: ['spicy'] },
      { name: 'Creamy Mash', price: null, tags: [] },
      { name: 'Corn On The Cob', price: null, tags: [] }
    ]
  },
  {
    id: 'desserts', name: 'Desserts', note: 'Something sweet to finish.',
    items: [
      { name: 'Red Velvet Cake', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Oreo Waffle', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'drinks', name: 'Mocktails & hot drinks', note: 'Alcohol-free, always.',
    items: [
      { name: 'Frozen Mocktails', price: null, tags: [], PRIVREMENO: true },
      { name: 'Mojito', price: null, tags: [], PRIVREMENO: true },
      { name: 'Milkshakes', price: null, tags: [], PRIVREMENO: true },
      { name: 'Desi Chai', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Arabian Mint Tea', price: null, tags: [], PRIVREMENO: true },
      { name: 'Cappuccino', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'shisha', name: 'Shisha', note: '18+ only. Shisha contains nicotine.',
    items: [
      { name: 'Prince of Persia', desc: 'New summer favourite.', price: null, tags: ['popular'] },
      { name: 'Frozen Apple', desc: 'Our guests’ favourite.', price: null, tags: ['popular'] },
      { name: 'Full flavour list', desc: 'Ask our shisha team for today’s selection.', price: null, tags: [] }
    ]
  }
];

// okusi nargile za dio "Shisha", kao vinska karta: naziv i kratka nota okusa.
// Prince of Persia je "New summer favourite" sa njihove objave, Frozen Apple je potvrđen kao omiljeni kod gostiju; ostali okusi i opisi su PRIVREMENO dok vlasnik ne pošalje listu.
window.ASHIANA_SHISHA = [
  { name: 'Prince of Persia', note: '“This flavour really hits the spot”', fav: true, tag: 'New summer favourite' },
  { name: 'Frozen Apple', note: 'Crisp green apple, icy finish', fav: true },
  { name: 'Double Apple', note: 'Sweet red apple with a hint of aniseed', PRIVREMENO: true },
  { name: 'Grape & Mint', note: 'Dark grape, cool mint', PRIVREMENO: true },
  { name: 'Blueberry Mint', note: 'Ripe blueberry, fresh mint', PRIVREMENO: true },
  { name: 'Watermelon', note: 'Juicy and light', PRIVREMENO: true },
  { name: 'Lemon & Mint', note: 'Bright citrus, clean finish', PRIVREMENO: true }
];
