import "@sass/components/learn/Introduction.sass";
import { getLetterImagePath } from "@shared/static/letters.js";
import { useLessonContext } from "@client/contexts/learn/lesson.js";
import useAsyncEffect from "@client/hooks/react/async-effect.js";
import { sayLetter } from "@client/support/play.js";
import sleep from "@shared/support/promises/sleep.js";
import { useState } from "react";
import clsx from "clsx";

export default function Introduction() {
    const {
        alphabet,
        letters,
        state,
        setState,
        needsIntroduction,
    } = useLessonContext();

    const [introducingLetter, setIntroducingLetter] = useState<string>('');

    useAsyncEffect(async () => {
        if (!needsIntroduction) {
            return;
        }

        for (const letter of letters) {
            sayLetter(letter.name);
            setIntroducingLetter(letter.name);
            await sleep(3500);
        }

        setState(_ => 'learning letters');
    }, []);

    if (state !== 'introducing letters') {
        return;
    }

    return (
        <div id="introduction-container">
            {
                letters.map(letter => (
                    <div className={clsx("letter-introduction", introducingLetter === letter.name && 'introducing')}>
                        <img className="letter-introduction-image" src={getLetterImagePath(alphabet, letter)} />
                        <span className="letter-introduction-name">{letter.name}</span>
                    </div>
                ))
            }
        </div>
    );
}
