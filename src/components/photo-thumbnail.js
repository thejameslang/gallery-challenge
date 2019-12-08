const template = document.createElement("template");

template.innerHTML = `
    <style>
    img {
      width: 23vw;
      height: 23vw;
      object-fit: cover;
      margin-right: 1vw;
      margin-bottom: 1vw;
    }
    </style>
    <img src="https://images.unsplash.com/photo-1543517515-d6ff15a98642?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ0NDc3fQ&s=eab033bc166a2a3b9c2726e652d08897">
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
