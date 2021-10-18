"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEffectContext = exports.EffectHandler = void 0;
const react_1 = __importStar(require("react"));
class EffectHandler {
    constructor(initialValue) {
        this.listeners = [];
        this.get = () => this.lastValue;
        this.fire = (value) => {
            if (value !== this.lastValue) {
                this.lastValue = value;
                this.listeners.forEach(l => l(value));
                return true;
            }
            return false;
        };
        this.register = (listener) => {
            this.listeners.push(listener);
            return () => {
                const idx = this.listeners.indexOf(listener);
                if (idx >= 0) {
                    this.listeners.splice(idx, 1);
                }
            };
        };
        this.lastValue = initialValue;
    }
}
exports.EffectHandler = EffectHandler;
function createEffectContext(createHandler) {
    const handler = createHandler();
    const context = react_1.default.createContext(handler);
    return {
        useTrigger: () => {
            const handler = react_1.useContext(context);
            return handler.fire;
        },
        useState: () => {
            const handler = react_1.useContext(context);
            const [value, setValue] = react_1.useState(handler.get);
            react_1.useEffect(() => handler.register(setValue), []);
            return [value, handler.fire];
        },
        useValue: () => {
            const handler = react_1.useContext(context);
            const [value, setValue] = react_1.useState(handler.get);
            react_1.useEffect(() => handler.register(setValue), []);
            return value;
        },
        Boundary: (props) => {
            const [handler] = react_1.useState(createHandler);
            return react_1.default.createElement(context.Provider, { value: handler }, props.children);
        }
    };
}
exports.createEffectContext = createEffectContext;
//# sourceMappingURL=EffectHandler.js.map