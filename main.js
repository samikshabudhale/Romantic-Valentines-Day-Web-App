document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");
    const icon = muteButton?.querySelector("i");

    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");
    const audioHint = document.querySelector(".audio-hint");

    let partnerName = "PIYU";
    let noClickCount = 0;

    // 🎵 Audio setup
    audio.volume = parseFloat(volumeSlider?.value || "0.7");

    volumeSlider?.addEventListener("input", () => {
        audio.volume = parseFloat(volumeSlider.value);
        if (icon) icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
    });

    muteButton?.addEventListener("click", () => {
        audio.muted = !audio.muted;
        if (icon) icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
    });

    // ✨ Typewriter
    function typeWriterEffect(el, text, speed = 70) {
        if (!el) return;
        el.innerHTML = "";
        let i = 0;
        (function typing() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i++);
                setTimeout(typing, speed);
            }
        })();
    }

    // 👉 Reveal choices
    function revealChoices() {
        audioHint?.remove();
        audio.play().catch(() => {});

        clickButton.style.display = "none";
        choiceBox.classList.remove("hide");

        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="typed-text"></span>
        `;
        setTimeout(() => {
            typeWriterEffect(document.querySelector(".typed-text"), "You and me, Valentine style?");
        }, 300);
    }

    // ❤️ Hearts
    function createHearts() {
        const container = document.createElement("div");
        container.className = "heart-container";
        document.body.appendChild(container);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";
            container.appendChild(heart);
        }
        setTimeout(() => container.remove(), 5000);
    }

    // ✅ YES
    yesButton?.addEventListener("click", () => {
        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="love-text">Looks like a plan 💖</span><br>
            <span class="love-text">I knew you couldn’t resist 😏</span>
        `;
        choiceBox.style.display = "none";
        threedBox.classList.remove("hide");
        createHearts();
    });

    // 😈 NO runs away
    noButton?.addEventListener("mouseenter", moveNoButton);
    noButton?.addEventListener("click", moveNoButton);

    function moveNoButton() {
        noClickCount++;
        const wrapper = document.querySelector(".choice-wrapper");
        const rect = wrapper.getBoundingClientRect();

        noButton.style.position = "absolute";
        noButton.style.left = Math.random() * (rect.width - noButton.offsetWidth) + "px";
        noButton.style.top = Math.random() * (rect.height - noButton.offsetHeight) + "px";

        if (noClickCount >= 6) {
            noButton.style.display = "none";
            questionText.innerHTML += `<br><span class="no-choice-text">Only Yes was destiny 😌</span>`;
        }
    }

    clickButton.addEventListener("click", revealChoices);
});
