import {getMood} from './utils/getMood.js';
import {getRandomItem} from './utils/getRandomItem.js';
import {getWeather} from './utils/getWeather.js';
import {getCity} from './utils/location.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

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

// Weather
getWeather().then(( { temperatureCelsius, weatherDescription }) => {
  console.log(`${temperatureCelsius} \u2103`);
  console.log(weatherDescription);
});

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

// start button listener
startButton.addEventListener('click', () => {
  if (!selectedMood) {
    console.log("Choose the mood first.");
    return;
  }

  // create the card
  const card = createCard(selectedMood);
  console.log(card);
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

  return {
    mood,
    message,
    track
  };
}