const MAX_COMBO = 9;

class Game {
	constructor() {
		this.combo = 1;
		this.total = 500;
		this.punishment = 5;
		this.points = 20;
		this.flawless = true;
		this.running = true;
		this.particles = alphabetParticle(alphabet);
		this.wasCompleted = petals(alphabet, letter) >= row.petalsToComplete;
		this.progressBarEl = element("game-progress-bar-completed");
		this.letterImageEl = element("kana-image");
		this.gameColumnContainerEl = element("game-column-container");
		this.resultCompletedEl = element("game-result-completed");
		this.resultNoMistakesEl = element("game-result-no-mistakes");
		this.exitButtonEl = element("exit-button");
		this.optionEls = elements("option");
		this.gameColumnContainerEl = element("game-column-container");
		this.introductionContainerEl = element("introduction-container");
		this.letterIntroductionEls = elements("letter-introduction");
		this.gameContainerEl = element("game-container");
		this.rowCompletedEl = element("row-completed");

		this.#registerEvents();
	}

	get petals() {
		return getPetals(alphabet, letter);
	}

	run() {
		if (this.petals === 0) {
			this.introduceLetters();
		} else {
			this.startGame();
		}
	}

	get pointsAward() {
		return Math.round(Math.pow(this.combo, 1.3));
	}

	get finished() {
		return !this.running;
	}

	set finished(newFinished) {
		this.running = !newFinished;
	}

	get enoughPoints() {
		return this.points >= this.total;
	}

	get needsCongratulations() {
		return petals(alphabet, letter) >= row.petalsToComplete && !this.wasCompleted;
	}

	increaseCombo() {
		if (this.combo < MAX_COMBO) {
			this.combo += 1;
		}
	}

	isOptionCorrect(option) {
		return this.rightAnswer === option.getAttribute("data-romaji");
	}

	isOptionIncorrect(option) {
		return !this.isOptionCorrect(option);
	}

	#registerEvents() {
		this.optionEls.forEach((option) => {
			option.addEventListener("mouseenter", () => play("hover"));
			option.addEventListener("click", async (event) => {
				if (this.finished) {
					return;
				}

				if(this.isOptionIncorrect(option)) {
					return this.punish();
				}

				const mousePosition = { x: event.clientX, y: event.clientY };
				this.particles.splash(mousePosition, this.combo);
				this.points += this.pointsAward;

				if (this.enoughPoints) {
					await this.finishGame();
					await this.showCompletionResult();
					await this.showFlawlessResultIfDeserves();
					await this.congratulateWithRowCompletionIfDeserves();
				} else {
					this.answeredCorrect();
				}

			});
		});

		this.exitButtonEl.addEventListener("click", async (event) => {
			if (this.finished) {
				return;
			}

			play("exit");

			this.finished = true;
			this.gameColumnContainerEl.classList.add("completed");

			await sleep(1200);

			home();
		});
	}

	answeredCorrect() {
		play(`combo_${this.combo}`);
		this.sayLetter();
		this.increaseCombo();
		this.next();
		this.updateProgressBar();
	}

	punish() {
		this.flawless = false;
		this.points -= this.points - (MAX_COMBO - this.combo) >= 0
				? MAX_COMBO - this.combo
				: this.points;

		play("incorrect");
		this.combo = 1;
		this.updateProgressBar();
	}

	sayLetter() {
		sayLetter(this.rightAnswer);
	}

	async congratulateWithRowCompletionIfDeserves() {
		await sleep(2000);
		if (this.needsCongratulations) {
			this.congratulateWithRowCompletion();
		} else {
			home();
		}
	}

	async finishGame() {
		play(`level_completed${this.flawless ? "_perfectly" : ""}`);
		addPetals(alphabet, letter, 1 + (this.flawless ? 1 : 0));
		this.finished = true;
		this.gameColumnContainerEl.classList.add("completed");

		await sleep(1200);
		this.gameColumnContainerEl.remove();
	}

	async showCompletionResult() {
		this.resultCompletedEl.classList.add("shown");

		await sleep(640);
		play("result_completed");
		this.particles.splash(createCenterPosition(), 30, 20);

		await sleep(960);
		this.resultCompletedEl.remove();	
	}

	async showFlawlessResultIfDeserves() {
		if (this.flawless) {
			this.resultNoMistakesEl.classList.add("shown");

			await sleep(640);
			play("result_no_mistakes");
			this.particles.splash(createCenterPosition(), 30, 20);

			await sleep(960);
			this.resultNoMistakesEl.remove();
		}
	}

	get progress() {
		return (100 * this.points) / this.total;
	}

	updateProgressBar() {
		this.progressBarEl.style.width = `${this.progress}%`;
		classIf(this.progressBarEl, "in-combo", this.combo === MAX_COMBO);
	}

	next() {
		const letters = shuffle(rowLetters).slice(0, this.optionEls.length);
		const optionLetters = shuffle(letters);

		this.rightAnswer = letters.find(({ name }) => this.lastAnswer !== name).name;
		this.lastAnswer = this.rightAnswer;

		for (const index in optionLetters) {
			const romaji = optionLetters[index].name;
			const option = this.optionEls[index];

			option.innerText = romaji;
			option.setAttribute("data-romaji", romaji);
		}

		this.letterImageEl.src = `/images/letters/${alphabet}_${this.rightAnswer}.svg`;
	}

	startGame() {
		play("game_started");
	
		this.introductionContainerEl.style.display = "none";
		this.gameContainerEl.classList.add("visible");
		this.updateProgressBar();
		this.next();
	}
	
	introduceLetters() {
		this.letterIntroductionEls.forEach((letter, index) => {
			setTimeout(() => {
				letter.style.display = "flex";
				letter.classList.add("introducing");
				play("letters/" + letter.getAttribute("data-letter"));
	
				this.particles.splash(
					{
						x: window.innerWidth / 2,
						y: window.innerHeight / 3,
					},
					7,
					20
				);
			}, 5000 * index);
	
			setTimeout(() => {
				letter.style.display = "none";
			}, 5000 * index + 4000);
		});
	
		setTimeout(() => this.startGame(), 5000 * this.letterIntroductionEls.length);
	}
	
	async congratulateWithRowCompletion() {
		this.rowCompletedEl.classList.add("visible");
	
		play("row_completed_triumphal");
	
		for (let i = 0; i < 7; i++) {
			const petalsPosition = {
				x: window.innerWidth * Math.random(),
				y: (window.innerHeight * Math.random()) / 8,
			};
	
			this.particles.splash(petalsPosition, 20, 30);
	
			await sleep(1000);
		}
	
		await sleep(3000);
		home();
	}
}




const game = new Game();
game.run();