/*
 * Meni. Svaka stavka: { name, desc, price, tags, PRIVREMENO }
 *   price: broj u funtama (7.95) ili null kad cijena još nije potvrđena (na stranici piše "ask us")
 *   tags:  'popular', 'spicy', 'veg'
 *   PRIVREMENO: true = stavka ili opis još nije potvrđen sa pravog menija (Instagram highlight "Food Menu")
 * Potvrđene cijene (Uber Eats): Dynamite Shrimp, Grilled Halloumi, Nachos, Masala Fries.
 */
window.ASHIANA_MENU = [
  {
    id: 'starters', name: 'Starters', note: 'Made to share, or not.',
    items: [
      { name: 'Dynamite Shrimp', desc: 'Crispy shrimp in a creamy chilli sauce.', price: 7.95, tags: ['popular', 'spicy'], descPRIVREMENO: true },
      { name: 'Nachos', desc: 'Loaded tortilla chips with cheese, salsa and jalapeños.', price: 7.95, tags: [], descPRIVREMENO: true },
      { name: 'Masala Fries', desc: 'Fries tossed in house masala spice.', price: 5.45, tags: ['spicy', 'veg'], descPRIVREMENO: true },
      { name: 'Grilled Halloumi', desc: 'Golden grilled halloumi.', price: 4.95, tags: ['veg'], descPRIVREMENO: true }
    ]
  },
  {
    id: 'grill', name: 'Grill & Mains', note: 'All our meat is halal.',
    items: [
      { name: 'Steak & Fries', desc: 'Sliced steak with fries, salad and peppercorn sauce.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Grilled Chicken Platter', desc: 'Flame-grilled chicken with fries, salad and dips.', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'burgers', name: 'Burgers', note: 'Served with fries.',
    items: [
      { name: 'Chicken Burger & Fries', desc: 'Crispy chicken fillet burger with fries.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Grilled Chicken Burger', desc: 'Grilled chicken breast burger with fries.', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'desserts', name: 'Desserts & Waffles', note: 'Something sweet to finish.',
    items: [
      { name: 'Red Velvet Cake', desc: 'Layers of red velvet sponge and cream cheese frosting.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Oreo Waffle', desc: 'Warm waffle with Oreo crumble and chocolate sauce.', price: null, tags: ['popular'], PRIVREMENO: true }
    ]
  },
  {
    id: 'mocktails', name: 'Mocktails', note: 'Alcohol-free, always.',
    items: [
      { name: 'Mojito', desc: 'Fresh mint, lime and soda, no alcohol.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Arabian Mint Tea with Appletiser', desc: 'Mint tea served with sparkling Appletiser.', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'shakes', name: 'Shakes', note: 'Thick, cold, generous.',
    items: [
      { name: 'Milkshakes', desc: 'Ask our team for today’s flavours.', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'hot', name: 'Hot drinks', note: 'From chai to cappuccino.',
    items: [
      { name: 'Desi Chai', desc: 'Spiced milky tea, brewed the traditional way.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Cappuccino', desc: 'Espresso with steamed milk and foam.', price: null, tags: [], PRIVREMENO: true },
      { name: 'Arabian Mint Tea', desc: 'Fresh mint tea.', price: null, tags: [], PRIVREMENO: true }
    ]
  },
  {
    id: 'shisha', name: 'Shisha', note: '18+ only. Shisha contains nicotine.',
    items: [
      { name: 'Frozen Apple', desc: 'Our guests’ favourite: crisp apple with an icy finish.', price: null, tags: ['popular'], PRIVREMENO: true },
      { name: 'Classic flavours', desc: 'Ask our shisha team for the full flavour list.', price: null, tags: [], PRIVREMENO: true },
      { name: 'Premium shisha', desc: 'Premium heads and blends.', price: null, tags: [], PRIVREMENO: true }
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
