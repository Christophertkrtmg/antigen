/// <reference types="react" />
import { EffectHandler } from '../EffectHandler.js';
import { Route } from './Route.js';
declare type Transition = {
    confirm: () => void;
    cancel: () => void;
    route: Route;
};
export declare type ConfirmTransition = (transition: Transition) => void;
declare type UrlMapper = (url: string, cb: (url: string) => void) => Route | null;
export declare class Router {
    private readonly effect;
    readonly register: EffectHandler<Route>['register'];
    readonly get: EffectHandler<Route>['get'];
    private readonly routeStack;
    private readonly stackSize;
    private readonly mapUrl?;
    private parentRouter;
    private recentUrl;
    private childUrl;
    private childListeners;
    private ConfirmTransitions;
    private currentTransition;
    constructor(mapUrl?: UrlMapper, stackSize?: number);
    private getRecentUrl;
    registerChild: (childRouter: Router) => () => void;
    setChildUrl: (childUrl: string) => void;
    getInitialRoute: (parentRouter: null | Router) => Route<any>;
    private update;
    pop: () => Promise<Route>;
    set: <T>(route: Route<T>) => Promise<void>;
    push: (route: Route) => Promise<void>;
    private updateRoute;
    setUrl: (url: string | null) => Promise<Route>;
    pushUrl: (url: string | null) => Promise<Route>;
    private updateUrl;
    registerConfirm(effect: ConfirmTransition): () => void;
}
export declare const defaultRouter: Router;
export declare const RouterContext: import("react").Context<Router>;
export {};
