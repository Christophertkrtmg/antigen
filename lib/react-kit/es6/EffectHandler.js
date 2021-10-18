import React, { useContext, useEffect, useState } from "react";
export class EffectHandler {
    constructor(initialValue) {
        this.listeners = [];
        this.get = () => this.lastValue;
        this.fire = (value) => {
            if (value !== this.lastValue) {
                this.lastValue = value;
                this.listeners.forEach(l => l(value));
                return true;
            }
            return false;
        };
        this.register = (listener) => {
            this.listeners.push(listener);
            return () => {
                const idx = this.listeners.indexOf(listener);
                if (idx >= 0) {
                    this.listeners.splice(idx, 1);
                }
            };
        };
        this.lastValue = initialValue;
    }
}
export function createEffectContext(createHandler) {
    const handler = createHandler();
    const context = React.createContext(handler);
    return {
        useTrigger: () => {
            const handler = useContext(context);
            return handler.fire;
        },
        useState: () => {
            const handler = useContext(context);
            const [value, setValue] = useState(handler.get);
            useEffect(() => handler.register(setValue), []);
            return [value, handler.fire];
        },
        useValue: () => {
            const handler = useContext(context);
            const [value, setValue] = useState(handler.get);
            useEffect(() => handler.register(setValue), []);
            return value;
        },
        Boundary: (props) => {
            const [handler] = useState(createHandler);
            return React.createElement(context.Provider, { value: handler }, props.children);
        }
    };
}
//# sourceMappingURL=EffectHandler.js.map