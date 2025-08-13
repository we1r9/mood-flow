// Возвращает случайный элемент из переданного массива
export function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}