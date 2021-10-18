import React, { Dispatch } from 'react';
declare type Dictionary = {
    [name: string]: string;
};
declare type S = [string, Dispatch<string>];
interface Language<T extends Dictionary> {
    get: () => Promise<string>;
    set: (language: string) => Promise<T>;
}
export declare function createLocale<T extends Dictionary>(dictionary: T): {
    readonly dictionary: T;
    get: (key: keyof T) => T[keyof T];
    format: (key: keyof T, ...params: any[0]) => string;
    localize: <P extends {}>(language: Language<T>, App: React.FC<P>) => (props: P) => React.FunctionComponentElement<React.ProviderProps<S>>;
    useLanguage: () => S;
};
export {};
