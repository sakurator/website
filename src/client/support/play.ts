import getStaticPath from "@shared/static/static.js";

export function play(sound: string): void {
    const path = getStaticPath(`sounds/${sound}.mp3`);
    new Audio(path).play();
}

export function sayLetter(letter: string): void {
    play(`letters/${letter}`);
}
