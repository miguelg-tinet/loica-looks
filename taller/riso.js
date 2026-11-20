/*
  Motor de risografía para los fondos dibujados por código.

  Cada escena pinta "densidades de tinta" (0 a 1) con Canvas 2D en tres planchas:
  b = azul petróleo, m = magenta, y = amarillo. render() convierte cada plancha en trama
  de puntos, corre un poco el registro y sobreimprime las tintas sobre papel con grano.

  Cada plancha tiene dos capas: L (formas nítidas) y S (cielo y brillos suaves, que se
  rompen con nubes). Las formas se pintan en coordenadas de 3840 × 2160.
*/
const W = 3840, H = 2160;
const INKS = {
  y: { c: [1, .78, .2], a: 40, o: [-5, 6] },
  m: { c: [.96, .25, .62], a: 72, o: [7, 5] },
  b: { c: [.17, .44, .71], a: 15, o: [0, 0] }
};
const ORDER = ['y', 'm', 'b'];

function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function layer() { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d', { willReadFrequently: true }); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); return g }
const gray = d => { const v = Math.round(Math.max(0, Math.min(1, d)) * 255); return `rgb(${v},${v},${v})` };
const L = {}, S = {};
ORDER.forEach(k => { L[k] = layer(); S[k] = layer() });

// ── Ayudas de dibujo. `d` es un objeto de densidades, p. ej. {b:.8, y:.3}; las tintas
//    que no se nombran quedan como estaban. KO borra las tres.
const KO = { b: 0, m: 0, y: 0 };
function P(pts, open) { if (pts instanceof Path2D) return pts; const p = new Path2D(); pts.forEach((q, i) => i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); if (!open) p.closePath(); return p }
function fill(shape, d, layers) { const p = P(shape), T = layers || L; for (const k in d) { T[k].fillStyle = gray(d[k]); T[k].fill(p) } }
function line(pts, w, d, layers) { const p = P(pts, true), T = layers || L; for (const k in d) { const g = T[k]; g.strokeStyle = gray(d[k]); g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(p) } }
function circle(x, y, r, d, layers) { const p = new Path2D(); p.arc(x, y, r, 0, 7); fill(p, d, layers) }
function rect(x, y, w, h, d, layers) { const p = new Path2D(); p.rect(x, y, w, h); fill(p, d, layers) }
function clip(shape, fn) { const p = P(shape); ORDER.forEach(k => { L[k].save(); L[k].clip(p) }); fn(); ORDER.forEach(k => L[k].restore()) }
function text(str, x, y, font, d, align) { for (const k in d) { const g = L[k]; g.font = font; g.textAlign = align || 'center'; g.textBaseline = 'middle'; g.fillStyle = gray(d[k]); g.fillText(str, x, y) } }
function grad(k, x0, y0, x1, y1, stops, shape, layers) { const g = (layers || L)[k], gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(s => gr.addColorStop(s[0], gray(s[1]))); g.fillStyle = gr; g.fill(P(shape)) }
function radial(k, x, y, r, stops, layers) { const g = (layers || L)[k], gr = g.createRadialGradient(x, y, 0, x, y, r); stops.forEach(s => gr.addColorStop(s[0], gray(s[1]))); g.fillStyle = gr; g.fillRect(0, 0, W, H) }
const lerp = (a, b, t) => a + (b - a) * t;
function along(ctrl, x) { for (let i = 1; i < ctrl.length; i++) if (x <= ctrl[i][0]) { const a = ctrl[i - 1], b = ctrl[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]) } return ctrl[ctrl.length - 1][1] }
// Perfil quebrado de cerro: sigue los puntos de control con dientes al azar.
function ridge(ctrl, amp, step, seed, x0, x1) { const r = rng(seed), pts = []; let x = x0 === undefined ? 0 : x0; const end = x1 === undefined ? W : x1; while (x < end + step) { const xx = Math.min(x, end); pts.push([xx, along(ctrl, xx) + (r() - .5) * amp * (r() < .25 ? 2.2 : 1)]); x += step * (.45 + r() * 1.1) } return pts }
// Franjas de agua: líneas finas y bandas de trama entre yTop e yBot.
function water(yTop, yBot, d, seed, opts) {
  const o = Object.assign({ per: 42, lineD: .9, x0: 0, x1: W }, opts), r = rng(seed); let y = yTop, k = 0;
  while (y < yBot) { const per = o.per * (1 + k * .012), band = per * (.22 + .3 * r());
    for (const key in d) { rect(o.x0, y, o.x1 - o.x0, 4, { [key]: Math.min(1, d[key] * o.lineD / .2) }); rect(o.x0, y + 4, o.x1 - o.x0, band, { [key]: d[key] }) }
    y += per; k++ }
}
// Reflejo: trazos horizontales cortados dentro de una columna.
function reflect(cx, halfW, yTop, yBot, d, seed, per) {
  const r = rng(seed); per = per || 42; let y = yTop, k = 0;
  while (y < yBot) { const p = per * (1 + k * .012), t = (y - yTop) / (yBot - yTop), hw = halfW * (1 - .35 * t) * (.55 + .6 * r());
    let x = cx - hw + (r() - .5) * 60; const end = cx + hw;
    while (x < end) { const len = 30 + r() * 150; if (r() > .22) rect(x, y + 4, Math.min(len, end - x), p * (.3 + .25 * r()), d); x += len + 8 + r() * 30 }
    y += p; k++ }
}

function lowNoise(cols, rows, seed) { const r = rng(seed), s = document.createElement('canvas'); s.width = cols; s.height = rows; const sg = s.getContext('2d'), im = sg.createImageData(cols, rows); for (let i = 0; i < cols * rows; i++) { const v = r() * 255; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255 } sg.putImageData(im, 0, 0); const g = layer(); g.imageSmoothingQuality = 'high'; g.drawImage(s, 0, 0, W, H); return g.getImageData(0, 0, W, H).data }

