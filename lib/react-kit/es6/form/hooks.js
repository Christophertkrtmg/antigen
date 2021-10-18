import { useContext, useState, useEffect, useRef } from 'react';
import { FormController, FormContext } from './FormController.js';
export function useInputError(name) {
    const controller = useContext(FormContext);
    const [error, setError] = useState();
    useEffect(() => {
        return controller.listenError(name, setError);
    }, [name, controller]);
    return error;
}
export function useFormValue(name) {
    const controller = useContext(FormContext);
    return useFormValueOf(controller, name);
}
export function useFormValueOf(controller, name) {
    const [value, setValue] = useState(controller.get(name));
    useEffect(() => {
        return controller.listen(name, setValue);
    }, [controller, name]);
    return value;
}
export function useFormInput(name, extractValue) {
    const controller = useContext(FormContext);
    const [value, setValue] = useState(controller.getInput(name));
    return [value, (newValue) => {
            const k = extractValue ? extractValue(newValue) : newValue;
            controller.setInput(name, k);
            setValue(k);
        }];
}
export function useFormController(def, initialState, action) {
    const parentForm = useContext(FormContext);
    const ref = useRef();
    if (!ref.current) {
        ref.current = new FormController(def, initialState, action, parentForm);
    }
    return ref.current;
}
//# sourceMappingURL=hooks.js.map