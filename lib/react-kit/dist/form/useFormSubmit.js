"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormErrorOf = exports.useFormError = exports.useFormSubmit = void 0;
const react_1 = require("react");
const FormController_js_1 = require("./FormController.js");
function useFormSubmit(controller, onResult) {
    react_1.useEffect(() => {
        return controller.setResponseHandler(onResult);
    }, [controller, onResult]);
    return controller.submit;
}
exports.useFormSubmit = useFormSubmit;
function useFormError(onError) {
    const controller = react_1.useContext(FormController_js_1.FormContext);
    useFormErrorOf(controller, onError);
}
exports.useFormError = useFormError;
function useFormErrorOf(controller, onError) {
    react_1.useEffect(() => {
        return controller.setErrorHandler(onError);
    }, [controller, onError]);
}
exports.useFormErrorOf = useFormErrorOf;
//# sourceMappingURL=useFormSubmit.js.map