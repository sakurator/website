import { getAlphabetParticleName } from "@client/support/alphabet-particle.js";
import { Alphabet } from "@shared/types/alphabet.js";
import { parseAsStringLiteral, useQueryState } from "nuqs";


export default function useAlphabetQueryState() {
    const [alphabet, setAlphabet] = useQueryState<Alphabet>(
        'alphabet',
        parseAsStringLiteral<Alphabet>(['hiragana', 'katakana'])
            .withDefault('hiragana')
            .withOptions({
                clearOnDefault: false,
            }),
    );

    const particle = getAlphabetParticleName(alphabet);
    const switchAlphabet = () => setAlphabet(alphabet === 'hiragana' ? 'katakana' : 'hiragana');
    return { alphabet, switchAlphabet, particle };
}
