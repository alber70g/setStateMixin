export const StateMixin = (BaseClass) => class extends BaseClass {
    setState(fn) {
        let intState = {};
        for (const key in this.properties()) {
            intState = { ...intState, key: this[key] };
        }
        const newState = fn(intState);
        for (const key in newState) {
            if (newState.hasOwnProperty(key)) {
                this[key] = newState[key];
            }
        }
    }
};
