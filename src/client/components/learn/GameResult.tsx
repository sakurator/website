import { useLessonContext } from "@client/contexts/learn/lesson.js";
import getParticlePath from "@shared/static/particles.js";
import "@sass/components/learn/GameResult.sass";
import useAsyncEffect from "@client/hooks/react/async-effect.js";
import clsx from "clsx";
import { useState } from "react";
import sleep from "@shared/support/promises/sleep.js";
import { play } from "@client/support/play.js";
import { useNavigate } from "react-router";

export default function GameResult() {
    const navigate = useNavigate();

    const {
        particle,
        state,
        goalReached,
        flawless,
    } = useLessonContext();

    const [completedShown, setCompletedShown] = useState<boolean>(false);
    const [flawlessShown, setFlawlessShown] = useState<boolean>(false);

    useAsyncEffect(async () => {
        if (!goalReached) {
            return;
        }

        play(`level_completed${flawless ? "_perfectly" : ""}`);
        await sleep(1000);

        setCompletedShown(_ => true);
        await sleep(640);
        play("result_completed");

        await sleep(960);
        setCompletedShown(_ => false);

        if (flawless) {
            setFlawlessShown(_ => true);
            await sleep(640);
            play("result_no_mistakes");

            await sleep(960);
            setFlawlessShown(_ => false);
        }

        navigate('/');
    }, [goalReached]);

    if (state !== 'showing results') {
        return;
    }

    return (
        <div id="game-results-container">
            <div className={clsx("game-result", completedShown && "shown")} id="game-result-completed">
                <img className="petals-earned-icon" src={getParticlePath(particle, 1)} />
                <p className="petals-earned-for">Lesson completed</p>
            </div>

            <div className={clsx("game-result", flawlessShown && "shown")} id="game-result-no-mistakes">
                <img className="petals-earned-icon" src={getParticlePath(particle, 2)} />
                <p className="petals-earned-for">No mistakes</p>
            </div>
        </div>
    );
}
