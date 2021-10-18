import React, { useState, useContext, useEffect, useCallback } from 'react';
import { EffectHandler } from './EffectHandler.js';
export function createLocale(dictionary) {
    const dictionaryHandler = new EffectHandler(dictionary);
    const LanguageContext = React.createContext(null);
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
                const [value, setLang] = useState();
                const changeLanguage = useCallback(async (newLang) => {
                    const newDictionary = await language.set(newLang);
                    dictionaryHandler.fire(Object.assign({}, dictionary, newDictionary));
                    setLang([newLang, changeLanguage]);
                }, []);
                useEffect(() => {
                    language.get().then(changeLanguage);
                }, []);
                return React.createElement(LanguageContext.Provider, { value }, React.createElement(App, props));
            };
        },
        useLanguage: () => {
            return useContext(LanguageContext);
        },
    };
}
//# sourceMappingURL=locale.js.map