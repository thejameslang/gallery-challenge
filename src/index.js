import "./components/photo-gallery";
import "./components/photo-thumbnail";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
            font-family: sans-serif;
        }
    </style>

    <div>
        <h1>hello</h1>
        <photo-thumbnail photo=""></photo-thumbnail>
        <photo-gallery></photo-gallery>
    </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    fetch("/photos.json")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        this._sR.querySelector("photo-thumbnail").photo = data[0].urls.thumb;
      });

    this._sR
      .querySelector("photo-thumbnail")
      .addEventListener("onClick", value => console.log(value));
  }
}

window.customElements.define("my-app", App);
