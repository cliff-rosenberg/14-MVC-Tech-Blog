
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

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
}

document.querySelector('.btnDeletePost').addEventListener('click', deleteFormHandler);