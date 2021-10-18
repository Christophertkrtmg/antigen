"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransitionLibrary = void 0;
const react_1 = __importDefault(require("react"));
const Controller_js_1 = require("./Controller.js");
const useTransitionState_js_1 = require("./useTransitionState.js");
const useTransition_js_1 = require("./useTransition.js");
function createTransitionLibrary(initialState, reducer) {
    const controller = new Controller_js_1.Controller(initialState, reducer);
    const useTransitionState = useTransitionState_js_1.createTransitionStateHook(controller);
    return {
        dispatch: controller.dispatch,
        reset: controller.reset,
        getState: controller.getState,
        useTransitionState: useTransitionState,
        useTransition: useTransition_js_1.createTransitionHook(controller),
        useDispatch: () => controller.dispatch,
        withVisibility: (visibilityCheck) => {
            return (Component) => {
                return (props) => {
                    const visible = useTransitionState(visibilityCheck);
                    if (!visible)
                        return null;
                    return react_1.default.createElement(Component, props);
                };
            };
        }
    };
}
exports.createTransitionLibrary = createTransitionLibrary;
//# sourceMappingURL=index.js.map