import { useLettersQuery } from "@client/hooks/queries/letters.js";
import useProgress from "@client/hooks/sakurator/progress.js";
import { getAlphabetParticleName } from "@client/support/alphabet-particle.js";
import { play } from "@client/support/play.js";
import { WithChildren } from "@client/types/with-children.js";
import { WithState } from "@client/types/with-state.js";
import { APILetter } from "@server/routes/api/letters.js";
import { APIRow } from "@server/routes/api/rows.js";
import shuffled from "@shared/support/arrays/shuffle.js";
import pick from "@shared/support/random/pick.js";
import { later } from "@shared/support/types/later.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

const LessonContext = createContext<Lesson | undefined>(undefined);

export type LessonContextProviderProps = WithChildren<{}>;
export type LessonState = 'introducing letters' | 'learning letters' | 'showing results';

export type Lesson =
    {
        alphabet: string;
        letters: APILetter[];
        goal: number;
        percent: number;
        goalReached: boolean;
        wasCompleted: boolean;
        particle: string;
        needsIntroduction: boolean;
        start: () => void;
        check: (letter: string) => void;
    } &
    WithState<LessonState, 'state'> &
    WithState<number, 'combo'> &
    WithState<number, 'progressPoints'> &
    WithState<boolean, 'flawless'> &
    WithState<APILetter, 'correctLetter'> &
    WithState<APILetter[], 'options'>;


export function useLessonContext(): Lesson {
    const ctx = useContext(LessonContext);
    if (ctx === undefined) {
        throw new Error(`You cannot use \`useLessonContext\` outside the corresponding context.`);
    }

    return ctx;
}

function LessonContextProvider$Initializer({ row, alphabet, letters, children }: WithChildren<{ alphabet: string, row: APIRow, letters: APILetter[] }>) {
    const { points, setPoints, completed } = useProgress(alphabet, row);
    const [needsIntroduction] = useState(() => points === 0);
    const [state, setState] = useState<LessonState>(needsIntroduction ? 'introducing letters' : 'learning letters');
    const [combo, setCombo] = useState<number>(1);
    const [correctLetter, setCorrectLetter] = useState<APILetter>(later());
    const [progressPoints, setProgressPoints] = useState<number>(20);
    const [flawless, setFlawless] = useState<boolean>(true);
    const [wasCompleted] = useState(() => completed);
    const [options, setOptions] = useState<APILetter[]>([]);
    const maxCombo = 9;
    const optionCount = 4;
    const goal = 500;
    const percent = progressPoints / goal * 100;
    const goalReached = percent >= 100;
    const particle = getAlphabetParticleName(alphabet);

    const giveProgressPoints = () => {
        setProgressPoints(_ => Math.min(goal, _ + Math.round(Math.pow(combo, 1.3))));
    };

    const chargeProgressPoints = () => {
        setFlawless(_ => false);
        setProgressPoints(_ => Math.max(0, _ - maxCombo + combo));
    }

    const nextLetter = () => {
        const newOptions = shuffled(letters).slice(0, optionCount);
        setOptions(_ => newOptions);
        setCorrectLetter(_ => {
            let newOption = pick(newOptions);
            while (newOption.name === _?.name) {
                newOption = pick(newOptions);
            }

            return newOption;
        });

    };

    const increaseCombo = () => {
        setCombo(_ => Math.min(maxCombo, _ + 1));
        play(`combo_${combo}`);
    };

    const breakCombo = () => {
        setCombo(_ => 1);
        play(`incorrect`);
    };

    const start = () => {
        play(`game_started`);
        nextLetter();
    };

    const check = (letter: string) => {
        if (letter !== correctLetter?.name) {
            chargeProgressPoints();
            breakCombo();
            return;
        }

        increaseCombo();
        giveProgressPoints();
        nextLetter();
    };

    useEffect(() => {
        if (state === 'learning letters') {
            start();
        }
    }, [state]);

    useEffect(() => {
        if (goalReached) {
            setState(_ => 'showing results');
            setPoints(points + (flawless ? 2 : 1));
        }
    }, [goalReached]);

    if (alphabet === undefined ||
        letters === undefined ||
        row === undefined
    ) {
        return (
            <>Lesson is loading (alphabet = {alphabet}, row = {row}, letters = {letters})</>
        );
    }


    const ctx: Lesson = {
        alphabet,
        letters,
        goal,
        percent,
        goalReached,
        particle,
        wasCompleted,
        needsIntroduction,

        options,
        setOptions,
        state,
        setState,
        combo,
        setCombo,
        progressPoints,
        setProgressPoints,
        flawless,
        setFlawless,
        correctLetter,
        setCorrectLetter,

        start,
        check,
    };

    return (
        <LessonContext.Provider value={ctx}>
            {children}
        </LessonContext.Provider>
    );
}

export function LessonContextProvider({ children }: LessonContextProviderProps) {
    const { alphabet } = useParams();
    const { letters, row } = useLettersQuery();

    if (alphabet === undefined) {
        throw new Error(`Alphabet is not in the parameters`);
    }

    if (letters === undefined || row === undefined) {
        return null;
    }

    return (
        <LessonContextProvider$Initializer {...{ alphabet, letters, row }}>
            {children}
        </LessonContextProvider$Initializer>
    )
}

