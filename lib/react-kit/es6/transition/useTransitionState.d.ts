import { Controller } from './Controller.js';
export declare function createTransitionStateHook<S, A>(controller: Controller<S, A>): <R>(mapState: (state: S, prevState: S, prevValue: R) => R) => R;
