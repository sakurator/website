import { useLessonContext } from "@client/contexts/learn/lesson.js";
import "@sass/components/learn/Game.sass";
import getIconPath from "@shared/static/icons.js";
import { getLetterImagePath } from "@shared/static/letters.js";
import clsx from "clsx";
import { play } from "@client/support/play.js";
import useAsyncEffect from "@client/hooks/react/async-effect.js";

export default function Game() {
    const {
        alphabet,
        options,
        correctLetter,
        check,
        percent,
        state,
        goalReached,
    } = useLessonContext();

    useAsyncEffect(async () => {
        if (!goalReached) {
            return;
        }
    }, [goalReached]);

    if (state !== 'learning letters') {
        return null;
    }

    return (
        <div id="game-container">
            <div id="game-column-container">
                <div id="game-progress-bar-container">
                    <img id="exit-button" src={getIconPath('exit')} />

                    <div id="game-progress-bar">
                        <div id="game-progress-bar-full">
                            <div
                                id="game-progress-bar-completed"
                                className={alphabet}
                                style={{
                                    width: `${percent}%`
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div id="game-panels">
                    {
                        correctLetter &&
                        <img id="kana-image" src={getLetterImagePath(alphabet, correctLetter)} />
                    }

                    <div id="options">
                        {options.map(option => (
                            <span
                                key={option.name}
                                className={clsx("option", alphabet)}
                                onMouseEnter={() => play(`hover`)}
                                onClick={() => check(option.name)}
                            >
                                {option.name}
                            </span>
                        ))}
                    </div>
                </div>

                <span id="title">Select the sound this kana makes</span>
            </div>
        </div>
    );
}
