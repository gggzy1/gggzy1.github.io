(function () {
  function initCoercivityExplorer() {
    const canvas = document.getElementById("plotCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const sliderA = document.getElementById("slider-a");
    const sliderB = document.getElementById("slider-b");
    const sliderC = document.getElementById("slider-c");
    const valA = document.getElementById("val-a");
    const valB = document.getElementById("val-b");
    const valC = document.getElementById("val-c");
    const badge = document.getElementById("badge");

    if (!sliderA || !sliderB || !sliderC || !valA || !valB || !valC || !badge) return;

    function f(x, a, b, c) {
      return a * x * x + b * Math.abs(x) + c * x;
    }

    function draw() {
      const a = parseFloat(sliderA.value);
      const b = parseFloat(sliderB.value);
      const c = parseFloat(sliderC.value);

      valA.textContent = a.toFixed(1);
      valB.textContent = b.toFixed(1);
      valC.textContent = c.toFixed(1);

      if (a > 0) {
        badge.textContent = "1-Coercive (Strongly Coercive)";
        badge.style.backgroundColor = "#dcffe4";
        badge.style.color = "#1a7f37";
        badge.style.border = "1px solid #1a7f37";
      } else if (a === 0 && b > Math.abs(c)) {
        badge.textContent = "0-Coercive";
        badge.style.backgroundColor = "#ddf4ff";
        badge.style.color = "#0969da";
        badge.style.border = "1px solid #0969da";
      } else {
        badge.textContent = "Non-Coercive";
        badge.style.backgroundColor = "#ffebe9";
        badge.style.color = "#cf222e";
        badge.style.border = "1px solid #cf222e";
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const minX = -10;
      const maxX = 10;
      const minY = -20;
      const maxY = 60;

      function toScreenX(x) {
        return ((x - minX) / (maxX - minX)) * width;
      }

      function toScreenY(y) {
        return height - ((y - minY) / (maxY - minY)) * height;
      }

      ctx.strokeStyle = "#e1e4e8";
      ctx.lineWidth = 1;
      for (let i = minX; i <= maxX; i += 2) {
        ctx.beginPath();
        ctx.moveTo(toScreenX(i), 0);
        ctx.lineTo(toScreenX(i), height);
        ctx.stroke();
      }
      for (let i = minY; i <= maxY; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, toScreenY(i));
        ctx.lineTo(width, toScreenY(i));
        ctx.stroke();
      }

      ctx.strokeStyle = "#586069";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toScreenX(minX), toScreenY(0));
      ctx.lineTo(toScreenX(maxX), toScreenY(0));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toScreenX(0), toScreenY(minY));
      ctx.lineTo(toScreenX(0), toScreenY(maxY));
      ctx.stroke();

      if (a === 0) {
        ctx.strokeStyle = "rgba(9, 105, 218, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(toScreenX(0), toScreenY(0));
        ctx.lineTo(toScreenX(maxX), toScreenY((b + c) * maxX));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toScreenX(0), toScreenY(0));
        ctx.lineTo(toScreenX(minX), toScreenY((c - b) * minX));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.strokeStyle = "#24292e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      let started = false;

      for (let sx = 0; sx < width; sx++) {
        const x = minX + (sx / width) * (maxX - minX);
        const y = f(x, a, b, c);
        const sy = toScreenY(y);

        if (sy >= 0 && sy <= height) {
          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }

    [sliderA, sliderB, sliderC].forEach((slider) => {
      slider.addEventListener("input", draw);
    });

    draw();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCoercivityExplorer);
  } else {
    initCoercivityExplorer();
  }
})();
