const deleteFriend = async (userId, callback) => {

    const response = await fetch('http://localhost:3000/api/friendrequests/deletefriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (response.ok) {

        callback();

    } else {
        console.log('Something went wrong.');
    }

}

export default deleteFriend;