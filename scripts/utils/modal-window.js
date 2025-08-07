// handles displaying a custom modal window asking the user to allow geolocation access
export function initModalWindow(onAccept, onDecline) {
  //Select modal and its buttons
  const modal = document.querySelector('.modal');
  const acceptButton = document.querySelector('.accept-button');
  const declineButton = document.querySelector('.decline-button');

  function showModal() {
    const modal = document.querySelector('.modal');
    // set the modal to be visible
    modal.classList.remove('hidden');
    
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  // if user has already seen the modal once, do not show it again
  if (localStorage.getItem('modalShown')) return;

  // show the modal
  modal.classList.remove('hidden');
  showModal();

  function hideModal() {
    modal.classList.remove('show');

    modal.addEventListener('transitionend', () => {
      // remove the modal from the DOM after hiding
    }, { once: true });
  }

  acceptButton.addEventListener('click', () => {
    localStorage.setItem('modalShown', 'true');

    localStorage.removeItem('geoDenied');

    const locationElement = document.querySelector('.current-location');
    locationElement.innerHTML = `
      <div class="sk-flow">
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
      </div>
    `;

    hideModal();

    setTimeout(() => {
      // trigger external logic for handling geolocation
      onAccept();
    }, 1000);
  });

  // handle user clicking "Decline"
  declineButton.addEventListener('click', () => {
    // mark that modal has been shown
    localStorage.setItem('modalShown', 'true');
    
    // set a flag to indicate geolocation was denied
    localStorage.setItem('geoDenied', 'true');

    // hide modal
    hideModal();

    // trigger fallback logic
    onDecline();
  });
}