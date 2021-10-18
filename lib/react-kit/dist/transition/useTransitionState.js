"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransitionStateHook = void 0;
const react_1 = require("react");
function createTransitionStateHook(controller) {
    return function useTransitionState(mapState) {
        const [result, setResult] = react_1.useState(() => mapState(controller.getState(), controller.getPrevState(), undefined));
        react_1.useEffect(() => {
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
exports.createTransitionStateHook = createTransitionStateHook;
//# sourceMappingURL=useTransitionState.js.map