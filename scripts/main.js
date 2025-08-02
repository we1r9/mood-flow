import {getMood} from './utils/getMood.js';
import {getRandomItem} from './utils/getRandomItem.js';
import {getWeather} from './utils/getWeather.js';
import {getCity} from './utils/location.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

// load page first
loadPage();

// Location
const cachedCity = localStorage.getItem("city");
const locationElement = document.querySelector(".current-location");

// display location
if (cachedCity) {
  locationElement.textContent = cachedCity;
} else {
  locationElement.textContent = "Loading...";
  getCity();
}

// Date
const dateElement = document.querySelector(".current-date");
const today = dayjs().format('ddd, MMM D');
dateElement.textContent = today;

// Card 
let selectedMood = null;

const moodButtons = document.querySelectorAll('.mood-card');
const startButton = document.querySelector('.mood-start');

// hide start button while loading the page
startButton.classList.add('hidden');

// emoji button listener
moodButtons.forEach(button => {
  button.addEventListener('click', () => {

    // save the user choice
    selectedMood = button.dataset.mood;

    // show start button
    startButton.classList.remove('hidden');

    // update visual state
     moodButtons.forEach(button => button.classList.remove('active'));
     button.classList.add('active');
  });
});

// Weather

// create empty object to store weather data
let weatherData = {
  temperatureCelsius: null,
  weatherDescription: null,
  weatherCode: null
};

async function initWeather() {
  const { temperatureCelsius, weatherDescription, weatherCode } = await getWeather();

  // save weather data
  weatherData = { temperatureCelsius, weatherDescription, weatherCode};

  console.log(`${temperatureCelsius} \u2103`);
  console.log(weatherDescription);
  console.log(weatherCode);
}
initWeather();

// start button listener
startButton.addEventListener('click', () => {
  if (!selectedMood) {
    console.log("Choose the mood first.");
    return;
  }

  // create the card
  const cardInfo = createCard(selectedMood);
  console.log(cardInfo);

  // call this function to prepare card data
  generateCard(cardInfo, weatherData);
});

function createCard(moodId) {
  const moodObject = getMood(moodId);

  if(!moodObject) {
    console.warn(`Mood "${moodId}" not found.`);
    return null;
  }

  const mood = moodObject.id;

  const message = getRandomItem(moodObject.messages);

  const track = getRandomItem(moodObject.tracks);

  return { mood, message, track };
}

// generate card itself
function generateCard(cardInfo, weatherData) {
  const { temperatureCelsius, weatherDescription } = weatherData;
  const { message, track } = cardInfo;

  const cardElement = document.querySelector('.result-card');

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
        class="img-fluid"
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

  cardElement.innerHTML = html;
}

// generate the HTML for whole page except header
function loadPage() {
  const contentElement = document.querySelector('.content');

  const html = `
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
      <button class="btn btn-secondary mood-start hidden">Start the day!</button>
    </div>
  `;

  contentElement.innerHTML = html;
}