import { GenericState } from '../types.js';
export declare class Parser<T> {
    private parsers;
    toText(value: T): string;
    add(parser: <S extends GenericState>(value: any, state: Partial<S>) => T): void;
    pre(parser: (value: any) => any): void;
    parse<S extends GenericState>(input: string, state: Partial<S>): T;
    required(): this;
}
