export declare type Reducer<S, A> = (state: S, action: A | Array<A>) => S;
export declare type TransitionResult = {
    start: (onComplete: () => void) => void;
};
export declare type Transition<V, R> = (driver: V, toValue: R) => TransitionResult;
export declare type MapState<S, R> = (state: S, prevState: S) => R;
