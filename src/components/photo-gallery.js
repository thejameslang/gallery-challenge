import "./photo-thumbnail.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    .photo-view {
      display: none;
    }
    .photo-view.open {
      display: block;
    }
    </style>
    <div class="photo-view">
      <h3>whatup</h3>
    </div>
    <ul class="photo-list"></ul>
`;

class PhotoGallery extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));

    this.open = false;

    this.$photoList = this._sR.querySelector(".photo-list");
    this.$photoView = this._sR.querySelector(".photo-view");
  }

  toggleOpen(event) {
    this.open = !this.open;

    this.open
      ? this.$photoView.classList.add("open")
      : this.$photoView.classList.remove("open");
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
      $photoThumbnail.addEventListener("onClick", value => {
        this.toggleOpen();
        console.log(value);
      });
      this.$photoList.appendChild($photoThumbnail);
    });
  }

  connectedCallback() {}
}

window.customElements.define("photo-gallery", PhotoGallery);
