import {moods} from "../../data/moods.js";

// Находит объект настроения по ID
export function getMood(moodId) {
  let matchingMood = null;

  moods.forEach((mood) => {
    if (mood.id === moodId) {
      matchingMood = mood;
    }
  });

  return matchingMood;
}