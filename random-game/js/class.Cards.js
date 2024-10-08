import { GameAction } from "./enum.gameAction.js";

export class Card {

  constructor(uniqeId, {id, name, url}, gameStart) {
    this.uniqeId = uniqeId;
    this.id = id;
    this.name = name;
    this.url = url;
    this.gameStart = gameStart;
  }


  createCard() {  
    const card = document.createElement('div');
    card.classList.add('card', `card-${this.uniqeId}`,'card-container');
    card.id = this.uniqeId;
    
    const cardImg = document.createElement('img');
    cardImg.classList.add('card', 'image-card');
    cardImg.src = this.url;
    cardImg.alt = this.name;

    card.append(cardImg);

    card.addEventListener('click', () => {
      if (this.gameStart.canBeClicked == true && !card.classList.contains('successful') && !card.classList.contains('flipped')) {
          this.gameStart.checkSameCards(this);
          if (this.gameStart.isSoundOn == true) {
            this.gameStart.playSound(GameAction.FLIP);
          }
      } 
    })
    return card;
  }

  flip() {
    const card = document.querySelector(`.card-${this.uniqeId}`);
    card.classList.add('flipped');
  }

  onFlipped() {
    if (this.gameStart.canBeClicked == true) {
      setTimeout(() => {
        const card = document.querySelector(`.card-${this.uniqeId}`);
        card.classList.remove('flipped');
        this.gameStart.canBeClicked = true;
      }, 500);
    }
  }

  onSuccess() {
    if (this.gameStart.canBeClicked) {
      setTimeout(() => {
        const card = document.querySelector(`.card-${this.uniqeId}`);
        card.classList.add('successful');
        this.gameStart.canBeClicked = true;
      }, 800);
    }
  }
}