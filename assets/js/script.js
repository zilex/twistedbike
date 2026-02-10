(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Lightbox + gallery navigation + swipe
  const lb = document.querySelector("[data-lightbox]");
  const lbImg = document.querySelector("[data-lightbox-img]");
  const lbClose = document.querySelector("[data-lightbox-close]");
  const lbPrev = document.querySelector("[data-lightbox-prev]");
  const lbNext = document.querySelector("[data-lightbox-next]");

  const gallery = document.querySelector("[data-gallery]");
  const items = gallery ? Array.from(gallery.querySelectorAll("img")) : [];
  let currentIndex = -1;

  function showAt(index) {
    if (!lb || !lbImg || items.length === 0) return;

    const n = items.length;
    currentIndex = ((index % n) + n) % n;

    const img = items[currentIndex];
    const full = img.getAttribute("data-full") || img.src;

    lbImg.src = full;
    lbImg.alt = img.alt || "";
  }

  function openAt(index) {
    if (!lb || !lbImg) return;
    showAt(index);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb || !lbImg) return;
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    currentIndex = -1;
  }

  function next() { if (currentIndex !== -1) showAt(currentIndex + 1); }
  function prev() { if (currentIndex !== -1) showAt(currentIndex - 1); }

  // Buttons
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  if (lbNext) lbNext.addEventListener("click", (e) => { e.stopPropagation(); next(); });

  // Close on backdrop click
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Open from gallery
  if (gallery) {
    gallery.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      const index = items.indexOf(img);
      if (index === -1) return;
      openAt(index);
    });
  }

  // --- SWIPE (touch) ---
  // radi na mobitelu; ignorira vertikalni scroll
  let startX = 0;
  let startY = 0;
  let tracking = false;

  function onTouchStart(e) {
    if (!lb || lb.hidden) return;
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = true;
  }

  function onTouchMove(e) {
    if (!tracking) return;
    // ništa - samo mjerimo na end (da ne blokiramo scroll)
  }

  function onTouchEnd(e) {
    if (!tracking) return;
    tracking = false;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    // prag + uvjet da je uglavnom horizontalno
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

    if (dx < 0) next();   // swipe left -> next
    else prev();          // swipe right -> prev
  }

  if (lb) {
    lb.addEventListener("touchstart", onTouchStart, { passive: true });
    lb.addEventListener("touchmove", onTouchMove, { passive: true });
    lb.addEventListener("touchend", onTouchEnd, { passive: true });
  }
})();