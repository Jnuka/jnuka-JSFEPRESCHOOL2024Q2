let audio = new Audio();

const btnMusic = document.querySelector('.music');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const imgBg = document.querySelector('.background-img');
const playerImg = document.querySelector('.player__img');
const playerTitle = document.querySelector('.player__title');
const turnOff = document.querySelector(".sound-value");
const durationMusicEnd = document.querySelector('.player__end-time-music');
const durationMusicCurrent = document.querySelector('.player__start-music');
const progressBar = document.querySelector('.player__progress-bar-active');

let iterator = 0;
let flag = false;
let audioValueSound = true; 
let currentMusicTime = 0; 

export const musicJson = [
  {
    "name": "Shocking Blue - Long And Lonesome Road",
    "src": "./assets/audio/Shocking Blue-LongAndLonesomeRoad.mp3",
    "img": "./assets/img/ShockingBlue-LongAndLonesomeRoad.png",
    "text": `On a Sunday night while drivin' my car <br/>
              In the sky, a falling star <br/>
              Telling myself, I don't go too far <br/>
              And trust by the sound of the rain<br/>
              <br/>
              Well, I wonder<br/>
              Well, I wonder where I am<br/>
              <br/>
              'Cause there's a long and lonesome road<br/>
              Gotta find that world of you and me, babe<br/>
              Gonna find the lonesome road<br/>
              Gotta find that world like it used to be, babe<br/>
              <br/>
              Somebody there to show me the way<br/>
              Yes, I'm willing to pay<br/>
              And if there's a man who can<br/>
              Tell me the day I don't know what happened to me<br/>
              <br/>
              Well, I wonder<br/>
              Well, I wonder where I am<br/>
              <br/>
              'Cause there's a long and lonesome road<br/>
              Gotta find that world of you and me, babe<br/>
              There's a long and lonesome road<br/>
              Gotta find that world like it used to be, babe<br/>
              <br/>
              On a Sunday night while drivin' my car<br/>
              In the sky, a falling star<br/>
              Telling myself I don't go too far<br/>
              And trust by the sound of the rain<br/>
              <br/>
              Well, I wonder<br/>
              Well, I wonder where I am<br/>
              <br/>
              'Cause there's a long and lonesome road<br/>
              Gotta find that world of you and me, babe<br/>
              There's a long and lonesome road<br/>
              Gotta find that world like it used to be, babe<br/>
              <br/>
              Thank you<br/>
              Thank you<br/>
              Thank you<br/>
              And from our first LP album<br/>
              From our first album, we play the song Boll Weevill<br/>
              <br/>
              Авторы: Shocking Blue, Robert H J Rob Van Leeuwen<br/>
              Источник: Musixmatch`,
  },
  {
    "name": "Wildways - Ветром стать",
    "src": "./assets/audio/Wildways-BecomeTheWind.mp3",
    "img": "./assets/img/Wildways-BecomeTheWind.png",
    "text": `Когда я умру — я стану ветром<br/>
              И буду жить над твоей крышей<br/>
              Когда ты умрёшь, ты станешь солнцем<br/>
              И всё равно меня будешь выше<br/>
              <br/>
              Осенним ветром иду я где-то<br/>
              Летать с тобой ветром по свету<br/>
              Ты не поймёшь, а я незаметно<br/>
              Шепну теплом: "Ах, солнце, где ты?"<br/>
              <br/>
              Только ты не будь пока солнцем, слышишь?<br/>
              Я буду петь тебе песни с крыш<br/>
              Я буду снова той, кем ты дышишь<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Я буду ждать лишь твоей улыбки<br/>
              И буду слушать твои пластинки<br/>
              С твоих ресниц собирать снежинки<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Когда я умру — я стану ветром<br/>
              На землю падать с первым снегом<br/>
              Смеясь, летать с тобой по свету<br/>
              И нет счастливей в мире этом<br/>
              <br/>
              Когда ты умрёшь, ты станешь солнцем<br/>
              И украдёшь мои морозы<br/>
              И зацветут в садах мимозы<br/>
              И в сердце льдинки станут слёзы<br/>
              <br/>
              Станут слёзы!<br/>
              <br/>
              Только ты не будь пока солнцем, слышишь?<br/>
              Я буду петь тебе песни с крыш<br/>
              Я буду снова той, кем ты дышишь<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Я буду ждать лишь твоей улыбки<br/>
              И буду слушать твои пластинки<br/>
              С твоих ресниц собирать снежинки<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Только ты не будь пока солнцем, слышишь?<br/>
              Я буду петь тебе песни с крыш<br/>
              Я буду снова той, кем ты дышишь<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Я буду ждать лишь твоей улыбки<br/>
              И буду слушать твои пластинки<br/>
              С твоих ресниц собирать снежинки<br/>
              Осталось ветром лишь стать<br/>
              <br/>
              Ветром стать, ветром стать<br/>
              Ветром стать, ветром стать<br/>
              <br/>
              Авторы: Wildways, Marina Sergeevna Maksimova, борисов анатолий анатольевич, пятковский денис владимирович<br/>
              Источник: Musixmatch`,
  },
  {
    "name": "VNV Nation - Illusion",
    "src": "./assets/audio/VNV_Nation-Illusion.mp3",
    "img": "./assets/img/VNV_Nation-Illusion.png",
    "text": `I know it's hard to tell how mixed up you feel<br/>
              Hoping what you need is behind every door<br/>
              Each time you get hurt, I don't want you to change<br/>
              Because everyone has hopes, you're human after all<br/>
              The feeling sometimes, wishing you were someone else<br/>
              Feeling as though you never belong<br/>
              This feeling is not sadness, this feeling is not joy<br/>
              I truly understand, please, don't cry now<br/>
              <br/>
              Please don't go, I want you to stay<br/>
              I'm begging you please, please don't leave here<br/>
              I don't want you to hate<br/>
              For all the hurt that you feel<br/>
              <br/>
              The world is just illusion, trying to change you<br/>
              <br/>
              Being like you are<br/>
              Well this is something else, who would comprehend?<br/>
              But some that do, lay claim<br/>
              Divine purpose blesses them<br/>
              That's not what I believe, and it doesn't matter anyway<br/>
              A part of your soul ties you to the next world<br/>
              Or maybe to the last, but I'm still not sure<br/>
              <br/>
              But what I do know, is to us the world is different<br/>
              As we are to the world but I guess you would know that<br/>
              <br/>
              Please don't go, I want you to stay<br/>
              I'm begging you please, please don't leave here<br/>
              I don't want you to hate for all the hurt that you feel<br/>
              The world is just illusion trying to change you<br/>
              Please don't go, I want you to stay<br/>
              I'm begging you please, oh please don't leave here<br/>
              <br/>
              I don't want you to change<br/>
              For all the hurt that you feel<br/>
              This world is just illusion, always trying to change you<br/>
              <br/>
              Please don't go, I want you to stay<br/>
              I'm begging you please, please don't leave here<br/>
              I don't want you to hate for all the hurt that you feel<br/>
              The world is just illusion trying to change you<br/>
              Please don't go, I want you to stay<br/>
              I'm begging you please, oh please don't leave here<br/>
              I don't want you to change<br/>
              For all the hurt that you feel<br/>
              This world is just illusion, always trying to change you<br/>
              <br/>
              Авторы: VNV Nation, Vitalij Kuprij<br/>
              Источник: Musixmatch`,
  },
  {
    "name": "U-Topia - Highway to Рай",
    "src": "./assets/audio/U-Topia - Highway to Рай.mp3",
    "img": "./assets/img/U-Topia - Highway to Рай.png",
    "text": `In this darkness<br/>
              Where hope's no more<br/>
              I plead<br/>
              Hear me now<br/>
              <br/>
              Ooh my Lord<br/>
              Ooh my God<br/>
              Ooh my Lord<br/>
              Oh my God<br/>
              <br/>
              Through trials fierce and battles long, where hearts are weak but spirits strong<br/>
              We march ahead, a faithful throng, to where we truly belong<br/>
              Hand in hand, side by side, in His love, we abide<br/>
              Ooh darkness fades when we proclaim, the mighty power of His name<br/>
              <br/>
              Ooh my Lord<br/>
              Ooh my God<br/>
              Ooh my Lord<br/>
              Oh my God<br/>
              Ooh my Lord<br/>
              Ooh my God<br/>
              Ooh my Lord<br/>
              Oh my God<br/>
              <br/>
              I'm back, this time there's no defeat<br/>
              In cauldrons, forever you'll feel the hеat<br/>
              While I'll be herе, playing metal so sweet<br/>
              I'll shred the strings<br/>
              Damn, don't fucking exorcise me<br/>
              <br/>
              Ooh my Lord<br/>
              Ooh my God<br/>
              Ooh my Lord<br/>
              Oh my God<br/>
              Ooh my Lord<br/>
              Ooh my God<br/>
              Ooh my Lord<br/>
              Oh my God<br/>
              <br/>
              Авторы: Евгений Попадинец, Kirill Babiev, U-TOPIA<br/>
              Источник: Musixmatch`,
  },
  {
    "name": "The Rolling Stones - Paint It Black",
    "src": "./assets/audio/The Rolling Stones - Paint It Black.mp3",
    "img": "./assets/img/The Rolling Stones - Paint It Black.png",
    "text": `I see a red door and I want it painted black<br/>
            No colors anymore, I want them to turn black<br/>
            I see the girls walk by, dressed in their summer clothes<br/>
            I have to turn my head until my darkness goes<br/>
            <br/>
            I see a line of cars, and they're all painted black<br/>
            With flowers and my love both never to come back<br/>
            I see people turn their heads and quickly look away<br/>
            Like a newborn baby, it just happens every day<br/>
            <br/>
            I look inside myself and see my heart is black<br/>
            I see my red door, I must have it painted black<br/>
            Maybe then I'll fade away and not have to face the facts<br/>
            It's not easy facing up when your whole world is black<br/>
            <br/>
            No more will my green sea go turn a deeper blue<br/>
            I could not foresee this thing happening to you<br/>
            If I look hard enough into the setting sun<br/>
            My love will laugh with me before the morning comes<br/>
            <br/>
            I see a red door and I want it painted black<br/>
            No colors anymore, I want them to turn black<br/>
            I see the girls walk by, dressed in their summer clothes<br/>
            I have to turn my head until my darkness goes<br/>
            <br/>
            I wanna see it painted, painted black<br/>
            Black as night, black as coal<br/>
            I wanna see the sun blotted out from the sky<br/>
            I wanna see it painted, painted, painted, painted black<br/>
            Yeah!<br/>
            <br/>
            Авторы: Keith Richards, Mick Jagger, The Rolling Stones<br/>
            Источник: Musixmatch`,
  },
  {
    "name": "Король и Шут - Дурак и молния",
    "src": "./assets/audio/Король и Шут - Дурак и молния.mp3",
    "img": "./assets/img/Король и Шут - Дурак и молния.png",
    "text": `Грохочет гром<br/>
            Сверкает молния в ночи<br/>
            А на холме стоит безумец и кричит<br/>
            "Сейчас поймаю тебя в сумку<br/>
            И сверкать ты будешь в ней<br/>
            Мне так хочется, чтоб стала ты моей!"<br/>
            <br/>
            То парень к лесу мчится<br/>
            То к полю, то к ручью<br/>
            Всё поймать стремится<br/>
            Молнию!<br/>
            <br/>
            Весь сельский люд<br/>
            Смотреть на это выходил<br/>
            Как на холме безумец бегал и чудил<br/>
            Он, видно, в ссоре с головою<br/>
            Видно, сам себе он враг<br/>
            Надо-ж выдумать такое — во дурак!<br/>
            <br/>
            То парень к лесу мчится<br/>
            То к полю, то к ручью<br/>
            Всё поймать стремится<br/>
            Молнию!<br/>
            <br/>
            Утром по сельской дороге<br/>
            Медленно шёл ночной герой<br/>
            Весь лохматый и седой<br/>
            И улыбался<br/>
            <br/>
            То парень к лесу мчится<br/>
            То к полю, то к ручью<br/>
            Всё поймать стремится<br/>
            Молнию!<br/>
            <br/>
            Авторы: Михаил «Горшок» Горшенёв, Король и Шут, Андрей «Князь» Князев<br/>
            Источник: Musixmatch`,
  },
  {
    "name": "Tolan Shaw - Gold",
    "src": "./assets/audio/Tolan Shaw - Gold.mp3",
    "img": "./assets/img/Tolan Shaw - Gold.png",
    "text": `Two things that you should know about me<br/>
            I'll treat your heart so tenderly<br/>
            Lay gifts of love down at your feet<br/>
            Come take my hand and you will see<br/>
            A little bit of romance in every little moment<br/>
            <br/>
            Good as gold<br/>
            Trade you all my money for your gold<br/>
            Worship you 'cause honey you're like gold<br/>
            You'll be my queen<br/>
            Worth your weight in gold<br/>
            You're good as gold<br/>
            <br/>
            Everyone wants a love that shines<br/>
            But such a treasure's hard to find<br/>
            More precious than a downtland mine, girl<br/>
            I'll cherish you if you'll be mine<br/>
            I will be your rich man, if you would take my hand<br/>
            <br/>
            Good as gold<br/>
            Trade you all my money for your gold<br/>
            Worship you 'cause honey you're like gold<br/>
            You'll be my queen<br/>
            Worth your weight in gold<br/>
            <br/>
            Copper, silver, energy<br/>
            All those things I'd surely trade<br/>
            Give them all away to make you mine<br/>
            <br/>
            Gold<br/>
            Trade you all my money for your gold<br/>
            Worship you 'cause honey you're like gold<br/>
            You'll be my queen<br/>
            Worth your weight in gold<br/>
            You're good as gold<br/>
            <br/>
            Good as gold<br/>
            <br/>
            Good as gold<br/>
            You're good as gold<br/>
            You're good as gold<br/>
            <br/>
            Авторы: Cory Williams, Tolan Shaw, Matthew Frank Lara, Jaidan Tyler Millar<br/>
            Источник: Musixmatch`,
  },
];


