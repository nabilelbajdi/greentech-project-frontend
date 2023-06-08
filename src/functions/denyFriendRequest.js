

const denyFriendRequest = async (userId, callback) => {

    const response = await fetch('http://localhost:3000/api/friendrequests/deny', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {

        console.log('Something went wrong.');

    } else {

        callback();

    }

}

export default denyFriendRequest;