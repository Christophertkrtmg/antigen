import { FormController } from './FormController.js';
import { GenericState } from './types.js';
export declare function useFormSubmit<T extends GenericState, R>(controller: FormController<T>, onResult: (result: R) => void): () => Promise<void>;
export declare function useFormError(onError: (err: Error) => void): void;
export declare function useFormErrorOf<T extends GenericState>(controller: FormController<T>, onError: (err: Error) => void): void;
