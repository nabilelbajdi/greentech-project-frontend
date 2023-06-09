import socket from "@/socket";

const sendFriendRequest = async (userId, callback) => {

    const response = await fetch('http://localhost:3000/api/friendrequests/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (response.ok) {

        const data = await response.json();

        const notification = {

            to: data.receiverUser.userPath

        }

        socket.io.emit('notification', notification);
        callback();


    } else {
        console.log('Something went wrong.');
    }

}

export default sendFriendRequest;