"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransitionHook = void 0;
const react_1 = require("react");
function createTransitionHook(controller) {
    return function useTransition(mapState, transition) {
        const ref = react_1.useRef();
        if (!ref.current) {
            ref.current = { transition };
        }
        else {
            ref.current.transition = transition;
        }
        react_1.useEffect(() => {
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
exports.createTransitionHook = createTransitionHook;
//# sourceMappingURL=useTransition.js.map