//*
//* This is the page helper code to save post Comments
//*

// event handler to submit the data to the API
// to save it in the database
const commentFormHandler = async (event) => {
	// The preventDefault() method of the Event interface
  	// tells the user agent that if the event does not get explicitly handled,
  	// its default action should not be taken as it normally would be.
	event.preventDefault();
	// this is the body text inside the "input" tag field on the page
	const comment_body = document.querySelector('input[name="comment-body"]').value.trim();
	// this hack grabs the post ID number from the end of the URL
	const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
	// check the content body to not be NULL
	if (comment_body) {
		// do a fetch with comment data to the "Comment" API
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({
				post_id,
				comment_body,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// if the action is successful, then refresh the page with new data
		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
			document.querySelector("#comment-form").style.display = "block";
		}
	}
};

// add the 'Event Listeners' to the page
document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);
