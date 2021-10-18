"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanParser = void 0;
const Parser_js_1 = require("./Parser.js");
class BooleanParser extends Parser_js_1.Parser {
    constructor() {
        super();
        this.add((value) => {
            const lowered = value.trim().toLowerCase();
            if (!lowered || lowered === 'n' || lowered === 'no' || lowered === 'false')
                return false;
            return true;
        });
    }
}
exports.BooleanParser = BooleanParser;
//# sourceMappingURL=BooleanParser.js.map