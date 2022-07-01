export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}