import { cardsJson } from "./json.cards.js";
import {shuffleArray, LOCAL_STORAGE_PREFIX} from "./utils.js";
import { Card } from './class.Cards.js';
import { ModalWindow } from "./class.Modal-Window.js";
import { GameAction } from "./enum.gameAction.js";

let audio = new Audio();
let audioBgMusic = new Audio();

export class Game {
  constructor(totalCounter, categoryName) {
    this.totalCounter = totalCounter;
    this.prevCard = undefined;
    this.currentCounter = 0;
    this.numberOfMoves = 0;
    this.sec = 0;
    this.minite = 0;
    this.hour = 0;
    this.days = 0;
    this.isGameOver = false;
    this.startTimeGame;
    this.canBeClicked = true;
    this.isGameStop = false;
    this.categoryName = categoryName;
    this.resetBtn;
    this.soundOff;
    this.musicOff;
    this.isMusicOn = false;
    this.isSoundOn = false;
    this.initGame(this.totalCounter, this.categoryName);
  }

  checkSameCards(card) {
    if (!this.canBeClicked) {
      return;
    } 
    card.flip();
    if (this.prevCard == undefined) {
      this.prevCard = card;
    } else {
      if (card.id == this.prevCard.id) {  
        this.numberOfMoves++;
        card.onSuccess();
        this.prevCard.onSuccess();        
        this.prevCard = undefined;
        this.currentCounter++;
        this.canBeClicked = false;
        setTimeout(() => {
          if (this.isSoundOn == true) {
            this.playSound(GameAction.SUCCESSFUL);
          }
        }, 500)
        if (this.currentCounter == this.totalCounter) {
          this.gameOver();
        }
      } else {
        this.numberOfMoves++;
          card.onFlipped();
          this.prevCard.onFlipped();
          this.prevCard = undefined;
          this.canBeClicked = false;
          setTimeout(() => {
            if (this.isSoundOn == true) {
              this.playSound(GameAction.ON_FLIP);
            }
          }, 500)
      }
    }
  }

  initGame(count, categoryName) {
    this.playSoundBg(GameAction.GAME_START);
    this.isMusicOn = true;
    this.isSoundOn = true;
    const mainContainer = document.querySelector('.main__container');
    const contentGame = document.createElement('div');
    contentGame.classList.add('main__content-game');
    const cards = document.querySelector('.cards');
    const main = document.querySelector('.main');
    
    if (categoryName == 'pokemon') {
      main.classList.add('pokemon');
      main.classList.remove('southPark');
      main.classList.remove('halloween');
      main.classList.remove('simpsons');
    } else if (categoryName == 'southPark') {
      main.classList.remove('pokemon');
      main.classList.add('southPark');
      main.classList.remove('halloween');
      main.classList.remove('simpsons');
    } else if (categoryName == 'halloween') {
      main.classList.remove('pokemon');
      main.classList.remove('southPark');
      main.classList.add('halloween');
      main.classList.remove('simpsons');
      
    } else if (categoryName == 'simpsons') {
      main.classList.remove('pokemon');
      main.classList.remove('southPark');
      main.classList.remove('halloween');
      main.classList.add('simpsons');
    }
    let array = [];
    let arrayShiffle = shuffleArray(cardsJson[this.categoryName]['cards']); 
    let arrayCountShiffle = arrayShiffle.slice(0, count);
    let duplicatedArray = arrayCountShiffle.concat(arrayCountShiffle);
    let shuffledDuplicatedArray = shuffleArray(duplicatedArray);
    
    if (document.querySelector('.main__gameOver')) {
      document.querySelector('.main__gameOver').remove();
    }
    cards.innerHTML = '';
    cards.style.gridTemplateColumns =  `repeat(${Math.sqrt(count * 2)}, 1fr)`;

    for (let i = 0; i < shuffledDuplicatedArray.length; i++) {
      const card = new Card(i + 1, shuffledDuplicatedArray[i], this);
      cards.append(card.createCard());
      array.push(card);
    }   

    const contentButtons = document.createElement('div');
    contentButtons.classList.add('main__content-buttons');

    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('main__reset-btn');
    this.resetBtn.innerHTML = 'Back to main menu';
    
    this.musicOff = document.createElement('button');
    this.musicOff.classList.add('main__turn-on-music');
    
    const musicOffText = document.createElement('p');
    musicOffText.classList.add('main__turn-on-music-text');
    musicOffText.innerHTML = 'Music Game'

    this.soundOff = document.createElement('button');
    this.soundOff.classList.add('main__turn-on-sound');

    const soundOffText = document.createElement('p');
    soundOffText.classList.add('main__turn-on-sound-text');
    soundOffText.innerHTML = 'Sound Game';

    if (this.categoryName == 'halloween') {
      contentButtons.classList.add('halloween__content-buttons');
    }
    
    const contentTime = document.createElement('div');
    contentTime.classList.add('main__content-time');
    
    const timeTitle = document.createElement('p');
    timeTitle.classList.add('main__time-title');
    timeTitle.innerHTML = 'Time: ';
    
    const timeText = document.createElement('p');
    timeText.classList.add('main__time');

    if (this.categoryName == 'halloween') {
      contentTime.classList.add('halloween-content-time');
      this.resetBtn.classList.add('halloween-reset');
    }
    
    contentTime.append(timeTitle);
    contentTime.append(timeText);

    contentGame.append(this.resetBtn);
    contentButtons.append(this.musicOff);
    contentButtons.append(musicOffText);
    contentButtons.append(this.soundOff);
    contentButtons.append(soundOffText);
    contentGame.append(contentButtons);    
    contentGame.append(contentTime);    
    contentGame.append(cards);

    mainContainer.append(contentGame);
    this.start();
  }

