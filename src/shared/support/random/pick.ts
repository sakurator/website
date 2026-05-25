import randomInt from "@shared/support/random/int.js";

export default function pick<T>(array: T[]): T {
    return array[randomInt(array.length)];
}
