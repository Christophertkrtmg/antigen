"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
const react_1 = require("react");
const Router_js_1 = require("./Router.js");
const hooks_js_1 = require("./hooks.js");
function Portal({ router }) {
    const route = hooks_js_1.useRoute(router);
    if (!route)
        return null;
    return react_1.createElement(Router_js_1.RouterContext.Provider, { value: router }, route.createElement());
}
exports.Portal = Portal;
//# sourceMappingURL=Portal.js.map