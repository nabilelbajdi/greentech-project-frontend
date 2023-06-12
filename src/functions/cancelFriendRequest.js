

const cancelFriendRequest = async (userId, callback) => {

    const response = await fetch('http://localhost:3000/api/friendrequests/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {

        console.log(response.status);

    } else {

        callback();

    }

}

export default cancelFriendRequest;