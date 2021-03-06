import "./photo-thumbnail.js";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    .photo-list {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-gap: 1vw;

    }
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
      top: 0.5vw;
      right: 0.5vw;
      border: none;
      background: none;
      color: #fff;
      font-size: calc(12px + 1vw);
    }
    button:active {
      color: grey
    }
    img {
      max-height: 90vh;
      max-width: 90vw;
    }
    </style>
    <div class="photo-view">
      <button>Close</button>
      <picture></picture>
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
        this._sR.querySelector("picture").innerHTML = "";
        let $pictureImg = document.createElement("img");
        $pictureImg.src = value.detail.photoUrl.small;
        Object.keys(value.detail.photoUrl).forEach(url => {
          console.log(url);
          let $pictureSource = document.createElement("source");
          switch (url) {
            case "raw":
              $pictureSource.media = "(min-width: 1024px)";
              break;
            case "full":
              $pictureSource.media = "(min-width: 768px)";
              break;
            case "regular":
              $pictureSource.media = "(min-width: 425px)";
              break;
          }
          $pictureSource.srcset = value.detail.photoUrl[url];
          this._sR.querySelector("picture").appendChild($pictureSource);
        });
        this._sR.querySelector("picture").appendChild($pictureImg);
        this.toggleOpen();
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
