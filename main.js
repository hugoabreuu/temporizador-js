
const html = document.querySelector('html');
const buttonsMode = document.querySelectorAll('.app__card-button');
const backGroundImage = document.querySelector('.app__image');
const h1Text = document.querySelector('.app__title');
const divTimer = document.querySelector('#timer');
const setMusic = document.querySelector('#alternar-musica');
const btnStartOrPause = document.querySelector('#start-pause');
const imageBtnStartPause = btnStartOrPause.children[0];
const spanBtnStartPause = btnStartOrPause.children[1];

const relaxMusic = new Audio('/sons/luna-rise-part-one.mp3');
const playTemp = new Audio('/sons/play.wav');
const pauseTemp = new Audio('/sons/pause.mp3');
const alarmSound = new Audio('/sons/beep.mp3');
const totalVolume = 0.3;

let intervalId = null;
let totalTemp = 0;
let count = 0;
let isAddTime = false;

relaxMusic.volume = totalVolume;
playTemp.volume = totalVolume;
pauseTemp.volume = totalVolume;

const texts = {
    foco: {
        h1: 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa</strong>',
        time: 25 * 60
    },
    descanso_curto: {
        h1: 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>',
        time: 5 * 60
    },
    descanso_longo: {
        h1: 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>',
        time: 15 * 60
    }
}

buttonsMode[0].classList.add('active');
h1Text.innerHTML = texts.foco.h1;
setTimer(texts.foco.time);
totalTemp = texts.foco.time;

setMusic.addEventListener('change', () => {
    relaxMusic.paused ? relaxMusic.play() : relaxMusic.pause();
});

btnStartOrPause.addEventListener('click', () => {
    setBtnStartPause();
})

for (i = 0; i < buttonsMode.length; i++) {
    const button = buttonsMode[i];
    button.addEventListener('click', () => {
        removeActive();
        button.classList.add('active');
        const context = button.getAttribute('data-contexto');
        switchImage(context);
        h1Text.innerHTML = texts[context.replace('-', '_')].h1
        const contextSeconds = texts[context.replace('-', '_')].time;
        setTimer(contextSeconds);
        totalTemp = contextSeconds;

        if (intervalId) {
            stopTemp();
        }
    });
}
function setTimer(seconds) {
    const date = new Date(seconds * 1000);
    const dateString = date.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' });
    divTimer.innerHTML = dateString;
}
function removeActive() {
    for (i = 0; i < buttonsMode.length; i++) {
        const btn = buttonsMode[i];
        btn.classList.remove('active');
    }
}
function switchImage(context) {
    backGroundImage.setAttribute('src', `/imagens/${context}.png`);
    html.setAttribute('data-contexto', `${context}`)
}
function setBtnStartPause() {
    if (!alarmSound.paused) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
    btnPlay = intervalId == null;
    btnPlay ? setTemp() : stopTemp();    
}
function setTemp() {
    playTemp.play();
    isAddTime = true;
    imageBtnStartPause.setAttribute('src', '/imagens/pause.png');
    spanBtnStartPause.textContent = 'Pausar'
    intervalId = setInterval(descTemp, 1000);
}
function descTemp() {
    debugger;
    if (isAddTime) {
        count = totalTemp;
        isAddTime = false;
    }
    if (count == 0) {
        alarm();
        return;
    }
    count--;
    console.log(count)
    setTimer(count);
    return;
}
function stopTemp() {
    pauseTemp.play();
    imageBtnStartPause.setAttribute('src', '/imagens/play_arrow.png');
    spanBtnStartPause.textContent = 'Começar';
    clearInterval(intervalId);
    intervalId = null;
}
function alarm(){
    alarmSound.play();
    stopTemp();
    setTimer(totalTemp);
}

