function play(sound) {
    new Audio("/sounds/" + sound + ".wav").play()
}

let currentAlphabet = "hiragana"

function updatePetalScores() {
    document.querySelectorAll('.row-subtitle').forEach(subtitle => {
        const petalsEarned = parseInt(getCookie(currentAlphabet + "_" + subtitle.id.split('-')[1]))
        const petalsToComplete = parseInt(subtitle.id.split('-')[2])
        subtitle.innerHTML = petalsEarned + (petalsEarned >= petalsToComplete ? '' : ` / ${petalsToComplete}`) + ' petals'
    })

    document.querySelectorAll('.row-progress-full').forEach(progressBar => {
        const petalsEarned = parseInt(getCookie(currentAlphabet + "_" + progressBar.children[0].id.split('-')[1]))
        const petalsToComplete = parseInt(progressBar.children[0].id.split('-')[2])
        const ratio = petalsEarned / petalsToComplete;

        if(ratio < 1) {
            progressBar.style.display = 'flex'
            progressBar.children[0].style.width = `${ratio * 100}%`
        } else {
            progressBar.style.display = 'none'
        }
    })

    document.querySelectorAll('.row-completed-icon').forEach(icon => {
        const petalsEarned = parseInt(getCookie(currentAlphabet + "_" + icon.id.split('-')[1]))
        const petalsToComplete = parseInt(icon.id.split('-')[2])

        icon.style.display = petalsEarned >= petalsToComplete ? 'unset' : 'none'
    })
}

/**************************************************************************************************
 *                                        Alphabet switch                                         *
 **************************************************************************************************/
document.getElementById("alphabet-switch").addEventListener('click', event => {
    const switchCheckbox = document.getElementById("alphabet-switch-checkbox")
    const hiraganaTitle = document.getElementById("hiragana-alphabet-switch-title")
    const katakanaTitle = document.getElementById("katakana-alphabet-switch-title")
    const kanaImages = document.querySelectorAll(".row-kana")
    const kanaProgressBars = document.querySelectorAll(".row-progress-completed")

    switchCheckbox.checked = !switchCheckbox.checked

    const titleEnabledClass = "enabled"

    if(switchCheckbox.checked) {
        play("alphabet_switch_katakana")

        katakanaTitle.classList.add(titleEnabledClass)
        hiraganaTitle.classList.remove(titleEnabledClass)
        kanaImages.forEach(kana => kana.src = kana.src.replace("Hiragana", "Katakana"))

        kanaProgressBars.forEach(progressBar => {
            progressBar.classList.remove('hiragana')
            progressBar.classList.add('katakana')
        })

        currentAlphabet = "katakana"
    } else {
        play("alphabet_switch_hiragana")

        katakanaTitle.classList.remove(titleEnabledClass)
        hiraganaTitle.classList.add(titleEnabledClass)
        kanaImages.forEach(kana => kana.src = kana.src.replace("Katakana", "Hiragana"))

        kanaProgressBars.forEach(progressBar => {
            progressBar.classList.add('hiragana')
            progressBar.classList.remove('katakana')
        })

        currentAlphabet = "hiragana"
    }

    updatePetalScores()
})


/**************************************************************************************************
 *                                          Event sounds                                          *
 **************************************************************************************************/
document.querySelectorAll(".row").forEach(row => {
    row.addEventListener("mouseenter", event => play("hover"))
    row.addEventListener("click", event => play("click"))
})


/**************************************************************************************************
 *                                       Opening the lessons                                      *
 **************************************************************************************************/
 document.querySelectorAll(".row").forEach(row => {
    row.addEventListener("click", event => {
        let mouse = { x: event.clientX, y: event.clientY }
        let transitionCircle = document.createElement("div")
        transitionCircle.id = "transition-circle"
        transitionCircle.classList.add(currentAlphabet)
        transitionCircle.style.cssText = `left: ${mouse.x}px; top: ${mouse.y}px`
        document.body.appendChild(transitionCircle)

        setTimeout(() => window.location.href = "/learn?alphabet=" + currentAlphabet + "&row=" + row.id.split("-")[1], 2000);
    })
})

updatePetalScores()