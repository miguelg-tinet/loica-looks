// Bahía Inglesa: arena blanca, agua turquesa, roca volcánica y los cerros del desierto de Atacama.
(function () {
  const R = rng(1687), LINE = { b: .95, m: .3 }, HOR = 1180;

  // ── Cielo y sol ────────────────────────────────────────────────────────────
  radial('b', W + 300, -350, 2700, [[0, .5], [.4, .24], [.72, .07], [.9, 0]], S);
  const SX = 2620, SY = 560;
  { const g = S.b, gr = g.createRadialGradient(SX, SY, 360, SX, SY, 1000); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H) }
  radial('y', SX, SY, 900, [[0, .5], [.4, .5], [.62, .16], [1, 0]], S);
  
  circle(SX, SY, 330, { y: .94, m: .18 }); circle(SX, SY, 250, { m: .0 });
  [[1700, 700, 1], [1840, 640, .8], [3300, 760, .9]].forEach(g => gull(g[0], g[1], g[2]));

  // ── Cerros del desierto ────────────────────────────────────────────────────
  const far = ridge([[0, 1090], [500, 1040], [900, 1000], [1500, 1004], [1900, 1060], [2500, 1010], [3000, 960], [3500, 968], [3840, 1040]], 12, 150, 2);
  fill([...far, [W, HOR], [0, HOR]], { m: .18, y: .42 }); noSky([...far, [W, H], [0, H]]);
  clip([...far, [W, HOR], [0, HOR]], () => { for (let i = 0; i < 22; i++) { const x = R() * W, y = along(far, x) + 6; fill([[x, y], [x + 120 + R() * 160, y + 190], [x - 20, y + 190]], { m: .3, y: .48, b: .05 }) } });
  const near = ridge([[1900, 1140], [2400, 1100], [2900, 1060], [3300, 1090], [3840, 1050]], 16, 110, 6, 1900, W);
  fill([...near, [W, HOR], [1900, HOR]], KO); fill([...near, [W, HOR], [1900, HOR]], { m: .36, y: .58, b: .06 });
  clip([...near, [W, HOR], [1900, HOR]], () => { for (let i = 0; i < 12; i++) { const x = 1900 + R() * 1940, y = along(near, x) + 4; fill([[x, y], [x + 100 + R() * 120, y + 120], [x - 10, y + 120]], { m: .48, y: .6, b: .25 }) } });
  // caleta: casas bajas al pie del cerro
  for (let i = 0; i < 16; i++) { const x = 2500 + i * 66 + R() * 20, w = 36 + R() * 22, h = 22 + R() * 14; rect(x, HOR - h, w, h, KO); rect(x, HOR - h - 9, w, 9, i % 3 ? { b: .8 } : { m: .85, y: .4 }); rect(x + w * .6, HOR - h, w * .4, h, { b: .3 }) }

  // ── Bahía turquesa ─────────────────────────────────────────────────────────
  const shoreline = [[0, 1650], [500, 1648], [1100, 1690], [1800, 1764], [2500, 1876], [3100, 2010], [3520, H]];
  rect(0, HOR, W, H - HOR, KO);
  grad('b', 0, HOR, 0, 1950, [[0, .46], [.18, .3], [.6, .18], [1, .08]], [[0, HOR], [W, HOR], [W, H], [0, H]]);
  grad('y', 0, HOR, 0, 1950, [[0, .1], [.5, .16], [1, .12]], [[0, HOR], [W, HOR], [W, H], [0, H]]);
  water(HOR + 6, H, { b: .3 }, 17, { per: 38 });
  reflect(SX, 300, HOR + 6, 1800, { y: .95, m: .06, b: 0 }, 9, 38);

  // rocas volcánicas
  function rocks(pts, seed) {
    fill(pts, KO); fill(pts, { b: .95, m: .55, y: .25 });
    const r = rng(seed); clip(pts, () => {
      const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      for (let i = 0; i < (x1 - x0) / 40 + 2; i++) { const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0) * .6, w = 40 + r() * 110, h = 24 + r() * 60; fill([[x, y], [x + w * .6, y - h * .4], [x + w, y + h * .2], [x + w * .5, y + h]], r() < .5 ? { b: .45, m: .4, y: .5 } : { b: .7, m: .5, y: .3 }) }
    });
  }
  function blob(cx, cy, rx, ry, seed) { const r = rng(seed), pts = []; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, k = .72 + r() * .4; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k * (Math.sin(a) > 0 ? .5 : 1)]) } return pts }
  [[3300, 1420, 330, 110], [3700, 1500, 240, 120], [2880, 1470, 120, 50], [1500, 1380, 150, 56], [1760, 1410, 70, 30], [640, 1500, 190, 70], [320, 1540, 90, 40]].forEach((b, i) => {
    rocks(blob(b[0], b[1], b[2], b[3], 50 + i), 70 + i);
    for (let x = b[0] - b[2]; x < b[0] + b[2]; x += 36) circle(x + R() * 20, b[1] + b[3] * .36 + R() * 14, 10 + R() * 16, KO);
  });
  boat(2200, 1420, 1, { y: .92, m: .25 }, 14); boat(1140, 1330, .7, { m: .88, y: .4 }, 15); boat(2620, 1300, .55, { b: .15, y: .1 }, 16);

  // ── Playa ──────────────────────────────────────────────────────────────────
  const sand = [...shoreline, [0, H]];
  // espuma y agua baja
  line(shoreline.map(p => [p[0], p[1] - 70]), 60, { b: .12, y: .22 });
  line(shoreline.map(p => [p[0], p[1] - 26]), 46, KO);
  fill(sand, KO); fill(sand, { y: .1 });
  line(shoreline.map(p => [p[0], p[1] + 26]), 30, { y: .34, m: .14 });
  { const r = rng(4); for (let x = 0; x < 3500; x += 44) { const y = along(shoreline, x) - 44 + Math.sin(x / 90) * 12; circle(x, y, 20 + r() * 16, KO) } }
  { const r = rng(2); clip(sand, () => { for (let i = 0; i < 520; i++) { const x = r() * 3400, y = 1680 + r() * 480; circle(x, y, 3 + r() * 5, r() < .6 ? { y: .5, m: .2 } : { b: .4 }) } for (let i = 0; i < 12; i++) { const x = 300 + i * 150, y = 2100 - i * 16; fill(blob(x, y + (i % 2) * 34, 22, 12, i), { y: .3, m: .2, b: .14 }) } }) }
  rocks(blob(2520, 2060, 200, 120, 91), 92); rocks(blob(2800, 2130, 130, 90, 93), 94);
  function umbrella(x, y, s, a, b) {
    { const p = new Path2D(); p.ellipse(x + 150 * s, y + 6 * s, 170 * s, 30 * s, 0, 0, 7); fill(p, { b: .34, y: .1 }) }
    line([[x, y], [x + 16 * s, y - 300 * s]], 8 * s, LINE);
    const cx = x + 16 * s, cy = y - 290 * s, rad = 200 * s, n = 6;
    for (let i = 0; i < n; i++) { const p = new Path2D(), a0 = Math.PI + i * Math.PI / n, a1 = Math.PI + (i + 1) * Math.PI / n; p.moveTo(cx, cy - rad * .18); p.lineTo(cx + Math.cos(a0) * rad, cy + Math.sin(a0) * rad * .62 + rad * .2); p.quadraticCurveTo(cx + Math.cos((a0 + a1) / 2) * rad * 1.02, cy + Math.sin((a0 + a1) / 2) * rad * .7 + rad * .12, cx + Math.cos(a1) * rad, cy + Math.sin(a1) * rad * .62 + rad * .2); p.closePath(); fill(p, KO); fill(p, i % 2 ? a : b); line([[cx, cy - rad * .18], [cx + Math.cos(a0) * rad, cy + Math.sin(a0) * rad * .62 + rad * .2]], 3 * s, LINE) }
    rect(x + 60 * s, y - 14 * s, 170 * s, 26 * s, KO); rect(x + 60 * s, y - 14 * s, 170 * s, 26 * s, a); for (let i = 0; i < 4; i++) rect(x + (72 + i * 42) * s, y - 14 * s, 16 * s, 26 * s, { b: .8 });
  }
  umbrella(700, 1930, 1.25, { m: .9, y: .35 }, { y: .1 }); umbrella(1500, 2010, 1.45, { y: .92, m: .2 }, { b: .8, m: .2 }); umbrella(1130, 1820, .85, { b: .75, y: .5 }, { y: .1 });
})();
