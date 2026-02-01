document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");
    const icon = muteButton ? muteButton.querySelector("i") : null;

    const videoCard = document.querySelector(".aside.left"); // Video card container
    const video = videoCard ? videoCard.querySelector("video") : null;

    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");

    // ✅ NEW: audio hint element
    const audioHint = document.querySelector(".audio-hint");

    let partnerName = "PIYU";
    let noClickCount = 0;

    // ---------------------------
    // Audio controls
    // ---------------------------
    if (audio && volumeSlider) {
        // Set initial volume from slider
        audio.volume = parseFloat(volumeSlider.value || "0.6");

        // Live volume control
        volumeSlider.addEventListener("input", () => {
            audio.volume = parseFloat(volumeSlider.value);

            // Update icon if volume hits 0 and not muted
            if (icon && !audio.muted) {
                icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
            }
        });
    }

    if (audio && muteButton) {
        muteButton.addEventListener("click", () => {
            audio.muted = !audio.muted;

            if (icon) {
                icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
            }
        });
    }

    // ---------------------------
    // Typewriter effect
    // ---------------------------
    function typeWriterEffect(element, text, speed = 100) {
        if (!element) return;
        element.innerHTML = "";
        let i = 0;

        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML += `<span class="typewriter"></span>`;
            }
        }

        typing();
    }

    // ---------------------------
    // Reveal choices (starts music)
    // ---------------------------
    function revealChoices() {
        // ✅ NEW: hide the hint after click
        if (audioHint) audioHint.style.display = "none";

        // ✅ FIX: unmute + set volume before play (because HTML autoplay is muted)
        if (audio) {
            audio.muted = false; // IMPORTANT
            if (volumeSlider) {
                audio.volume = parseFloat(volumeSlider.value || "0.6");
            } else {
                audio.volume = 0.6;
            }

            audio.play().catch(() => {});
        }

        if (videoCard) videoCard.classList.remove("hide");
        if (video) video.play();

        if (clickButton) clickButton.style.display = "none";
        if (choiceBox) choiceBox.classList.remove("hide");

        // Show name + typed line
        if (questionText) {
            questionText.innerHTML = `<span class="partner-name">${partnerName}</span><br><span class="typed-text"></span>`;
            const typedTextElement = document.querySelector(".typed-text");
            setTimeout(() => {
                typeWriterEffect(typedTextElement, "You and me, Valentine style?");
            }, 500);
        }
    }

    // ---------------------------
    // Hearts animation
    // ---------------------------
    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.classList.add("heart-container");
        document.body.appendChild(heartContainer);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 3 + "s";

            heartContainer.appendChild(heart);
        }

        setTimeout(() => {
            heartContainer.remove();
        }, 5000);
    }

    // ---------------------------
    // Yes button
    // ---------------------------
    if (yesButton) {
        yesButton.addEventListener("click", function () {
            if (questionText) {
                questionText.innerHTML =
                    `<span class="partner-name">${partnerName}</span><br>` +
                    `<span class="love-text">Looks like a plan 💖</span><br>` +
                    `<span class="love-text">I knew you couldn’t resist 😏</span>`;
            }

            if (choiceBox) choiceBox.style.display = "none";
            if (threedBox) threedBox.classList.remove("hide");

            createHearts();
        });
    }

    // ---------------------------
    // No button
    // ---------------------------
    if (noButton && yesButton) {
        noButton.addEventListener("click", function () {
            noClickCount++;

            if (noClickCount < 5) {
                const newNoSize = 16 - noClickCount * 2;
                const newYesSize = 18 + noClickCount * 5;

                noButton.style.fontSize = `${newNoSize}px`;
                noButton.style.padding = `${newNoSize / 2}px ${newNoSize}px`;

                yesButton.style.fontSize = `${newYesSize}px`;
                yesButton.style.padding = `${newYesSize / 2}px ${newYesSize}px`;
            } else {
                noButton.style.display = "none";
                if (questionText) {
                    questionText.innerHTML += `<br><span class="no-choice-text">Did you really think you had a choice? 🤭</span>`;
                }
            }
        });
    }

    // ---------------------------
    // Click button to start
    // ---------------------------
    if (clickButton) {
        clickButton.addEventListener("click", revealChoices);
    }
});
