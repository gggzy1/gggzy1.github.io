(function () {
  const root = document.getElementById("cone-explorer");
  if (!root) return;

  const canvas = root.querySelector("#cone-canvas");
  const ctx = canvas.getContext("2d");
  const caption = root.querySelector("#cone-caption");
  const tabs = root.querySelectorAll("[data-cone-tab]");
  const scaleSlider = root.querySelector("#cone-scale");
  const scaleVal = root.querySelector("#cone-scale-val");
  const scaleRow = root.querySelector("#cone-scale-row");

  let mode = "compare";
  let scale = 1.4;
  let angle = 0.55; // half-angle for ice-cream cone in radians from vertical? use wedge from origin

  const teal = "#2a9d8f";
  const tealFill = "rgba(42, 157, 143, 0.22)";
  const coral = "#c45c26";
  const coralFill = "rgba(196, 92, 38, 0.18)";
  const ink = "#2c3338";
  const muted = "#6b7280";
  const grid = "#e8eaed";

  function pageLang() {
    const page = document.querySelector(".note-page[data-bilingual]");
    return page && page.dataset.lang === "zh" ? "zh" : "en";
  }

  const copy = {
    en: {
      compare:
        "Scale a point inside each set. The cone (teal) stays closed under positive scaling; the strip / cylinder (coral) does not.",
      tangent:
        "At a boundary point x*, the local feasible directions form a cone (half-plane). Drag is not needed — the shaded wedge is the tangent cone.",
      recession:
        "An infinite strip is a 2D cylinder. You can walk forever only along ± vertical — that line is already its recession cone.",
    },
    zh: {
      compare:
        "把集合里的一点做正数缩放。锥（青色）在正缩放下封闭；条带/柱体（橙色）则不行。",
      tangent:
        "在边界点 x* 处，局部可行方向构成一个锥（半平面）。阴影扇区就是切锥。",
      recession:
        "无穷条带是二维的柱体。你只能沿竖直 ± 方向一直走下去——那条直线就是它的回收锥。",
    },
  };

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.min(640, root.clientWidth - 2);
    const h = 340;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function clear(w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fbfcfd";
    ctx.fillRect(0, 0, w, h);
  }

  function axes(ox, oy, w, h) {
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (let x = ox % 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = oy % 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "#c5cad1";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    ctx.lineTo(w, oy);
    ctx.moveTo(ox, 0);
    ctx.lineTo(ox, h);
    ctx.stroke();
  }

  function label(text, x, y, color) {
    ctx.fillStyle = color || muted;
    ctx.font = '600 12px "Source Sans 3", "Segoe UI", sans-serif';
    ctx.fillText(text, x, y);
  }

  function drawArrow(x1, y1, x2, y2, color) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 9 * Math.cos(ang - 0.4), y2 - 9 * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - 9 * Math.cos(ang + 0.4), y2 - 9 * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }

  function drawCompare(w, h) {
    const mid = w / 2;
    axes(mid / 2, h * 0.72, mid - 8, h);
    axes(mid + mid / 2, h * 0.72, mid - 8, h);

    // divider
    ctx.strokeStyle = "#d8dce2";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mid, 12);
    ctx.lineTo(mid, h - 12);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- left: cone (ice-cream / angle cone) ---
    const ox1 = mid / 2;
    const oy1 = h * 0.72;
    const R = Math.min(mid, h) * 0.42;
    const a = 0.62; // half-angle from +y axis? use from +x for orthant-like wedge in first quadrant style — use symmetric wedge around +y for "cone"

    // wedge around the upward axis: angles from -a to +a relative to -Y (screen up)
    ctx.beginPath();
    ctx.moveTo(ox1, oy1);
    ctx.lineTo(ox1 + R * Math.sin(-a), oy1 - R * Math.cos(-a));
    ctx.arc(ox1, oy1, R, -Math.PI / 2 - a, -Math.PI / 2 + a);
    ctx.closePath();
    ctx.fillStyle = tealFill;
    ctx.fill();
    ctx.strokeStyle = teal;
    ctx.lineWidth = 2;
    ctx.stroke();

    // base point in cone and scaled point
    const pAngle = -0.25;
    const pLen = 55;
    const px = ox1 + pLen * Math.sin(pAngle);
    const py = oy1 - pLen * Math.cos(pAngle);
    const qx = ox1 + pLen * scale * Math.sin(pAngle);
    const qy = oy1 - pLen * scale * Math.cos(pAngle);

    ctx.fillStyle = teal;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(qx, qy, 5, 0, Math.PI * 2);
    ctx.fill();
    drawArrow(px, py, qx, qy, teal);
    label("p", px + 8, py + 4, teal);
    label("αp", qx + 8, qy + 4, teal);
    label("cone K", 16, 28, teal);
    label("0 ∈ K, αK ⊂ K", 16, 46, muted);

    // --- right: cylinder / strip ---
    const ox2 = mid + mid / 2;
    const oy2 = h * 0.72;
    const halfW = 38;
    ctx.fillStyle = coralFill;
    ctx.fillRect(ox2 - halfW, 18, halfW * 2, h - 36);
    ctx.strokeStyle = coral;
    ctx.lineWidth = 2;
    ctx.strokeRect(ox2 - halfW, 18, halfW * 2, h - 36);

    const cx = ox2 + 12;
    const cy = oy2 - 40;
    const sx = ox2 + 12 * scale;
    const sy = oy2 - 40 * scale;

    ctx.fillStyle = coral;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    // scaled point may leave strip
    const inside = Math.abs(sx - ox2) <= halfW;
    ctx.beginPath();
    ctx.arc(sx, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = inside ? coral : "#cf222e";
    ctx.fill();
    drawArrow(cx, cy, sx, sy, inside ? coral : "#cf222e");
    label("p", cx + 8, cy + 4, coral);
    label("αp", sx + 8, sy + 4, inside ? coral : "#cf222e");
    label("cylinder / strip", mid + 16, 28, coral);
    label(inside ? "still inside" : "αp leaves the set", mid + 16, 46, muted);
  }

  function drawTangent(w, h) {
    const ox = w * 0.42;
    const oy = h * 0.55;
    axes(ox, oy, w, h);

    const r = 78;
    // feasible disk
    ctx.beginPath();
    ctx.arc(ox, oy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(42, 157, 143, 0.12)";
    ctx.fill();
    ctx.strokeStyle = teal;
    ctx.lineWidth = 2;
    ctx.stroke();
    label("feasible set", ox - 34, oy + r + 18, teal);

    // boundary point on the right
    const xStar = { x: ox + r, y: oy };
    // tangent cone = half-plane x <= x* (inward), i.e. left half from x*
    ctx.beginPath();
    ctx.moveTo(xStar.x, 0);
    ctx.lineTo(xStar.x, h);
    ctx.lineTo(0, h);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(42, 157, 143, 0.16)";
    ctx.fill();

    // clip highlight near x* as a cone wedge for intuition
    ctx.beginPath();
    ctx.moveTo(xStar.x, xStar.y);
    ctx.arc(xStar.x, xStar.y, 95, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.closePath();
    ctx.fillStyle = tealFill;
    ctx.fill();
    ctx.strokeStyle = teal;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // x*
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(xStar.x, xStar.y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    label("x*", xStar.x + 10, xStar.y - 8, ink);

    // normal (outward)
    drawArrow(xStar.x, xStar.y, xStar.x + 70, xStar.y, coral);
    label("normal", xStar.x + 42, xStar.y - 10, coral);

    // descent direction inside tangent cone
    drawArrow(xStar.x, xStar.y, xStar.x - 70, xStar.y - 45, "#2563eb");
    label("descent d", xStar.x - 95, xStar.y - 52, "#2563eb");

    label("tangent cone at x*", 16, 28, teal);
  }

  function drawRecession(w, h) {
    const ox = w * 0.5;
    const oy = h * 0.5;
    axes(ox, oy, w, h);

    const halfW = 52;
    ctx.fillStyle = coralFill;
    ctx.fillRect(ox - halfW, 16, halfW * 2, h - 32);
    ctx.strokeStyle = coral;
    ctx.lineWidth = 2;
    ctx.strokeRect(ox - halfW, 16, halfW * 2, h - 32);
    label("cylinder C  (infinite strip)", 16, 28, coral);

    // base (compact cross-section)
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox - halfW, oy);
    ctx.lineTo(ox + halfW, oy);
    ctx.stroke();
    label("compact base", ox + halfW + 10, oy + 4, ink);

    // recession directions
    drawArrow(ox - 18, oy, ox - 18, 36, teal);
    drawArrow(ox + 18, oy, ox + 18, h - 36, teal);
    label("C∞", ox + 28, 52, teal);
    label("recession cone = vertical line", 16, 48, muted);
  }

  function updateCaption() {
    const lang = pageLang();
    caption.textContent = copy[lang][mode];
  }

  function draw() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    clear(w, h);
    if (mode === "compare") drawCompare(w, h);
    else if (mode === "tangent") drawTangent(w, h);
    else drawRecession(w, h);
    updateCaption();
    scaleRow.style.display = mode === "compare" ? "flex" : "none";
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      mode = btn.dataset.coneTab;
      tabs.forEach(function (b) {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      draw();
    });
  });

  if (scaleSlider) {
    scaleSlider.addEventListener("input", function () {
      scale = parseFloat(scaleSlider.value);
      if (scaleVal) scaleVal.textContent = scale.toFixed(1);
      draw();
    });
  }

  // refresh caption when language toggles
  const page = document.querySelector(".note-page[data-bilingual]");
  if (page) {
    const obs = new MutationObserver(draw);
    obs.observe(page, { attributes: true, attributeFilter: ["data-lang"] });
  }

  window.addEventListener("resize", resize);
  resize();
})();
