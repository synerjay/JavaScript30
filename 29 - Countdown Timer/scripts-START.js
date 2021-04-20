let countdown;
const timerDisplay = document.querySelector('.display__time-left');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

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
