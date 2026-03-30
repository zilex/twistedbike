const form = document.getElementById('availabilityForm');
const result = document.getElementById('result');
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const startBtn = document.getElementById('startDateBtn');
const endBtn = document.getElementById('endDateBtn');

/* ================= GOOGLE CONFIG ================= */

const GOOGLE_API_KEY = 'AIzaSyC2Mt4GtwPwiavdklf-m6mRKAwGYf2kJi0';
const GOOGLE_CALENDAR_ID = 'f46f0af65c670f8fcb6fd66ce6c40321d3ba40165514246365bf29df4abdca20@group.calendar.google.com';
const GOOGLE_TIMEZONE = 'Europe/Zagreb';

/* ================================================= */

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatDateIso(date) {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${y}-${m}-${d}`;
}

function parseCroToIso(value) {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, d, m, y] = match;
  return `${y}-${m}-${d}`;
}

function isValidCroDate(value) {
  const iso = parseCroToIso(value);
  if (!iso) return false;
  const date = new Date(iso + 'T00:00:00');
  return !Number.isNaN(date.getTime()) && formatDateIso(date) === iso;
}

function setResult(type, text) {
  result.className = `result ${type}`;
  result.textContent = text;
}

function autoFormatDateInput(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 4) {
    v = `${v.slice(0,2)}.${v.slice(2,4)}.${v.slice(4)}`;
  } else if (v.length > 2) {
    v = `${v.slice(0,2)}.${v.slice(2)}`;
  }
  input.value = v;
}

/* ================= GOOGLE API ================= */

async function checkGoogleCalendarAvailability(startIso, endIso) {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/freeBusy?key=${GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timeMin: `${startIso}T00:00:00+02:00`,
        timeMax: `${endIso}T23:59:59+02:00`,
        timeZone: GOOGLE_TIMEZONE,
        items: [
          { id: GOOGLE_CALENDAR_ID }
        ]
      })
    }
  );

  if (!response.ok) {
    throw new Error('Google API error');
  }

  const data = await response.json();
  const busy = data.calendars?.[GOOGLE_CALENDAR_ID]?.busy || []; 
  return busy.length === 0;
}

/* ================================================= */

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayIso = formatDateIso(today);

const startPicker = flatpickr(startInput, {
  dateFormat: "d.m.Y",
  allowInput: true,
  disableMobile: true,
  minDate: "today"
});

const endPicker = flatpickr(endInput, {
  dateFormat: "d.m.Y",
  allowInput: true,
  disableMobile: true,
  minDate: "today"
});

startBtn.addEventListener('click', () => startPicker.open());
endBtn.addEventListener('click', () => endPicker.open());

startInput.addEventListener('input', () => autoFormatDateInput(startInput));
endInput.addEventListener('input', () => autoFormatDateInput(endInput));

/* ================= MAIN LOGIC ================= */

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const startRaw = startInput.value.trim();
  const endRaw = endInput.value.trim();

  if (!startRaw || !endRaw) {
    setResult('result-danger', 'Odaberi oba datuma.');
    return;
  }

  if (!isValidCroDate(startRaw) || !isValidCroDate(endRaw)) {
    setResult('result-danger', 'Neispravan format datuma.');
    return;
  }

  const start = parseCroToIso(startRaw);
  const end = parseCroToIso(endRaw);

  if (start < todayIso) {
    setResult('result-danger', 'Datum od mora biti od danas na dalje.');
    return;
  }

  if (end < start) {
    setResult('result-danger', 'Datum do mora biti isti ili veći od datuma od.');
    return;
  }

  setResult('result-neutral', 'Provjeravam dostupnost...');

  try {
    const isAvailable = await checkGoogleCalendarAvailability(start, end);

    if (isAvailable) {
      setResult('result-success', 'Termin je dostupan. Nazovite 092 343 1924 i rezervirajte.');
    } else {
      setResult('result-danger', 'Nažalost termin je zauzet.');
    }

  } catch (err) {
    console.error(err);
    setResult('result-danger', 'Greška pri provjeri. Nazovite 092 343 1924 za provjeru.');
  }
});

/* ================================================= */
/* ================= GALLERY (OSTAJE ISTO) =========== */

const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;

function renderLightboxImage() {
  const img = galleryImages[currentImageIndex];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || 'Pregled fotografije';
}

function openLightbox(index) {
  currentImageIndex = index;
  renderLightboxImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  renderLightboxImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  renderLightboxImage();
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});