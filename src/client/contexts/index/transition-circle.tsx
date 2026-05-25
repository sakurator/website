import { WithChildren } from "@client/types/with-children.js";
import { createContext, useContext, useState } from "react";

const TransitionCircleContext = createContext<TransitionCircle | undefined>(undefined);
export type TransitionCircleContextProviderProps = WithChildren<{}>;
export type TransitionCircle = {
    transitAt: (x: number, y: number) => void;
    x: number;
    y: number;
    expanding: boolean;
};


export function TransitionCircleContextProvider({ children }: TransitionCircleContextProviderProps) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [expanding, setExpanding] = useState(false);
    const transitAt = (x: number, y: number): void => {
        setX(_ => x);
        setY(_ => y);
        setExpanding(_ => true);
    }

    return (
        <TransitionCircleContext.Provider value={{ x, y, expanding, transitAt }}>
            {children}
        </TransitionCircleContext.Provider>
    );
}

export function useTransitonCircleContext(): TransitionCircle {
    const ctx = useContext(TransitionCircleContext);
    if (ctx === undefined) {
        throw new Error(`You cannot use \`useTransitionCircleContext\` outside the corresponding context.`);
    }

    return ctx;
}
