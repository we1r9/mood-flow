import {getMood} from './utils/getMood.js';
import {getRandomItem} from './utils/getRandomItem.js';

function createCard(moodId) {
  const moodObject = getMood(moodId);

  if(!moodObject) {
    console.warn(`Mood "${moodId}" not found.`);
    return null;
  }

  const message = getRandomItem(moodObject.messages);

  const track = getRandomItem(moodObject.tracks);

  return {
    message,
    track
  };
}

const moodButtons = document.querySelectorAll('.mood-card');

moodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const chosenMood = button.dataset.mood;
    const card = createCard(chosenMood);
    if (card) {
      console.log(card);
    }
  });
});