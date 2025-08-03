// import utilities for populating header (city & date)
import { getCity } from './utils/location.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';
import { initModalWindow } from './utils/modal-window.js';
import { titles } from '../data/titles.js';
import { getRandomItem } from './utils/getRandomItem.js'

// initialize main page logic: layout, mood selection, header setup, and geolocation modal handling
document.addEventListener('DOMContentLoaded', () => {
  loadPage();
  initMoodSelection();
  initHeader();
  initModalWindow(
    () => getCity(),
    () => {}
  );
});

// display current date and user city in the header
function initHeader() {
  // data: format via dayjs
  const dateElement = document.querySelector(".current-date");
  dateElement.textContent = dayjs().format('ddd, MMM D');

  // handle location display based on localStorage and geolocation status
  const locationElement = document.querySelector('.current-location');
  const cachedCity = localStorage.getItem('city');
  const denied = localStorage.getItem('geoDenied');
  const shown = localStorage.getItem('modalShown');

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else if (denied) {
    locationElement.textContent = '';
  } else if (!shown) {
    locationElement.textContent = '';
  } else {
    locationElement.textContent = 'Loading';
    getCity();
  }
}

// handle mood selection and redirect to result page with selected mood
function initMoodSelection() {
  const moodButtons = document.querySelectorAll('.mood-card');
  const startButton = document.querySelector('.mood-start');
  let selectedMood = null;

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
}

// render the main mood-selection interface into .content: page title, six mood buttons with data-mood attributes and hidden "Start the day!" button
function loadPage() {
  const contentElement = document.querySelector('.content');

  // generate random title
  const pageTitle = getRandomItem(titles);

  contentElement.innerHTML = `
    <h1 class="mood-title">
      ${pageTitle}
    </h1>

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