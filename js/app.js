/*
 * Café Ashiana: status "otvoreno" po londonskom vremenu, meni iz data/menu.js (sve kategorije, indeks, pretraga),
 * lista okusa, recenzija, pitanja, zaglavlje, mobilni meni i uvećanje fotografija. Bez dekorativnih animacija.
 */
(() => {
  const S = window.ASHIANA, MENU = window.ASHIANA_MENU, FLAV = window.ASHIANA_SHISHA;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- status: otvoreno / zatvoreno (Europe/London) ---------- */
  const toMin = (hm) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
  const fmt = (hm) => { let [h, m] = hm.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + (m ? ':' + String(m).padStart(2, '0') : '') + ap; };
  // trenutni dan i minute u Londonu; ?now=2026-10-17T01:30 služi za provjeru (londonsko vrijeme)
  function londonNow() {
    const q = new URLSearchParams(location.search).get('now');
    if (q && /^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(q)) { const d = new Date(q + ':00Z'); return { day: d.getUTCDay(), min: d.getUTCHours() * 60 + d.getUTCMinutes() }; }
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: S.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute };
  }
  // { open, soon, text, session } ; session = dan čije radno vrijeme trenutno traje (iza ponoći je to jučerašnji)
  function status(now = londonNow()) {
    const H = S.hours, today = H[now.day], yday = H[(now.day + 6) % 7];
    const yOpen = toMin(yday.open), yClose = toMin(yday.close);
    if (yClose < yOpen && now.min < yClose) {
      const left = yClose - now.min;
      return { open: true, soon: left <= 30, session: (now.day + 6) % 7, text: (left <= 30 ? 'Closing soon · until ' : 'Open now · until ') + fmt(yday.close) };
    }
    const o = toMin(today.open), c = toMin(today.close), overnight = c < o;
    if (now.min >= o && (overnight || now.min < c)) {
      const left = overnight ? 24 * 60 - now.min + c : c - now.min;
      return { open: true, soon: left <= 30, session: now.day, text: (left <= 30 ? 'Closing soon · until ' : 'Open now · until ') + fmt(today.close) };
    }
    if (now.min < o) return { open: false, session: now.day, text: 'Closed · opens today at ' + fmt(today.open) };
    return { open: false, session: now.day, text: 'Closed · opens tomorrow at ' + fmt(H[(now.day + 1) % 7].open) };
  }
  window.ashianaStatus = status;   // za testove
  function paintStatus() {
    const st = status();
    $$('[data-status]').forEach((el) => {
      el.classList.toggle('open', st.open && !st.soon); el.classList.toggle('soon', !!st.soon);
      el.querySelector('span').textContent = st.text;
    });
    const tb = $('[data-hours] tbody');
    if (tb) tb.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => { const h = S.hours[d]; return '<tr' + (d === st.session ? ' class="today"' : '') + '><th scope="row">' + h.day + (d === st.session ? '<span class="sr"> (today)</span>' : '') + '</th><td>' + fmt(h.open) + ' to ' + fmt(h.close) + '</td></tr>'; }).join('');
  }
  paintStatus(); setInterval(paintStatus, 60000);

  /* ---------- meni: sve kategorije odjednom, indeks i pretraga ---------- */
  const TAG = { popular: ['★', 'Popular'], veg: ['V', 'Vegetarian'], spicy: ['S', 'Spicy'] };
  const bodyEl = $('[data-menu]'), indexEl = $('[data-index]'), noneEl = $('[data-none]');
  const itemHTML = (it) => {
    const tags = (it.tags || []).map((t) => '<span aria-hidden="true">' + TAG[t][0] + '</span>').join(' ');
    const tagSr = (it.tags || []).length ? '<span class="sr">, ' + it.tags.map((t) => TAG[t][1]).join(', ') + '</span>' : '';
    return '<li class="item" data-q="' + esc((it.name + ' ' + (it.desc || '')).toLowerCase()) + '"><div class="item-top"><h4>' + esc(it.name) + (tags ? '<sup>' + tags + '</sup>' : '') + tagSr + '</h4>'
      + (it.price != null ? '<span class="price">£' + it.price.toFixed(2) + '</span>' : '') + '</div>'
      + (it.desc ? '<p>' + esc(it.desc) + '</p>' : '') + '</li>';
  };
  bodyEl.innerHTML = MENU.map((c) => '<section class="cat" id="m-' + c.id + '" aria-labelledby="mh-' + c.id + '"><div class="cat-h"><h3 id="mh-' + c.id + '">' + esc(c.name) + '</h3><p>' + esc(c.note || '') + '</p></div><ul class="items">' + c.items.map(itemHTML).join('') + '</ul></section>').join('');
  indexEl.innerHTML = MENU.map((c) => '<a href="#m-' + c.id + '" data-cat="' + c.id + '">' + esc(c.name) + '</a>').join('');
  const idxLinks = $$('a', indexEl);
  const setActive = (id) => idxLinks.forEach((a) => {
    const on = a.dataset.cat === id; a.classList.toggle('on', on);
    if (on) { a.setAttribute('aria-current', 'true'); if (indexEl.scrollWidth > indexEl.clientWidth) indexEl.scrollTo({ left: a.offsetLeft - indexEl.offsetLeft - 20 }); } else a.removeAttribute('aria-current');
  });
  const cio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) setActive(en.target.id.slice(2)); }), { rootMargin: '-30% 0px -60% 0px' });
  $$('.cat', bodyEl).forEach((c) => cio.observe(c));
  setActive(MENU[0].id);

  const ms = $('[data-msearch]'), msBtn = $('[data-msearch-btn]'), input = $('[data-search]');
  msBtn.addEventListener('click', () => { const open = !ms.classList.contains('open'); ms.classList.toggle('open', open); msBtn.setAttribute('aria-expanded', open); if (open) input.focus(); else { input.value = ''; filter(); } });
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { input.value = ''; filter(); ms.classList.remove('open'); msBtn.setAttribute('aria-expanded', 'false'); msBtn.focus(); } });
  function filter() {
    const q = input.value.trim().toLowerCase();
    let any = false;
    $$('.cat', bodyEl).forEach((cat) => {
      let n = 0;
      $$('.item', cat).forEach((it) => { const hit = !q || it.dataset.q.includes(q); it.classList.toggle('is-hidden', !hit); if (hit) n++; });
      cat.classList.toggle('is-hidden', !n); idxLinks.find((a) => a.dataset.cat === cat.id.slice(2)).classList.toggle('is-hidden', !n);
      if (n) any = true;
    });
    noneEl.hidden = any;
    if (!any) noneEl.innerHTML = 'Nothing on the menu matches “' + esc(input.value.trim()) + '”.<button type="button" data-clear>Show the full menu</button>';
  }
  input.addEventListener('input', filter);
  noneEl.addEventListener('click', (e) => { if (e.target.closest('[data-clear]')) { input.value = ''; filter(); input.focus(); } });

  /* ---------- okusi nargile ---------- */
  $('[data-flavours]').innerHTML = FLAV.map((f) => '<li class="flav"><div><b>' + esc(f.name) + '</b><span>' + esc(f.note) + '</span></div>' + (f.fav ? '<em>Guest favourite</em>' : '') + '</li>').join('');

  /* ---------- recenzija i pitanja (samo pravi podaci) ---------- */
  const qEl = $('[data-quote]');
  if (S.reviews && S.reviews.length) {
    const r = S.reviews[0];
    qEl.innerHTML = '<blockquote>“' + esc(r.text) + '”</blockquote><figcaption>A guest on <a href="' + r.url + '" target="_blank" rel="noopener">' + esc(r.source) + '</a></figcaption>';
    qEl.hidden = false;
  }
  if (S.faq && S.faq.length) {
    $('[data-faq-list]').innerHTML = S.faq.map((f) => '<details><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>').join('');
    $('[data-faq]').hidden = false;
  }

  /* ---------- podnožje ---------- */
  $('[data-year]').textContent = new Date().getFullYear();
  if (S.demo) $('[data-demo-note]').textContent = ' · Menu and prices are indicative';
  $$('[data-fb]').forEach((a) => (a.href = S.social.facebook));

  /* ---------- zaglavlje i mobilni meni ---------- */
  const hdr = $('.hdr'), nav = $('#nav'), burger = $('.burger');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const lock = (on) => { document.body.style.overflow = on ? 'hidden' : ''; document.body.classList.toggle('locked', on); };
  const setNav = (open) => {
    nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); lock(open);
    if (open) $('a', nav).focus();
  };
  burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a') && nav.classList.contains('open')) setNav(false); });
  nav.addEventListener('keydown', (e) => {
    if (!nav.classList.contains('open')) return;
    if (e.key === 'Escape') { setNav(false); burger.focus(); }
    if (e.key === 'Tab') { const f = [...$$('a', nav), burger], a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); burger.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  burger.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) setNav(false); });
  const links = $$('.nav-links a'), secs = links.map((a) => $(a.getAttribute('href')));
  const sio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) links.forEach((a, i) => a.classList.toggle('on', secs[i] === en.target)); }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => s && sio.observe(s));

  /* ---------- uvećanje fotografija ---------- */
  const lb = $('[data-lb]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]');
  const shots = $$('[data-gallery] .m'); let idx = 0, lastFocus = null;
  const show = (i) => { idx = (i + shots.length) % shots.length; const im = $('img', shots[idx]); lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lbImg.width = im.naturalWidth || im.width; lbCap.textContent = $('figcaption', shots[idx]).textContent; };
  const open = (i) => { lastFocus = document.activeElement; show(i); lb.hidden = false; lock(true); $('[data-lb-close]').focus(); };
  const close = () => { lb.hidden = true; lock(false); if (lastFocus) lastFocus.focus(); };
  shots.forEach((m, i) => $('button', m).addEventListener('click', () => open(i)));
  $('[data-lb-close]').addEventListener('click', close);
  $('[data-lb-prev]').addEventListener('click', () => show(idx - 1));
  $('[data-lb-next]').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') { const f = $$('button', lb), a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); tx = null; });
})();
