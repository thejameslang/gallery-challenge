import "./photo-thumbnail.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>
    <ul class="photo-list"></ul>
`;

class PhotoGallery extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));

    this.$photoList = this._sR.querySelector(".photo-list");
  }

  static get observedAttributes() {
    return ["photos"];
  }

  get photos() {
    return JSON.parse(this.getAttribute("photos"));
  }

  set photos(value) {
    this.setAttribute("photos", JSON.stringify(value));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$photoList.innerHTML = "";

    this.photos.forEach(photoObject => {
      let $photoThumbnail = document.createElement("photo-thumbnail");
      $photoThumbnail.photo = photoObject.urls.thumb;
      $photoThumbnail.addEventListener("onClick", value => console.log(value));
      this.$photoList.appendChild($photoThumbnail);
    });
  }

  connectedCallback() {}
}

window.customElements.define("photo-gallery", PhotoGallery);
