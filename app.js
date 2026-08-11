const today = new Date();
const toDateInput = date => date.toISOString().split('T')[0];
const checkIn = document.querySelector('#checkIn');
const checkOut = document.querySelector('#checkOut');
const arrival = new Date(today); arrival.setDate(arrival.getDate() + 7);
const departure = new Date(today); departure.setDate(departure.getDate() + 10);
checkIn.value = toDateInput(arrival); checkIn.min = toDateInput(today);
checkOut.value = toDateInput(departure); checkOut.min = toDateInput(arrival);
checkIn.addEventListener('change', () => { checkOut.min = checkIn.value; if (checkOut.value <= checkIn.value) { const next = new Date(`${checkIn.value}T12:00:00`); next.setDate(next.getDate() + 1); checkOut.value = toDateInput(next); } });

document.querySelector('#searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const place = document.querySelector('#destination').value.trim();
  const guests = document.querySelector('#guests').value;
  document.querySelector('#resultsMessage').textContent = `Showing handpicked stays near ${place} for ${guests}.`;
  document.querySelector('#stays').scrollIntoView({behavior:'smooth'});
});

document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => {
  button.classList.toggle('saved'); button.textContent = button.classList.contains('saved') ? '♥' : '♡';
}));

const dialog = document.querySelector('#bookingDialog');
document.querySelectorAll('.book-button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialogTitle').textContent = `Reserve ${button.dataset.hotel}`; dialog.showModal();
}));
document.querySelector('#signInButton').addEventListener('click', () => { document.querySelector('#dialogTitle').textContent = 'Welcome to StayScape'; dialog.showModal(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-done').addEventListener('click', () => dialog.close());
document.querySelector('#viewAllButton').addEventListener('click', () => { document.querySelector('#resultsMessage').textContent = 'All workshop demo stays are shown below.'; });
document.querySelector('#year').textContent = new Date().getFullYear();
