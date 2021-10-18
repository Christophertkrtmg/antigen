"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextParser = void 0;
const Parser_js_1 = require("./Parser.js");
class TextParser extends Parser_js_1.Parser {
    minLength(n) {
        this.add((value) => {
            const v = value.trim();
            if (v.length < n)
                throw new Error(`At least ${n} characters are required`);
            return v;
        });
        return this;
    }
    maxLength(n) {
        this.add((value) => {
            const v = value.trim();
            if (v.length > n)
                throw new Error(`No more than ${n} characters allowed`);
            return v;
        });
        return this;
    }
}
exports.TextParser = TextParser;
//# sourceMappingURL=TextParser.js.map