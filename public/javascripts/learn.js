const PETAL_PARTICLE_VARIATIONS = 5
const MIN_PETAL_SIZE = 20
const MAX_PETAL_SIZE = 30
const PETAL_LIFETIME_MILLISECONDS = 4500
const GRAVITY_VECTOR = {x: 0, y: 0.24}
const MAX_COMBO = 9

let inGame = true;
let rightAnswer = '?';
let game = {
    combo: 1,
    total: 500,
    punishment: 5,
    points: 0,
    punished: false,
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function play(sound) {
    new Audio("/sounds/" + sound + ".wav").play()
}

function updateProgressBar() {
    const progressBar = document.getElementById('game-progress-bar-completed')
    progressBar.style.width = (100 * game.points / game.total) + '%'

    if(game.combo == MAX_COMBO)
        progressBar.classList.add('in-combo')
    else
        progressBar.classList.remove('in-combo')
}

function createPetal(initialLocation, initialVelocity) {
    let petalElement = document.createElement("img")
    petalElement.src = "/images/particles/petal_" + Math.ceil(Math.random() * PETAL_PARTICLE_VARIATIONS) + ".svg"
    petalElement.id = "petal_" + Math.round(Math.random() * 100000)
    petalElement.classList.add("petal")
    petalElement.style.width = Math.random() * (MAX_PETAL_SIZE - MIN_PETAL_SIZE) + MIN_PETAL_SIZE + "px"

    var petal = {
        bornAt: Date.now(),
        element: petalElement,
        velocity: {x: (Math.random() * 2. - 1.) * initialVelocity, y: (Math.random() * 2. - 1.) * initialVelocity},
        location: {...initialLocation},
        loop: function() {
            petal.velocity.x += GRAVITY_VECTOR.x
            petal.velocity.y += GRAVITY_VECTOR.y
            petal.location.x += petal.velocity.x
            petal.location.y += petal.velocity.y

            petal.element.style.left = petal.location.x + 'px'
            petal.element.style.top = petal.location.y + 'px'

            if(petal.bornAt <= Date.now() - PETAL_LIFETIME_MILLISECONDS) {
                petal.destroy()
            }
        },

        startFalling: function() {
            petal.intervalID = setInterval(petal.loop, 1000 / 60)
        },
        
        destroy: function() {
            clearInterval(petal.intervalID)
            petal.element.remove()
        },
    }

    petal.startFalling()
    document.body.appendChild(petal.element)

    return petal
}

function updateTask() {
    let letterImage = document.getElementById("kana-image")
    let options = document.querySelectorAll(".option-letter")

    let letters = [...rowLetters]
    for(var currentIndex = letters.length - 1; currentIndex > 0; currentIndex--) {
        var swappageIndex = Math.floor(Math.random() * (currentIndex + 1));
        var swappageBuffer = letters[currentIndex];
        letters[currentIndex] = letters[swappageIndex];
        letters[swappageIndex] = swappageBuffer;
    }

    letters = letters.slice(0, 4)
    rightAnswer = letters[Math.floor(Math.random() * options.length)].name

    for (var i = 0, option; option = options[i]; i++) {
        console.log(option)
        option.innerHTML = letters[i].name
    }

    letterImage.src = "/images/letters/" + alphabet + "_" + rightAnswer + ".svg"
}


/**************************************************************************************************
 *                                        Option events                                           *
 **************************************************************************************************/
document.querySelectorAll(".option").forEach(option => {
    option.addEventListener('mouseenter', event => play('hover'));

    option.addEventListener('click', async event => {
        if(!inGame) return;

        let mouse = { x: event.clientX, y: event.clientY }

        if(rightAnswer === option.children[0].innerHTML) {
            for(var i = 0; i < game.combo; i++)
                createPetal(mouse, game.combo * 2.5 * Math.random() + 1)
        
            play('letters/' + rightAnswer)

            if(game.points + game.combo < game.total) {
                game.points += Math.round(Math.pow(game.combo, 1.3));

                play('combo_' + game.combo)

                updateTask()

                if(game.combo < MAX_COMBO)
                    game.combo++
            } else {
                play(game.punished ? 'level_completed' : 'level_completed_perfectly')
                inGame = false
                let gameContainer = document.getElementById('game-column-container')
                let resultCompleted = document.getElementById('game-result-completed')
                let resultNoMistakes = document.getElementById('game-result-no-mistakes')
                
                let rowScoreCookieTag = alphabet.toLowerCase() + "_" + letter
                setCookie(rowScoreCookieTag, parseInt(getCookie(rowScoreCookieTag)) + 1 + (game.punished ? 0 : 1))

                gameContainer.classList.add('completed')

                await sleep(1200)

                gameContainer.remove()
                resultCompleted.classList.add('shown')

                await sleep(640)

                play('result_completed')
                for(var i = 0; i < 30; i++)
                    createPetal({x: window.innerWidth / 2, y: window.innerHeight / 2}, 20)

                await sleep(960)

                resultCompleted.remove()

                if(!game.punished) {
                    resultNoMistakes.classList.add('shown')

                    await sleep(640)

                    play('result_no_mistakes')
                    for(var i = 0; i < 30; i++)
                        createPetal({x: window.innerWidth / 2, y: window.innerHeight / 2}, 20)

                    await sleep(960)

                    resultNoMistakes.remove()
                }

                await sleep(2000)

                window.location.href = "/"
            }
        } else {
            game.punished = true;
            game.points -= (game.points - (MAX_COMBO - game.combo) >= 0) ? (MAX_COMBO - game.combo) : game.points;
            
            play('incorrect')
            game.combo = 1
        }

        updateProgressBar()
    })
})

/**************************************************************************************************
 *                                      Exit button event                                         *
 **************************************************************************************************/
document.getElementById("exit-button").addEventListener('click', async event => {
    if(!inGame) return

    inGame = false
    document.getElementById('game-column-container').classList.add('completed')

    await sleep(1200)

    window.location.href = "/"
})

updateProgressBar()
updateTask()