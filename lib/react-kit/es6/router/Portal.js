import { createElement } from 'react';
import { RouterContext } from './Router.js';
import { useRoute } from './hooks.js';
export function Portal({ router }) {
    const route = useRoute(router);
    if (!route)
        return null;
    return createElement(RouterContext.Provider, { value: router }, route.createElement());
}
//# sourceMappingURL=Portal.js.map