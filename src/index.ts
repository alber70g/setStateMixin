import { LitElement } from '../node_modules/@polymer/lit-element';

type NestedMap<T> = {
  [key: string]: T | NestedMap<T>;
};

type Map<T = any> = {
  [key: string]: T;
};

type Constructor<T> = new (...args: any[]) => T;

// type StateMixin = <
//   TBase extends Constructor<LitElement>,
//   TState extends NestedMap<any>
// >(
//   BaseClass: TBase,
//   props: TState
// ) => TBase;

interface StatefulClass<TBase, TState> extends TBase {
  setState(fn: (state: TState) => TState): void;
}

export const StateMixin = <TBase, TState>(
  BaseClass: Constructor<TBase>,
  props: TState
) => {
  return class extends BaseClass implements StatefulClass<TState, TBase> {
    static get properties() {
      return props;
    }

    setState(fn: (state: typeof props) => typeof props) {
      let intState: typeof props = {};
      for (const key in props) {
        intState = { ...intState, [key]: this[key] };
      }

      const newState = fn(intState);

      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          this[key] = newState[key];
        }
      }
    }
  };
};
