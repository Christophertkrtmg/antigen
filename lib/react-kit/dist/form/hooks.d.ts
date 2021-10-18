import { FormController } from './FormController.js';
import { GenericState, FormDefinition } from './types.js';
export declare function useInputError(name: string): undefined | Error;
export declare function useFormValue<T extends GenericState>(name: keyof T): T[keyof T];
export declare function useFormValueOf<T extends GenericState>(controller: FormController<T>, name: keyof T): T[keyof T];
export declare function useFormInput<E = string>(name: string, extractValue?: (evt: E) => string): [string, (evt: E) => void];
export declare function useFormController<T extends GenericState>(def: FormDefinition<T>, initialState?: Partial<T>, action?: string): FormController<T>;
