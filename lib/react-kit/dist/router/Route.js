"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const react_1 = __importDefault(require("react"));
class Route {
    constructor(component, props) {
        this.component = component;
        this.props = props;
    }
    createElement() {
        return react_1.default.createElement(this.component, this.props);
    }
    is(comp) {
        return this.component === comp;
    }
    equals(route) {
        return route && this.component === route.component;
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map