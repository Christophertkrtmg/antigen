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
exports.FormController = exports.Form = void 0;
__exportStar(require("./hooks.js"), exports);
var FormController_js_1 = require("./FormController.js");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return FormController_js_1.Form; } });
Object.defineProperty(exports, "FormController", { enumerable: true, get: function () { return FormController_js_1.FormController; } });
__exportStar(require("./parsers"), exports);
__exportStar(require("./useFormSubmit.js"), exports);
//# sourceMappingURL=index.js.map