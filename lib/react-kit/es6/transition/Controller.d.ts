import { Reducer, MapState } from './types.js';
export declare class Controller<S, A> {
    private state;
    private prevState;
    private initialState;
    private readonly reducer;
    private running;
    private transitions;
    private stateListeners;
    private readonly queue;
    constructor(initialState: S, reducer: Reducer<S, A>, backLogThreshold?: number);
    registerListener<R>(callback: MapState<S, R>): () => void;
    registerTransition<R>(callback: MapState<S, R>): () => void;
    private transitionEnd;
    setup(transitionAnim: Promise<any>): void;
    dispatch: (action: A) => void;
    reset: () => void;
    private internalDispatch;
    private completeTransition;
    getState: () => S;
    getPrevState: () => S;
}
