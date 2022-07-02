//*
//* This is the page helper code to delete a Post from the database
//*

// event handler to submit the data to the API
// to delete it from the database
const deleteFormHandler = async (event) => {
    // The preventDefault() method of the Event interface
  	// tells the user agent that if the event does not get explicitly handled,
  	// its default action should not be taken as it normally would be.
    event.preventDefault();
    // this hack grabs the post ID number from the end of the URL
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    // do a fetch with the post ID to the Posts API
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if the operation is successful, navigate back to the 'Dashboard' page
    if (response.ok) {
        document.location.replace('/api/dashboard/');
    } else {
        alert(response.statusText);
    }
};

// add the 'Event Listeners' to the page
document.querySelector('.btnDeletePost').addEventListener('click', deleteFormHandler);