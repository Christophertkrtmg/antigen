const ResetToken = {};
export class Controller {
    constructor(initialState, reducer, backLogThreshold = 5) {
        this.running = 0;
        this.transitions = [];
        this.stateListeners = [];
        this.queue = [];
        this.transitionEnd = () => {
            this.running -= 1;
            if (this.running === 0) {
                this.completeTransition();
            }
        };
        this.dispatch = (action) => {
            if (this.running > 0) {
                this.queue.push(action);
                return;
            }
            this.internalDispatch(action);
        };
        this.reset = () => {
            this.dispatch(ResetToken);
        };
        this.getState = () => {
            return this.state;
        };
        this.getPrevState = () => {
            return this.prevState;
        };
        this.initialState = initialState;
        this.state = initialState;
        this.prevState = initialState;
        this.reducer = reducer;
    }
    registerListener(callback) {
        this.stateListeners.push(callback);
        return () => {
            const idx = this.stateListeners.indexOf(callback);
            if (idx >= 0) {
                this.stateListeners.splice(idx, 1);
            }
        };
    }
    registerTransition(callback) {
        this.transitions.push(callback);
        return () => {
            const idx = this.transitions.indexOf(callback);
            if (idx >= 0) {
                this.transitions.splice(idx, 1);
            }
        };
    }
    setup(transitionAnim) {
        this.running += 1;
        transitionAnim.then(this.transitionEnd);
        transitionAnim.catch(this.transitionEnd);
    }
    internalDispatch(action) {
        const nextState = action === ResetToken
            ? this.initialState
            : this.reducer(this.state, action);
        if (nextState === this.state) {
            return;
        }
        this.prevState = this.state;
        this.state = nextState;
        this.stateListeners.forEach(callback => callback(this.state, this.prevState));
        this.transitions.forEach(callback => callback(this.state, this.prevState));
        if (this.running === 0)
            this.completeTransition();
    }
    completeTransition() {
        if (this.prevState !== this.state) {
            this.prevState = this.state;
            this.stateListeners.forEach(callback => callback(this.state, this.state));
        }
        if (this.queue.length > 0) {
            const action = this.queue.shift();
            this.internalDispatch(action);
        }
    }
}
//# sourceMappingURL=Controller.js.map