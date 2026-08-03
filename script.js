// ==================== 1. LIGHTBOX / MODAL FUNCTION ====================
function openLightbox(imageSrc) {
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  
  if (lightbox && lightboxImg) {
    lightbox.style.display = "flex";
    lightboxImg.src = imageSrc;
  }
}

function closeLightbox() {
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

// Esc key dabane par lightbox band karne ke liye
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// ==================== 2. PAGE NAVIGATION & CELEBRATION ====================
function triggerCelebration() {
  // Confetti effect
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Switch to Gallery Page
  document.getElementById("mainPage").style.display = "none";
  var galleryPage = document.getElementById("galleryPage");
  galleryPage.style.display = "block";
  galleryPage.classList.remove("hidden-page");
  
  // Page scroll to top
  window.scrollTo(0, 0);
}

function showMainPage() {
  document.getElementById("galleryPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  window.scrollTo(0, 0);
}

// ==================== 3. AUDIO & MUSIC CONTROLS ====================
function toggleBgMusic() {
  var audio = document.getElementById("bgSong");
  var icon = document.getElementById("musicIcon");
  var text = document.getElementById("musicText");

  if (audio.paused) {
    audio.play();
    icon.innerText = "⏸️";
    text.innerText = "Pause";
  } else {
    audio.pause();
    icon.innerText = "🎵";
    text.innerText = "BGM";
  }
}

function playMemeSound() {
  var memeAudio = document.getElementById("memeAudio");
  if (memeAudio) {
    memeAudio.play();
  }
}

// ==================== 4. COUNTDOWN TIMER ====================
function updateCountdown() {
  // Birthday date set
  const birthdayDate = new Date("Aug 31, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const diff = birthdayDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    if (document.getElementById("mins")) document.getElementById("mins").innerText = mins < 10 ? '0' + mins : mins;
    if (document.getElementById("secs")) document.getElementById("secs").innerText = secs < 10 ? '0' + secs : secs;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
