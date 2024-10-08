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
    this.overlay.addEventListener('click', (e) => this.closeModal(e));
  }
  
  closeModal(e) {
    const inputForm = document.querySelector('.form-input');
    const textareaForm = document.querySelectorAll('.form-textarea');
    const overlay = document.querySelector('.overlay');
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal__close-button')) {
      if (inputForm.value == '' && textareaForm[0].value == '' && textareaForm[1].value == '' && textareaForm[2].value == '') {
        if (overlay) {
          overlay.remove();
          document.body.classList.remove('body__no-scroll');
          const mainStart = document.querySelector('.main__start-screen');
          mainStart.style.display = 'flex';
        }
      } else if (inputForm.value != '' || textareaForm[0].value != '' || textareaForm[1].value != '' || textareaForm[2].value != '') {
        if (overlay) {
          this.confirmationOfSelection();
        }
      }
    }
  }

  confirmationOfSelection() {
    document.body.classList.add('body__no-scroll');

    const overlayClose = document.createElement('div');
    overlayClose.classList.add('overlay-close-modal');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('confirmation-box__wrapper');

    const modalText = document.createElement('div');
    modalText.classList.add('confirmation-box__text');
    modalText.innerHTML = 'Are you sure you want to close the feedback form?';

    const contentBtn = document.createElement('div');
    contentBtn.classList.add('confirmation-box__content-btn');

    const yesBtn = document.createElement('button');
    yesBtn.classList.add('confirmation-box__yesBtn');
    yesBtn.innerHTML = 'Yes'

    const noBtn = document.createElement('button');
    noBtn.classList.add('confirmation-box__noBtn');
    noBtn.innerHTML = 'No';

    contentBtn.append(yesBtn);
    contentBtn.append(noBtn);
    modalWrapper.append(contentBtn);
    modalWrapper.append(modalText);
    modal.append(modalWrapper);
    overlayClose.append(modal);
    document.body.append(overlayClose);

    this.bulildEventsForClose();
  }

  bulildEventsForClose() {
    const overlayClose = document.querySelector('.overlay-close-modal');
    const overlay = document.querySelector('.overlay');
    const yesBtn = document.querySelector('.confirmation-box__yesBtn');
    const noBtn = document.querySelector('.confirmation-box__noBtn');

    yesBtn.addEventListener('click', () => {
      const mainStart = document.querySelector('.main__start-screen');
      mainStart.style.display = 'flex';
      overlayClose.remove();
      overlay.remove();
      document.body.classList.remove('body__no-scroll');
    })

    noBtn.addEventListener('click', () => {
      overlayClose.remove();
      document.body.classList.remove('body__no-scroll');
    })
  }

  openModal() {
    document.body.append(this.overlay);
  }
  
  generateModalTemplate() {
    document.body.classList.add('body__no-scroll');
    let template = '';
    if (this.category == 'halloween') {
      this.modalWrapper.classList.add('halloween-modalFeedBack__wrapper');
      this.modalWrapper.style.width = '570px';
    }
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    
    template += `<form class="form" method="post" action="https://docs.google.com/forms/d/e/1FAIpQLSdBVRF_CPt4K0vdZZM8NQ8imMIFJze5I9VcuYvuC-s97MN9qQ/formResponse" target="_blank">`;
    template += `<div class="form-question">
      <label class="form-label">Your Nickname *</label>
      <input class="form-input" autocomplete="off" type="nickname" name="entry.64784423" placeholder="your answer..." required/>
    </div>`;
    template += `<div class="form-question">
      <label class="form-label">Describe what you liked?</label>
      <textarea class="form-textarea" autocomplete="off"  type="nickname" name="entry.1378693674" placeholder="your detailed answer..." cols="45" rows="5"/></textarea>
    </div>`;
    template += `<div class="form-question">
      <label class="form-label">Describe what you didn't like?</label>
      <textarea class="form-textarea" autocomplete="off" type="nickname" name="entry.384089732" placeholder="your detailed answer..." cols="45" rows="5"/></textarea>
    </div>`;
    template += `<div class="form-question">
      <label class="form-label"autocomplete="off" >What should be added to the site?</label>
      <textarea class="form-textarea" autocomplete="off" type="nickname" name="entry.586954488" placeholder="your detailed answer..." cols="45" rows="5"/></textarea>
    </div>`;

    template += `<button class="form-btn" type="submit">Send feedback</button>`;
    template += `</form>`;
    modalContent.innerHTML = template;
    return modalContent;
  }
}