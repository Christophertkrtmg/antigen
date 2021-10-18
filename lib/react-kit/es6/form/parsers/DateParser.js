import { Parser } from "./Parser.js";
function parseDate(dateStr) {
    const parts = dateStr.split('-', 3);
    const [year, month, date] = parts.map(p => parseInt(p));
    if (!year || !month || !date)
        return NaN;
    return new Date(year, month - 1, date).getTime();
}
function zeroPad(num) {
    if (num < 10)
        return `0${num}`;
    return `${num}`;
}
export class DateParser extends Parser {
    toText(value) {
        if (!value)
            return '';
        const date = new Date(Number(value));
        if (Number.isNaN(date.getTime()))
            return '';
        return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
    }
    constructor() {
        super();
        this.add((value) => {
            if (!value)
                return null;
            const ts = parseDate(value);
            if (Number.isNaN(ts))
                throw new Error('Invalid date');
            return ts;
        });
    }
}
//# sourceMappingURL=DateParser.js.map