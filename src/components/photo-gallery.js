import "./photo-thumbnail.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    .photo-view {
      display: none;
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.85);
    }
    .photo-view.open {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      border: none;
      background: none;
      color: #fff;
      font-size: 1rem;
    }
    button:active {
      color: grey
    }
    img {
      height: 90vh;
    }
    </style>
    <div class="photo-view">
      <button>Close</button>
      <img>
    </div>
    <div class="photo-list"></div>
`;

class PhotoGallery extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));

    this.open = false;

    this.$photoList = this._sR.querySelector(".photo-list");
    this.$photoView = this._sR.querySelector(".photo-view");
    this.$button = this._sR.querySelector("button");
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
      $photoThumbnail.photo = photoObject.urls;
      $photoThumbnail.addEventListener("onClick", value => {
        this._sR.querySelector("img").src = value.detail.photoUrl.regular;
        this.toggleOpen();
        console.log(value);
      });
      this.$photoList.appendChild($photoThumbnail);
    });
  }

  connectedCallback() {
    this.$button.addEventListener("click", () => {
      this.toggleOpen();
    });
  }
}

window.customElements.define("photo-gallery", PhotoGallery);
