const flights = [
  {
    from: "Tel aviv",
    to: "Amsterdam",
    price: 40,
    dates: [
      { depart: new Date("2023-11-24") },
      { return: new Date("2023-12-01") },
    ],
  },
  {
    from: "Tel aviv",
    to: "London",
    price: 75,
    dates: [
      { depart: new Date("2023-11-28") },
      { return: new Date("2023-12-12") },
    ],
  },
  {
    from: "Athens",
    to: "Prague",
    price: 95,
    dates: [
      { depart: new Date("2023-11-28") },
      { return: new Date("2023-12-12") },
    ],
  },
  {
    from: "Berlin",
    to: "Prague",
    price: 22,
    dates: [
      { depart: new Date("2023-11-28") },
      { return: new Date("2023-12-12") },
    ],
  },
  {
    from: "London",
    to: "Berlin",
    price: 100,
    dates: [
      { depart: new Date("2023-11-28") },
      { return: new Date("2023-12-12") },
    ],
  },
];

const isAdminValue = localStorage.getItem("isAdmin");
const addFlight = document.getElementById("add-flight-form");
const editModal = document.getElementById("editModal");

if (isAdminValue !== "true") {
  addFlight.classList.add("hidden");
  editModal.classList.add("hidden");
  console.log("User is not an admin");
}

const flightListContainer = document.getElementById("flight-list");

function showFlights(flights) {
  flightListContainer.innerHTML = "";
  flights.forEach((flight) => {
    const flightCard = document.createElement("div");
    flightCard.classList.add("flight");

    const fromP = document.createElement("p");
    fromP.textContent = "from: " + flight.from;
    flightCard.appendChild(fromP);

    const toP = document.createElement("p");
    toP.textContent = "to: " + flight.to;
    flightCard.appendChild(toP);

    const priceP = document.createElement("p");
    priceP.textContent = "price: " + flight.price;
    flightCard.appendChild(priceP);

    const departDate = flight.dates[0].depart;
    const returnDate = flight.dates[1].return;

    const departP = document.createElement("p");
    departP.textContent = "Departure Date: " + departDate.toLocaleDateString();
    flightCard.appendChild(departP);

    const returnP = document.createElement("p");
    returnP.textContent = "Return Date: " + returnDate.toLocaleDateString();
    flightCard.appendChild(returnP);

    flightListContainer.appendChild(flightCard);

    const bookFlight = document.createElement("button");
    bookFlight.textContent = "Book";
    flightCard.appendChild(bookFlight);

    bookFlight.addEventListener("click", function openPopup() {
      const selectedFlight = {
        from: flight.from,
        to: flight.to,
        price: flight.price,
        departDate: flight.dates[0].depart.toLocaleDateString(),
        returnDate: flight.dates[1].return.toLocaleDateString(),
      };

      // Store the selected flight in localStorage
      localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));

      localStorage.setItem("from", flight.from);
      localStorage.setItem("to", flight.to);
      localStorage.setItem("price", flight.price);
      localStorage.setItem(
        "Departure Date",
        flight.dates[0].depart.toLocaleDateString()
      );
      localStorage.setItem(
        "Return Date",
        flight.dates[1].return.toLocaleDateString()
      );
      let popupWindow = window.open(
        "cart.html",
        "Cart",
        "width=600,height=400"
      );
    });

    if (isAdminValue == "true") {
      const editButton = document.createElement("button");
      editButton.textContent = "edit";
      flightCard.appendChild(editButton);

      editButton.addEventListener("click", function () {
        openModal(flight);
      });
    }
  });
}

let amount = 0;

let index;

function openModal(flight) {
  document.getElementById("editFrom").value = flight.from;
  document.getElementById("editTo").value = flight.to;
  document.getElementById("editPrice").value = flight.price;
  document.getElementById("editDepart").valueAsDate = flight.dates[0].depart;
  document.getElementById("editReturn").valueAsDate = flight.dates[1].return;
  document.getElementById("editModal").style.display = "block";
  index = flights.indexOf(flight);
}

// Function to close the modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// Function to save changes
function saveChanges() {
  // Retrieve edited values from the modal
  const editedFlight = {
    from: document.getElementById("editFrom").value,
    to: document.getElementById("editTo").value,
    price: document.getElementById("editPrice").value,
    dates: [
      { depart: new Date(document.getElementById("editDepart").value) },
      { return: new Date(document.getElementById("editReturn").value) },
    ],
  };

  if (index !== -1) {
    flights[index] = editedFlight;
  }

  closeModal();
  showFlights(flights);
}

showFlights(flights);

const addFlightForm = document.getElementById("add-flight-form");
addFlightForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const price = document.getElementById("price").value;
  const departInput = document.getElementById("depart").value;
  const returnInput = document.getElementById("return").value;

  const newFlight = {
    from,
    to,
    price,
    dates: [
      { depart: new Date(departInput) },
      { return: new Date(returnInput) },
    ],
  };

  flights.push(newFlight);
  console.log(flights);
  showFlights(flights);
  addFlightForm.reset();
});

const searchInput = document.getElementById("search-input");
let filteredFlight;
const searchFlights = searchInput.addEventListener("input", function (e) {
  filteredFlight = flights.filter((flight) => {
    return (
      flight.from.toLowerCase().includes(e.target.value.toLowerCase()) ||
      flight.to.toLowerCase().includes(e.target.value.toLowerCase())
    );
  });
  showFlights(filteredFlight);
});

const sortByPrice = document.querySelector("#sort-by-price");
sortByPrice.addEventListener("click", () => {
  let sortedByPrice = flights.sort(function (a, b) {
    return a.price - b.price;
  });
  showFlights(sortedByPrice);
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});
