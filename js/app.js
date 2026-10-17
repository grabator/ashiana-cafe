/*
 * Café Ashiana: meni iz data/menu.js, status "otvoreno" po londonskom vremenu, galerija sa uvećanjem,
 * dim na canvasu, zaglavlje i mobilni meni. Sve animacije staju van ekrana i poštuju "smanji pokrete".
 */
(() => {
  const S = window.ASHIANA, MENU = window.ASHIANA_MENU, FLAV = window.ASHIANA_SHISHA;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- status: otvoreno / zatvoreno (Europe/London) ---------- */
  const toMin = (hm) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
  const fmt = (hm) => { let [h, m] = hm.split(':').map(Number); const ap = h >= 12 && h < 24 ? 'PM' : 'AM'; h = h % 12 || 12; return h + (m ? ':' + String(m).padStart(2, '0') : '') + ap; };
  // trenutni dan i minute u Londonu; ?now=2026-10-17T01:30 služi za provjeru (londonsko vrijeme)
  function londonNow() {
    const q = new URLSearchParams(location.search).get('now');
    if (q && /^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(q)) { const d = new Date(q + ':00Z'); return { day: d.getUTCDay(), min: d.getUTCHours() * 60 + d.getUTCMinutes() }; }
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: S.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute };
  }
  // vraća { open, text, soon, session } ; session = dan čije radno vrijeme trenutno traje
  function status(now = londonNow()) {
    const H = S.hours, today = H[now.day], yday = H[(now.day + 6) % 7];
    const yClose = toMin(yday.close), yOpen = toMin(yday.open);
    // poslije ponoći: još traje jučerašnje radno vrijeme
    if (yClose < yOpen && now.min < yClose) {
      const left = yClose - now.min;
      return { open: true, soon: left <= 30, session: (now.day + 6) % 7, text: left <= 30 ? 'Closing soon · until ' + fmt(yday.close) : 'Open now · until ' + fmt(yday.close) };
    }
    const o = toMin(today.open), c = toMin(today.close);
    const overnight = c < o;
    if (now.min >= o && (overnight || now.min < c)) {
      const left = overnight ? 24 * 60 - now.min + c : c - now.min;
      return { open: true, soon: left <= 30, session: now.day, text: left <= 30 ? 'Closing soon · until ' + fmt(today.close) : 'Open now · until ' + fmt(today.close) };
    }
    if (now.min < o) return { open: false, session: now.day, text: 'Closed · opens today at ' + fmt(today.open) };
    const t = H[(now.day + 1) % 7];
    return { open: false, session: now.day, text: 'Closed · opens tomorrow at ' + fmt(t.open) };
  }
  window.ashianaStatus = status;   // za testove
  function paintStatus() {
    const st = status();
    $$('[data-status]').forEach((el) => {
      el.classList.toggle('open', st.open && !st.soon); el.classList.toggle('soon', !!st.soon);
      el.querySelector('span').textContent = st.text;
    });
    // tabela: svaki dan posebno, današnji (dan čije veče traje) istaknut
    const tb = $('[data-hours] tbody');
    if (tb) {
      const order = [1, 2, 3, 4, 5, 6, 0];
      tb.innerHTML = order.map((d) => { const h = S.hours[d]; return '<tr' + (d === st.session ? ' class="today"' : '') + '><th scope="row">' + h.day + '</th><td>' + fmt(h.open) + ' to ' + fmt(h.close) + '</td></tr>'; }).join('');
    }
  }
  paintStatus(); setInterval(paintStatus, 60000);

  /* ---------- meni ---------- */
  const pillsEl = $('[data-pills]'), bodyEl = $('[data-menu]'), searchEl = $('[data-search]');
  const TAG = { popular: 'Popular', spicy: 'Spicy', veg: 'Veg' };
  let current = MENU[0].id;
  const itemHTML = (it) => '<li class="item"><div class="item-top"><h4>' + esc(it.name) + '</h4>'
    + (it.tags && it.tags.length ? '<span class="tags">' + it.tags.map((t) => '<span class="tag ' + t + '">' + TAG[t] + '</span>').join('') + '</span>' : '')
    + '<span class="dots" aria-hidden="true"></span>'
    + (it.price != null ? '<span class="price">£' + it.price.toFixed(2) + '</span>' : '<span class="price ask">ask us</span>')
    + '</div>' + (it.desc ? '<p>' + esc(it.desc) + '</p>' : '') + '</li>';
  const catHTML = (c, items) => '<div class="cat" id="cat-' + c.id + '" role="tabpanel" aria-label="' + esc(c.name) + '"><div class="cat-h"><h3>' + esc(c.name) + '</h3><p>' + esc(c.note || '') + '</p></div><ul class="items">' + items.map(itemHTML).join('') + '</ul></div>';
  pillsEl.innerHTML = MENU.map((c) => '<button type="button" class="pill" role="tab" data-cat="' + c.id + '" aria-selected="false">' + esc(c.name) + '</button>').join('');
  function showCat(id, focusPill) {
    current = id; searchEl.value = '';
    const c = MENU.find((x) => x.id === id);
    bodyEl.innerHTML = catHTML(c, c.items);
    $$('.pill', pillsEl).forEach((p) => { const on = p.dataset.cat === id; p.setAttribute('aria-selected', on); p.tabIndex = on ? 0 : -1; if (on) { const l = p.offsetLeft - pillsEl.offsetLeft, r = l + p.offsetWidth; if (l < pillsEl.scrollLeft || r > pillsEl.scrollLeft + pillsEl.clientWidth * 0.9) pillsEl.scrollTo({ left: l - 24, behavior: reduced ? 'auto' : 'smooth' }); if (focusPill) p.focus({ preventScroll: true }); } });
  }
  pillsEl.addEventListener('click', (e) => { const p = e.target.closest('.pill'); if (p) showCat(p.dataset.cat); });
  pillsEl.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = MENU.findIndex((c) => c.id === current), n = (i + (e.key === 'ArrowRight' ? 1 : MENU.length - 1)) % MENU.length;
    e.preventDefault(); showCat(MENU[n].id, true);
  });
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  searchEl.addEventListener('input', () => {
    const q = norm(searchEl.value.trim());
    if (!q) { showCat(current); return; }
    $$('.pill', pillsEl).forEach((p) => p.setAttribute('aria-selected', 'false'));
    const found = MENU.map((c) => [c, c.items.filter((it) => norm(it.name + ' ' + (it.desc || '')).includes(q))]).filter(([, its]) => its.length);
    bodyEl.innerHTML = found.length ? found.map(([c, its]) => catHTML(c, its)).join('')
      : '<div class="none"><p>Nothing on the menu matches “' + esc(searchEl.value.trim()) + '”.</p><button type="button" class="btn btn-line btn-sm" data-clear>Show the full menu</button></div>';
  });
  bodyEl.addEventListener('click', (e) => { if (e.target.closest('[data-clear]')) { showCat(current); searchEl.focus(); } });
  showCat(current);

  /* ---------- okusi nargile ---------- */
  const leaf = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4c3 4 3 7 0 10s-3 6 0 10M10 9c2 3 2 5 0 7s-2 5 0 7M22 9c2 3 2 5 0 7s-2 5 0 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  $('[data-flavours]').innerHTML = FLAV.map((f) => '<li class="flav rv' + (f.fav ? ' fav' : '') + '">' + leaf + '<h3>' + esc(f.name) + '</h3><p>' + esc(f.note) + '</p></li>').join('');

  /* ---------- recenzije (samo prave) ---------- */
  const qEl = $('[data-quote]');
  if (S.reviews && S.reviews.length) {
    const r = S.reviews[0];
    qEl.innerHTML = '<blockquote>' + esc(r.text) + '</blockquote><figcaption>A guest on <a href="' + r.url + '" target="_blank" rel="noopener">' + esc(r.source) + '</a></figcaption>';
    qEl.hidden = false; qEl.classList.add('rv');
  }

  /* ---------- podnožje ---------- */
  const yEl = $('[data-year]'); if (yEl) yEl.textContent = new Date().getFullYear();
  const dEl = $('[data-demo-note]'); if (dEl && S.demo) dEl.textContent = ' · Menu and prices are indicative';
  $$('[data-fb]').forEach((a) => (a.href = S.social.facebook));

  /* ---------- zaglavlje, mobilni meni, aktivni link ---------- */
  const hdr = $('.hdr'), nav = $('#nav'), burger = $('.burger');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const setNav = (open) => {
    nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) nav.querySelector('a').focus();
  };
  burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a') && nav.classList.contains('open')) setNav(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); burger.focus(); } });
  const links = $$('.nav > a'), secs = links.map((a) => $(a.getAttribute('href')));
  const sio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) links.forEach((a, i) => a.classList.toggle('on', secs[i] === en.target)); }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => s && sio.observe(s));

  /* ---------- pojavljivanje pri skrolu, neon ---------- */
  $$('.sec-h, .favs, .menu-foot, .crew-txt, .crew-pics, .find-grid, .gallery .g').forEach((el) => el.classList.add('rv'));
  const rio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); } }), { threshold: 0.12 });
  $$('.rv').forEach((el, i) => { if (el.classList.contains('g') || el.classList.contains('flav')) el.style.transitionDelay = (i % 3) * 0.08 + 's'; rio.observe(el); });
  const neon = $('[data-neon]');
  new IntersectionObserver((ents, o) => ents.forEach((en) => { if (en.isIntersecting) { neon.classList.add('on'); o.disconnect(); } }), { threshold: 0.6 }).observe(neon);

  /* ---------- galerija: uvećanje ---------- */
  const lb = $('[data-lb]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]');
  const shots = $$('[data-gallery] .g'); let idx = 0, lastFocus = null;
  const show = (i) => { idx = (i + shots.length) % shots.length; const b = shots[idx].querySelector('button'), im = b.querySelector('img'); lbImg.src = b.dataset.full; lbImg.alt = im.alt; lbCap.textContent = shots[idx].querySelector('figcaption').textContent; };
  const open = (i) => { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]').focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  shots.forEach((g, i) => g.querySelector('button').addEventListener('click', () => open(i)));
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

  /* ---------- dim (canvas): mekane mrlje koje se dižu, staju van ekrana ---------- */
  function smoke(canvas, opt) {
    if (reduced || !canvas) return;
    const g = canvas.getContext('2d'); let W = 0, H = 0, dpr = 1, raf = 0, vis = false, last = 0, slow = 0, dead = false;
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = 128;
    const sg = sprite.getContext('2d'), rg = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, opt.color + '0.55)'); rg.addColorStop(0.5, opt.color + '0.16)'); rg.addColorStop(1, opt.color + '0)');
    sg.fillStyle = rg; sg.fillRect(0, 0, 128, 128);
    const P = [];
    const spawn = (p, init) => { p.x = W * (0.15 + Math.random() * 0.7); p.y = init ? H * (0.3 + Math.random() * 0.7) : H + 60; p.r = 60 + Math.random() * 120; p.vx = (Math.random() - 0.5) * 8; p.vy = -(10 + Math.random() * 18); p.a = 0; p.life = 0; p.max = 9 + Math.random() * 7; p.ph = Math.random() * 6.28; return p; };
    // dim je mekan, pa se crta u pola rezolucije (četiri puta manje piksela)
    const resize = () => { const r = canvas.getBoundingClientRect(); W = r.width; H = r.height; dpr = 0.5; canvas.width = Math.ceil(W * dpr); canvas.height = Math.ceil(H * dpr); };
    resize(); for (let i = 0; i < opt.n; i++) P.push(spawn({}, true));
    new ResizeObserver(resize).observe(canvas);
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const raw = (t - (last || t)) / 1000, dt = Math.min(0.05, raw); last = t;
      // slab uređaj: ako su kadrovi duži od 30 ms tri sekunde, dim se gasi
      slow = raw > 0.03 ? slow + raw : Math.max(0, slow - raw);
      if (slow > 3) { cancelAnimationFrame(raf); raf = 0; dead = true; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, canvas.width, canvas.height); return; }
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      for (const p of P) {
        p.life += dt; p.x += (p.vx + Math.sin(p.life * 0.7 + p.ph) * 10) * dt; p.y += p.vy * dt; p.r += 6 * dt;
        const k = p.life / p.max; g.globalAlpha = opt.alpha * Math.sin(Math.min(1, k) * Math.PI);
        g.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        if (k >= 1) spawn(p, false);
      }
    };
    const sync = () => { const want = vis && !document.hidden && !dead; if (want && !raf) { last = 0; raf = requestAnimationFrame(tick); } else if (!want && raf) { cancelAnimationFrame(raf); raf = 0; } };
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; sync(); }).observe(canvas);
    document.addEventListener('visibilitychange', sync);
  }
  smoke($('.hero .smoke'), { n: innerWidth < 700 ? 6 : 9, alpha: 0.38, color: 'rgba(255,214,170,' });
  smoke($('.smoke-2'), { n: innerWidth < 700 ? 6 : 9, alpha: 0.4, color: 'rgba(150,190,255,' });

  // njihanje sijalica staje kad prvi ekran nije vidljiv
  const hero = $('.hero');
  new IntersectionObserver(([e]) => hero.classList.toggle('paused', !e.isIntersecting)).observe(hero);

  // ulaz (logo se nacrta, pa naslov): pokreće se kad su fontovi spremni ili najkasnije za 600 ms
  const go = () => document.documentElement.classList.add('ready');
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(go); else go();
})();
