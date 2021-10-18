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
exports.createLocale = void 0;
const react_1 = __importStar(require("react"));
const EffectHandler_js_1 = require("./EffectHandler.js");
function createLocale(dictionary) {
    const dictionaryHandler = new EffectHandler_js_1.EffectHandler(dictionary);
    const LanguageContext = react_1.default.createContext(null);
    return {
        get dictionary() {
            return dictionaryHandler.get();
        },
        get: (key) => dictionaryHandler.get()[key],
        format: (key, ...params) => {
            const dictionary = dictionaryHandler.get();
            const str = dictionary[key];
            return str.replace(/{(\d+)}/g, function (match, number) {
                return params[number];
            });
        },
        localize: (language, App) => {
            return (props) => {
                const [value, setLang] = react_1.useState();
                const changeLanguage = react_1.useCallback(async (newLang) => {
                    const newDictionary = await language.set(newLang);
                    dictionaryHandler.fire(Object.assign({}, dictionary, newDictionary));
                    setLang([newLang, changeLanguage]);
                }, []);
                react_1.useEffect(() => {
                    language.get().then(changeLanguage);
                }, []);
                return react_1.default.createElement(LanguageContext.Provider, { value }, react_1.default.createElement(App, props));
            };
        },
        useLanguage: () => {
            return react_1.useContext(LanguageContext);
        },
    };
}
exports.createLocale = createLocale;
//# sourceMappingURL=locale.js.map