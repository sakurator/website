class ParticleGenerator {
	static FPS = 60;
	static MIN_SIZE = 20;
	static MAX_SIZE = 30;
	static PARTICLE_LIFETIME_MS = 4500;
	static GRAVITY = 0.2;
	static WIND = 0.05;

	constructor({ particleName, variationsCount }) {
		this.particleName = particleName;
		this.variationsCount = variationsCount;
	}

	get src() {
		const particleVariation = randomInt(this.variationsCount) + 1;
		return `/images/particles/${this.particleName}_${particleVariation}.svg`;
	}

	spawn(position = undefined, force = 5) {
		if (position === undefined) {
			position = createRandomScreenPosition();
		}

		const particleElement = document.createElement("img");
		const particleSize = randomInt(ParticleGenerator.MIN_SIZE, ParticleGenerator.MAX_SIZE);

		particleElement.classList.add("particle");
		particleElement.src = this.src;
		particleElement.style.width = `${particleSize}px`;

		const particle = {
			spawnedAt: Date.now(),
			element: particleElement,
			position: { ...position },
			velocity: {
				x: force * randomDeviation(),
				y: force * randomDeviation(),
			},

			isExpired: () => {
				return since(particle.spawnedAt) > ParticleGenerator.PARTICLE_LIFETIME_MS;
			},

			update: () => {
				particle.velocity.x += ParticleGenerator.WIND;
				particle.velocity.y += ParticleGenerator.GRAVITY;

				particle.position.x += particle.velocity.x;
				particle.position.y += particle.velocity.y / (particle.velocity.y > 0 ? 4 : 1);

				particle.element.style.left = `${particle.position.x}px`;
				particle.element.style.top = `${particle.position.y}px`;

				if (particle.isExpired()) {
					particle.despawn();
				}
			},

			spawn: () => {
				document.body.appendChild(particle.element);
				particle.interval = setInterval(() => particle.update(), 1000 / ParticleGenerator.FPS);
			},

			despawn: () => {
				particle.element.remove();
				clearInterval(particle.interval);
			},
		};

		particle.spawn();
		return particle;
	}

	splash(position = undefined, count = 5, force = 5) {
		if (position === undefined) {
			position = createRandomScreenPosition();
		}

		for (let i = 0; i < count; i++) {
			this.spawn(position, force);
		}
	}
}

const particles = {
	petal: new ParticleGenerator({
		particleName: "petal",
		variationsCount: 5,
	}),

	leaf: new ParticleGenerator({
		particleName: "leaf",
		variationsCount: 5,
	}),
};

const alphabetParticles = {
	hiragana: particles.petal,
	katakana: particles.leaf,
};

function alphabetParticle(alphabetName = alphabet) {
	return alphabetParticles[alphabetName.toLowerCase()];
}

function splashParticles(position, count, force) {
	alphabetParticle.splash(position, count, force);
}
