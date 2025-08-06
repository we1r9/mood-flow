// import utilities for populating header (city & date)
import { getCity, toggleGeoAccess, tryRequestGeo } from './utils/location.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';
import { initModalWindow } from './utils/modal-window.js';
import { titles } from '../data/titles.js';
import { getRandomItem } from './utils/getRandomItem.js'
import { getCacheKey } from './utils/getCacheKey.js';
import { showEnableGeoHint } from './utils/location.js';

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

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else if (denied) {
    locationElement.textContent = '';
  } else {
    locationElement.textContent = '';
  }

  // находим кнопку для смены доступа к гео на странице
  const geoButton = document.querySelector('.change-geo-access-btn');

  // вешаем слушатель клика
  geoButton.addEventListener('click', async () => {
    let permissionState = 'prompt';
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query( { name: 'geolocation'});
        permissionState = status.state;
      } catch {
        permissionState = 'prompt'
      }
    }
    if (permissionState === 'denied') {
      showEnableGeoHint();
      return;
    }

    const denied = localStorage.getItem('geoDenied') === 'true';
    if (denied) {
      locationElement.innerHTML = `
        <div class="sk-flow">
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
        </div>
      `;

      const geoPromise = getCity();
      const delayPromise = new Promise(
        resolve => setTimeout(resolve, 1000));
      Promise.all([geoPromise, delayPromise])
        .then(([city]) => {
          locationElement.textContent = city;
        })
        .catch(error => {
          showEnableGeoHint();
          locationElement.textContent = '';
          locationElement.classList.remove('hidden');
        });
    } else {
      toggleGeoAccess().then(() => {
        locationElement.classList.add('hidden');
        setTimeout(() => {
          locationElement.textContent = '';
          locationElement.classList.remove('hidden');
        }, 300);
      });
    }
  });
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

  // handle click on start button
  startButton.addEventListener('click', () => {
    if (!selectedMood) {
      console.warn('Please select the mood before starting.');
      return;
    }

    const mood = selectedMood;

    // clear previously cached card for this mood
    const cacheKey = getCacheKey(mood);
    sessionStorage.removeItem(cacheKey);

    // navigate to result page with mood as query param
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
      <span class="typewriter">${pageTitle}</span>
    </h1>

    <div class="mood">
      <div class="mood-grid">
        <button type="button"
                class="mood-card test-card"
                data-mood="happy">
          <img class="mood-icon" src="images/grinning-face.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="nerdy">
          <img class="mood-icon" src="images/nerd-face.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="angry">
          <img class="mood-icon" src="images/face-with-symbols-on-mouth.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="peaceful">
          <img class="mood-icon" src="images/smiling-face-with-halo.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="cool">
          <img class="mood-icon" src="images/smiling-face-with-sunglasses.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="emotional">
          <img class="mood-icon" src="images/loudly-crying-face.png">
        </button>
      </div>

      <!-- stays hidden until a mood is selected -->
      <button class="mood-start hidden">Create card</button>
    </div>
  `;

  function titleTypewriter() {
    const typewriterEl = document.querySelector('.typewriter');
    const fullText = typewriterEl.textContent.trim();
    typewriterEl.textContent = '';

    let index = 0;
    function typeNextChar() {
      if (index < fullText.length) {
        typewriterEl.textContent += fullText[index];
        index++;
        setTimeout(typeNextChar, 90);
      } else {
        typewriterEl.classList.add('blinking');
      }
    }
    typeNextChar();
  }
  titleTypewriter();
}