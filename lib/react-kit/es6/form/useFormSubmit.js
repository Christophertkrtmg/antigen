import { useEffect, useContext } from 'react';
import { FormContext } from './FormController.js';
export function useFormSubmit(controller, onResult) {
    useEffect(() => {
        return controller.setResponseHandler(onResult);
    }, [controller, onResult]);
    return controller.submit;
}
export function useFormError(onError) {
    const controller = useContext(FormContext);
    useFormErrorOf(controller, onError);
}
export function useFormErrorOf(controller, onError) {
    useEffect(() => {
        return controller.setErrorHandler(onError);
    }, [controller, onError]);
}
//# sourceMappingURL=useFormSubmit.js.map