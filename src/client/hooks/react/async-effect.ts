import { DependencyList, useEffect } from "react";

type AsyncEffect = (signal: AbortSignal) => Promise<void>;

export default function useAsyncEffect(
    effect: AsyncEffect,
    dependencies: DependencyList,
) {
    useEffect(() => {
        const controller = new AbortController();

        effect(controller.signal);

        return () => {
            controller.abort();
        };
    }, dependencies);
}
