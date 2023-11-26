const PETAL_PARTICLE_VARIATIONS = 5;
const MIN_PETAL_SIZE = 20;
const MAX_PETAL_SIZE = 30;
const PETAL_LIFETIME_MILLISECONDS = 4500;
const GRAVITY_VECTOR = { x: 0.09, y: 0.2 };

function createPetal(initialLocation, initialVelocity, particleName = "petal") {
	let petalElement = document.createElement("img");
	petalElement.src =
		`/images/particles/${particleName}_` +
		Math.ceil(Math.random() * PETAL_PARTICLE_VARIATIONS) +
		".svg";
	petalElement.id = particleName + "_" + Math.round(Math.random() * 100000);
	petalElement.classList.add("petal");
	petalElement.style.width =
		Math.random() * (MAX_PETAL_SIZE - MIN_PETAL_SIZE) +
		MIN_PETAL_SIZE +
		"px";

	var petal = {
		bornAt: Date.now(),
		element: petalElement,
		velocity: {
			x: (Math.random() * 2 - 1) * initialVelocity,
			y: (Math.random() * 2 - 1) * initialVelocity,
		},
		location: { ...initialLocation },
		loop: function () {
			petal.velocity.x += GRAVITY_VECTOR.x;

			petal.velocity.y +=
				GRAVITY_VECTOR.y / (petal.velocity.y > 0 ? 4 : 1);

			petal.location.x += petal.velocity.x;
			petal.location.y += petal.velocity.y;

			petal.element.style.left = petal.location.x + "px";
			petal.element.style.top = petal.location.y + "px";

			if (petal.bornAt <= Date.now() - PETAL_LIFETIME_MILLISECONDS) {
				petal.destroy();
			}
		},

		startFalling: function () {
			petal.intervalID = setInterval(petal.loop, 1000 / 60);
		},

		destroy: function () {
			clearInterval(petal.intervalID);
			petal.element.remove();
		},
	};

	petal.startFalling();
	document.body.appendChild(petal.element);

	return petal;
}
