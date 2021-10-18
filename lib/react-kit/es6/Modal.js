import React, { createContext, createElement, useCallback, useContext, useEffect, useRef, useState } from 'react';
const ModalContext = createContext(null);
export const ModalProvider = ({ children = React.Fragment }) => {
    const serialNumber = useRef(0);
    const setModalRef = useRef();
    const createModal = useCallback((component) => {
        const key = `modal-${++serialNumber.current}`;
        const memoisedComponent = React.memo(component);
        function hide() {
            return setModalRef.current(modals => {
                const idx = modals.findIndex(m => m.props.key === key);
                if (idx === -1)
                    return modals;
                return modals.filter(m => m.props.key !== key);
            });
        }
        function show(props = {}) {
            return setModalRef.current(modals => {
                if (modals.length !== 0 && modals[modals.length - 1].props.key === key)
                    return modals;
                const newProps = Object.assign({ key, hide }, props);
                return modals
                    .filter(m => m.props.key !== key)
                    .concat({ component: memoisedComponent, props: newProps });
            });
        }
        return { show, hide };
    }, []);
    return React.createElement(ModalContext.Provider, { value: createModal },
        children,
        React.createElement(ModalState, { modalRef: setModalRef }));
};
function ModalState({ modalRef }) {
    const [modals, setModals] = useState([]);
    modalRef.current = setModals;
    return (React.createElement(React.Fragment, null, modals.map(({ component, props }) => {
        return createElement(component, props);
    })));
}
;
export function useModal(component) {
    const modal = useRef();
    const createModal = useContext(ModalContext);
    if (!modal.current) {
        modal.current = createModal(component);
    }
    useEffect(() => modal.current.hide, []);
    return modal.current;
}
;
//# sourceMappingURL=Modal.js.map