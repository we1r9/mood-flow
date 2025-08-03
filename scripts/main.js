// import utilities for populating header (city & date)
import { getCity } from './utils/location.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

// init city and date for header
function initHeader() {
  // city: get from localStorage or request
  const cachedCity = localStorage.getItem('city');
  const locationElement = document.querySelector('.current-location');

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else {
    locationElement.textContent = 'Loading...';
    getCity(); // updates .current-location and writes to localStorage
  }

  // data: format via dayjs
  const dateElement = document.querySelector(".current-date");
  dateElement.textContent = dayjs().format('ddd, MMM D');
}

// call after imports
initHeader();

// load page first
loadPage();

// mood selection state & elements
let selectedMood = null;
const moodButtons = document.querySelectorAll('.mood-card');
const startButton = document.querySelector('.mood-start');

// initially hide start button
startButton.classList.add('hidden');

// add click listeners to each mood button
moodButtons.forEach(button => {
  button.addEventListener('click', () => {

    // save the selected mood from data attribute
    selectedMood = button.dataset.mood;

    // unhide the start button
    startButton.classList.remove('hidden');

    // visually mark only this button as active
     moodButtons.forEach(button => button.classList.remove('active'));
     button.classList.add('active');
  });
});

// start button click handler: check if the mood is selected, go to the result page with mood parameter
startButton.addEventListener('click', () => {
  if (!selectedMood) {
    console.warn('Please select the mood before starting.');
    return;
  }

  // redirect to result page with the chosen mood in query string
  window.location.href = `result.html?mood=${selectedMood}`;
});

// render the main mood-selection interface into .content: page title, six mood buttons with data-mood attributes and hidden "Start the day!" button
function loadPage() {
  const contentElement = document.querySelector('.content');

  contentElement.innerHTML = `
    <h1 class="mood-title">How do you feel today?</h1>

    <div class="mood">
      <div class="mood-grid">
        <button type="button"
                class="btn btn-secondary mood-card"
                data-mood="happy">
          <img class="mood-icon" src="images/grinning-face.png">
        </button>
        <button type="button" 
                class="btn btn-secondary mood-card"
                data-mood="nerdy">
          <img class="mood-icon" src="images/nerd-face.png">
        </button>
        <button type="button" 
                class="btn btn-secondary mood-card"
                data-mood="angry">
          <img class="mood-icon" src="images/face-with-symbols-on-mouth.png">
        </button>
        <button type="button" 
                class="btn btn-secondary mood-card"
                data-mood="peaceful">
          <img class="mood-icon" src="images/smiling-face-with-halo.png">
        </button>
        <button type="button" 
                class="btn btn-secondary mood-card"
                data-mood="cool">
          <img class="mood-icon" src="images/smiling-face-with-sunglasses.png">
        </button>
        <button type="button" 
                class="btn btn-secondary mood-card"
                data-mood="emotional">
          <img class="mood-icon" src="images/loudly-crying-face.png">
        </button>
      </div>

      <!-- stays hidden until a mood is selected -->
      <button class="btn btn-secondary mood-start hidden">Start the day!</button>
    </div>
  `;
}