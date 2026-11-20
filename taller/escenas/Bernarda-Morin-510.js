// Bernarda Morín 510, Providencia: la casona blanca de la esquina con su palmera y la terraza techada.
(function () {
  const R = rng(510);
  const SHADE = { b: .3 }, GLASS = { b: .9, m: .25 }, LINE = { b: .95 };

  // ── Cielo y sol ────────────────────────────────────────────────────────────
  radial('b', W + 300, -350, 3000, [[0, .6], [.4, .3], [.72, .09], [.9, 0]], S);
  circle(3270, 600, 340, { y: .88 });
  { const g = S.b, gr = g.createRadialGradient(3270, 600, 380, 3270, 600, 900); gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, W, H) } // sin azul alrededor del sol
  radial('y', 3270, 600, 900, [[0, .5], [.38, .5], [.6, .16], [1, 0]], S);

  // ── Fondo: cerro, vecinos, muro y árboles de la calle Canadá ───────────────
  fill([...ridge([[2900, 1330], [3200, 1250], [3500, 1215], [3840, 1260]], 14, 60, 4, 2900, W), [W, 1560], [2900, 1560]], { b: .2 });
  // casa de ladrillo al fondo
  fill([[2960, 1040], [3230, 1090], [3230, 1540], [2960, 1540]], { m: .62, y: .6 });
  fill([[2940, 1040], [3250, 1094], [3250, 1070], [2940, 1012]], { m: .8, y: .6, b: .4 });
  for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) rect(3020 + i * 70, 1150 + k * 130 + i * 10, 34, 70, GLASS);
  // vecino de la izquierda
  fill([[520, 968], [1210, 900], [1210, 1640], [520, 1640]], { b: .2 });
  fill([[500, 944], [1230, 874], [1230, 900], [500, 972]], { b: .5 });
  line([[520, 1010], [1210, 946]], 5, { b: .5 });
  for (let i = 0; i < 3; i++) { const x = 600 + i * 190, y = 1090 - i * 18; rect(x, y, 78, 170, { b: .55 }); rect(x, y + 330, 78, 180, { b: .55 }); line([[x - 12, y - 14], [x + 90, y - 22]], 6, { b: .5 }) }
  // muro blanco y árboles de la vereda de enfrente
  fill([[3330, 1500], [W, 1380], [W, 1700], [3330, 1590]], { b: .12 });
  line([[3330, 1500], [W, 1380]], 7, { b: .7 });
  function tree(x, y, h, seed, leafy) {
    const r = rng(seed);
    (function br(x, y, a, len, w, n) {
      const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
      line([[x, y], [(x + x2) / 2 + (r() - .5) * len * .15, (y + y2) / 2], [x2, y2]], w, { b: .9, m: .3 });
      if (n > 0) { const kids = 2 + (r() < .35 ? 1 : 0); for (let i = 0; i < kids; i++) br(x2, y2, a + (r() - .5) * 1.25, len * (.62 + r() * .2), Math.max(2, w * .62), n - 1) }
      else if (r() < leafy) circle(x2, y2, 26 + r() * 46, r() < .5 ? { y: .8, b: .32 } : { y: .7, b: .12 });
    })(x, y, -Math.PI / 2 + (r() - .5) * .2, h, 30, 5);
  }
  tree(3640, 1640, 330, 21, .75); tree(3420, 1560, 220, 22, .55);

  // ── La casona ──────────────────────────────────────────────────────────────
  // A: fachada iluminada (hacia la izquierda). Bq: fachada en sombra (calle abajo). u = 0 en la esquina.
  const A = (u, v) => [lerp(2300, 1150, u), lerp(lerp(800, 884, u), lerp(1624, 1560, u), v)];
  const Bq = (u, v) => [lerp(2300, 3000, u), lerp(lerp(800, 934, u), lerp(1624, 1520, u), v)];
  const quad = (F, u0, v0, u1, v1) => [F(u0, v0), F(u1, v0), F(u1, v1), F(u0, v1)];

  // terraza techada
  const postsA = [.04, .3, .56, .76], postsB = [.3, .62], TH = 215;
  const roofA = u => { const p = A(u, 0); return [p[0] + 26 - u * 60, p[1] - TH + u * 16] }, roofB = u => { const p = Bq(u, 0); return [p[0] + 10 + u * 50, p[1] - TH + u * 26] };
  // celosías del fondo
  fill([roofA(.3), roofA(.84), A(.8, 0), A(.3, 0)], { b: .16 });
  for (let i = 1; i < 13; i++) { const t = i / 13; line([[lerp(roofA(.3)[0], A(.3, 0)[0], t), lerp(roofA(.3)[1], A(.3, 0)[1], t)], [lerp(roofA(.84)[0], A(.8, 0)[0], t), lerp(roofA(.84)[1], A(.8, 0)[1], t)]], 5, { b: .6 }) }
  postsA.forEach(u => { const a = A(u, 0), b = roofA(u); line([[a[0], a[1]], [a[0], b[1]]], 15, LINE); line([[a[0] - 3, a[1]], [a[0] - 3, b[1]]], 5, { b: .2 }) });
  postsB.forEach(u => { const a = Bq(u, 0), b = roofB(u); line([[a[0], a[1]], [a[0], b[1]]], 13, LINE) });
  // baranda de la terraza
  line([A(0, -.07), A(.8, -.07)], 6, LINE); line([Bq(0, -.07), Bq(.66, -.07)], 6, LINE);
  // losa del techo: canto y cielo raso con listones
  const eave = 34;
  fill([roofA(-.03), roofA(.88), [roofA(.88)[0] + 60, roofA(.88)[1] + 44], [roofA(-.03)[0] + 30, roofA(-.03)[1] + 52]], { b: .42 });
  fill([roofB(0), roofB(.72), [roofB(.72)[0] - 40, roofB(.72)[1] + 40], [roofA(-.03)[0] + 30, roofA(-.03)[1] + 52]], { b: .62 });
  for (let i = 0; i < 26; i++) { const u = -.02 + i * .035, p = roofA(u); line([[p[0], p[1] + 6], [p[0] + 34, p[1] + 48]], 4, { b: .85 }) }
  fill([roofA(-.03), roofA(.88), [roofA(.88)[0], roofA(.88)[1] - eave], [roofA(-.03)[0], roofA(-.03)[1] - eave]], { b: .04 });
  fill([roofB(-.02), roofB(.72), [roofB(.72)[0], roofB(.72)[1] - eave], [roofB(-.02)[0], roofB(-.02)[1] - eave]], { b: .3 });
  line([roofA(.88), roofA(-.03), roofB(.72)], 6, LINE);
  line([[roofA(.88)[0], roofA(.88)[1] - eave], [roofA(-.03)[0], roofA(-.03)[1] - eave], [roofB(.72)[0], roofB(.72)[1] - eave]], 6, LINE);

  // muros
  fill(quad(A, 0, 0, 1, 1), KO);
  fill(quad(A, 0, 0, 1, 1), { y: .07 });
  fill(quad(Bq, 0, 0, 1, 1), KO); fill(quad(Bq, 0, 0, 1, 1), SHADE);
  // cornisas y molduras
  [[0, .035, .5], [.135, .17, .42], [.535, .556, .3]].forEach(([v0, v1, d]) => {
    fill(quad(A, -.012, v0, 1.012, v1), { b: d * .5 }); line([A(-.012, v1), A(1.012, v1)], 5, LINE); line([A(-.012, v0), A(1.012, v0)], 4, { b: .7 });
    fill(quad(Bq, -.012, v0, 1.012, v1), { b: d + .2 }); line([Bq(-.012, v1), Bq(1.012, v1)], 5, LINE);
  });
  fill(quad(A, 0, .95, 1, 1), { b: .22 }); fill(quad(Bq, 0, .95, 1, 1), { b: .5 });
  // pilastras de la fachada
  [.03, .36, .62, .97].forEach(u => { line([A(u, .17), A(u, .95)], 4, { b: .45 }); line([A(u + .035, .17), A(u + .035, .95)], 4, { b: .45 }) });
  // ventanas de la fachada iluminada
  [.14, .43, .72].forEach(u => {
    const w = .115;
    fill(quad(A, u, .235, u + w, .47), GLASS);
    fill(quad(A, u + .012, .25, u + w * .5, .47), { b: .55, y: .3 });           // cortina
    line([A(u + w / 2, .235), A(u + w / 2, .47)], 7, KO); line([A(u, .33), A(u + w, .33)], 6, KO);
    line(quad(A, u - .008, .225, u + w + .008, .475).concat([A(u - .008, .225)]), 6, LINE);
    fill(quad(A, u - .02, .2, u + w + .02, .218), { b: .5 });                  // dintel
    // balcón de fierro
    line([A(u - .02, .43), A(u + w + .02, .43)], 6, LINE); line([A(u - .02, .49), A(u + w + .02, .49)], 8, LINE);
    for (let i = 0; i <= 9; i++) { const uu = u - .02 + (w + .04) * i / 9; line([A(uu, .43), A(uu, .49)], 3, LINE) }
    // planta baja: postigos
    fill(quad(A, u, .65, u + w, .9), { b: .14 });
    for (let i = 1; i < 12; i++) line([A(u, .65 + .25 * i / 12), A(u + w, .65 + .25 * i / 12)], 3, { b: .6 });
    line([A(u + w / 2, .65), A(u + w / 2, .9)], 5, LINE);
    line(quad(A, u, .65, u + w, .9).concat([A(u, .65)]), 6, LINE);
  });
  // ventanas de la fachada en sombra
  [.1, .33, .56, .79].forEach((u, i) => {
    const w = .11;
    fill(quad(Bq, u, .235, u + w, .47), GLASS); line([Bq(u + w / 2, .235), Bq(u + w / 2, .47)], 5, SHADE);
    line(quad(Bq, u, .235, u + w, .47).concat([Bq(u, .235)]), 5, LINE);
    if (i) { fill(quad(Bq, u, .66, u + w, .9), GLASS); line(quad(Bq, u, .66, u + w, .9).concat([Bq(u, .66)]), 5, LINE) }
  });
  // puerta y toldo en la ochava
  fill(quad(Bq, .1, .68, .2, .95), { b: .95, m: .3 });
  fill([Bq(.06, .62), Bq(.26, .62), [Bq(.26, .7)[0] + 40, Bq(.26, .7)[1]], [Bq(.06, .7)[0] + 40, Bq(.06, .7)[1]]], { m: .8 });
  line([A(0, 0), A(0, 1)], 6, LINE);

  // ── Calle, vereda y solera amarilla ────────────────────────────────────────
  const CURB = [[0, 1838], [900, 1856], [1700, 1900], [2380, 1950], [2700, 1936], [2880, 1870], [3040, 1750], [3180, 1650], [3300, 1570]];
  fill([[0, 1640], [1150, 1560], [2300, 1624], [3000, 1520], [3330, 1540], [W, 1700], [W, H], [0, H]], KO);
  fill([[0, 1640], [1150, 1560], [2300, 1624], [3000, 1520], [3330, 1540], [W, 1700], [W, H], [0, H]], { b: .34 });
  // vereda
  const walk = [[0, 1650], [1150, 1575], [2300, 1640], [3000, 1528], [3300, 1570], ...CURB.slice().reverse()];
  fill(walk, KO); fill(walk, { m: .1, y: .1 });
  clip(walk, () => { for (let i = 0; i < 60; i++) line([[i * 70, 1560], [i * 70 - 260, 1960]], 2, { m: .32 }); for (let i = 0; i < 9; i++) line([[0, 1660 + i * 36], [3300, 1600 + i * 44]], 2, { m: .26 }) });
  line(CURB, 26, { y: .95, m: .12, b: 0 }); line(CURB.map(p => [p[0], p[1] + 15]), 7, { b: .9 });
  // sombra de la palmera y grietas del pavimento
  fill([[3330, 1590], [W, 1700], [W, 1790], [3330, 1622]], KO); fill([[3330, 1590], [W, 1700], [W, 1790], [3330, 1622]], { m: .1, y: .1 });
  line([[3330, 1622], [W, 1790]], 12, { y: .9, m: .12 });
  { const p = new Path2D(); p.ellipse(2760, 2010, 520, 60, -.05, 0, 7); fill(p, { b: .6 }) }
  const cr = rng(8);
  for (let i = 0; i < 14; i++) { let x = cr() * W, y = 1980 + cr() * 170; const pts = [[x, y]]; for (let k = 0; k < 6; k++) { x += 60 + cr() * 150; y += (cr() - .5) * 70; pts.push([x, y]) } line(pts, 3, { b: .78 }) }
  line([[3120, 1730], [3500, 1740], [W, 1900]], 4, { b: .7 });

  // ── Palmera ────────────────────────────────────────────────────────────────
  const PX = 2470, PY = 930;
  const trunk = []; for (let i = 0; i <= 20; i++) { const t = i / 20; trunk.push([PX - 44 - t * 14 + Math.sin(t * 3) * 10 - 40 * t * t, lerp(PY, 1730, t)]) }
  const trunkR = trunk.map((p, i) => [p[0] + 78 + i * 1.6, p[1]]).reverse();
  fill([...trunk, ...trunkR], { m: .32, y: .7, b: .12 });
  clip([...trunk, ...trunkR], () => {
    for (let i = 0; i < 46; i++) { const y = PY + i * 18; line([[PX - 160, y + 16], [PX + 100, y - 14]], 4, { b: .8 }) }
    fill(trunkR.concat(trunkR.map(p => [p[0] - 26, p[1]]).reverse()), { b: .7, m: .4, y: .7 });
  });
  function frond(a, len, half, d, seed) {
    const r = rng(seed), n = 9, pts = [[PX, PY]];
    for (let i = 0; i <= n; i++) {
      const t = i / n, aa = a - half + 2 * half * t, l = len * (.7 + .3 * Math.sin(Math.PI * t)) * (.94 + r() * .1);
      const droop = Math.max(0, Math.sin(aa)) * 0, gx = Math.cos(aa) * l, gy = Math.sin(aa) * l + droop;
      pts.push([PX + gx, PY + gy + Math.abs(gx) * .12]);
      if (i < n) { const am = aa + half / n, lm = l * .58; pts.push([PX + Math.cos(am) * lm, PY + Math.sin(am) * lm + Math.abs(Math.cos(am) * lm) * .12]) }
    }
    fill(pts, d);
    for (let i = 0; i <= n; i += 1) { const q = pts[1 + i * 2]; if (q) line([[PX, PY], q], 3, { b: Math.min(1, (d.b || 0) + .35) }) }
  }
  // faldón seco
  for (let i = 0; i < 8; i++) frond(Math.PI * (.2 + i * .085), 300 + R() * 70, .17, { m: .4, y: .75, b: .2 }, 40 + i);
  // copa: hojas de abanico, de atrás hacia adelante
  const greens = [{ b: .95, y: .7, m: .15 }, { b: .72, y: .9 }, { b: .45, y: .92 }];
  for (let ring = 0; ring < 3; ring++) for (let i = 0; i < 11 - ring * 2; i++) {
    const n = 11 - ring * 2, a = -Math.PI * .5 + (i - (n - 1) / 2) * (2.9 / n) + (R() - .5) * .2 + ring * .13;
    frond(a, 470 - ring * 70 + R() * 60, .2 - ring * .02, greens[ring], 100 + ring * 20 + i);
  }
  circle(PX, PY, 46, { b: .95, y: .6, m: .3 });

  // ── Reja de pilares blancos ────────────────────────────────────────────────
  function fence(p0, p1, n, h0, h1, shade) {
    for (let i = 0; i < n; i++) {
      const a = [lerp(p0[0], p1[0], i / n), lerp(p0[1], p1[1], i / n)], b = [lerp(p0[0], p1[0], (i + 1) / n), lerp(p0[1], p1[1], (i + 1) / n)];
      const ha = lerp(h0, h1, i / n), hb = lerp(h0, h1, (i + 1) / n);
      fill([[a[0], a[1] - ha * .26], [b[0], b[1] - hb * .26], b, a], KO); fill([[a[0], a[1] - ha * .26], [b[0], b[1] - hb * .26], b, a], { b: shade ? .34 : .06 });
      line([[a[0], a[1] - ha * .26], [b[0], b[1] - hb * .26]], 5, LINE);
      line([[a[0], a[1] - ha * .86], [b[0], b[1] - hb * .86]], 6, LINE);
      for (let k = 1; k < 13; k++) { const t = k / 13, x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t), hh = lerp(ha, hb, t); line([[x, y - hh * .26], [x, y - hh * .92]], 4, LINE) }
    }
    for (let i = 0; i <= n; i++) {
      const x = lerp(p0[0], p1[0], i / n), y = lerp(p0[1], p1[1], i / n), hh = lerp(h0, h1, i / n), w = hh * .34;
      rect(x - w / 2, y - hh, w, hh, KO); rect(x - w / 2, y - hh, w, hh, { b: shade ? .3 : .03 });
      rect(x + w * .14, y - hh, w * .36, hh, { b: shade ? .5 : .24 });
      rect(x - w * .64, y - hh - 16, w * 1.28, 20, KO); rect(x - w * .64, y - hh - 16, w * 1.28, 20, { b: .14 });
      line([[x - w / 2, y - hh], [x - w / 2, y], [x + w / 2, y], [x + w / 2, y - hh]], 4, LINE);
      line([[x - w * .64, y - hh - 16], [x + w * .64, y - hh - 16], [x + w * .64, y - hh + 4], [x - w * .64, y - hh + 4], [x - w * .64, y - hh - 16]], 4, LINE);
    }
  }
  fence([2640, 1790], [3080, 1600], 3, 240, 130, true);
  fence([2640, 1790], [840, 1680], 5, 240, 190, false);
  text('510', 2640, 1690, '700 46px "Helvetica Neue", Arial, sans-serif', LINE);

  // ── Poste, cables y letrero de la calle ────────────────────────────────────
  line([[300, 2000], [330, 760]], 26, { b: .55 }); line([[330, 800], [420, 730], [560, 716]], 9, { b: .55 });
  [[790, 1010, 1032], [815, 1040, 1058], [850, 1075, 1096]].forEach(([y0, ym, y1]) => {
    const pts = []; for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([lerp(330, W, t), lerp(y0, y1, t) + Math.sin(Math.PI * t) * (ym - (y0 + y1) / 2 + 60)]) } line(pts, 4, { b: .9 });
  });
  line([[2860, 1930], [2860, 1470]], 10, { b: .9 });
  const sg = [[2600, 1470], [2980, 1470], [2980, 1560], [2600, 1560]];
  fill(sg, { b: 1, m: .35, y: 0 });
  text('BERNARDA MORÍN', 2790, 1517, '700 37px "Helvetica Neue", Arial, sans-serif', KO);
})();
