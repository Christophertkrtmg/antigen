import React, { ReactNode } from "react";
export declare class EffectHandler<T> {
    private listeners;
    private lastValue?;
    constructor(initialValue?: T);
    get: () => T;
    fire: (value: T) => boolean;
    register: (listener: (newValue: T) => void) => () => void;
}
declare type Props = {
    children: ReactNode | Array<ReactNode>;
};
export declare function createEffectContext<T>(createHandler: () => EffectHandler<T>): {
    useTrigger: () => (value: T) => boolean;
    useState: () => (T | ((value: T) => boolean))[];
    useValue: () => T;
    Boundary: (props: Props) => React.FunctionComponentElement<React.ProviderProps<EffectHandler<T>>>;
};
export {};
