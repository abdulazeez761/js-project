// Function to store user data in local storage for testing purposes

const username = document.getElementById('username');
const password = document.getElementById('password');

// Add event listeners for input validation
username.addEventListener('input', function (e) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const currentValue = e.target.value;
  const valid = pattern.test(currentValue);

  if (valid) {
    document.getElementById('username-err').style.display = 'none';
  } else {
    document.getElementById('username-err').style.display = 'block';
    document.getElementById('username-err').textContent =
      'Invalid email format.';
  }
});

password.addEventListener('input', function (e) {
  const pattern = /^.{8,}$/;
  const currentValue = e.target.value;
  const valid = pattern.test(currentValue);

  if (valid) {
    document.getElementById('password-err').style.display = 'none';
  } else {
    document.getElementById('password-err').style.display = 'block';
    document.getElementById('password-err').textContent =
      'Password must be at least 8 characters long.';
  }
});

function storFormData(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get the input values
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;

  // Get the error message elements
  const usernameErrMessage = document.getElementById('username-err');
  const passwordErrMessage = document.getElementById('password-err');

  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Password regex pattern (at least 8 characters)
  const passwordPattern = /^.{8,}$/;

  // Validate username (email)
  if (!emailPattern.test(enteredUsername)) {
    usernameErrMessage.textContent = 'Invalid email format.';
    return; // Stop further processing
  } else {
    usernameErrMessage.textContent = ''; // Clear error message
  }

  // Validate password (at least 8 characters)
  if (!passwordPattern.test(enteredPassword)) {
    passwordErrMessage.textContent =
      'Password must be at least 8 characters long.';
    return; // Stop further processing
  } else {
    passwordErrMessage.textContent = ''; // Clear error message
  }

  // Get the stored users from local storage
  const storedAdmins = JSON.parse(localStorage.getItem('admin')) || [];

  // Check if the entered credentials match any stored user
  let approved = false;
  for (let admin in storedAdmins) {
    storedAdmins[admin].email == enteredUsername &&
      storedAdmins[admin].password == enteredPassword &&
      (approved = true);
  }

  if (approved) {
    window.location.href = '../dashBoard/index.html';
  } else {
    document.getElementById('errorMessage').textContent =
      'Invalid username or password.';
  }
}

// Add the event listener to the form
document.getElementById('loginForm').addEventListener('submit', storFormData);
