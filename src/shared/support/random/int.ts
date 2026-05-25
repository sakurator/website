export default function randomInt(min: number, max: number | undefined = undefined): number {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min) + min);
}
