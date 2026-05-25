import { APIRow } from "@server/routes/api/rows.js";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function useProgress(alphabet: string, { letter, petalsToComplete }: APIRow) {
    const key = `${alphabet}_${letter}`;

    const [points, setPointsState] = useState(() => {
        const raw = Cookies.get(key);
        return raw === undefined ? 0 : parseInt(raw);
    });

    useEffect((): void => {
        const raw = Cookies.get(key);
        setPointsState(raw === undefined ? 0 : parseInt(raw));
    }, [key]);

    const setPoints = (value: number): void => {
        Cookies.set(key, value.toString());
        setPointsState(value);
    };

    const completed: boolean = points > petalsToComplete;

    const reset = () => {
        Cookies.remove(key);
        setPointsState(0);
    };

    return { points, setPoints, reset, completed };
}
