function play(sound) {
	new Audio("/sounds/" + sound + ".mp3").play();
}

function sayLetter(letter) {
	play(`letters/${letter}`);
}
