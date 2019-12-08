const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>

    <img src="https://images.unsplash.com/photo-1543517515-d6ff15a98642?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjQ0NDc3fQ&s=eab033bc166a2a3b9c2726e652d08897">
`;

class PhotoThumbnail extends HTMLElement {
  constructor() {
    super();

    this._sR = this.attachShadow({ mode: "open" });
    this._sR.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("photo-thumbnail", PhotoThumbnail);
