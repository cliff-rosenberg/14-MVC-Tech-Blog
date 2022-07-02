//*
//* This is the new User signup helper code
//*

// event handler function for the new user signup
const signupFormHandler = async (event) => {
  // The preventDefault() method of the Event interface
  	// tells the user agent that if the event does not get explicitly handled,
  	// its default action should not be taken as it normally would be.
    event.preventDefault();
    // this code puts the entered 'username', 'email', and 'passowrd'
    // into local variables and trims off any leading/trailing spaces
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // if all three fields have entries, then send to the API
    if (username && email && password) {
      // do a 'fetch' to the User signup API
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // if the action is successful, then navigate to the homepage
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

// add the 'Event Listeners' to the page
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  