// handles displaying a custom modal window asking the user to allow geolocation access
export function initModalWindow(onAccept, onDecline) {
  //Select modal and its buttons
  const modal = document.querySelector('.modal');
  const acceptButton = document.querySelector('.accept-button');
  const declineButton = document.querySelector('.decline-button');

  // if user has already seen the modal once, do not show it again
  if (localStorage.getItem('modalShown')) return;

  // show the modal
  modal.classList.remove('hidden');

  // handle user clicking "Allow"
  acceptButton.addEventListener('click', () => {
    // mark that modal has been shown
    localStorage.setItem('modalShown', 'true');

    // hide modal
    modal.classList.add('hidden');

    // reset geolocation denial flag in case user had previously declined
    localStorage.removeItem('geoDenied');

    // optionally update the UI while waiting for geolocation
    const locationElement = document.querySelector('.current-location');
    locationElement.innerHTML = `
      <div class="sk-flow">
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
      </div>
    `;

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
    modal.classList.add('hidden');

    // trigger fallback logic
    onDecline();
  });
}