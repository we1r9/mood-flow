import { getMood } from './utils/getMood.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCity } from './utils/location.js';
import { getWeather } from './utils/getWeather.js';
import { getCacheKey } from './utils/getCacheKey.js';
import './vendor/dayjs.min.js';

(async function init() {
  const params = new URLSearchParams(window.location.search);
  const mood = params.get('mood');

  if (!mood) {
    window.location.href = 'index.html';
    return;
  }

  const locationElement = document.querySelector('.current-location');
  const cachedCity = localStorage.getItem('city');
  if (!locationElement) return;

  const denied = localStorage.getItem('geoDenied') === 'true';

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else if (denied) {
    locationElement.textContent = '';
  } else {
    locationElement.innerHTML = `
      <div class="sk-flow">
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
      </div>
    `;

    setTimeout(() => {
      getCity().catch(() => {});
    }, 1000);
  }

  const cacheKey = getCacheKey(mood);

  const savedKey = sessionStorage.getItem(cacheKey);

  if (savedKey) {
    const { cardData, weatherData } = JSON.parse(savedKey);
    renderCard(cardData, weatherData, denied, cacheKey);
    return;
  } 

  sessionStorage.removeItem(cacheKey + '_opened');

  const cardData = prepareCardData(mood);
  if (!cardData) {
    window.location.href = 'index.html';
    return;
  }

  const weatherData = await fetchWeatherData();

  sessionStorage.setItem(cacheKey, JSON.stringify({
    cardData,
    weatherData
  }));

  renderCard(cardData, weatherData, denied, cacheKey);

  function prepareCardData(moodId) {
    const moodObject = getMood(moodId);
    if(!moodObject) {
      console.warn(`Mood "${moodId}" not found.`);
      return null;
    }
    return { 
      message: getRandomItem(moodObject.messages),
      track: getRandomItem(moodObject.tracks)
    };
  }

  async function fetchWeatherData() {
    if (!denied) {
      try {
        const { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        } = await getWeather();


        return { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        };
      } catch (error) {
        console.error('Failed to load weather data:', error);
        return {
          temperatureCelsius: null,
          weatherDescription: 'Unavailable',
          weatherCode: null,
          observationTime: null
        };
      }
    } else {
      return {
        temperatureCelsius: null,
        weatherDescription: 'Unavailable',
        weatherCode: null,
        observationTime: null
      };
    }
  }
})();

function renderCard(cardData, weatherData, denied, cacheKey) {
  const today = dayjs().format('dddd, MMM D');
  const {
    temperatureCelsius = 'N/A',
    weatherDescription = 'Unavailable'
  } = weatherData;
  const { message, track } = cardData;

  const weatherBlock = !denied
    ? `<div class="result-weather">It's ${temperatureCelsius} \u2103 now. ${weatherDescription}.</div>`
    : '';

  const cardElement = document.querySelector('.result-card');
  cardElement.innerHTML = `
    <div class="card-content">
      <div class="current-date-card${denied ? ' no-weather-date' : ''}">
        ${today}
      </div>

      ${weatherBlock}

      <div class="result-cover">
        <img class="cover"
          src="${track.cover}"
          alt="${track.title} by ${track.artist}"
        >
      </div>

      <div class="result-title">
        ${track.title}
      </div>

      <div class="result-artist">
        ${track.artist}
      </div>

      <div class="result-message">
        ${message}
      </div>

      <div>
        <a class="spotify-button" href="${track.link}" target="_blank" rel="noopener noreferrer">
          <img class="spotify-icon" src="images/spotify.png" alt="Listen on Spotify">
        </a>
      </div>
    </div>
  `;

  const openCardButton = document.querySelector('.open-card-button');
  const opened = sessionStorage.getItem(cacheKey + '_opened') === 'true';

  if (opened) {
    cardElement.classList.add('visible');
    openCardButton.classList.add('hidden');
  }

  function openCard() {
    cardElement.classList.remove('visible');
    requestAnimationFrame(() => {
      cardElement.classList.add('visible');
    });
    openCardButton.classList.add('hidden');
    sessionStorage.setItem(cacheKey + '_opened', true);
  }

  openCardButton.addEventListener('click', openCard);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      openCard();
    }
  });
}
