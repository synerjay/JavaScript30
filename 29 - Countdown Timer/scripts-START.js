let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown); // needs clearInterval to STOP the interval
      return;
    }
    //Display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60); // round to the lower end and ignores the decimal
  const remainderSeconds = seconds % 60; // how many seconds are left if all the minutes are divided equally
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`; // this is so we can have  1:09 instead of 1:9
  timerDisplay.textContent = display;
  document.title = display;
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}
