export class ModalWindow {
  constructor (img) {
    this.overlay = '';
    this.modal = '';
    this.wrapper = '';
    this.img = img;
  }

  bildModalWindow(content) {
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'modal__wrapper';

    this.modalCloseButton = document.createElement('button');
    this.modalCloseButton.classList.add('modal__close-button');
    this.modalCloseButton.innerHTML= `<svg class="cross" width="12" height="12" viewBox="0 0 12 12" fill="#faed26" xmlns="http://www.w3.org/2000/svg">
    <path class="cross" fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#faed26"/>
    </svg>`;

    this.setContentForModal(content);
    this.appendModalElements();
    this.closeEvents();
    this.openModalWindow();
  }

  setContentForModal(content) {
    if (typeof content == 'string') {
      this.wrapper.innerHTML = content;
    } else {
      this.wrapper.innerHTML = '';
      this.wrapper.appendChild(content);
    }
  } 

  appendModalElements() {
    this.modal.append(this.wrapper);
    this.modal.append(this.modalCloseButton);
    this.overlay.append(this.modal);

  }

  closeEvents() {
    this.modalCloseButton.addEventListener("click", this.closeModalWindow);
    this.overlay.addEventListener("click", this.closeModalWindow);
  }

  openModalWindow() {
    document.body.append(this.overlay);
  }

  closeModalWindow(e) {
    let target = e.target.classList;
    if (target.contains('overlay') || target.contains('modal__close-button') || target.contains('cross')) {
      let overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove();
      }
      document.body.classList.remove('body__no-scroll');
    }
  }

  generateInterestForModalTemplate() {
    let modal = document.createElement('div');
    modal.className = 'modal__inner';
    let template = '';
    template += `<img class="modal__img" src=${this.img} alt="image">`;
    template += `</div>`;
    modal.innerHTML = template;
    return modal;
  }

  renderModal() {
    let content = this.generateInterestForModalTemplate();
    this.bildModalWindow(content);
  }
}
