import { APIRow } from "@server/routes/api/rows.js";
import getStaticPath from "./static.js";
import { APILetter } from "@server/routes/api/letters.js";

export function getLetterImagePath(alphabet: string, letter: APILetter | string) {
    letter = typeof letter === 'string' ? letter : letter.name;
    return getStaticPath(`images/letters/${alphabet}_${letter}.svg`);
}

export function getRowThumbnailImagePath(alphabet: string, row: APIRow) {
    return getLetterImagePath(alphabet, row.thumbnailKana);
}
