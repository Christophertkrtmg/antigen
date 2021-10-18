import React from 'react';
declare type Component<P extends {}> = React.FC<P>;
export declare class Route<P extends {} = any> {
    private readonly component;
    private readonly props?;
    constructor(component: Component<P>, props?: P);
    createElement(): React.FunctionComponentElement<P>;
    is(comp: Component<P>): boolean;
    equals(route: Route): boolean;
}
export {};
