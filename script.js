document.addEventListener("DOMContentLoaded", () => {
    const bgSong = document.getElementById("bgSong");
    const memeAudio = document.getElementById("memeAudio");
    let bgMusicEnabled = true;

    if (bgSong) {
        bgSong.volume = 0.25;
    }

    // --- 1. First User Interaction Par BGM Start Karna ---
    function startBGM() {
        if (bgMusicEnabled && bgSong && bgSong.paused) {
            bgSong.play().then(() => {
                const musicBtn = document.getElementById("musicText");
                if (musicBtn) musicBtn.innerHTML = "Pause";
            }).catch(() => {});
        }
        window.removeEventListener("click", startBGM);
        window.removeEventListener("touchstart", startBGM);
        window.removeEventListener("scroll", startBGM);
    }

    window.addEventListener("click", startBGM);
    window.addEventListener("touchstart", startBGM);
    window.addEventListener("scroll", startBGM);

    // --- 2. BGM Toggle Button ---
    window.toggleBgMusic = function() {
        if (!bgSong) return;
        const musicBtn = document.getElementById("musicText");

        if (bgSong.paused) {
            bgMusicEnabled = true;
            bgSong.play().then(() => {
                if (musicBtn) musicBtn.innerHTML = "Pause";
            }).catch(() => {});
        } else {
            bgSong.pause();
            bgMusicEnabled = false;
            if (musicBtn) musicBtn.innerHTML = "BGM";
        }
    };

    // --- 3. Stop All Media Helper ---
    function stopAllMedia(except = null) {
        if (memeAudio && memeAudio !== except) {
            memeAudio.pause();
            memeAudio.currentTime = 0;
            const btn = document.querySelector(".audio-btn");
            if (btn) btn.innerHTML = "🔊 Play Audio";
        }

        document.querySelectorAll("video").forEach(v => {
            if (v !== except) {
                v.pause();
                v.currentTime = 0;
            }
        });

        document.querySelectorAll(".voiceAudio").forEach(a => {
            if (a !== except) {
                a.pause();
                a.currentTime = 0;
            }
        });
    }

    // --- 4. Resume BGM Check ---
    function checkAndResumeBGM() {
        const anyVideoPlaying = [...document.querySelectorAll("video")].some(v => !v.paused);
        const anyVoicePlaying = [...document.querySelectorAll(".voiceAudio")].some(s => !s.paused);
        const memePlaying = memeAudio && !memeAudio.paused;

        if (!anyVideoPlaying && !anyVoicePlaying && !memePlaying && bgMusicEnabled && bgSong) {
            bgSong.play().catch(() => {});
        }
    }

    // --- 5. Meme Audio ---
    window.playMemeSound = function() {
        const button = document.querySelector(".audio-btn");
        if (!memeAudio) return;

        if (memeAudio.paused) {
            stopAllMedia(memeAudio);
            if (bgSong) bgSong.pause();
            memeAudio.play().catch(() => {});
            if (button) button.innerHTML = "⏸ Pause Audio";
        } else {
            memeAudio.pause();
            memeAudio.currentTime = 0;
            checkAndResumeBGM();
            if (button) button.innerHTML = "🔊 Play Audio";
        }
    };

    // --- 6. Celebration Button ---
    window.triggerCelebration = function() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 60, origin: { x: 0 } }), 200);
            setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 60, origin: { x: 1 } }), 400);
        }

        const partyBtn = document.getElementById("partyBtn");
        if (partyBtn) {
            partyBtn.innerText = "🎂 UNLOCKING MEMORY LANE... 🎉";
            partyBtn.style.background = "linear-gradient(135deg, #00f2fe, #4facfe)";
        }

        setTimeout(() => {
            const mainPage = document.getElementById("mainPage");
            const galleryPage = document.getElementById("galleryPage");
            
            if (mainPage) mainPage.style.display = "none";
            if (galleryPage) {
                galleryPage.style.display = "block";
                setTimeout(() => { galleryPage.style.opacity = "1"; }, 50);
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
    };

    // --- 7. Voice Notes & Videos Listeners ---
    document.querySelectorAll(".voiceAudio").forEach(sound => {
        sound.addEventListener("play", () => {
            stopAllMedia(sound);
            if (bgSong) bgSong.pause();
        });
        sound.addEventListener("pause", checkAndResumeBGM);
        sound.addEventListener("ended", checkAndResumeBGM);
    });

    document.querySelectorAll("video").forEach(video => {
        video.addEventListener("play", () => {
            stopAllMedia(video);
            if (bgSong) bgSong.pause();
        });
        video.addEventListener("pause", checkAndResumeBGM);
        video.addEventListener("ended", checkAndResumeBGM);
    });
});