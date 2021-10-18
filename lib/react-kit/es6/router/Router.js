import { createContext } from 'react';
import { EffectHandler } from '../EffectHandler.js';
export class Router {
    constructor(mapUrl, stackSize = 32) {
        this.routeStack = [];
        this.recentUrl = null;
        this.childUrl = '';
        this.childListeners = [];
        this.ConfirmTransitions = [];
        this.currentTransition = null;
        this.registerChild = (childRouter) => {
            this.childListeners.push(childRouter);
            childRouter.pushUrl(this.childUrl);
            return () => {
                const index = this.childListeners.findIndex(c => c === childRouter);
                if (index >= 0) {
                    this.childListeners.splice(index, 1);
                }
            };
        };
        this.setChildUrl = (childUrl) => {
            this.childListeners.forEach(c => {
                c.pushUrl(childUrl);
            });
            this.childUrl = childUrl;
        };
        this.getInitialRoute = (parentRouter) => {
            let k = this.get();
            if (k)
                return k;
            const url = parentRouter ? parentRouter.childUrl : this.getRecentUrl();
            if (url) {
                k = this.mapUrl(url, this.setChildUrl);
                this.effect.fire(k);
                return k;
            }
            return null;
        };
        this.update = (route) => {
            if (!route === null) {
                console.warn('Trying to change to an invalid route. This doesn\'t have any effect, but might be a bug on your application');
            }
            this.effect.fire(route);
            this.recentUrl = null;
        };
        this.pop = async () => {
            const previousRoute = this.routeStack.pop();
            await this.updateRoute(previousRoute, this.update);
            return previousRoute;
        };
        this.set = async (route) => {
            this.routeStack.length = 0;
            if (this.get() === route) {
                this.routeStack.length = 0;
                return;
            }
            await this.updateRoute(route, this.update);
        };
        this.push = async (route) => {
            if (this.get() === route)
                return;
            await this.updateRoute(route, (route) => {
                while (this.routeStack.length >= this.stackSize) {
                    this.routeStack.shift();
                }
                this.routeStack.push(this.get());
                this.update(route);
            });
        };
        this.setUrl = async (url) => {
            return this.updateUrl(url, this.set);
        };
        this.pushUrl = async (url) => {
            if ((url || '').startsWith('/') && this.parentRouter) {
                this.parentRouter.pushUrl(url);
            }
            return this.updateUrl(url, this.push);
        };
        this.effect = new EffectHandler();
        this.register = this.effect.register;
        this.get = this.effect.get;
        this.stackSize = stackSize;
        this.mapUrl = mapUrl;
    }
    getRecentUrl() {
        if (this.recentUrl)
            return this.recentUrl;
        if (this.parentRouter)
            return this.parentRouter.getRecentUrl();
        return null;
    }
    async updateRoute(route, op) {
        if (this.currentTransition)
            throw new Error('Another route transition is in progress');
        if (!this.ConfirmTransitions.length) {
            op(route);
            return;
        }
        this.currentTransition = this.ConfirmTransitions;
        return new Promise((resolve, reject) => {
            function complete(handler, err) {
                if (!this.currentTransition)
                    return;
                if (!handler) {
                    this.currentTransition = null;
                    reject(err || new Error('Route transition was cancelled'));
                }
                else {
                    const idx = this.currentTransition.indexof(handler);
                    if (idx >= 0) {
                        this.currentTransition.splice(idx, 1);
                        if (this.currentTransition.length === 0) {
                            this.currentTransition = null;
                            op(route);
                            resolve();
                        }
                    }
                }
            }
            this.ConfirmTransitions.forEach(handler => handler({
                route,
                cancel: (err) => complete(null, err),
                confirm: () => complete(handler),
            }));
        });
    }
    async updateUrl(url, op) {
        let newRoute;
        if (this.mapUrl) {
            newRoute = this.mapUrl(url || '', this.setChildUrl);
            op(newRoute);
        }
        this.recentUrl = url;
        return newRoute;
    }
    registerConfirm(effect) {
        this.ConfirmTransitions = this.ConfirmTransitions.concat(effect);
        return () => {
            this.ConfirmTransitions = this.ConfirmTransitions.filter(k => k !== effect);
        };
    }
}
export const defaultRouter = new Router();
export const RouterContext = createContext(defaultRouter);
//# sourceMappingURL=Router.js.map