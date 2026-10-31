// Small vanilla scripts for the portfolio: typewriter, ASCII portrait, card tilt and flip,
// thorns on the card back, experience tabs and the copy button.
(function () {
  if (window.__momoSite) return;
  window.__momoSite = true;

  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = getComputedStyle(document.documentElement);
  var INK = css.getPropertyValue("--ink").trim() || "#2c2a30";
  var THORN = css.getPropertyValue("--thorn").trim() || "#3a241f";

  // seeded random so the briar looks the same every visit
  function rng(seed) {
    return function () {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  /* ---------- typewriter ---------- */
  (function () {
    var el = document.querySelector(".typed-out");
    if (!el || still) return;
    var lines;
    try { lines = JSON.parse(el.getAttribute("data-lines")); } catch (e) { return; }
    var li = 0, ci = lines[0].length, deleting = true;
    function tick() {
      var line = lines[li];
      if (deleting) {
        ci--;
        el.textContent = line.slice(0, ci);
        if (ci <= 0) { deleting = false; li = (li + 1) % lines.length; }
        setTimeout(tick, 28);
      } else {
        line = lines[li];
        ci++;
        el.textContent = line.slice(0, ci);
        if (ci >= line.length) { deleting = true; setTimeout(tick, 2200); }
        else setTimeout(tick, 55 + Math.random() * 40);
      }
    }
    setTimeout(tick, 2600);
  })();

  /* ---------- ASCII portrait ---------- */
  (function () {
    var cv = document.getElementById("ascii");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var chars = " .:-=+*#%@".split("");
    var parts = [], W = 0, H = 0, cell = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -999, y: -999 }, running = false, src = cv.getAttribute("data-src");

    function heart(off, w, h) {
      var c = off.getContext("2d");
      c.fillStyle = "#fff"; c.fillRect(0, 0, w, h);
      var s = Math.min(w, h) / 38, cx = w / 2, cy = h * 0.47;
      var g = c.createRadialGradient(cx - s * 5, cy - s * 5, s, cx, cy, s * 18);
      g.addColorStop(0, "#9a9a9a"); g.addColorStop(0.55, "#3a3a3a"); g.addColorStop(1, "#111");
      c.fillStyle = g;
      c.beginPath();
      for (var t = 0; t <= Math.PI * 2 + 0.01; t += 0.02) {
        var x = 16 * Math.pow(Math.sin(t), 3);
        var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        c[t === 0 ? "moveTo" : "lineTo"](cx + x * s, cy - y * s);
      }
      c.fill();
      // a small ECG blip across the heart
      c.strokeStyle = "#fff"; c.lineWidth = s * 0.9; c.lineJoin = "round";
      c.beginPath();
      var y0 = cy + s * 1, x0 = cx - s * 13;
      var pts = [[0, 0], [6, 0], [8, -2], [10, 0], [12, 0], [13, 2], [15, -9], [17, 5], [18, 0], [26, 0]];
      pts.forEach(function (p, i) { c[i ? "lineTo" : "moveTo"](x0 + p[0] * s, y0 + p[1] * s); });
      c.stroke();
    }

    function photo(off, w, h, img) {
      var c = off.getContext("2d");
      var r = Math.max(w / img.width, h / img.height);
      var iw = img.width * r, ih = img.height * r;
      c.filter = "grayscale(1) contrast(1.2)";
      c.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
    }

    function build(img) {
      W = cv.clientWidth; H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cols = img ? 46 : 30;
      cell = W / cols;
      var ch = cell * 1.3, rows = Math.floor(H / ch);
      // draw at 4x and average each 4x4 block, so small features survive the downscale
      var SS = 4, off = document.createElement("canvas");
      off.width = cols * SS; off.height = rows * SS;
      if (img) photo(off, cols * SS, rows * SS, img); else heart(off, cols * SS, rows * SS);
      var big = off.getContext("2d").getImageData(0, 0, cols * SS, rows * SS).data;
      var lum = new Float32Array(cols * rows), lo = 1, hi = 0;
      for (var yy = 0; yy < rows; yy++) for (var xx = 0; xx < cols; xx++) {
        var sum = 0;
        for (var sy = 0; sy < SS; sy++) for (var sx = 0; sx < SS; sx++) {
          var k = ((yy * SS + sy) * cols * SS + (xx * SS + sx)) * 4;
          sum += big[k] * 0.3 + big[k + 1] * 0.59 + big[k + 2] * 0.11;
        }
        var L = sum / (SS * SS * 255);
        lum[yy * cols + xx] = L;
        if (L < 0.97) { lo = Math.min(lo, L); hi = Math.max(hi, L); }
      }
      var R = rng(42);
      parts = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var Lv = lum[y * cols + x];
          if (Lv >= 0.97) continue;
          var d = 1 - (Lv - lo) / Math.max(0.01, hi - lo); // stretch to the full range
          if (d < 0.08) continue;
          var tx = x * cell + cell / 2, ty = y * ch + ch / 2 + (H - rows * ch) / 2;
          parts.push({
            tx: tx, ty: ty,
            x: still ? tx : tx + (R() - 0.5) * W * 1.4,
            y: still ? ty : ty + (R() - 0.5) * H * 1.4,
            vx: 0, vy: 0,
            ch: chars[Math.min(chars.length - 1, Math.round(d * (chars.length - 1)))],
            a: img ? Math.min(1, 0.12 + Math.pow(d, 1.5) * 1.05) : 0.5 + d * 0.5,
          });
        }
      }
      ctx.font = "700 " + (ch * 0.98).toFixed(1) + "px 'DM Mono', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      draw();
      if (!still && !running) { running = true; requestAnimationFrame(loop); }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = INK;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        ctx.globalAlpha = p.a;
        ctx.fillText(p.ch, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      var R2 = Math.pow(W * 0.2, 2);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.vx += (p.tx - p.x) * 0.06;
        p.vy += (p.ty - p.y) * 0.06;
        var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          var f = (1 - d2 / R2) * 3.2, d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx *= 0.8; p.vy *= 0.8;
        p.x += p.vx; p.y += p.vy;
      }
      draw();
      requestAnimationFrame(loop);
    }

    cv.addEventListener("pointermove", function (e) {
      var r = cv.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * W;
      mouse.y = ((e.clientY - r.top) / r.height) * H;
    });
    cv.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });

    var image = null;
    function start() { build(image); }
    if (src) {
      var im = new Image();
      im.onload = function () { image = im; start(); };
      im.onerror = start;
      im.src = src;
    } else {
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
    }
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(start, 150); });
  })();

  /* ---------- card: tilt, flip, thorns ---------- */
  (function () {
    var card = document.getElementById("idcard");
    if (!card) return;
    var btn = document.getElementById("flip");
    var front = card.querySelector(".front"), back = card.querySelector(".back");

    function setFlip(on) {
      card.classList.toggle("flipped", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      front.setAttribute("aria-hidden", on ? "true" : "false");
      back.setAttribute("aria-hidden", on ? "false" : "true");
    }
    card.addEventListener("click", function () { setFlip(!card.classList.contains("flipped")); });
    btn.addEventListener("click", function (e) { e.stopPropagation(); setFlip(!card.classList.contains("flipped")); });

    if (!still && window.matchMedia("(hover: hover)").matches) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 18).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-py * 12).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      });
    }

    var tc = document.getElementById("thorns");
    if (!tc) return;
    function briar() {
      var w = tc.clientWidth, h = tc.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!w || !h) return;
      tc.width = w * dpr; tc.height = h * dpr;
      var c = tc.getContext("2d");
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, w, h);
      var u = w / 500, R = rng(7);
      c.fillStyle = THORN; c.strokeStyle = THORN; c.lineCap = "round";
      var vines = [
        [[-40, 60], [140, -40], [260, 230], [540, 120]],
        [[-30, 250], [120, 120], [300, 360], [530, 230]],
        [[80, -30], [20, 160], [260, 200], [180, 360]],
        [[420, -40], [520, 120], [300, 180], [470, 360]],
        [[-20, 160], [200, 40], [360, 40], [520, -20]],
      ];
      vines.forEach(function (v, vi) {
        var P = v.map(function (p) { return [p[0] * u, p[1] * u * (h / (w / 1.586))]; });
        var N = 160, prev = null, side = 1, nextThorn = 8 + R() * 10;
        for (var i = 0; i <= N; i++) {
          var t = i / N, mt = 1 - t;
          var x = mt * mt * mt * P[0][0] + 3 * mt * mt * t * P[1][0] + 3 * mt * t * t * P[2][0] + t * t * t * P[3][0];
          var y = mt * mt * mt * P[0][1] + 3 * mt * mt * t * P[1][1] + 3 * mt * t * t * P[2][1] + t * t * t * P[3][1];
          if (prev) {
            var thick = (2.2 + Math.sin(t * Math.PI) * 2.6 - vi * 0.25) * u;
            c.lineWidth = Math.max(1.2 * u, thick);
            c.beginPath(); c.moveTo(prev[0], prev[1]); c.lineTo(x, y); c.stroke();
            if (i >= nextThorn) {
              var dx = x - prev[0], dy = y - prev[1], L = Math.hypot(dx, dy) || 1;
              var tx = dx / L, ty = dy / L, nx = -ty * side, ny = tx * side;
              var len = (9 + R() * 11) * u, base = (2.4 + R() * 2) * u;
              c.beginPath();
              c.moveTo(x - tx * base, y - ty * base);
              c.lineTo(x + tx * base, y + ty * base);
              c.quadraticCurveTo(x + nx * len * 0.5, y + ny * len * 0.5, x + nx * len + tx * len * 0.45, y + ny * len + ty * len * 0.45);
              c.closePath(); c.fill();
              side = -side;
              nextThorn = i + 6 + Math.floor(R() * 9);
            }
          }
          prev = [x, y];
        }
      });
    }
    briar();
    var bt;
    window.addEventListener("resize", function () { clearTimeout(bt); bt = setTimeout(briar, 150); });
  })();

  /* ---------- experience tabs ---------- */
  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
    if (!tabs.length) return;
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var k = e.key;
        if (k === "ArrowDown" || k === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (k === "ArrowUp" || k === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
  })();

  /* ---------- copy email ---------- */
  (function () {
    var b = document.querySelector("[data-copy]");
    if (!b) return;
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-copy");
      function done(msg) { b.textContent = msg; setTimeout(function () { b.textContent = "copy"; }, 1800); }
      function fallback() {
        var m = document.querySelector(".mail");
        var r = document.createRange(); r.selectNodeContents(m);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        done("selected, press ⌘C");
      }
      try {
        navigator.clipboard.writeText(text).then(function () { done("copied ✓"); }, fallback);
      } catch (e) { fallback(); }
    });
  })();
})();
