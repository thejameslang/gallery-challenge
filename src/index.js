import "./components/photo-gallery";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
            font-family: sans-serif;
        }
        h1 {
          font-weight: normal
        }
        .container-app {
          display: flex;
          flex-direction: column;
        }
    </style>

    <div class="container-app">
        <h1>Gallery</h1>
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
        this._sR.querySelector("photo-gallery").photos = data;
      });
  }
}

window.customElements.define("my-app", App);
