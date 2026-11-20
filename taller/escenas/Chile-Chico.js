// Chile Chico: la "ciudad del sol" a orillas del lago General Carrera, con sus álamos y cerezas.
(function () {
  const R = rng(1929), LINE = { b: .95, m: .3 }, LAKE = 1250, SHORE = 1700;

  // ── Cielo y sol ────────────────────────────────────────────────────────────
  radial('b', W + 300, -350, 2900, [[0, .6], [.4, .3], [.72, .1], [.9, 0]], S);
  const SX = 2860, SY = 520;
  { const g = S.b, gr = g.createRadialGradient(SX, SY, 330, SX, SY, 950); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H) }
  radial('y', SX, SY, 820, [[0, .5], [.4, .5], [.62, .16], [1, 0]], S);
  circle(SX, SY, 300, { y: .92 }); circle(SX, SY, 300, { m: .22 }); circle(SX, SY, 236, { m: 0 });

  // ── Cordillera nevada, cerros violeta y estepa ─────────────────────────────
  const snow = ridge([[700, 1060], [1100, 960], [1500, 860], [1900, 930], [2300, 800], [2700, 900], [3100, 780], [3500, 880], [3840, 820]], 90, 120, 3, 700, W);
  fill([...snow, [W, LAKE], [700, LAKE]], KO);
  clip([...snow, [W, LAKE], [700, LAKE]], () => {
    for (let i = 1; i < snow.length - 1; i++) { const p = snow[i]; if (p[1] < snow[i - 1][1] && p[1] <= snow[i + 1][1]) fill([p, [p[0] + 190, p[1] + 330], [p[0] + 40, p[1] + 330], [p[0] - 20, p[1] + 150]], { b: .36 }) }
    const low = ridge([[700, 1100], [1500, 1010], [2300, 990], [3100, 960], [3840, 990]], 70, 70, 5, 700, W);
    fill([...low, [W, LAKE], [700, LAKE]], { b: .4 });
    for (let i = 0; i < 60; i++) { const x = 760 + R() * 3000, y = along(low, x) + (R() - .3) * 60; fill([[x, y], [x + 40 + R() * 60, y + 50 + R() * 50], [x - 30, y + 60 + R() * 40]], KO) }
  });
  line(snow, 4, { b: .7 }); noSky([...snow, [W, H], [0, H], [0, 1150], [700, 1150]]);
  const mid = ridge([[0, 1150], [500, 1120], [900, 1060], [1400, 1120], [2000, 1070], [2600, 1130], [3200, 1080], [3840, 1120]], 46, 70, 11);
  fill([...mid, [W, LAKE], [0, LAKE]], KO); fill([...mid, [W, LAKE], [0, LAKE]], { b: .62, m: .4 });
  clip([...mid, [W, LAKE], [0, LAKE]], () => { for (let i = 0; i < 40; i++) { const x = R() * W, y = along(mid, x) + 10; fill([[x, y], [x + 120 + R() * 90, y + 150], [x + 30, y + 150]], { b: .85, m: .45 }) } });
  const steppe = ridge([[0, 1210], [700, 1180], [1500, 1216], [2300, 1190], [3100, 1222], [3840, 1196]], 20, 80, 13);
  fill([...steppe, [W, LAKE + 6], [0, LAKE + 6]], KO); fill([...steppe, [W, LAKE + 6], [0, LAKE + 6]], { y: .55, m: .16, b: .05 });

  // ── Lago turquesa ──────────────────────────────────────────────────────────
  rect(0, LAKE, W, SHORE - LAKE + 200, KO);
  grad('b', 0, LAKE, 0, SHORE, [[0, .42], [.2, .26], [1, .16]], [[0, LAKE], [W, LAKE], [W, SHORE + 200], [0, SHORE + 200]]);
  rect(0, LAKE, W, SHORE - LAKE + 200, { y: .16 });
  water(LAKE + 6, SHORE + 200, { b: .34 }, 21, { per: 36 });
  reflect(SX, 300, LAKE + 6, SHORE + 20, { y: .95, b: .04 }, 8, 36);

  // ── Muelle y bote ──────────────────────────────────────────────────────────
  boat(1050, 1470, .9, { m: .85, y: .5 }, 31);
  const pier = [[1560, 1760], [1700, 1760], [900, 1560], [830, 1560]];
  for (let i = 0; i <= 7; i++) { const t = i / 7, x = lerp(1560, 830, t), y = lerp(1760, 1560, t), x2 = lerp(1700, 900, t); line([[x, y], [x, y + 70 - t * 30]], 12 - t * 5, LINE); line([[x2, y], [x2, y + 70 - t * 30]], 12 - t * 5, LINE) }
  fill(pier, KO); fill(pier, { y: .6, m: .3, b: .12 });
  for (let i = 1; i < 16; i++) { const t = i / 16; line([[lerp(1560, 830, t), lerp(1760, 1560, t)], [lerp(1700, 900, t), lerp(1760, 1560, t)]], 3, { b: .7 }) }
  line([...pier, pier[0]], 5, LINE);

  // ── Orilla: estepa, álamos y casas ─────────────────────────────────────────
  const shore = [[0, 1840], [600, 1800], [1200, 1760], [1700, 1716], [2400, 1690], [3100, 1668], [W, 1640]];
  const land = [...shore, [W, H], [0, H]];
  fill(land, KO); fill(land, { y: .46, m: .1 });
  line(shore, 7, { b: .6 });
  function poplar(x, y, h, autumn) {
    const w = h * .13, p = new Path2D(); p.moveTo(x, y); p.bezierCurveTo(x - w * 1.5, y - h * .3, x - w, y - h * .85, x, y - h); p.bezierCurveTo(x + w, y - h * .85, x + w * 1.5, y - h * .3, x, y); 
    fill(p, KO); fill(p, autumn ? { y: .95, m: .25 } : { y: .9, b: .5 });
    const q = new Path2D(); q.moveTo(x, y); q.bezierCurveTo(x + w * .3, y - h * .4, x + w * .2, y - h * .8, x, y - h); q.bezierCurveTo(x + w, y - h * .85, x + w * 1.5, y - h * .3, x, y);
    fill(q, autumn ? { y: .95, m: .55, b: .1 } : { y: .85, b: .88 });
    line([[x, y + 14], [x, y - h * .25]], 6, LINE);
  }
  const pr = rng(60);
  [[1800, 9], [2500, 7], [3150, 10]].forEach(([x0, n], gi) => { for (let i = 0; i < n; i++) { const x = x0 + i * 62 + pr() * 14; poplar(x, along(shore, x) + 30, 330 + pr() * 170 + (gi === 2 ? 60 : 0), pr() < .22) } });
  function house(x, y, w, h, roof, seed) {
    rect(x, y - h, w, h, KO); rect(x, y - h, w, h, { y: .08 }); rect(x + w * .62, y - h, w * .38, h, { b: .3 });
    fill([[x - 14, y - h], [x + w * .31, y - h * 1.62], [x + w * .62, y - h], [x + w + 14, y - h], [x + w * .69, y - h * 1.62], [x + w * .31, y - h * 1.62]], KO);
    fill([[x - 14, y - h], [x + w * .31, y - h * 1.62], [x + w * .62, y - h]], { y: .08 });
    fill([[x + w * .31, y - h * 1.62], [x + w * .69 + 60, y - h * 1.62], [x + w + 14, y - h], [x + w * .62, y - h]], roof);
    line([[x - 14, y - h], [x + w * .31, y - h * 1.62], [x + w * .62, y - h]], 5, LINE); line([[x + w * .31, y - h * 1.62], [x + w * .69 + 60, y - h * 1.62], [x + w + 14, y - h], [x + w * .62, y - h]], 5, LINE);
    line([[x, y - h], [x, y], [x + w, y], [x + w, y - h]], 5, LINE);
    rect(x + w * .2, y - h * .58, w * .22, h * .58, { b: .9, m: .4 }); rect(x + w * .72, y - h * .7, w * .16, h * .3, { b: .95 }); rect(x + w * .3, y - h * 1.24, w * .08, h * .18, { b: .9 });
  }
  const roofs = [{ m: .88, y: .5 }, { b: .85, m: .2 }, { y: .92, m: .35 }, { m: .6, b: .5 }, { b: .6, y: .8 }];
  [[1900, 150, 96], [2090, 190, 110], [2330, 140, 90], [2640, 170, 104], [2850, 150, 92], [3260, 200, 116], [3520, 150, 96], [3700, 170, 100]].forEach(([x, w, h], i) => house(x, along(shore, x) + 64, w, h, roofs[i % roofs.length], i));
  // capilla
  { const x = 3040, y = along(shore, 3040) + 60; rect(x, y - 250, 70, 250, KO); rect(x, y - 250, 70, 250, { y: .08 }); rect(x + 44, y - 250, 26, 250, { b: .3 }); fill([[x - 10, y - 250], [x + 35, y - 380], [x + 80, y - 250]], { m: .88, y: .5 }); line([[x - 10, y - 250], [x + 35, y - 380], [x + 80, y - 250], [x - 10, y - 250]], 5, LINE); line([[x, y - 250], [x, y], [x + 70, y], [x + 70, y - 250]], 5, LINE); line([[x + 35, y - 380], [x + 35, y - 440]], 6, LINE); line([[x + 15, y - 418], [x + 55, y - 418]], 6, LINE); rect(x + 22, y - 200, 24, 54, { b: .95 }) }

  // coirones de la estepa
  const tr = rng(90);
  for (let i = 0; i < 170; i++) { const x = tr() * W, y = along(shore, x) + 90 + tr() * tr() * 420, s = .5 + (y - 1700) / 380; if (y > H) continue;
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .2 + (tr() - .5) * .1, len = (34 + tr() * 30) * s; line([[x, y], [x + Math.cos(a) * len, y + Math.sin(a) * len]], 4 * s, tr() < .5 ? { y: .95, m: .45, b: .2 } : { b: .7, y: .8 }) } }
  // cerco de estacas
  for (let i = 0; i < 9; i++) { const x = 60 + i * 150, y = 2020 - i * 18; line([[x, y + 110], [x + 8, y - 60]], 16, { b: .85, m: .45, y: .4 }); if (i < 8) { line([[x + 6, y - 30], [x + 156, y - 48]], 3, LINE); line([[x + 4, y + 30], [x + 154, y + 12]], 3, LINE) } }

  // ── Rama de cerezo en primer plano ─────────────────────────────────────────
  const br = [[W + 20, 1730], [3600, 1800], [3320, 1830], [3050, 1900], [2860, 1980]];
  line(br, 26, { b: .9, m: .5, y: .4 }); line([[3600, 1800], [3480, 1700], [3400, 1650]], 14, { b: .9, m: .5, y: .4 }); line([[3320, 1830], [3240, 1940], [3200, 2010]], 12, { b: .9, m: .5, y: .4 });
  const cr = rng(5);
  function leaf(x, y, a, len) { const c = Math.cos(a), s = Math.sin(a), nx = -s, ny = c, p = new Path2D(); p.moveTo(x, y); p.quadraticCurveTo(x + c * len * .5 + nx * len * .3, y + s * len * .5 + ny * len * .3, x + c * len, y + s * len); p.quadraticCurveTo(x + c * len * .5 - nx * len * .3, y + s * len * .5 - ny * len * .3, x, y); fill(p, KO); fill(p, cr() < .5 ? { y: .9, b: .5 } : { y: .85, b: .85 }); line([[x, y], [x + c * len, y + s * len]], 3, { b: .95 }) }
  [[3700, 1770, -2.3], [3560, 1800, -1.2], [3420, 1660, -2.6], [3380, 1650, -.6], [3300, 1836, -1.9], [3120, 1880, -2.4], [3000, 1920, -1.5], [2870, 1980, -2.7], [2880, 1990, 2.6], [3220, 1990, .5], [3760, 1790, .9], [3500, 1820, 1.4]].forEach(l => leaf(l[0], l[1], l[2], 150 + cr() * 60));
  [[3640, 1960], [3700, 2010], [3470, 1990], [3540, 2050], [3080, 2070], [3150, 2110], [3340, 2100], [2960, 2100], [3780, 1900]].forEach(([x, y], i) => {
    const top = [x + (i % 2 ? 40 : -30), y - 150 - (i % 3) * 20]; line([top, [x + 6, y - 70], [x, y - 40]], 5, { b: .7, y: .7 });
    circle(x, y, 56, KO); circle(x, y, 56, { m: .95, y: .45 }); circle(x + 16, y + 14, 40, { m: .95, y: .45, b: .45 }); circle(x - 18, y - 20, 12, KO);
  });
})();
