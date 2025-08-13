//  Инициализация модального окна запроса геолокации
export function initModalWindow(onAccept, onDecline) {
  const modal = document.querySelector('.modal');
  const acceptButton = document.querySelector('.accept-button');
  const declineButton = document.querySelector('.decline-button');

  // Если на странице нет модалки или кнопок — выходим
  if (!modal || !acceptButton || !declineButton) return;

  // Если модалка уже показывалась ранее — не показываем
  if (localStorage.getItem('modalShown')) return;

  // Показ модалки
  function showModal() {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  // Скрытие модалки
  function hideModal() {
    modal.classList.remove('show');
    modal.addEventListener('transitionend', () => {}, { once: true });
  }

  // Показываем модалку сразу при инициализации
  showModal();

  // Обрабочтик кнопки "Allow"
  acceptButton.addEventListener('click', () => {
    localStorage.setItem('modalShown', 'true');
    localStorage.removeItem('geoDenied');

    // Показываем лоадер в .current-location 
    const locationElement = document.querySelector('.current-location');
    if (locationElement) {
      locationElement.innerHTML = `
        <div class="sk-flow">
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
        </div>
      `;
    }

    // Прячем модалку
    hideModal();

    // Через 1 секунду вызываем логику onAccept
    setTimeout(() => {
      onAccept();
    }, 1000);
  });

  // Обрабочтик кнопки "Decline"
  declineButton.addEventListener('click', () => {
    localStorage.setItem('modalShown', 'true');
    localStorage.setItem('geoDenied', 'true');

    // Прячем модалку
    hideModal();

    // Вызываем логику onDecline
    onDecline();
  });
}