document.addEventListener('DOMContentLoaded', function() {
  audio.src = musicJson[0].src;
  audio.load();
})


class ModalWindow {
  
  constructor() {
    this.overlay = '';
    this.modal = '';
    this.modalContent = '';
    this.modalCloseButton = '';
  }

  bildModalWindow(content) {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal__wrapper');

    this.modalCloseButton = document.createElement('button');
    this.modalCloseButton.classList.add('modal__close-button');

    this.setContent(content);
    this.appendModalElements();
    this.buildEvents();
    this.openModal();
  }

  setContent(content) {
    if (typeof content === 'string') {
      this.modalContent.innerHtml = content;
    } else {
      this.modalContent.innerHTML = '';
      this.modalContent.appendChild(content);
    }        
  }

  appendModalElements() {    
    this.modal.append(this.modalContent);
    this.modal.append(this.modalCloseButton);
    this.overlay.append(this.modal);
  }

  buildEvents() {
    this.modalCloseButton.addEventListener("click", this.closeModal);
    this.overlay.addEventListener("click", this.closeModal);
  }

  openModal() {
    document.body.append(this.overlay); 
  }

  closeModal(e) {
    let target = e.target.classList;
    if (target.contains('overlay') || target.contains('modal__close-button')) {
      let overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove();
      }
      document.body.classList.remove('body__no-scroll');
    }
  }

  generateModalCardTemplate(text) {
    let template = '';
    let modal = document.createElement('div');
    modal.className = 'modal__content';

    template += `<div class="modal__inner">`;
    
    template += `<div class="modal__text">`;

    template += `<h3 class="modal__description">${text}</h3>`;
    template += `</div>`;

    template += `</div>`;
    template += `</div>`;
    template += `</div>`;

    template += `</div>`;
    template += `</div>`;
    modal.innerHTML = template;
    return modal;
  }

  renderModal(text) {  
    let content = this.generateModalCardTemplate(text);
    this.bildModalWindow(content);
  }
}

