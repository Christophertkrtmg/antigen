import { useState, useEffect, useContext } from 'react';
import { RouterContext } from './Router.js';
export function useRoute(router) {
    const parentRouter = useRouter();
    const isParent = parentRouter === router;
    const [route, setRoute] = useState(() => router.getInitialRoute(isParent ? null : parentRouter));
    useEffect(() => {
        const unreg = parentRouter.registerChild(router);
        const regRoute = router.register(setRoute);
        return () => {
            regRoute();
            unreg();
        };
    }, [parentRouter, router]);
    return route;
}
export function useRouter() {
    return useContext(RouterContext);
}
export function useRouteExit(beforeExit) {
    const router = useRouter();
    useEffect(router.registerConfirm(beforeExit), [beforeExit]);
}
//# sourceMappingURL=hooks.js.map