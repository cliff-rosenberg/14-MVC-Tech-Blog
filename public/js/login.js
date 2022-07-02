//*
//* This is the login helper code
//*

// event handler for the existing user login form
const loginFormHandler = async (event) => {
  // The preventDefault() method of the Event interface
  // tells the user agent that if the event does not get explicitly handled,
  // its default action should not be taken as it normally would be.
  event.preventDefault();
  // this code below will remove any leading or trailing spaces
  // in the 'email' and 'passowrd' fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // the 'fetch' send User login info to the login API
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

// add the 'Event Listeners' to the page
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
