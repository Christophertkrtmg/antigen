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
exports.useModal = exports.ModalProvider = void 0;
const react_1 = __importStar(require("react"));
const ModalContext = react_1.createContext(null);
const ModalProvider = ({ children = react_1.default.Fragment }) => {
    const serialNumber = react_1.useRef(0);
    const setModalRef = react_1.useRef();
    const createModal = react_1.useCallback((component) => {
        const key = `modal-${++serialNumber.current}`;
        const memoisedComponent = react_1.default.memo(component);
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
    return react_1.default.createElement(ModalContext.Provider, { value: createModal },
        children,
        react_1.default.createElement(ModalState, { modalRef: setModalRef }));
};
exports.ModalProvider = ModalProvider;
function ModalState({ modalRef }) {
    const [modals, setModals] = react_1.useState([]);
    modalRef.current = setModals;
    return (react_1.default.createElement(react_1.default.Fragment, null, modals.map(({ component, props }) => {
        return react_1.createElement(component, props);
    })));
}
;
function useModal(component) {
    const modal = react_1.useRef();
    const createModal = react_1.useContext(ModalContext);
    if (!modal.current) {
        modal.current = createModal(component);
    }
    react_1.useEffect(() => modal.current.hide, []);
    return modal.current;
}
exports.useModal = useModal;
;
//# sourceMappingURL=Modal.js.map