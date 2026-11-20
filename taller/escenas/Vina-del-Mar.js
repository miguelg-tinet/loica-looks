// Viña del Mar: el Castillo Wulff sobre las rocas, con el sol cayendo al Pacífico.
(function () {
  const R = rng(1906), HOR = 1250, LINE = { b: .95, m: .3 };
  const STONE = { y: .42, m: .16, b: .05 }, SHADE = { y: .42, m: .3, b: .5 }, ROOF = { m: .85, y: .6, b: .1 };

  // ── Cielo de atardecer ─────────────────────────────────────────────────────
  radial('b', W + 300, -350, 2900, [[0, .62], [.4, .32], [.72, .1], [.9, 0]], S);
  radial("y", 2060, HOR + 60, 1500, [[0, .7], [.3, .55], [.65, .2], [1, 0]], S);
  radial("m", 2060, HOR + 80, 1050, [[0, .42], [.4, .26], [1, 0]], S);
  const SX = 2060, SY = 1150, SR = 300;
  { const g = S.b, gr = g.createRadialGradient(SX, SY, 300, SX, SY, 1100); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H) }
  circle(SX, SY, SR, { m: .9, y: .55 });
  circle(SX, SY, SR - 70, { m: .7, y: .85 });
  [[1500, 760, 1.2], [1650, 700, .9], [1380, 840, .8], [2500, 640, 1], [2640, 700, .7]].forEach(g => gull(g[0], g[1], g[2]));

  // cerros de Valparaíso al fondo, con sus casas
  const far = ridge([[0, 1205], [500, 1150], [900, 1168], [1300, 1206], [1700, 1236], [1900, HOR]], 16, 60, 7, 0, 1900);
  fill([...far, [1900, HOR], [0, HOR]], { b: .34, m: .12 });
  for (let i = 0; i < 70; i++) { const x = R() * 1500, y = along(far, x) + 14 + R() * (HOR - along(far, x) - 26); rect(x, y, 10 + R() * 16, 8 + R() * 12, R() < .3 ? { y: .9, b: 0, m: 0 } : KO) }

  // ── Mar ────────────────────────────────────────────────────────────────────
  rect(0, HOR, W, H - HOR, KO); noSky([[0, HOR], [W, HOR], [W, H], [0, H]]);
  grad('b', 0, HOR, 0, H, [[0, .42], [.1, .2], [1, .1]], [[0, HOR], [W, HOR], [W, H], [0, H]]);
  grad('y', 0, HOR, 0, H, [[0, .16], [.3, .05], [1, 0]], [[0, HOR], [W, HOR], [W, H], [0, H]]);
  water(HOR + 8, H, { b: .27 }, 12, { per: 40 });
  reflect(SX, 360, HOR + 6, H, { m: .88, y: .5, b: 0 }, 5);
  reflect(SX, 150, HOR + 6, H, { m: .6, y: .85, b: 0 }, 6);

  // ── Roca y castillo ────────────────────────────────────────────────────────
  const GY = 1392; // nivel del zócalo
  // palmeras y edificios de la costanera, detrás
  fill([[3560, 1180], [W, 1150], [W, 1420], [3560, 1420]], { b: .3, m: .15 });
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) rect(3600 + i * 62, 1200 + k * 48, 30, 22, { y: .8 });
  palm(3716, 1410, 470, 1.3, 3); palm(3806, 1420, 360, 1.1, 4); palm(2890, 1400, 300, .9, 9);

  function merlons(x0, x1, y, n, h, d) { const w = (x1 - x0) / (n * 2 - 1); for (let i = 0; i < n; i++) { rect(x0 + i * 2 * w, y - h, w, h + 2, KO); rect(x0 + i * 2 * w, y - h, w, h + 2, d); line([[x0 + i * 2 * w, y], [x0 + i * 2 * w, y - h], [x0 + i * 2 * w + w, y - h], [x0 + i * 2 * w + w, y]], 4, LINE) } }
  function wall(x0, y0, x1, y1, shadeFrom) {
    rect(x0, y0, x1 - x0, y1 - y0, KO); rect(x0, y0, x1 - x0, y1 - y0, STONE);
    if (shadeFrom !== undefined) rect(shadeFrom, y0, x1 - shadeFrom, y1 - y0, SHADE);
    const r = rng(x0 + y0); for (let i = 0; i < (x1 - x0) * (y1 - y0) / 5200; i++) { const x = x0 + 10 + r() * (x1 - x0 - 50), y = y0 + 10 + r() * (y1 - y0 - 20); line([[x, y], [x + 22 + r() * 22, y]], 3, { b: .6 }) }
    line([[x0, y1], [x0, y0], [x1, y0], [x1, y1]], 5, LINE);
  }
  function arched(x, y, w, h) { const p = new Path2D(); p.moveTo(x, y + h); p.lineTo(x, y + w / 2); p.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); p.lineTo(x + w, y + h); p.closePath(); fill(p, KO); fill(p, { b: .92, m: .4 }); fill([[x + w * .55, y + h * .25], [x + w * .8, y + h * .25], [x + w * .8, y + h * .7], [x + w * .55, y + h * .7]], { y: .9 }) }

  // techo a dos aguas del cuerpo central
  fill([[3030, 1010], [3200, 800], [3400, 1010]], KO); fill([[3030, 1010], [3200, 800], [3400, 1010]], ROOF);
  fill([[3200, 800], [3400, 1010], [3300, 1010]], { m: .85, y: .6, b: .5 });
  line([[3030, 1010], [3200, 800], [3400, 1010]], 5, LINE);
  // torre mayor
  wall(3400, 800, 3600, GY, 3520); merlons(3388, 3612, 800, 5, 44, STONE);
  line([[3500, 756], [3500, 610]], 6, LINE);
  fill([[3506, 616], [3610, 630], [3606, 690], [3506, 680]], KO); fill([[3506, 616], [3550, 622], [3548, 652], [3506, 648]], { b: .95 }); fill([[3506, 648], [3608, 660], [3606, 690], [3506, 680]], { m: .9, y: .4 });
  arched(3452, 880, 56, 120); arched(3452, 1080, 56, 120); arched(3440, 1260, 80, 132);
  // cuerpo central
  wall(2990, 1010, 3400, GY, 3300); merlons(2978, 3412, 1010, 9, 40, STONE);
  [3040, 3140, 3240].forEach(x => { arched(x, 1080, 52, 110); arched(x, 1250, 52, 110) });
  line([[2990, 1210], [3400, 1210]], 5, LINE);
  // torreón redondo sobre la roca de afuera, y el puente
  const p = new Path2D(); p.moveTo(2800, 1232); p.lineTo(2990, 1232); p.lineTo(2990, GY + 30); p.lineTo(2950, GY + 30); p.ellipse(2895, GY + 30, 55, 120, 0, 0, Math.PI, true); p.lineTo(2800, GY + 30); p.closePath();
  fill(p, KO); fill(p, SHADE); line([[2800, 1232], [2990, 1232]], 6, LINE); merlons(2800, 2990, 1232, 5, 24, STONE);
  wall(2630, 1060, 2800, GY + 60, 2730); merlons(2618, 2812, 1060, 5, 40, STONE);
  for (let i = 0; i < 9; i++) line([[2640, 1100 + i * 38], [2790, 1100 + i * 38]], 2, { b: .45 });
  arched(2686, 1130, 48, 100);
  fill([[2640, 1020], [2715, 880], [2790, 1020]], KO); fill([[2640, 1020], [2715, 880], [2790, 1020]], ROOF); fill([[2715, 880], [2790, 1020], [2740, 1020]], { m: .85, y: .6, b: .5 }); line([[2640, 1020], [2715, 880], [2790, 1020], [2640, 1020]], 5, LINE);

  // rocas
  function rocks(pts, seed) {
    fill(pts, KO); fill(pts, { b: .93, m: .5, y: .2 });
    const r = rng(seed); clip(pts, () => {
      const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      for (let i = 0; i < (x1 - x0) / 34; i++) { const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0) * .8, w = 50 + r() * 150, h = 30 + r() * 90; fill([[x, y], [x + w * .6, y - h * .4], [x + w, y + h * .2], [x + w * .5, y + h]], r() < .5 ? { b: .5, m: .32, y: .4 } : { b: .7, m: .5, y: .3 }) }
    });
  }
  rocks([[2540, 1640], [2600, 1470], [2640, 1420], [2810, 1432], [2850, 1500], [2960, 1420], [3200, GY - 4], [3620, GY], [W, 1440], [W, 1900], [3500, 1860], [3200, 1800], [2900, 1740], [2700, 1700]], 44);
  rocks([[2180, 1700], [2260, 1620], [2350, 1640], [2420, 1700], [2400, 1740], [2230, 1746]], 45);
  rocks([[3300, 1960], [3420, 1880], [3600, 1850], [W, 1900], [W, H], [3200, H], [3240, 2060]], 46);
  // espuma
  const fr = rng(77);
  [[2180, 2440, 1744], [2520, 3000, 1716], [2900, 3560, 1820], [3200, 3700, 2000]].forEach(([x0, x1, y]) => {
    for (let x = x0; x < x1; x += 30 + fr() * 30) { const yy = y + (x - x0) * (x0 > 2800 ? .12 : .06) + (fr() - .5) * 26; circle(x, yy, 18 + fr() * 30, KO); if (fr() < .5) circle(x + (fr() - .5) * 80, yy - 40 - fr() * 90, 5 + fr() * 9, KO) }
  });
})();
