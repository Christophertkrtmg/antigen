import React from 'react';
export class Route {
    constructor(component, props) {
        this.component = component;
        this.props = props;
    }
    createElement() {
        return React.createElement(this.component, this.props);
    }
    is(comp) {
        return this.component === comp;
    }
    equals(route) {
        return route && this.component === route.component;
    }
}
//# sourceMappingURL=Route.js.map