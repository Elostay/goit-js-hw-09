import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const currentDate = new Date();
console.log('💖 ~ currentDate:', currentDate);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    timeBeforeDateAlert(selectedDates);
  },
};

const timerBox = document.querySelector('.timer');

timerBox.style.display = 'flex';
timerBox.style.marginTop = '20px';
timerBox.style.gap = '20px';

flatpickr(datetimePicker, options);

function timeBeforeDateAlert(selectedDates) {
  if (selectedDates < currentDate || selectedDates === currentDate) {
    alert('Будь ласка введіть майбутню дату');
  }
}
