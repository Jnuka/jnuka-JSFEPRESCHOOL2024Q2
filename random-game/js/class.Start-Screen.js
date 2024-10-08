import { Game } from './class.Game.js';
import { HistoryModalWindow } from "./class.History-Modal-Window.js";

export class StartScreen {
  constructor() {
    this.mainStart = '';
    this.titleGame = '';
    this.titleCategories = '';
    this.categories = '';
    this.buttonCategoriesSimpsons = '';
    this.buttonCategoriesPokemon = '';
    this.buttonCategoriesSouthPark = '';
    this.buttonCategoriesHalloween = '';
    this.controls = '';
    this.buttonMinus = '';
    this.textCount = '';
    this.buttonPlus = '';
    this.textControls = '';
    this.startGameBtn = '';
    this.categoryName = 'simpsons';
    this.bildStartScreenWindow();
  }

  bildStartScreenWindow() {
    this.content = document.querySelector('.main__container');

    this.mainStart = document.createElement('div');
    this.mainStart.classList.add('main__start-screen');
    
    this.titleGame = document.createElement('img');
    this.titleGame.classList.add('main__logo')
    this.titleGame.src = './../random-game/assets/img/logo.png';
    this.titleGame.alt = 'logo';

    this.titleCategories = document.createElement('p');
    this.titleCategories.classList.add('main__title-categories');
    this.titleCategories.innerHTML = 'Choose category';

    this.categories = document.createElement('div');
    this.categories.classList.add('main__categories');

    this.buttonCategoriesSimpsons = document.createElement('button');
    this.buttonCategoriesSimpsons.classList.add('main__category', 'category-simpsons', 'active');
    this.buttonCategoriesSimpsons.innerHTML = 'Simpsons';

    this.buttonCategoriesPokemon = document.createElement('button');
    this.buttonCategoriesPokemon.classList.add('main__category', 'category-pokemon');
    this.buttonCategoriesPokemon.innerHTML = 'Pokemon';

    this.buttonCategoriesSouthPark = document.createElement('button');
    this.buttonCategoriesSouthPark.classList.add('main__category', 'category-south-park');
    this.buttonCategoriesSouthPark.innerHTML = 'South Park';

    this.buttonCategoriesHalloween = document.createElement('button');
    this.buttonCategoriesHalloween.classList.add('main__category', 'category-halloween');
    this.buttonCategoriesHalloween.innerHTML = 'Halloween';

    this.textControls = document.createElement('p');
    this.textControls.classList.add('main__text-controls');
    this.textControls.innerHTML = 'Number of cards: ';

    this.controls = document.createElement('div');
    this.controls.classList.add('main__controls');

    this.buttonMinus = document.createElement('button');
    this.buttonMinus.classList.add('main__button-minus', 'button', 'inactive');

    this.textCount = document.createElement('p');
    this.textCount.classList.add('main__count-cards');
    this.textCount.innerHTML = '4';

    this.buttonPlus = document.createElement('button');
    this.buttonPlus.classList.add('main__button-plus', 'button');

    this.startGameBtn = document.createElement('button');
    this.startGameBtn.classList.add('main__button-start-game');
    this.startGameBtn.innerHTML = 'Start game';

    this.historyBtn = document.createElement('button');
    this.historyBtn.classList.add('main__button-history');
    this.historyBtn.innerHTML = 'History';

    this.appendStartScreenElements();

    this.buildEvents();

    this.openStartScreen();
  }
  
  appendStartScreenElements() {
    this.categories.append(this.buttonCategoriesSimpsons);
    this.categories.append(this.buttonCategoriesPokemon);
    this.categories.append(this.buttonCategoriesSouthPark);
    this.categories.append(this.buttonCategoriesHalloween);

    this.controls.append(this.buttonMinus);
    this.controls.append(this.textCount);
    this.controls.append(this.buttonPlus);
    this.controls.append(this.startGameBtn);
    
    this.mainStart.append(this.titleGame);
    this.mainStart.append(this.titleCategories);
    this.mainStart.append(this.categories);
    this.mainStart.append(this.textControls);
    this.mainStart.append(this.controls);
    this.mainStart.append(this.startGameBtn);
    this.mainStart.append(this.historyBtn);

    this.content.append(this.mainStart);
  }

