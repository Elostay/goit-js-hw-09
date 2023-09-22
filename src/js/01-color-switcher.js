const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let Interval = null;

stopBtn.disabled = true;

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  Interval = setInterval(changeBodyColor, 1000);
}
function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}
function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(Interval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
