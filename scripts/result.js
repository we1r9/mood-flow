// import utilities for mood data, weather, city and date formatting
import { getMood } from './utils/getMood.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCity } from './utils/location.js';
import { getWeather } from './utils/getWeather.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

// parse mood from URL query string and
const params = new URLSearchParams(window.location.search);
const mood = params.get('mood');

// redirect back if missing or invalid
if (!mood) {
  window.location.href = 'index.html';
}

// city display: if a city is cached in localStorage, show it, otherwise, show a loading state and trigger geolocation lookup
const locationElement = document.querySelector(".current-location");
const cachedCity = localStorage.getItem("city");

if (cachedCity) {
  locationElement.textContent = cachedCity;
} else {
  locationElement.textContent = "Loading...";
  getCity();
}

// request current weather via getWeather() and return weatherData object
async function fetchWeatherData() {
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
}

// load current weather and store it in weatherData
const weatherData = await fetchWeatherData();

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

// build card data from URL param
const cardData = prepareCardData(mood);
if (!cardData) {

  // invalid mood → go back to selection
  window.location.href = 'index.html';
} else {
  // proceed to render once weatherData is ready
  renderCard(cardData, weatherData);
}

// render the mood result card into the DOM
function renderCard(cardData, weatherData) {
  // prepare data with sensible defaults 
  const today = dayjs().format('ddd, MMM D');
  const { 
    temperatureCelsius = 'N/A',
    weatherDescription = 'Unavailable'
  } = weatherData;
  const { message, track } = cardData;

  // build HTML
  const html = `
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
  `;

  // insert into the page
  const cardElement = document.querySelector('.result-card');
  cardElement.innerHTML = html;
}