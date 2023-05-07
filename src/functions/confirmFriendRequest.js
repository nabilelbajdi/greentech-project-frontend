const confirmFriendRequest = async (userId) => {

    const response = await fetch('http://localhost:3000/api/friendrequests/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {


        console.log('Something went wrong.');

    }

}

export default confirmFriendRequest;