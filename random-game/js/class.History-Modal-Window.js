import { Categories } from "./enum.categories.js";

const formater = new Intl.DateTimeFormat('en-EN', {dateStyle: 'short', timeStyle: 'short'});

export class HistoryModalWindow {
  constructor() {
    this.overlay = '';
    this.modal = '';
    this.historyWrapper = '';
    this.historyTitle = '';
    this.historyCloseButton = '';   
    this.bildHistoryModalWindow();
  }

  bildHistoryModalWindow() {
    document.body.classList.add('body__no-scroll');
    
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');

    this.modal = document.createElement('div');
    this.modal.classList.add('history');

    this.historyTitle = document.createElement('p');
    this.historyTitle.classList.add('history__title');
    this.historyTitle.innerHTML = 'History games'

    this.historyWrapper = document.createElement('div');
    this.historyWrapper.classList.add('history__wrapper');

    this.containerHistoryCloseButton = document.createElement('div');
    this.containerHistoryCloseButton.classList.add('history__container-close-button');

    this.historyCloseButton = document.createElement('button');
    this.historyCloseButton.classList.add('history__close-button');

    this.appendHistoryModalElements();

    this.setContent();


    this.buildEvents();

    this.openHistory();
  }
  
  setContent() {
    this.historyWrapper.append(this.generateModalTemplate());
    
    let keys = Object.keys(localStorage);
    keys.sort().reverse();
  }

  appendHistoryModalElements() {
    this.containerHistoryCloseButton.append(this.historyCloseButton);
    this.historyWrapper.append(this.containerHistoryCloseButton);
    this.historyWrapper.append(this.historyTitle);
    this.modal.append(this.historyWrapper);
    this.overlay.append(this.modal);
  }

  buildEvents() {
    this.overlay.addEventListener('click', this.closeHistory);
    this.historyCloseButton.addEventListener('click', this.closeHistory);
  }

  closeHistory(e) {
    const overlay = document.querySelector('.overlay');
    if (e.target.classList.contains('overlay') || e.target.classList.contains('history__close-button')) {
      if (overlay) {
        overlay.remove();
        document.body.classList.remove('body__no-scroll');
        const mainStart = document.querySelector('.main__start-screen');
        mainStart.style.display = 'flex';
      }
    }
  }

  openHistory() {
    document.body.append(this.overlay);
  }
  
  generateModalTemplate() {
    let template = '';
    let modalContent = document.createElement('div');
    modalContent.classList.add('history__modal');

    let oneGame = '';
    let keysAll = Object.keys(localStorage);
    let keysMyLocalStorage = [];

    for (let i = 0; i < keysAll.length; i++) {
      if (keysAll[i].startsWith('26b05b397f0748468a4')) {
        keysMyLocalStorage.push(keysAll[i]);
      }
    }
    keysMyLocalStorage.sort().reverse();

    oneGame = '';
    oneGame += `<p class="history__table-title">№</p>`;
    oneGame += `<p class="history__table-title">Date</p>`;
    oneGame += `<p class="history__table-title">Category</p>`;
    oneGame += `<p class="history__table-title">Cards</p>`;
    oneGame += `<p class="history__table-title">Moves</p>`;
    oneGame += `<p class="history__table-title">Game time</p>`;
    template += `<div class="history__game">${oneGame}</div>`;

    for (let i = 0; i < keysMyLocalStorage.length; i++) {
      let gameStats = JSON.parse(localStorage.getItem(keysMyLocalStorage[i]));
      oneGame = '';
      oneGame += `<p class="history__table-text">${keysMyLocalStorage.length - i}</p>`;
      oneGame += `<p class="history__table-text">${formater.format(new Date(gameStats['timeOfUTC']))}</p>`;
      oneGame += `<p class="history__table-text">${Categories[gameStats['categoryName']]}</p>`;
      oneGame += `<p class="history__table-text">${gameStats['countOfCards']}</p>`;
      oneGame += `<p class="history__table-text">${gameStats['numberOfMoves']}</p>`;
      oneGame += `<p class="history__table-text">${gameStats['time']}</p>`;
      template += `<div class="history__game">${oneGame}</div>`;
    }


    modalContent.innerHTML = template;
    return modalContent;
  }
}