import {moods} from "../../data/moods.js";

export function getMood(moodId) {
  let matchingMood = null;

  moods.forEach((mood) => {
    if (mood.id === moodId) {
      matchingMood = mood;
    }
  });

  return matchingMood;
}