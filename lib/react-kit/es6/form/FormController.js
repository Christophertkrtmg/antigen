import React from 'react';
import { TextParser } from './parsers';
function toText(k) {
    if (k === undefined || k === null || Number.isNaN(k))
        return '';
    return String(k);
}
const DefaultDef = {
    parser: new TextParser()
};
export class FormController {
    constructor(def, initialState, action, parent) {
        this.listeners = {};
        this.errorListeners = {};
        this.submitting = false;
        this.submit = async () => {
            if (this.submitting)
                return;
            if (!this.responseHandler) {
                throw new Error('No response handler defined');
            }
            const validationError = Object.keys(this.def).reduce((error, name) => {
                const inp = this.inputs[name];
                return this.setInput(name, inp === undefined ? toText(this.state[name]) : inp) || error;
            }, null);
            if (validationError) {
                this.errorHandler(new Error('Validation Error. Please check your input value(s).'));
                return;
            }
            try {
                this.submitting = true;
                const res = await fetch(this.action, {
                    method: 'POST',
                    headers: {
                        "content-type": 'application/json',
                    },
                    body: JSON.stringify(this.state),
                });
                if (res.status === 500) {
                    const response = await res.json();
                    throw new Error(response.message);
                }
                else if (res.status === 200) {
                    const response = await res.json();
                    this.responseHandler(response);
                }
                else {
                    throw new Error(res.statusText);
                }
            }
            catch (err) {
                if (this.errorHandler) {
                    this.errorHandler(err);
                }
            }
            finally {
                this.submitting = false;
            }
        };
        this.def = def;
        this.state = initialState || {};
        this.action = action;
        this.parent = parent;
        this.inputs = {};
        this.errorHandler = parent && parent.errorHandler;
    }
    getState() { return this.state; }
    setResponseHandler(handler) {
        this.responseHandler = handler;
        return () => {
            this.responseHandler = null;
        };
    }
    setErrorHandler(handler) {
        this.errorHandler = handler;
        return () => {
            this.errorHandler = this.parent ? this.parent.errorHandler : null;
        };
    }
    get(name, defaultValue) {
        const res = this.state[name];
        return (res === undefined) ? defaultValue : res;
    }
    set(name, newValue) {
        if (newValue === this.state[name])
            return;
        this.state = Object.assign({}, this.state, { [name]: newValue });
        const listeners = this.listeners[name];
        if (listeners)
            listeners.forEach(l => l(newValue));
    }
    getInput(name) {
        const k = this.inputs[name];
        if (k === undefined) {
            const def = this.def[name];
            return def ? def.parser.toText(this.state[name]) : toText(this.state[name]);
        }
        return k;
    }
    setInput(name, newValue) {
        this.inputs[name] = newValue;
        const { parser } = this.def[name] || DefaultDef;
        const list = this.errorListeners[name];
        let error = null;
        try {
            const k = parser.parse(newValue, this.getState());
            this.set(name, k);
        }
        catch (err) {
            error = err;
        }
        if (list)
            list.forEach(listener => listener(error));
        return error;
    }
    register(target, name, listener) {
        let list = target[name];
        if (!list) {
            list = [];
            target[name] = list;
        }
        list.push(listener);
        return () => {
            const idx = list.indexOf(listener);
            list.splice(idx, 1);
            if (list.length === 0) {
                delete this.listeners[name];
            }
        };
    }
    listenError(name, listener) {
        return this.register(this.errorListeners, name, listener);
    }
    listen(name, listener) {
        return this.register(this.listeners, name, listener);
    }
}
export const FormContext = React.createContext(new FormController({}));
export function Form({ controller, children }) {
    return (React.createElement(FormContext.Provider, { value: controller }, children));
}
//# sourceMappingURL=FormController.js.map