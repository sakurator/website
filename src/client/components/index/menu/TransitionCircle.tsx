import { useTransitonCircleContext } from "@client/contexts/index/transition-circle.js";
import useAlphabetQueryState from "@client/hooks/query-states/alphabet.js";
import clsx from "clsx";
import "@sass/components/index/menu/TransitionCircle.sass";

export default function TransitionCircle() {
    const { x, y, expanding } = useTransitonCircleContext();
    const { alphabet } = useAlphabetQueryState();

    return (
        <div
            className={clsx("transition-circle", expanding && 'expanding', alphabet)}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        />
    );
}
