import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

startBtn.addEventListener('click', timeCalculation);

let futureDates;
let selectedDateinSec;
let currentDate;
let dateMinus;
let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDates = selectedDates[0];
    selectedDateinSec = futureDates.getTime();
    currentDate = new Date();
    timeBeforeDateAlert(selectedDateinSec, currentDate);
  },
};
const timerBox = document.querySelector('.timer');

timerBox.style.display = 'flex';
timerBox.style.marginTop = '20px';
timerBox.style.gap = '20px';

flatpickr(datetimePicker, options);

function timeCalculation() {
  startBtn.disabled = true;

  interval = setInterval(() => {
    currentDate = new Date();
    const currentDateInSec = currentDate.getTime();
    dateMinus = selectedDateinSec - currentDateInSec;
    const convertedObj = convertMs(dateMinus);
    days.textContent = convertedObj.days;
    hours.textContent = convertedObj.hours;
    minutes.textContent = convertedObj.minutes;
    seconds.textContent = convertedObj.seconds;
    console.log(dateMinus);
    if (dateMinus <= 1000) {
      clearInterval(interval);
      days.textContent = 0;
      hours.textContent = 0;
      minutes.textContent = 0;
      seconds.textContent = 0;
    }
  }, 1000);
}

function timeBeforeDateAlert(selectedDates, currentDate) {
  if (selectedDates < currentDate || selectedDates === currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
