import "./photo-thumbnail.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>
    <photo-thumbnail></photo-thumbnail>
    <photo-thumbnail></photo-thumbnail>
    <photo-thumbnail></photo-thumbnail>
`;

class PhotoGallery extends HTMLElement {
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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

window.customElements.define("photo-gallery", PhotoGallery);
