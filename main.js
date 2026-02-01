document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");
    const volumeSlider = document.getElementById("volume-slider");
    const icon = muteButton.querySelector("i");

    const clickButton = document.querySelector(".click-box button");
    const choiceBox = document.querySelector(".choice-box");
    const threedBox = document.querySelector(".threed-box");
    const questionText = document.querySelector(".question-box h1");
    const yesButton = document.querySelector(".choice-box button:first-child");
    const noButton = document.querySelector(".choice-box button:last-child");
    const audioHint = document.querySelector(".audio-hint");

    let partnerName = "PIYU";
    let noClickCount = 0;

    // Volume setup
    audio.volume = parseFloat(volumeSlider.value || "0.6");

    volumeSlider.addEventListener("input", () => {
        audio.volume = parseFloat(volumeSlider.value);
        icon.className = audio.volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up";
    });

    muteButton.addEventListener("click", () => {
        audio.muted = !audio.muted;
        icon.className = audio.muted ? "fa fa-volume-off" : "fa fa-volume-up";
    });

    function typeWriterEffect(element, text, speed = 100) {
        element.innerHTML = "";
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    function revealChoices() {
        audio.muted = false;
        audio.play().catch(() => {});
        audioHint.style.display = "none";

        clickButton.style.display = "none";
        choiceBox.classList.remove("hide");

        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="typed-text"></span>
        `;

        const typedText = document.querySelector(".typed-text");
        setTimeout(() => {
            typeWriterEffect(typedText, "You and me, Valentine style?");
        }, 500);
    }

    function createHearts() {
        const heartContainer = document.createElement("div");
        heartContainer.className = "heart-container";
        document.body.appendChild(heartContainer);

        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.style.left = Math.random() * 100 + "vw";
            heartContainer.appendChild(heart);
        }

        setTimeout(() => heartContainer.remove(), 5000);
    }

    yesButton.addEventListener("click", () => {
        questionText.innerHTML = `
            <span class="partner-name">${partnerName}</span><br>
            <span class="love-text">Looks like a plan 💖</span><br>
            <span class="love-text">I knew you couldn’t resist 😏</span>
        `;
        choiceBox.style.display = "none";
        threedBox.classList.remove("hide");
        createHearts();
    });

    noButton.addEventListener("click", () => {
        noClickCount++;
        if (noClickCount >= 5) {
            noButton.style.display = "none";
            questionText.innerHTML += `<br><span class="no-choice-text">Did you really think you had a choice? 🤭</span>`;
        }
    });

    clickButton.addEventListener("click", revealChoices);
});
