const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
            font-family: sans-serif;
        }
    </style>

    <div>
        <h1>hello</h1>
    </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("my-app", App);
