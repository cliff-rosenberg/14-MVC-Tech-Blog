//*
//* This is the login helper code
//*

// event handler for the existing user login form
const loginFormHandler = async (event) => {
  // The preventDefault() method of the Event interface
  // tells the user agent that if the event does not get explicitly handled,
  // its default action should not be taken as it normally would be.
  event.preventDefault();
  // this code below will remove any leading ro trailing spaces
  // in the 'email' and 'passowrd' fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

// event handler function for the new user signup
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// add the 'Event Listeners' to the page
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);