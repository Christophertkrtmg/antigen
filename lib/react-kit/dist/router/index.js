"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = exports.Route = exports.defaultRouter = exports.Router = void 0;
var Router_js_1 = require("./Router.js");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return Router_js_1.Router; } });
Object.defineProperty(exports, "defaultRouter", { enumerable: true, get: function () { return Router_js_1.defaultRouter; } });
var Route_js_1 = require("./Route.js");
Object.defineProperty(exports, "Route", { enumerable: true, get: function () { return Route_js_1.Route; } });
__exportStar(require("./hooks.js"), exports);
var Portal_js_1 = require("./Portal.js");
Object.defineProperty(exports, "Portal", { enumerable: true, get: function () { return Portal_js_1.Portal; } });
//# sourceMappingURL=index.js.map