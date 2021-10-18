import { Controller } from './Controller.js';
import { MapState } from './types.js';
export declare function createTransitionHook<S, A>(controller: Controller<S, A>): <R>(mapState: MapState<S, R>, transition: (param: R) => Promise<any>) => void;
