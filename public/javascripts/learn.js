const MAX_COMBO = 9;

let inGame = true;
let rightAnswer = "?";
let lastAnswer = undefined;
let game = {
	combo: 1,
	total: 500,
	punishment: 5,
	points: 0,
	punished: false,
};
let rowWasCompleted = countPetals() >= row.petalsToComplete;
let particleName = alphabet === "Hiragana" ? "petal" : "leaf";

function backHome() {
	window.location.href = "/";
}

function countPetals() {
	return parseInt(getCookie(`${alphabet}_${letter}`.toLowerCase(), 0));
}

function updateProgressBar() {
	const progressBar = document.getElementById("game-progress-bar-completed");
	progressBar.style.width = (100 * game.points) / game.total + "%";

	if (game.combo == MAX_COMBO) progressBar.classList.add("in-combo");
	else progressBar.classList.remove("in-combo");
}

function updateTask() {
	let letterImage = document.getElementById("kana-image");
	let options = document.querySelectorAll(".option-letter");

	let letters = [...rowLetters];
	for (
		var currentIndex = letters.length - 1;
		currentIndex > 0;
		currentIndex--
	) {
		let swappageIndex = Math.floor(Math.random() * (currentIndex + 1));
		let swappageBuffer = letters[currentIndex];
		letters[currentIndex] = letters[swappageIndex];
		letters[swappageIndex] = swappageBuffer;
	}

	letters = letters.slice(0, 4);

	do {
		rightAnswer = letters[Math.floor(Math.random() * options.length)].name;
	} while (lastAnswer === rightAnswer);

	lastAnswer = rightAnswer;

	for (let i = 0, option; (option = options[i]); i++) {
		option.innerHTML = letters[i].name;
	}

	letterImage.src =
		"/images/letters/" + alphabet + "_" + rightAnswer + ".svg";
}

/**************************************************************************************************
 *                                        Option events                                           *
 **************************************************************************************************/
document.querySelectorAll(".option").forEach((option) => {
	option.addEventListener("mouseenter", () => play("hover"));

	option.addEventListener("click", async (event) => {
		if (!inGame) return;

		let mouse = { x: event.clientX, y: event.clientY };

		if (rightAnswer === option.children[0].innerHTML) {
			for (var i = 0; i < game.combo * 2; i++)
				createPetal(
					mouse,
					game.combo * 2.5 * Math.random() + 1,
					particleName
				);

			play("letters/" + rightAnswer);

			if (game.points + game.combo < game.total) {
				game.points += Math.round(Math.pow(game.combo, 1.3));

				play("combo_" + game.combo);

				updateTask();

				if (game.combo < MAX_COMBO) game.combo++;
			} else {
				play(
					game.punished
						? "level_completed"
						: "level_completed_perfectly"
				);
				inGame = false;
				let gameContainer = document.getElementById(
					"game-column-container"
				);
				let resultCompleted = document.getElementById(
					"game-result-completed"
				);
				let resultNoMistakes = document.getElementById(
					"game-result-no-mistakes"
				);

				let rowScoreCookieTag = alphabet.toLowerCase() + "_" + letter;

				setCookie(
					rowScoreCookieTag,
					parseInt(getCookie(rowScoreCookieTag, 0)) +
						1 +
						(game.punished ? 0 : 1)
				);

				gameContainer.classList.add("completed");

				await sleep(1200);

				gameContainer.remove();
				resultCompleted.classList.add("shown");

				await sleep(640);

				play("result_completed");
				for (var i = 0; i < 30; i++)
					createPetal(
						{ x: window.innerWidth / 2, y: window.innerHeight / 2 },
						20,
						particleName
					);

				await sleep(960);

				resultCompleted.remove();

				if (!game.punished) {
					resultNoMistakes.classList.add("shown");

					await sleep(640);

					play("result_no_mistakes");
					for (var i = 0; i < 30; i++)
						createPetal(
							{
								x: window.innerWidth / 2,
								y: window.innerHeight / 2,
							},
							20,
							particleName
						);

					await sleep(960);

					resultNoMistakes.remove();
				}

				await sleep(2000);

				if (countPetals() >= row.petalsToComplete && !rowWasCompleted) {
					congratulateWithRowCompletion();
				} else {
					backHome();
				}
			}
		} else {
			game.punished = true;
			game.points -=
				game.points - (MAX_COMBO - game.combo) >= 0
					? MAX_COMBO - game.combo
					: game.points;

			play("incorrect");
			game.combo = 1;
		}

		updateProgressBar();
	});
});

/**************************************************************************************************
 *                                      Exit button event                                         *
 **************************************************************************************************/
document
	.getElementById("exit-button")
	.addEventListener("click", async (event) => {
		if (!inGame) return;

		play("quit");

		inGame = false;
		document
			.getElementById("game-column-container")
			.classList.add("completed");

		await sleep(1200);

		backHome();
	});

/**************************************************************************************************
 *                                       Letter introduction                                      *
 **************************************************************************************************/

function startGame() {
	play("game_started");

	document.getElementById("introduction-container").style.display = "none";
	document.getElementById("game-container").classList.add("visible");
	updateProgressBar();
	updateTask();
}

function introduceLetters() {
	const letterIntroductionEls = document.querySelectorAll(
		".letter-introduction"
	);

	letterIntroductionEls.forEach((letter, index) => {
		setTimeout(() => {
			letter.style.display = "flex";
			letter.classList.add("introducing");
			play("letters/" + letter.getAttribute("data-letter"));

			for (let i = 0; i < 7; i++) {
				createPetal(
					{
						x: window.innerWidth / 2,
						y: window.innerHeight / 3,
					},
					20,
					particleName
				);
			}
		}, 5000 * index);

		setTimeout(() => {
			letter.style.display = "none";
		}, 5000 * index + 4000);
	});

	setTimeout(startGame, 5000 * letterIntroductionEls.length);
}

/**************************************************************************************************
 *                                          Row completion                                        *
 **************************************************************************************************/

async function congratulateWithRowCompletion() {
	const rowCompletedEl = document.getElementById("row-completed");
	rowCompletedEl.classList.add("visible");

	play("row_completed_triumphal");

	for (let i = 0; i < 7; i++) {
		const petalsPosition = {
			x: window.innerWidth * Math.random(),
			y: (window.innerHeight * Math.random()) / 8,
		};

		for (let k = 0; k < 30; k++) {
			createPetal(petalsPosition, 20, particleName);
		}

		await sleep(1000);
	}

	await sleep(3000);
	backHome();
}

const petals = countPetals();

if (petals === 0) {
	introduceLetters();
} else {
	startGame();
}