function render(opts) {
  const o = Object.assign({ pitch: 15, paper: [238, 233, 219] }, opts);
  const hard = {}, soft = {};
  ORDER.forEach(k => { hard[k] = L[k].getImageData(0, 0, W, H).data; soft[k] = S[k].getImageData(0, 0, W, H).data });
  const n1 = lowNoise(48, 27, 1), n2 = lowNoise(240, 135, 2), n3 = lowNoise(12, 7, 3);
  const out = document.getElementById('c').getContext('2d'), img = out.createImageData(W, H), px = img.data, PITCH = o.pitch;
  const trig = {}; ORDER.forEach(k => { const a = INKS[k].a * Math.PI / 180; trig[k] = [Math.cos(a), Math.sin(a)] });
  function dot(x, y, cs, d) { if (d <= .004) return 0; const u = (x * cs[0] + y * cs[1]) / PITCH, v = (-x * cs[1] + y * cs[0]) / PITCH, fu = u - Math.floor(u) - .5, fv = v - Math.floor(v) - .5; const a = (.735 * Math.sqrt(d) - Math.sqrt(fu * fu + fv * fv)) * PITCH / 1.3 + .5; return a <= 0 ? 0 : a >= 1 ? 1 : a }
  let h = 1234567;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, j = i * 4;
    h = Math.imul(h ^ (h >>> 15), 2246822519) + i | 0; const rnd = ((h >>> 8) & 0xffff) / 65535;
    const m1 = n1[j] / 255, m2 = n2[j] / 255, m3 = n3[j] / 255;
    const cloud = Math.max(.3, Math.min(1.15, (m1 * .6 + m3 * .7 - .3) * 2.2));
    let r = o.paper[0] - 10 * m3 + 6 * (m1 - .5), g = o.paper[1] - 10 * m3 + 6 * (m1 - .5), b = o.paper[2] - 13 * m3 + 6 * (m1 - .5);
    const gr = (rnd - .5) * 9; r += gr; g += gr; b += gr;
    for (let q = 0; q < 3; q++) {
      const k = ORDER[q], ink = INKS[k];
      const sx = Math.min(W - 1, Math.max(0, x - ink.o[0])), sy = Math.min(H - 1, Math.max(0, y - ink.o[1])), sj = (sy * W + sx) * 4;
      let d = hard[k][sj] / 255; const sd = soft[k][sj] / 255 * cloud; if (sd > d) d = sd;
      let cov = dot(x, y, trig[k], d);
      cov *= (.86 + .14 * (q === 1 ? m1 : m2)) * ((q === 2 ? rnd > .965 : q === 1 ? rnd < .03 : rnd > .47 && rnd < .5) ? .5 : 1);
      r *= 1 - cov * (1 - ink.c[0]); g *= 1 - cov * (1 - ink.c[1]); b *= 1 - cov * (1 - ink.c[2]);
    }
    px[j] = r; px[j + 1] = g; px[j + 2] = b; px[j + 3] = 255;
  }
  out.putImageData(img, 0, 0);
  document.title = 'listo';
}

// ── Motivos compartidos ──────────────────────────────────────────────────────
function gull(x, y, s, d) { line([[x - 40 * s, y - 6 * s], [x - 18 * s, y - 20 * s], [x, y], [x + 20 * s, y - 22 * s], [x + 44 * s, y - 10 * s]], 5 * s, d || { b: .9 }) }
function boat(x, y, s, hull, seed) {
  fill([[x - 90 * s, y - 34 * s], [x + 100 * s, y - 34 * s], [x + 70 * s, y], [x - 66 * s, y]], KO); fill([[x - 90 * s, y - 34 * s], [x + 100 * s, y - 34 * s], [x + 70 * s, y], [x - 66 * s, y]], hull);
  fill([[x - 84 * s, y - 34 * s], [x + 96 * s, y - 34 * s], [x + 92 * s, y - 24 * s], [x - 80 * s, y - 24 * s]], { b: .9 });
  rect(x - 20 * s, y - 62 * s, 46 * s, 28 * s, KO); rect(x - 20 * s, y - 62 * s, 46 * s, 28 * s, { b: .12 }); rect(x - 10 * s, y - 54 * s, 14 * s, 12 * s, { b: .9 });
  line([[x + 10 * s, y - 62 * s], [x + 10 * s, y - 120 * s]], 4 * s, { b: .9 });
  reflect(x, 80 * s, y + 6 * s, y + 90 * s, hull, seed || 3, 22 * s);
}
// Palmera esbelta de costanera.
function palm(x, y, h, s, seed) {
  const r = rng(seed), top = [x + (r() - .5) * 40, y - h];
  line([[x, y], [x + (top[0] - x) * .3 + 14, y - h * .5], top], 16 * s, { b: .85, m: .4, y: .4 });
  for (let i = 0; i < 11; i++) { const a = -Math.PI * (.02 + i * .096) + (r() - .5) * .12, len = (120 + r() * 50) * s, mx = top[0] + Math.cos(a) * len * .55, my = top[1] + Math.sin(a) * len * .7 - 26 * s, ex = top[0] + Math.cos(a) * len, ey = top[1] + Math.sin(a) * len * .5 + 40 * s;
    fill([top, [mx, my - 12 * s], [ex, ey], [mx, my + 14 * s]], i % 2 ? { b: .85, y: .85 } : { b: .5, y: .9 }) }
}
// Quita el cielo suave (capa S) dentro de una forma: se usa para todo lo que no es cielo.
function noSky(shape) { fill(shape, KO, S) }
