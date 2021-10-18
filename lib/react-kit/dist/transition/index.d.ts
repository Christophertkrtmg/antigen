import React, { ComponentType } from 'react';
import { Reducer, MapState } from './types.js';
export declare function createTransitionLibrary<S, A>(initialState: S, reducer: Reducer<S, A>): {
    dispatch: (action: A) => void;
    reset: () => void;
    getState: () => S;
    useTransitionState: <R>(mapState: (state: S, prevState: S, prevValue: R) => R) => R;
    useTransition: <R_1>(mapState: MapState<S, R_1>, transition: (param: R_1) => Promise<any>) => void;
    useDispatch: () => (action: A) => void;
    withVisibility: (visibilityCheck: MapState<S, boolean>) => <P = {}>(Component: React.ComponentType<P>) => (props: P) => React.ReactElement<P, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
};
