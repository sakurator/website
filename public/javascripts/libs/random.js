function randomInt(min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	return Math.floor(Math.random() * (max - min) + min);
}

function randomDeviation() {
	return 2 * Math.random() - 1;
}

function pick(array) {
	if (array.length === 0) {
		throw new Error("Cannot pick a random element from an empty array.");
	}

	return array[randomInt(array.length)];
}
