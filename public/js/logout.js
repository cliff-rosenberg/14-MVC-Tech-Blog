//*
//* This is the User logout helper code
//*

// event handler for the existing user login form
const logout = async () => {
  // the 'fetch' request signals the API to do a logut
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // if the action is succesasful, then navigate back to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// add the 'Event Listeners' to the page
document.querySelector('#logout').addEventListener('click', logout);
