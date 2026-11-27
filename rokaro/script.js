'use strict';
(() => {
  const nav = document.getElementById('main-nav');
  const menu = document.querySelector('.menu-toggle');
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Otvori izbornik');
  };

  menu.addEventListener('click', () => {
    const next = !nav.classList.contains('open');
    nav.classList.toggle('open', next);
    menu.setAttribute('aria-expanded', String(next));
    menu.setAttribute('aria-label', next ? 'Zatvori izbornik' : 'Otvori izbornik');
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1060) closeMenu(); });

  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());

  // Slike galerije dolaze iz jedne lako uredive datoteke: galerija.js.
  const galleryMain = document.getElementById('gallery-main');
  const galleryExtras = document.getElementById('gallery-extras');
  const galleryExpand = document.getElementById('gallery-expand');
  const imageList = Array.isArray(window.ROKARO_FOTOGRAFIJE) ? window.ROKARO_FOTOGRAFIJE : [];
  imageList.forEach((source, index) => {
    if (typeof source !== 'string' || !source.trim()) return;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'gallery-card' + (index === 0 ? ' gallery-lead' : '');
    card.setAttribute('data-gallery', source);
    card.setAttribute('aria-label', `Povećaj fotografiju ${index + 1}`);
    const picture = document.createElement('img');
    picture.src = source;
    picture.alt = `ROKARO galerija, fotografija ${index + 1}`;
    picture.loading = 'lazy';
    picture.decoding = 'async';
    card.appendChild(picture);
    (index < 6 ? galleryMain : galleryExtras).appendChild(card);
  });
  if (galleryExtras.children.length) galleryExpand.hidden = false;
  galleryExpand?.addEventListener('click', () => {
    const willOpen = galleryExtras.hidden;
    galleryExtras.hidden = !willOpen;
    galleryExpand.setAttribute('aria-expanded', String(willOpen));
    galleryExpand.innerHTML = willOpen
      ? 'Prikaži manje fotografija <span aria-hidden="true">−</span>'
      : 'Prikaži sve fotografije <span aria-hidden="true">＋</span>';
  });

  const modal = document.getElementById('lightbox');
  const modalImg = document.getElementById('lightbox-image');
  const photos = Array.from(document.querySelectorAll('[data-gallery]'));
  let selectedPhoto = 0;

  const showPhoto = index => {
    selectedPhoto = (index + photos.length) % photos.length;
    const card = photos[selectedPhoto];
    const img = card.querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  };

  photos.forEach((card, i) => card.addEventListener('click', () => {
    showPhoto(i);
    modal.showModal();
  }));

  modal.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(selectedPhoto - 1));
  modal.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(selectedPhoto + 1));
  modal.querySelector('.lightbox-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(selectedPhoto + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(selectedPhoto - 1); }
  });
  modal.addEventListener('close', () => modalImg.removeAttribute('src'));

  // Hero video nema audio zapis ni izvorne kontrole. Na manjim ekranima učitava se manja datoteka.
  const video = document.getElementById('rokaro-video');
  const videoHero = document.querySelector('.hero-cinema');
  const videoControls = document.getElementById('video-controls');
  const videoPause = document.getElementById('video-pause');
  let manuallyPaused = false;
  video.controls = false;
  video.playsInline = true;
  video.muted = true;
  video.defaultMuted = true;
  // Nema audio kanala u MP4-u; ne upravljamo glasnoćom jer je iOS ne dopušta mijenjati.

  const syncPlayButton = () => {
    const paused = video.paused;
    videoPause.innerHTML = paused ? 'Pokreni <span aria-hidden="true">▶</span>' : 'Pauziraj <span aria-hidden="true">Ⅱ</span>';
    videoPause.setAttribute('aria-label', paused ? 'Pokreni video' : 'Pauziraj video');
  };
  // Gumb se prikazuje odmah, čak i kada iOS/štednja podataka spriječe autoplay ili loadeddata.
  videoControls.hidden = false;
  syncPlayButton();
  const startVideo = () => {
    if (manuallyPaused || document.hidden) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(syncPlayButton);
  };
  video.addEventListener('loadeddata', () => {
    videoHero.classList.add('video-ready');
    startVideo();
    syncPlayButton();
  });
  video.addEventListener('playing', () => videoHero.classList.add('video-ready'));
  video.addEventListener('canplay', startVideo);
  video.addEventListener('play', syncPlayButton);
  video.addEventListener('pause', syncPlayButton);
  video.addEventListener('error', () => {
    videoHero.classList.remove('video-ready');
    videoPause.disabled = true;
    videoPause.textContent = 'Video trenutačno nije dostupan';
  });
  videoPause.addEventListener('click', () => {
    if (video.paused) {
      manuallyPaused = false;
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(syncPlayButton);
    }
    else {
      manuallyPaused = true;
      video.pause();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startVideo();
  });
  window.addEventListener('pageshow', startVideo);
  // Na iOS-u autoplay ponekad ne pokrene učitavanje; korisnik uvijek ima gumb za reprodukciju.
  startVideo();

  const sticky = document.getElementById('sticky-cta');
  const contact = document.getElementById('kontakt');
  const updateSticky = () => {
    const isMobile = window.innerWidth <= 760;
    const heroPassed = document.querySelector('.hero').getBoundingClientRect().bottom < 130;
    const galleryBox = document.getElementById('galerija').getBoundingClientRect();
    const galleryVisible = galleryBox.top < window.innerHeight * 0.9 && galleryBox.bottom > 110;
    const box = contact.getBoundingClientRect();
    const contactVisible = box.top < window.innerHeight && box.bottom > 100;
    // Keep the CTA visible throughout the page, but hide it while the gallery or contact area is on screen.
    sticky.classList.toggle('visible', isMobile && heroPassed && !galleryVisible && !contactVisible);
  };
  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);
  updateSticky();
})();
