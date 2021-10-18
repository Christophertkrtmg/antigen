"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouteExit = exports.useRouter = exports.useRoute = void 0;
const react_1 = require("react");
const Router_js_1 = require("./Router.js");
function useRoute(router) {
    const parentRouter = useRouter();
    const isParent = parentRouter === router;
    const [route, setRoute] = react_1.useState(() => router.getInitialRoute(isParent ? null : parentRouter));
    react_1.useEffect(() => {
        const unreg = parentRouter.registerChild(router);
        const regRoute = router.register(setRoute);
        return () => {
            regRoute();
            unreg();
        };
    }, [parentRouter, router]);
    return route;
}
exports.useRoute = useRoute;
function useRouter() {
    return react_1.useContext(Router_js_1.RouterContext);
}
exports.useRouter = useRouter;
function useRouteExit(beforeExit) {
    const router = useRouter();
    react_1.useEffect(router.registerConfirm(beforeExit), [beforeExit]);
}
exports.useRouteExit = useRouteExit;
//# sourceMappingURL=hooks.js.map