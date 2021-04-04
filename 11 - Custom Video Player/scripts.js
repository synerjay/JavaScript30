// Workflow

// Step 1: Get elements:

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');

//querySelectorAll -- returns an array
const skipButtons = player.querySelectorAll('[data-skip]'); // returns an array
const ranges = player.querySelectorAll('.player__slider'); // returns an array

//Step 2: Build the functions that will change the elements

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('Update the button');
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // this.name will access the volume and playbackrate property inside the video to change tot the this.value
  video[this.name] = this.value;
  console.log(this.name); // returns either volume or playbackrate
  console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // flex-basis is a property in the progressBar div that shows the percentages of the portion it shows
  // this will correspond to the currentTime of the time over the duration
}

function scrub(e) {
  // progress bar width is found in the progress.offsetWidth
  //e.offsetX is the position of the click event on the progress bar
  console.dir(progress);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

// Step3: Hook up the event listeners:
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // timeupdate event of the video will update the current time of the video

toggle.addEventListener('click', togglePlay);

// Because skipButtons has querySelectorALL it returns an array and must be iterated with forEach method
skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
