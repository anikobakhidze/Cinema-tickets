const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const container = document.querySelector(".container");
let ticketPrice = Number(movie.value);

//Update ui
const updateUI = () => {
  const seatsIndex = JSON.parse(localStorage.getItem("seatsIndex"));
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seats.forEach((el, index) => {
      console.log(index);
      if (seatsIndex.indexOf(index) > -1) {
        el.classList.add("selected");
      }
    });
  }
};
//update total and count
const updateTotalCount = () => {
  const selectedSeatsCount = document.querySelectorAll(".row .seat.selected");
  count.innerText = selectedSeatsCount.length;
  total.innerText = ticketPrice * selectedSeatsCount.length;
  const seatsIndex = Array.from(selectedSeatsCount).map((el) =>
    [...seats].indexOf(el)
  );
  localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
};
updateUI();
updateTotalCount();
//movie change function
const moviePrice = (event) => {
  ticketPrice = Number(event.target.value);
};
//movie change
movie.addEventListener("change", moviePrice);
// //update total and count
// const updateTotalCount = () => {
//   const selectedSeatsCount = document.querySelectorAll(".row .seat.selected");
//   const seatsIndex = Array.from(selectedSeatsCount).map((el) =>
//     [...seats].indexOf(el)
//   );
//   localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
//   count.innerText = selectedSeatsCount.length;
//   total.innerText = ticketPrice * selectedSeatsCount.length;
// };
// //Update ui
// const updateUI = () => {
//   const selectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
//   if (selectedSeats !== null && selectedSeats.length > 0) {
//     [...seats].forEach((el, index) => {
//       if (selectedSeats.indexOf(index) > -1) {
//         el.classList.add("selected");
//       }
//     });
//   }
// };
//select seats function
const selectedSeats = (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateTotalCount();
  }
};
//choose seats
container.addEventListener("click", selectedSeats);
