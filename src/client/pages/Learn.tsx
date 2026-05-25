import Game from "@client/components/learn/Game.js";
import GameResult from "@client/components/learn/GameResult.js";
import Introduction from "@client/components/learn/Introduction.js";
import PreloadAudios from "@client/components/PreloadAudios.js";
import { LessonContextProvider } from "@client/contexts/learn/lesson.js";
import { useLettersQuery } from "@client/hooks/queries/letters.js";

export default function Learn() {
    const { letters } = useLettersQuery();

    return (
        <>
            <LessonContextProvider>
                <PreloadAudios audioNames={[
                    'click',
                    'hover',
                    'exit',
                    'game_started',
                    'incorrect',
                    'result_completed',
                    'result_no_mistakes',
                    'level_completed',
                    'level_completed_perfectly',
                    ...Array.from({ length: 9 }, (_, i) => i + 1).map(i => "combo_" + i),
                    ...(letters ?? []).map(letter => "letters/" + letter.name)
                ]} />

                <Introduction />
                <Game />
                <GameResult />
            </LessonContextProvider>
        </>
    );
}
