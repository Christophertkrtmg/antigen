export class Parser {
    constructor() {
        this.parsers = [];
    }
    toText(value) {
        return value === undefined || value === null ? '' : String(value);
    }
    add(parser) {
        this.parsers.push(parser);
    }
    pre(parser) {
        this.parsers.unshift(parser);
    }
    parse(input, state) {
        return this.parsers.reduce((res, parse) => {
            return parse(res, state);
        }, input);
    }
    required() {
        this.pre((value) => {
            const v = value.trim();
            if (v.length === 0)
                throw new Error('Value is required');
            return v;
        });
        return this;
    }
}
//# sourceMappingURL=Parser.js.map