import socket from "@/socket";

const openConversation = async (userPath, openConversations) => {

    const checkExisting = () => {

        for (let i = 0; i < openConversations.length; i++) {

            if (openConversations[i].with === userPath) {
                return true;
            }

        }

    }

    if (checkExisting()) return;

    socket.io.emit('get conversation', { userPath });


}

export default openConversation;