(function () {
  const root = document.querySelector(".note-page[data-bilingual]");
  if (!root) return;

  const storageKey = "note-lang-v2";
  const defaultLang = root.dataset.defaultLang || "en";
  const buttons = root.querySelectorAll(".note-lang-btn");

  function applyLang(lang) {
    const next = lang === "zh" ? "zh" : "en";
    root.dataset.lang = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch (_) {
      /* ignore */
    }
    buttons.forEach(function (btn) {
      const active = btn.dataset.lang === next;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("is-active", active);
    });
  }

  let initial = defaultLang;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "zh" || stored === "en") initial = stored;
  } catch (_) {
    /* ignore */
  }
  applyLang(initial);

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.dataset.lang);
    });
  });
})();
