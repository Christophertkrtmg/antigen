import { Parser } from './Parser.js';
export class BooleanParser extends Parser {
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
//# sourceMappingURL=BooleanParser.js.map