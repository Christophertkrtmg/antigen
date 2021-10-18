import { useState, useEffect } from 'react';
export function createTransitionStateHook(controller) {
    return function useTransitionState(mapState) {
        const [result, setResult] = useState(() => mapState(controller.getState(), controller.getPrevState(), undefined));
        useEffect(() => {
            let prev = result;
            function cb(state, prevState) {
                const k = mapState(state, prevState, prev);
                if (k === undefined) {
                    console.log('Nothing returned from mapState of useTransitionState.');
                }
                if (k === prev)
                    return;
                prev = k;
                setResult(k);
            }
            return controller.registerListener(cb);
        }, [mapState]);
        return result;
    };
}
//# sourceMappingURL=useTransitionState.js.map