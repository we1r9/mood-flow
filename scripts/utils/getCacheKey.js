// Формирует ключ для кэширования данных карточки настроения
export function getCacheKey(mood) {
  return `moodCard-${mood}`;
}