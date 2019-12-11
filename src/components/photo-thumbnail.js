const template = document.createElement("template");

template.innerHTML = `
    <style>
    img {
      width: 23vw;
      height: 23vw;
      object-fit: cover;
    }
    </style>
    <img>
`;

class PhotoThumbnail extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));

    this.$img = this._sR.querySelector("img");

    this.$img.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("onClick", {
          detail: {
            photoUrl: this.photo
          }
        })
      );
    });
  }

  get photo() {
    return JSON.parse(this.getAttribute("photo"));
  }

  set photo(value) {
    this.setAttribute("photo", JSON.stringify(value));
  }

  static get observedAttributes() {
    return ["photo"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$img.src = this.photo.thumb;
  }

  connectedCallback() {}
}

window.customElements.define("photo-thumbnail", PhotoThumbnail);
