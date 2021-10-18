"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegerParser = void 0;
const DecimalParser_js_1 = require("./DecimalParser.js");
class IntegerParser extends DecimalParser_js_1.DecimalParser {
    constructor() {
        super();
        this.add((value) => {
            if (!value)
                return null;
            if (/^[-+]?(\d+)$/.test(value)) {
                return Number(value);
            }
            throw new Error('Value must be a integer number');
        });
    }
}
exports.IntegerParser = IntegerParser;
//# sourceMappingURL=IntegerParser.js.map