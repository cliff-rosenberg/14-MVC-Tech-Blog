// this is the JavaScript helper for commiting an edited Post back top the database
async function editFormHandler(event) {
    event.preventDefault();
    // setect the right parts of the data
    const title = document.querySelector('input[name="title"]').value.trim();
    const post_content = document.querySelector('input[name="post_content"]').value.trim();
    console.log(title);
    console.log(content);
    // this hacks the post ID number from the page URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if the operation is successful, navigate back to the 'Dashboard' page
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);