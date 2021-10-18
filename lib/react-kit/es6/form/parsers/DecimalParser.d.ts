import { Parser } from './Parser.js';
export declare class DecimalParser extends Parser<number> {
    constructor();
    min(min: number): this;
    max(max: number): this;
    range(min: number, max: number): this;
}
