import { useEffect, useRef } from 'react';
export function createTransitionHook(controller) {
    return function useTransition(mapState, transition) {
        const ref = useRef();
        if (!ref.current) {
            ref.current = { transition };
        }
        else {
            ref.current.transition = transition;
        }
        useEffect(() => {
            function callback(state, prevState) {
                const next = mapState(state, prevState);
                if (next === ref.current.value)
                    return;
                ref.current.value = next;
                const transitionAnim = ref.current.transition(next);
                if (transitionAnim) {
                    controller.setup(transitionAnim);
                }
            }
            callback(controller.getState(), controller.getPrevState());
            return controller.registerTransition(callback);
        }, [mapState]);
    };
}
//# sourceMappingURL=useTransition.js.map