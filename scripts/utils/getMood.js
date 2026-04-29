import {moods} from "../../data/moods.js";

export function getMood(moodId) {
  return moods.find(mood => mood.id === moodId) ?? null;
}
