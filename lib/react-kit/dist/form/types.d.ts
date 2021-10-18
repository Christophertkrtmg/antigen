import { Parser } from "./parsers/index.js";
export declare type GenericState = {
    [name: string]: any;
};
export declare type FormDefinition<T extends GenericState> = {
    [K in keyof T]?: {
        parser: Parser<any>;
    };
};
