import { Parser } from './Parser.js';
export declare class TextParser extends Parser<string> {
    minLength(n: number): this;
    maxLength(n: number): this;
}
