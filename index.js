const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
var ticketPrice = +movieSelect.value;
populateUI();
updateSelectedCount();
//save selected movie index and value
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = Array.from(selectedSeats).map((seat) =>
    [...seats].indexOf(seat)
  );
  console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  const selectedTicketPrice = ticketPrice * selectedSeatsCount + "$";
  count.textContent = selectedSeatsCount;
  total.textContent = selectedTicketPrice;
}
//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((el, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        el.classList.add("selected");
      }
    });

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }
}
//movie select event
movieSelect.addEventListener("change", function (event) {
  ticketPrice = Number(event.target.value);
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});
//seat click event
container.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
