"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalParser = void 0;
const Parser_js_1 = require("./Parser.js");
class DecimalParser extends Parser_js_1.Parser {
    constructor() {
        super();
        this.add((value) => {
            if (!value)
                return null;
            const v = Number(value);
            if (isNaN(v))
                throw new Error('Numeric value is required');
            return v;
        });
    }
    min(min) {
        this.add((value) => {
            if (value < min)
                throw new Error(`Value must be greater than ${min}`);
            return value;
        });
        return this;
    }
    max(max) {
        this.add((value) => {
            if (value > max)
                throw new Error(`Value must be less than ${max}`);
            return value;
        });
        return this;
    }
    range(min, max) {
        this.min(min);
        this.max(max);
        return this;
    }
}
exports.DecimalParser = DecimalParser;
//# sourceMappingURL=DecimalParser.js.map