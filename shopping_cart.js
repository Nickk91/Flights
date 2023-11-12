let fromStorage = localStorage.getItem("from");
let toStorage = localStorage.getItem("to");
let priceStorage = localStorage.getItem("price");
let departureStorage = localStorage.getItem("Departure Date");
let returnStorage = localStorage.getItem("Return Date");

let numberOfTickets = document.getElementById("tickets");
let total = document.getElementById("total");

const flightCard = document.querySelector(".flightCard");

const fromP = flightCard.querySelector(".from");
fromP.textContent = "from: " + fromStorage;

const toP = flightCard.querySelector(".to");
toP.textContent = "to: " + toStorage;

const priceP = flightCard.querySelector(".price");
priceP.textContent = "price: " + priceStorage;

const departP = flightCard.querySelector(".Departure");
departP.textContent = "Departure Date: " + departureStorage;

const returnP = flightCard.querySelector(".Return");
returnP.textContent = "Return Date: " + returnStorage;

// Add an event listener to the button
const bookButton = document.querySelector("button");
bookButton.addEventListener("click", submitForm);

function submitForm() {
  // Get the number of tickets and convert to a number
  let numberOfTicketsValue = Number(numberOfTickets.value);

  // Calculate the total amount
  let totalAmount = Number(priceStorage) * numberOfTicketsValue;

  // Display the total amount
  total.textContent = totalAmount;

  let confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm Purchase";
  flightCard.appendChild(confirmButton);

  confirmButton.addEventListener("click", function () {
    let confirmed = document.createElement("h4");
    if (numberOfTicketsValue > 1) {
      confirmed.textContent = `The purchase of ${numberOfTicketsValue} tickets from ${fromStorage} to ${toStorage} between the dates ${departureStorage} ${returnStorage} with the total amount for payment: ${totalAmount} is confirmed`;
      flightCard.appendChild(confirmed);
    } else {
      confirmed.textContent = `The purchase of ${numberOfTicketsValue} ticket from ${fromStorage} to ${toStorage} between the dates ${departureStorage} ${returnStorage} with the total amount for payment: ${totalAmount} is confirmed`;
      flightCard.appendChild(confirmed);
    }
  });
}
