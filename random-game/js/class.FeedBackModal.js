export class FeedBackModal {
  constructor(category) {
    this.overlay = '';
    this.modal = '';
    this.modalWrapper = '';
    this.modalCloseButton = '';   
    this.modalFeedBack = '';   
    this.category = category;
    this.bildModalWindow();
  }

  bildModalWindow() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.classList.add('modalFeedBack__wrapper');

    this.containerModalCloseButton = document.createElement('div');
    this.containerModalCloseButton.classList.add('modal__container-close-button');

    this.modalCloseButton = document.createElement('button');
    this.modalCloseButton.classList.add('modal__close-button');
    this.modalCloseButton.innerHTML = 'x';
    
    this.setContent();

    this.appendModalElements();

    this.buildEvents();

    this.openModal();
  }
  
  setContent() {
    this.modalWrapper.append(this.generateModalTemplate());
  }

  appendModalElements() {
    this.containerModalCloseButton.append(this.modalCloseButton);
    this.modalWrapper.append(this.containerModalCloseButton);
    this.modal.append(this.modalWrapper);
    this.overlay.append(this.modal);
  }

  buildEvents() {
    this.overlay.addEventListener('click', this.closeModal);
    this.modalCloseButton.addEventListener('click', this.closeModal);
  }

  closeModal(e) {
    const overlay = document.querySelector('.overlay');
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal__close-button')) {
      if (overlay) {
        overlay.remove();
        document.body.classList.remove('body__no-scroll');
        const mainStart = document.querySelector('.main__start-screen');
        mainStart.style.display = 'flex';
      }
    }
  }

  openModal() {
    document.body.append(this.overlay);
  }
  
  generateModalTemplate() {
    let template = '';
    if (this.category == 'halloween') {
      this.modalWrapper.classList.add('halloween-modalFeedBack__wrapper');
    }
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    template += `<iframe `;
    template += `class="iframe"`;
    template += `src="https://docs.google.com/forms/d/e/1FAIpQLSdBVRF_CPt4K0vdZZM8NQ8imMIFJze5I9VcuYvuC-s97MN9qQ/viewform?embedded=true" `;
    template += `width="640" height="600" frameborder="0" marginheight="0" marginwidth="0">`;
    template += `Загрузка…`;
    template += `</iframe>`;
    modalContent.innerHTML = template;
    return modalContent;
  }
}