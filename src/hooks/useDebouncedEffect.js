import { DependencyList, EffectCallback, useEffect } from "react";

export const useDebouncedEffect = (
    effect,
    delay,
    deps
) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
        // using || operator because 
        // if its optional then it can be undefined.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps || []), delay]);
};