const modalWindow = new ModalWindow();

const buttons = document.querySelector('.btn-modal');  
buttons.addEventListener("click", (event) => { 
  if (event.currentTarget.closest('.btn-modal')) {
    document.body.classList.toggle('body__no-scroll');
    modalWindow.renderModal(musicJson[iterator].text);
  }
})

function convertTimeMusic(duration) {
  let min = Math.floor(duration / 60);
  let sec = Math.trunc(duration - (min * 60));
  if (sec < 10) {
    return `${min}:0${sec}`;
  } else {
    return `${min}:${sec}`;
  }
}

function durationMusic() {
  audio.onloadeddata = function(e) {
    durationMusicEnd.innerHTML = convertTimeMusic(audio.duration);
  }
  durationMusicCurrent.innerHTML = convertTimeMusic(currentMusicTime);
  progressBar.style.width = `${Math.trunc((currentMusicTime * 100) / audio.duration)}%`;
}

setInterval( function() {
  durationMusic();
  currentMusicTime = audio.currentTime;
}, 1000); 

function playMusic() {
  audio.src = musicJson[iterator].src;
  audio.currentTime = currentMusicTime;
  audio.play();  
  btnMusic.classList.add('pause');
}

function stopMisic() {
  currentMusicTime = audio.currentTime;
  audio.pause();
  btnMusic.classList.remove('pause');
}

