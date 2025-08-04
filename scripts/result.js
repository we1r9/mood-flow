// import utilities for mood data, weather, city and date formatting
import { getMood } from './utils/getMood.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCity } from './utils/location.js';
import { getWeather } from './utils/getWeather.js';
import { getCacheKey } from './utils/getCacheKey.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

(async function init() {
  // parse mood from URL query string
  const params = new URLSearchParams(window.location.search);
  const mood = params.get('mood');

  // redirect back if missing or invalid
  if (!mood) {
    window.location.href = 'index.html';
  }

  // city display: if a city is cached in localStorage, show it, otherwise, show a loading state and trigger geolocation lookup
  const locationElement = document.querySelector('.current-location');
  const cachedCity = localStorage.getItem('city');
  const denied = localStorage.getItem('geoDenied');

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else if (denied) {
    locationElement.textContent = '';
  } else {
    locationElement.textContent = 'Loading';
    getCity();
  }

  // parse the cache-key and check cache
  const cacheKey = getCacheKey(mood);
  const savedKey = sessionStorage.getItem(cacheKey);
  if (savedKey) {
    const { cardData, weatherData } = JSON.parse(savedKey);
    renderCard(cardData, weatherData, denied, cacheKey);
    return;
  } 

  sessionStorage.removeItem(cacheKey + '_opened');

  // load current weather and store it in weatherData
  const weatherData = await fetchWeatherData();

  // generate card data
  const cardData = prepareCardData(mood);

  if (!cardData) {
    return window.location.href = 'index.html';
  }

  // save data to sessionStorage
  sessionStorage.setItem(cacheKey, JSON.stringify({
    cardData,
    weatherData
  }));

  // render card itself
  renderCard(cardData, weatherData, denied, cacheKey);

  // request current weather via getWeather() and return weatherData object
  async function fetchWeatherData() {
    if (!denied) {
      try {
        const { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        } = await getWeather();

        // debug logs
        console.log(`${temperatureCelsius} \u2103`, weatherDescription, weatherCode, observationTime);

        return { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        };

      } catch (error) {
        console.error('Failed to load weather data:', error);

        // return error values
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

  // prepare the data needed to render the mood card
  // moodId – identifier of the selected mood
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
})();

// render the mood result card into the DOM
function renderCard(cardData, weatherData, denied, cacheKey) {
  // prepare data with sensible defaults 
  const today = dayjs().format('ddd, MMM D');
  const { 
    temperatureCelsius = 'N/A',
    weatherDescription = 'Unavailable'
  } = weatherData;
  const { message, track } = cardData;

  // render result card HTML with or without weather block based on geolocation permission
  if (!denied) {
    // user allowed geolocation — show weather in result card
    const html = `
      <div class="card-wrapper">
        <div class="card-content blurred">
          <div class="current-date-card">
            ${today}
          </div>

          <div class="result-weather">
            It's ${temperatureCelsius} \u2103 now. ${weatherDescription}.
          </div>

          <div class="result-cover">
            <img class="cover"
              src="${track.cover}"
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
        </div>

        <button class="btn btn-secondary open-card-button">Open card</button>
      </div>
    `;

    // insert into the page
    const cardElement = document.querySelector('.result-card');
    cardElement.innerHTML = html;

    // find "Open card" button on the page 
    const openCardButton = document.querySelector('.open-card-button');
    const wrapper = document.querySelector('.card-content');

    // check if this mood card has been opened before
    const opened = sessionStorage.getItem(cacheKey + '_opened') === 'true';

    // if the card has already been opened before, immediately remove the blur and hide the button
    if (opened) {
      wrapper.classList.remove('blurred');
      openCardButton.style.display = 'none';
    }

    // attach a handler to the "Open card" button
    openCardButton.addEventListener('click', () => {

      // remove blur and hide the button
      wrapper.classList.remove('blurred');
      openCardButton.style.display = 'none';

      // save the flag in sessionStorage so that the card remains open when updating
      sessionStorage.setItem(cacheKey + '_opened', true);
    });

  } else {
    // geolocation denied — render result card without weather
    const html = `
      <div class="card-wrapper">
        <div class="card-content blurred">
          <div class="current-date-card">
            ${today}
          </div>

          <div class="result-cover">
            <img class="cover"
              src="${track.cover}"
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
        </div>

        <button class="btn btn-secondary open-card-button">Open card</button>
      </div>
    `;

    // insert into the page
    const cardElement = document.querySelector('.result-card');
    cardElement.innerHTML = html;

    // check if this mood card has been opened before
    const opened = sessionStorage.getItem(cacheKey + '_opened') === 'true';

    // if the card has already been opened before, immediately remove the blur and hide the button
    if (opened) {
      wrapper.classList.remove('blurred');
      openCardButton.style.display = 'none';
    }

    // attach a handler to the "Open card" button
    openCardButton.addEventListener('click', () => {

      // remove blur and hide the button
      wrapper.classList.remove('blurred');
      openCardButton.style.display = 'none';

      // save the flag in sessionStorage so that the card remains open when updating
      sessionStorage.setItem(cacheKey + '_opened', true);
    });
  }
}