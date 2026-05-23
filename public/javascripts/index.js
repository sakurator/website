let alphabet = "hiragana";
const contentContainerEl = document.getElementById("content-container");
const progressResetContainerEl = document.getElementById("progress-reset-container");

function updatePetalScores() {
    document.querySelectorAll(".row-subtitle").forEach((subtitle) => {
        const petalsEarned = parseInt(
            getCookie(alphabet + "_" + subtitle.id.split("-")[1], 0)
        );
        const petalsToComplete = parseInt(subtitle.id.split("-")[2]);
        const setCompleted = petalsEarned >= petalsToComplete;
        const particle = alphabetParticle(alphabet);

        subtitle.innerHTML = petalsEarned + (setCompleted ? "" : ` / ${petalsToComplete}`) + `<img src="${particle.nextVariationUri()}"/>`;
    });

    document.querySelectorAll(".row-progress-full").forEach((progressBar) => {
        const letter = progressBar.children[0].id.split("-")[1];
        const petalsEarned = petals(alphabet, letter);
        const petalsToComplete = parseInt(progressBar.children[0].id.split("-")[2]);
        const progress = Math.min(100, petalsEarned / petalsToComplete * 100);

        progressBar.style.display = "flex";
        progressBar.children[0].style.width = `${progress}%`;
    });

    document.querySelectorAll(".row-completed-icon").forEach((icon) => {
        const letter = icon.id.split("-")[1];
        const petalsEarned = petals(alphabet, letter);
        const petalsToComplete = parseInt(icon.id.split("-")[2]);

        icon.style.display = petalsEarned >= petalsToComplete ? "unset" : "none";
    });
}

/**************************************************************************************************
 *                                        Alphabet switch                                         *
 **************************************************************************************************/
const alphabetSwitchEl = document.getElementById("alphabet-switch");
const switchCheckboxEl = document.getElementById("alphabet-switch-checkbox");
const hiraganaTitleEl = document.getElementById(
    "hiragana-alphabet-switch-title"
);
const katakanaTitleEl = document.getElementById(
    "katakana-alphabet-switch-title"
);
const rowCardEls = document.querySelectorAll(".row-card");
const kanaProgressBarEls = document.querySelectorAll(".row-progress-completed");
const kanaImageEls = document.querySelectorAll(".row-kana");

function booleanOfAlphabet(alphabetName) {
    switch (alphabetName.toLowerCase()) {
        case "katakana":
            return true;
        case "hiragana":
            return false;
        default:
            throw new Error(`Invalid alphabet ${alphabetName}`);
    }
}

function alphabetNameOf(boolean, capitalized = false) {
    if (capitalized) {
        return boolean ? "Katakana" : "Hiragana";
    } else {
        return boolean ? "katakana" : "hiragana";
    }
}

function switchAlphabet() {
    const alphabetBoolean = !switchCheckboxEl.checked;
    const alphabetName = alphabetNameOf(alphabetBoolean);
    switchCheckboxEl.checked = alphabetBoolean;

    classUnless(hiraganaTitleEl, "enabled", alphabetBoolean);
    classIf(katakanaTitleEl, "enabled", alphabetBoolean);

    kanaProgressBarEls.forEach((progressBar) => {
        classUnless(progressBar, "hiragana", alphabetBoolean);
        classIf(progressBar, "katakana", alphabetBoolean);
    });

    rowCardEls.forEach((rowCard) => {
        classUnless(rowCard, "hiragana", alphabetBoolean);
        classIf(rowCard, "katakana", alphabetBoolean);
    });

    kanaImageEls.forEach(
        (kana) =>
        (kana.src = kana.src.replace(
            alphabetNameOf(!alphabetBoolean, true),
            alphabetNameOf(alphabetBoolean, true)
        ))
    );

    play(`alphabet_switch_${alphabetName}`);
    alphabet = alphabetName;
    updatePetalScores();
}

alphabetSwitchEl.addEventListener("click", switchAlphabet);
katakanaTitleEl.addEventListener("click", () =>
    switchAlphabet(booleanOfAlphabet("Katakana"))
);
hiraganaTitleEl.addEventListener("click", () =>
    switchAlphabet(booleanOfAlphabet("Hiragana"))
);

/**************************************************************************************************
 *                                          Event sounds                                          *
 **************************************************************************************************/
document.querySelectorAll(".row-card").forEach((row) => {
    row.addEventListener("mouseenter", () => play("hover"));
    row.addEventListener("click", () => play("click"));
});

/**************************************************************************************************
 *                                       Opening the lessons                                      *
 **************************************************************************************************/
document.querySelectorAll(".row-card").forEach((row) => {
    row.addEventListener("click", (event) => {
        let mouse = { x: event.clientX, y: event.clientY };
        let transitionCircle = document.createElement("div");
        transitionCircle.id = "transition-circle";
        transitionCircle.classList.add(alphabet);
        transitionCircle.style.cssText = `left: ${mouse.x}px; top: ${mouse.y}px`;
        document.body.appendChild(transitionCircle);

        setTimeout(
            () =>
            (window.location.href =
                "/learn/" +
                alphabet +
                "/" +
                (row.id.split("-")[1] == ""
                    ? "vowels"
                    : row.id.split("-")[1])),
            2000
        );
    });
});

updatePetalScores();

setInterval(() => {
    alphabetParticle(alphabet).splash(
        {
            x: Math.random() * window.innerWidth - window.innerHeight / 4,
            y: -window.innerHeight / 4,
        },
        5,
        700,
    );
}, 300);
