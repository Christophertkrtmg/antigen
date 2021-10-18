import React from 'react';
import { Controller } from './Controller.js';
import { createTransitionStateHook } from './useTransitionState.js';
import { createTransitionHook } from './useTransition.js';
export function createTransitionLibrary(initialState, reducer) {
    const controller = new Controller(initialState, reducer);
    const useTransitionState = createTransitionStateHook(controller);
    return {
        dispatch: controller.dispatch,
        reset: controller.reset,
        getState: controller.getState,
        useTransitionState: useTransitionState,
        useTransition: createTransitionHook(controller),
        useDispatch: () => controller.dispatch,
        withVisibility: (visibilityCheck) => {
            return (Component) => {
                return (props) => {
                    const visible = useTransitionState(visibilityCheck);
                    if (!visible)
                        return null;
                    return React.createElement(Component, props);
                };
            };
        }
    };
}
//# sourceMappingURL=index.js.map