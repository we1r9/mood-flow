import './vendor/dayjs.min.js';
import { getCity, toggleGeoAccess, showEnableGeoHint } from './utils/location.js';
import { initModalWindow } from './utils/modal-window.js';
import { titles } from '../data/titles.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCacheKey } from './utils/getCacheKey.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  loadPage();
  initMoodSelection();
  initHeader();
  initModalWindow(
    () => getCity(),
    () => {}
  );
}

function initHeader() {
  const dateElement = document.querySelector('.current-date');
  const locationElement = document.querySelector('.current-location');

  if (!dateElement || !locationElement) return;

  dateElement.textContent = dayjs().format('ddd, MMM D');

  const cachedCity = localStorage.getItem('city');

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else {
    locationElement.textContent = '';
  }

  const geoButton = document.querySelector('.change-geo-access-btn');

  if (!geoButton) return;

  geoButton.addEventListener('click', async () => {
    let permissionState;
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query( { name: 'geolocation'});
        permissionState = status.state;
      } catch {
        permissionState = 'prompt';
      }
    }

    if (permissionState === 'denied') {
      locationElement.textContent = '';
      showEnableGeoHint();
      return;
    }

    const deniedFlag = localStorage.getItem('geoDenied') === 'true';

    if (deniedFlag) {
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

function initMoodSelection() {
  const moodButtons = document.querySelectorAll('.mood-card');
  const startButton = document.querySelector('.mood-start');

  let selectedMood = null;

  if (!moodButtons.length || !startButton) return;

  startButton.classList.add('hidden');

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedMood = button.dataset.mood;

      startButton.classList.remove('hidden');

      moodButtons.forEach(btn => btn.classList.remove('active'));
      
      button.classList.add('active');
    });
  });

  startButton.addEventListener('click', () => {
    const mood = selectedMood;

    if (!selectedMood) return;

    const cacheKey = getCacheKey(mood);
    sessionStorage.removeItem(cacheKey);

    window.location.href = `result.html?mood=${selectedMood}`;
  });
}

function loadPage() {
  const contentElement = document.querySelector('.content');

  const pageTitle = getRandomItem(titles);

  contentElement.innerHTML = `
    <h1 class="mood-title">
      <span class="typewriter">${pageTitle}</span>
    </h1>

    <div class="mood fade-in">
      <div class="mood-grid">
        <button type="button"
                class="mood-card"
                data-mood="excited">
          <img class="mood-icon" src="images/excited.png" alt="Excited">
        </button>
        <button type="button"
                class="mood-card"
                data-mood="naughty">
          <img class="mood-icon" src="images/naughty.png" alt="Naughty">
        </button>
        <button type="button"
                class="mood-card"
                data-mood="mischievous">
          <img class="mood-icon" src="images/mischievous.png" alt="Mischievous">
        </button>
        <button type="button"
                class="mood-card"
                data-mood="nerdy">
          <img class="mood-icon" src="images/nerdy.png" alt="Nerdy">
        </button>
        <button type="button"
                class="mood-card"
                data-mood="peaceful">
          <img class="mood-icon" src="images/peaceful.png" alt="Peaceful">
        </button>
        <button type="button"
                class="mood-card"
                data-mood="despaired">
          <img class="mood-icon" src="images/despaired.png" alt="Despaired">
        </button>
      </div>

      <button type="button" class="mood-start hidden">Create card</button>
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
