import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.gallery__image');
    this._title = this._popup.querySelector('.gallery__title');
  }

  open(title, link) {
    this._title.textContent = title;
    this._image.src = link;
    this._image.alt = title;
    super.open();
  }
}