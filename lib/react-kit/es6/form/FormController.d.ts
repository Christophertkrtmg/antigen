import React from 'react';
import { GenericState, FormDefinition } from './types.js';
export declare class FormController<T extends GenericState> {
    private state;
    private inputs;
    private def;
    private listeners;
    private errorListeners;
    private action;
    private parent;
    private submitting;
    private responseHandler;
    private errorHandler;
    constructor(def: FormDefinition<T>, initialState?: Partial<T>, action?: string, parent?: FormController<any>);
    getState(): Partial<T>;
    submit: () => Promise<void>;
    setResponseHandler(handler: Function): () => void;
    setErrorHandler(handler: (err: Error) => void): () => void;
    get<K extends keyof T>(name: K, defaultValue?: T[K]): T[K] | undefined;
    set<K extends keyof T>(name: K, newValue: T[K]): void;
    getInput<K extends keyof T>(name: K): string;
    setInput<K extends keyof T>(name: K, newValue: string): Error;
    private register;
    listenError(name: keyof T, listener: (err: Error) => void): () => void;
    listen<K extends keyof T>(name: K, listener: (value: T[K]) => void): () => void;
}
export declare const FormContext: React.Context<FormController<any>>;
declare type Props<T extends GenericState> = {
    controller: FormController<T>;
    children: React.ReactNode;
};
export declare function Form<T extends GenericState>({ controller, children }: Props<T>): JSX.Element;
export {};
