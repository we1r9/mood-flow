export function initModalWindow(onAccept, onDecline) {
  const modal = document.querySelector('.modal');
  const acceptButton = document.querySelector('.accept-button');
  const declineButton = document.querySelector('.decline-button');

  if (!modal || !acceptButton || !declineButton) return;

  if (localStorage.getItem('modalShown')) return;

  function showModal() {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  function hideModal() {
    modal.classList.remove('show');
    modal.addEventListener('transitionend', () => {
      modal.classList.add('hidden');
    }, { once: true });
  }

  showModal();

  acceptButton.addEventListener('click', () => {
    localStorage.setItem('modalShown', 'true');
    localStorage.removeItem('geoDenied');

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

    hideModal();

    setTimeout(() => {
      onAccept();
    }, 1000);
  });

  declineButton.addEventListener('click', () => {
    localStorage.setItem('modalShown', 'true');
    localStorage.setItem('geoDenied', 'true');

    hideModal();
    onDecline();
  });
}
