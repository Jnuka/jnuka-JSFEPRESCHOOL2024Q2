import { FeedBackModal } from "./class.FeedBackModal.js";

export class ModalWindow {
  constructor(numberOfMoves, time, category) {
    this.numberOfMoves = numberOfMoves;
    this.time = time;
    this.category = category;
    this.overlay = '';
    this.modal = '';
    this.modalWrapper = '';
    this.modalCloseButton = '';   
    this.modalContent = '';
    this.modalfeedBackButton = '';
    this.bildModalWindow();
  }

  bildModalWindow() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.classList.add('modal__wrapper');

    this.containerModalCloseButton = document.createElement('div');
    this.containerModalCloseButton.classList.add('modal__container-close-button');

    this.modalCloseButton = document.createElement('button');
    this.modalCloseButton.classList.add('modal__close-button');
    this.modalCloseButton.innerHTML = 'x';
    
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal__content');

    this.modalfeedBackButton = document.createElement('button');
    this.modalfeedBackButton.classList.add('modal__feedBack-button');
    this.modalfeedBackButton.innerHTML = 'Send FeedBack';

    this.appendModalElements();

    this.buildEvents();

    this.openModal();
  }
  
  setContent() {
    this.modalWrapper.append(this.generateModalTemplate());
    
    let keys = Object.keys(localStorage);
    keys.sort().reverse();
    
    if (keys.length >= 10) {
      for (let i = 10; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
      }
    }
  }

  appendModalElements() {
    this.containerModalCloseButton.append(this.modalCloseButton);
    this.modalWrapper.append(this.containerModalCloseButton);
    this.setContent();
    this.modalWrapper.append(this.modalfeedBackButton);
    this.modal.append(this.modalWrapper);
    this.overlay.append(this.modal);
  }

  buildEvents() {
    this.overlay.addEventListener('click', this.closeModal);
    this.modalCloseButton.addEventListener('click', this.closeModal);

    this.modalfeedBackButton.addEventListener('click', () => {
      this.closeModal;
      new FeedBackModal(this.category);
    })
  }

  closeModal(e) {
    const overlay = document.querySelector('.overlay');
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal__close-button') || e.target.classList.contains('modal__feedBack-button')) {
      if (overlay) {
        overlay.remove();
        document.body.classList.remove('body__no-scroll');
        const content = document.querySelector('.main__content-game');
        content.remove();
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
    
    let footerLink = '';
    if (this.category == 'southPark') {
      footerLink = 'https://southpark.fandom.com/wiki/South_Park_Archives';
    } else if (this.category == 'pokemon') {
      footerLink = 'https://pokemongolife.ru/pokemony/';
    } else if (this.category == 'simpsons') {
      footerLink = 'https://simpsons.fandom.com/wiki/Simpsons_Wiki';
    } else if (this.category == 'halloween') {
      footerLink = 'https://www.vecteezy.com/free-png/halloween?license-free=true';
      this.modalWrapper.classList.add('halloween-wrapper');
    }
    template += `<p class="modal__title">You WIN</p>`;
    template += `<p class="modal__time">Time: ${this.time}</p>`;
    template += `<p class="modal__count">Number of moves: ${this.numberOfMoves}</p>`;
    template += `<img class="modal__img" src="./assets/img/game-over.png" alt="game-over">`;
    template += `<p class="modal__copyright">The pictures were taken from the `;
    template += `<a class="modal__copyright-link" href="${footerLink}" target="_blank">website</a>`
    template += `</p>`;
    
    this.modalContent.innerHTML = template;   
    return this.modalContent;
  }
}