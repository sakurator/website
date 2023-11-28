function createRandomScreenPosition() {
	return {
		x: window.innerWidth * Math.random(),
		y: window.innerHeight * Math.random(),
	};
}

function createCenterPosition() {
	return {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	}
}