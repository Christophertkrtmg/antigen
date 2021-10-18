import React from 'react';
declare type Component<P extends {}> = React.FunctionComponent<P>;
declare type Modal<P extends {}> = {
    show: (props?: Omit<P, "hide">) => void;
    hide: () => void;
};
declare type ModalProps<K extends {}> = K & {
    hide: () => void;
};
declare type ModalProviderPropsType = {
    children: React.ReactNode;
};
export declare const ModalProvider: React.FC<ModalProviderPropsType>;
export declare function useModal<P extends {}>(component: Component<ModalProps<P>>): Modal<P>;
export {};
