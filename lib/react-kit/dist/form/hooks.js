"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormController = exports.useFormInput = exports.useFormValueOf = exports.useFormValue = exports.useInputError = void 0;
const react_1 = require("react");
const FormController_js_1 = require("./FormController.js");
function useInputError(name) {
    const controller = react_1.useContext(FormController_js_1.FormContext);
    const [error, setError] = react_1.useState();
    react_1.useEffect(() => {
        return controller.listenError(name, setError);
    }, [name, controller]);
    return error;
}
exports.useInputError = useInputError;
function useFormValue(name) {
    const controller = react_1.useContext(FormController_js_1.FormContext);
    return useFormValueOf(controller, name);
}
exports.useFormValue = useFormValue;
function useFormValueOf(controller, name) {
    const [value, setValue] = react_1.useState(controller.get(name));
    react_1.useEffect(() => {
        return controller.listen(name, setValue);
    }, [controller, name]);
    return value;
}
exports.useFormValueOf = useFormValueOf;
function useFormInput(name, extractValue) {
    const controller = react_1.useContext(FormController_js_1.FormContext);
    const [value, setValue] = react_1.useState(controller.getInput(name));
    return [value, (newValue) => {
            const k = extractValue ? extractValue(newValue) : newValue;
            controller.setInput(name, k);
            setValue(k);
        }];
}
exports.useFormInput = useFormInput;
function useFormController(def, initialState, action) {
    const parentForm = react_1.useContext(FormController_js_1.FormContext);
    const ref = react_1.useRef();
    if (!ref.current) {
        ref.current = new FormController_js_1.FormController(def, initialState, action, parentForm);
    }
    return ref.current;
}
exports.useFormController = useFormController;
//# sourceMappingURL=hooks.js.map