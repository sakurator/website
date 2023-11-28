function cookieNameOf(alphabet, letter) {
	return `${alphabet.toLowerCase()}_${letter}`;
}

function petals(alphabet, letter, newPetals = undefined) {
	if (newPetals === undefined) {
		return getPetals(alphabet, letter);
	} else {
		setPetals(alphabet, newPetals, newPetals);
	}
}

function addPetals(alphabet, letter, addingPetals) {
	setPetals(alphabet, letter, getPetals(alphabet, letter) + addingPetals);
}

function setPetals(alphabet, letter, newPetals) {
	setCookie(cookieNameOf(alphabet, letter), newPetals);
}

function getPetals(alphabet, letter) {
	return parseInt(getCookie(cookieNameOf(alphabet, letter), 0));
}
