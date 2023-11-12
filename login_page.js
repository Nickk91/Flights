const userForm = document.getElementById("userForm");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const adminCheckbox = document.getElementById("admin");

userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // username validation

  if (userNameInput.value.length < 3) {
    showError(userNameInput, "Username must be at least 3 characters long.");
    isValid = false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(emailRegex.test(emailInput.value));

  if (!emailRegex.test(emailInput.value)) {
    showError(emailInput, "Please enter a valid email.");
    isValid = false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    showError(
      passwordInput,
      "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
    );
    isValid = false;
  }

  if (isValid) {
    // alert("Form submitted successfully");
    localStorage.setItem("userName", userNameInput.value);
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("password", passwordInput.value);
    console.log(localStorage);

    if (adminCheckbox.checked) {
      localStorage.setItem("isAdmin", true);
    } else {
      localStorage.setItem("isAdmin", false);
    }
    window.location.href = "flights.html";
  }
});

// show error message and highlight the input
function showError(input, message) {
  const errorDiv = document.getElementById(input.id + "Error");
  errorDiv.textContent = message;
  input.classList.add("error");
}
const myinputsArray = [userNameInput, emailInput, passwordInput];
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
    document.getElementById(input.id + "Error").textContent = "";
  });
});