function toggleMusicPlayPause() {
  if (!flag) {
    playMusic();
    flag = true;
  } else {
    stopMisic();
    flag = false;
  }
}

btnMusic.addEventListener('click', function(e) {
  toggleMusicPlayPause();
});

function switchImg(name, src, img) {
  if (src === undefined && img === undefined) {
    src = "./assets/audio/Wildways-BecomeTheWind.mp3";
    img = "./assets/img/Wildways-BecomeTheWind.png";
    playerImg.src = img;
    audio.src = src;
    imgBg.src  = img;
  } else {    
      playerImg.src = img;
      audio.src = src;
      imgBg.src  = img;
      playerTitle.innerHTML = name;
      audio.currentTime = 0;
  }
}

function nextMusic(i) {
  let name = musicJson[i].name;
  let src = musicJson[i].src;
  let img = musicJson[i].img;
  switchImg(name, src, img);
  btnMusic.classList.remove('pause');

  audio.src = musicJson[iterator].src;
};

nextButton.addEventListener('click', function(e) {
  currentMusicTime = 0;
  iterator++;
  if (iterator >= musicJson.length) {
    iterator = 0;
  }  
  nextMusic(iterator);  
  if (flag) {
    playMusic();
  } else {
    stopMisic();
  }
});

prevButton.addEventListener('click', function(e) {
  currentMusicTime = 0;
  iterator--;
  if (iterator < 0) {
    iterator = musicJson.length - 1;
  }   
  nextMusic(iterator);  
  if (flag) {
    playMusic();
  } else {
    stopMisic();
  }
});

const load = document.querySelector('.btn-download');

load.addEventListener('click', function(e) {
  setDownloadLink();
})

function setDownloadLink() {
  load.href = musicJson[iterator].src;
  load.download = musicJson[iterator].name;
}

turnOff.addEventListener('click', function(e) {
  turnOff.classList.toggle('turn-off');
  if (audioValueSound) {
    audio.volume = 0;
    audioValueSound = false;
  } else {
    audio.volume = 1;
    audioValueSound = true;
  }
});