  gameOver() {
    let modal;    
    const timeText = document.querySelector('.main__time');
    let gameOverTime = Date.now();
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-${gameOverTime}`, JSON.stringify({'timeOfUTC' : gameOverTime,'numberOfMoves' : this.numberOfMoves, 'time' : timeText.innerHTML, 'categoryName' : this.categoryName, 'countOfCards' : this.totalCounter * 2}));
    
    setTimeout(() => {
      modal = new ModalWindow(this.numberOfMoves, timeText.innerHTML, this.categoryName);
      document.body.classList.add('body__no-scroll');
      if (this.isSoundOn == true) {
        this.playSound(GameAction.GAME_OVER);
      }
    }, 1000);
    this.isGameOver = true;
    this.isGameStop = true;
    this.stopGame();
    clearInterval(this.startTimeGame);
    this.sec = 0;
  }

  start() {
    this.isGameStop = false;
    this.sec = 1;
    const timeText = document.querySelector('.main__time');
    this.startTimeGame = setInterval(() => {
      if (this.sec == 59) {
        this.sec = 0;
        if (this.minite == 59) {
          this.minite = 0;
          this.hour++;
          if (this.hour == 24) {
            this.hour = 0;
            this.days++;
          }
        }
        this.minite++;
      } 
      if (this.days == 0) {
        if (this.hour == 0) {
          if (this.minite == 0) {
            if (this.sec < 10) {
              timeText.innerHTML = `00:0${this.sec}`;
            } else {
              timeText.innerHTML = `00:${this.sec}`;
            }
          } else if (this.minite < 10) {
            if (this.sec < 10) {
              timeText.innerHTML = `0${this.minite}:0${this.sec}`;
            } else {
              timeText.innerHTML = `0${this.minite}:${this.sec}`;
            }    
          } else {
            if (this.sec < 10) {
              timeText.innerHTML = `${this.minite}:0${this.sec}`;
            } else {
              timeText.innerHTML = `${this.minite}:${this.sec}`;
            }  
          } 
        } else if (this.minite < 10) {
          if (this.sec < 10) {
            timeText.innerHTML = `${this.hour}:0${this.minite}:0${this.sec}`;
          } else {
            timeText.innerHTML = `${this.hour}:0${this.minite}:${this.sec}`;
          }    
        } else {
          if (this.sec < 10) {
            timeText.innerHTML = `${this.hour}:${this.minite}:0${this.sec}`;
          } else {
            timeText.innerHTML = `${this.hour}:${this.minite}:${this.sec}`;
          }  
        } 
      } else if (this.minite < 10) {
        if (this.sec < 10) {
          if (this.days > 1) {
            timeText.innerHTML = `${this.days} days ${this.hour}:0${this.minite}:0${this.sec}`;
          } else {
            timeText.innerHTML = `${this.days} day ${this.hour}:0${this.minite}:0${this.sec}`;
          }
        } else {
          if (this.days > 1) {
            timeText.innerHTML = `${this.days} days ${this.hour}:0${this.minite}:${this.sec}`;
          } else {
            timeText.innerHTML = `${this.days} day ${this.hour}:0${this.minite}:${this.sec}`;
          }
        }    
      } else {
        if (this.sec < 10) {
          if (this.days > 1) {
            timeText.innerHTML = `${this.days} days ${this.hour}:${this.minite}:0${this.sec}`;
          } else {
            timeText.innerHTML = `${this.days} day ${this.hour}:${this.minite}:0${this.sec}`;
          }
        } else {
          if (this.days > 1) {
            timeText.innerHTML = `${this.days} days ${this.hour}:${this.minite}:${this.sec}`;
          } else {
            timeText.innerHTML = `${this.days} day ${this.hour}:${this.minite}:${this.sec}`;
          }
        }  
      } 
      this.sec++;
    }, 1000);

    this.resetBtn.addEventListener('click', () => {
      this.confirmationOfSelection();
    })

    this.musicOff.addEventListener('click', () => {
      if (this.isMusicOn == true) {
        this.stopSoundBg();
        this.musicOff.classList.add('off');
        this.isMusicOn = false;
      } else if (this.isMusicOn == false){
        this.playSoundBg(GameAction.GAME_START);
        this.isMusicOn = true;
        this.musicOff.classList.remove('off');
      }
    })

    this.soundOff.addEventListener('click', () => {
      if (this.isSoundOn == true) {
        this.stopSound();
        this.soundOff.classList.add('off');
        this.isSoundOn = false;
      } else if (this.isSoundOn == false){
        this.isSoundOn = true;
        this.soundOff.classList.remove('off');
      }
    })
  }

  confirmationOfSelection() {
    if (this.isSoundOn == true) {
      this.playSound(GameAction.BACK_TO_MENU);
    }

    document.body.classList.add('body__no-scroll');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('confirmation-box__wrapper');

    const modalText = document.createElement('div');
    modalText.classList.add('confirmation-box__text');
    modalText.innerHTML = 'Are you sure you want to leave the game?';

    const contentBtn = document.createElement('div');
    contentBtn.classList.add('confirmation-box__content-btn');

    const yesBtn = document.createElement('button');
    yesBtn.classList.add('confirmation-box__yesBtn');
    yesBtn.innerHTML = 'Yes'

    const noBtn = document.createElement('button');
    noBtn.classList.add('confirmation-box__noBtn');
    noBtn.innerHTML = 'No';
    if (this.categoryName == 'halloween') {
      modalWrapper.classList.add('halloween-confirmation-box-wrapper');
      yesBtn.classList.add('halloween-yesBtn');
      noBtn.classList.add('halloween-noBtn');
    }
    contentBtn.append(yesBtn);
    contentBtn.append(noBtn);
    modalWrapper.append(contentBtn);
    modalWrapper.append(modalText);
    modal.append(modalWrapper);
    overlay.append(modal);
    document.body.append(overlay);

    this.buildEvents();
  }

  buildEvents() {
    const yesBtn = document.querySelector('.confirmation-box__yesBtn');
    const noBtn = document.querySelector('.confirmation-box__noBtn');
    const overlay = document.querySelector('.overlay');

    yesBtn.addEventListener('click', () => {
      const mainContainer = document.querySelector('.main__content-game');
      mainContainer.remove();
      const mainStart = document.querySelector('.main__start-screen');
      mainStart.style.display = 'flex';
      overlay.remove();
      document.body.classList.remove('body__no-scroll');
      this.stopSound();
    })

    noBtn.addEventListener('click', () => {
      overlay.remove();
      document.body.classList.remove('body__no-scroll');
      this.stopSound();
    })
  }

  stopGame() {
    this.sec = 0;
    this.isGameStop = true;
    clearInterval(this.startTimeGame);
  }

  playSound(type) {
    audio.src = cardsJson[this.categoryName]['audio'][type];
    audio.load();
    audio.play();
    audio.volume = 0.05;
  }
  
  stopSound() {
    audio.pause();
  }
  
  playSoundBg(type) {
    audioBgMusic.src = cardsJson[this.categoryName]['audio'][type];
    audioBgMusic.load();
    audioBgMusic.play();
    audioBgMusic.volume = 0.05;
    audioBgMusic.loop = true;
  }

  stopSoundBg() {
    audioBgMusic.pause();
  }
}