import { useSession } from "next-auth/react";
import socket from "@/socket";

const SocketTest = () => {

    const { data: session, update } = useSession();


    const socketTest = () => {
        console.log('socketTest')

        const newMsg = {

            message: 'hej',
            time: Date.now(),

        }
        socket.io.emit('chat message', newMsg)

    }



    return (

        <div>
            <button onClick={() => socketTest()}>Socket</button>
        </div>

    )

}

export default SocketTest;