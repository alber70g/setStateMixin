import { LitElement, html } from '@polymer/lit-element';
import { StateMixin } from '../../src';

class StatefulElement extends StateMixin(LitElement, {
  title: String,
  count: Number,
}) {
  up(state) {
    return { ...state, count: state.count + 1 };
  }

  down() {
    this.setState((state) => ({ ...state, count: state.count - 1 }));
  }

  _render({ foo, count }: { foo: any; count: number }) {
    return html`
      <h4 on-click=${() => this.setState(this.up)}>${this.title}</h4>
      <p>Count ${count}</p>
      <button on-click=${this.down.bind(this)}>Down</button>
      <slot></slot>
    `;
  }
}

customElements.define('stateful-element', StatefulElement);

