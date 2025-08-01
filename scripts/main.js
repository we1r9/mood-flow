import {getMood} from './utils/getMood.js';
import {getRandomItem} from './utils/getRandomItem.js';
import { getLocation } from './utils/getLocation.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

// Location
const cachedCity = localStorage.getItem("city");
const locationElement = document.querySelector(".current-location");

// display location
if (cachedCity) {
  locationElement.textContent = cachedCity;
} else {
  locationElement.textContent = "Loading...";
  getLocation();
}

// Date
const today = dayjs().format('dddd, MMM D');

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