  buildEvents() {
    this.buttonCategoriesSimpsons.addEventListener('click', () => {
      this.buttonCategoriesPokemon.classList.remove('active');
      this.buttonCategoriesSouthPark.classList.remove('active');
      this.buttonCategoriesSimpsons.classList.add('active');
      this.buttonCategoriesHalloween.classList.remove('active');
      this.categoryName = 'simpsons';
    });
    
    this.buttonCategoriesPokemon.addEventListener('click', () => {
      this.buttonCategoriesPokemon.classList.add('active');
      this.buttonCategoriesSouthPark.classList.remove('active');
      this.buttonCategoriesSimpsons.classList.remove('active');
      this.buttonCategoriesHalloween.classList.remove('active');
      this.categoryName = 'pokemon';
    });
    
    this.buttonCategoriesSouthPark.addEventListener('click', () => {
      this.buttonCategoriesPokemon.classList.remove('active');
      this.buttonCategoriesSouthPark.classList.add('active');
      this.buttonCategoriesSimpsons.classList.remove('active');
      this.buttonCategoriesHalloween.classList.remove('active');
      this.categoryName = 'southPark';
    });
    
    this.buttonCategoriesHalloween.addEventListener('click', () => {
      this.buttonCategoriesPokemon.classList.remove('active');
      this.buttonCategoriesSouthPark.classList.remove('active');
      this.buttonCategoriesSimpsons.classList.remove('active');
      this.buttonCategoriesHalloween.classList.add('active', 'halloween-btn');
      this.categoryName = 'halloween';
    });

    const countCard = [2, 8, 18, 32];
    let iterator = 0;
    let gameStart;

    this.buttonMinus.addEventListener('click', () => {
      if (iterator != 0) {
        iterator--;
        this.textCount.innerHTML = countCard[iterator] * 2;
      }
      if (this.textCount.innerHTML == '36') {
        this.buttonPlus.classList.remove('inactive');
      }
      if (this.textCount.innerHTML == '4') {
        this.buttonMinus.classList.add('inactive');
      } else {
        this.buttonMinus.classList.remove('inactive');
      }
    });
    
    this.buttonPlus.addEventListener('click', () => {
      if (iterator < countCard.length - 1) {
        iterator++;
        this.textCount.innerHTML = countCard[iterator] * 2;
      }   
      this.buttonMinus.classList.remove('inactive');
      if (this.textCount.innerHTML == '64') {
        this.buttonPlus.classList.add('inactive');
      } else {
        this.buttonPlus.classList.remove('inactive');
      }
    });
    const contentGame = document.querySelector('.main__container');

    this.startGameBtn.addEventListener('click', () => {
      this.closeStartScreen();
      const cards = document.createElement('div');
      cards.classList.add('cards');
      contentGame.append(cards);
      if (cards.innerHTML == '') {
        gameStart = new Game(countCard[iterator], this.categoryName);
        this.titleGame.remove();
        this.mainStart.style.height = '500px';
        this.mainStart.style.boxShadow = `12px 12px 8px 0px rgba(34, 60, 80, 0.2)`;
        
      } else {
        gameStart.stopGame();
        gameStart = new Game(countCard[iterator], this.categoryName);
        this.titleGame.remove();
        this.mainStart.style.height = '500px';
        this.mainStart.style.boxShadow = `12px 12px 8px 0px rgba(34, 60, 80, 0.2)`;
      }
    });

    this.historyBtn.addEventListener('click', () => {
      new HistoryModalWindow();
    })
  }

  closeStartScreen() {
    const mainStart = document.querySelector('.main__start-screen');
    mainStart.style.display = 'none';
    document.body.classList.remove('body__no-scroll');
  }

  openStartScreen() {
    const mainStart = document.querySelector('.main__start-screen');
    mainStart.style.display = 'flex';
  }
}