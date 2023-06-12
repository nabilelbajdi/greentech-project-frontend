import { SocketContext } from "@/context";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import Notification from "./Notification";
import socket from "@/socket";

const NotificationsMenu = ({ setDropdown }) => {

    const { notifications } = useContext(SocketContext);
    const [sortedNotes, setSortedNotes] = useState([]);

    useEffect(() => {

        const seen = {

            notifications: [],
            time: new Date(Date.now()),

        }

        for (let i = 0; i < notifications.length; i++) {

            const note = notifications[i];

            if (!note.seen) {

                seen.notifications.push(note.id);

            }
        }

        if (seen.notifications.length > 0) {

            console.log(seen);
            socket.io.emit('notifications seen', seen);

        }

        const sorted = notifications.sort((a, b) => {

            if (a.updated < b.updated) return 1;
            if (a.updated > b.updated) return -1;
            return 0;

        })

        setSortedNotes(sorted);

    }, [notifications])

    const search = () => {

    }

    return (

        <div className="fixed z-50 right-0 bottom-0 w-screen h-screen sm:h-3/4 sm:w-96 sm:rounded-t-xl overflow-hidden sm:mx-1 border border-slate-600">
            <div className="grid grid-rows-[1.5rem_auto] w-full h-full px-2 py-2 bg-slate-500">
                <div className="flex justify-between text-chas-primary text-sm">
                    Aviseringar
                    <div className="flex items-center gap-1">

                        <button onClick={() => setDropdown('')} className="h-full flex items-start"><AiOutlineClose className={`text-xl hover:bg-red-500 text-gray-200`} /></button>
                    </div>
                </div>

                <div className="w-full h-full bg-slate-600 rounded-lg shadow-inner shadow-slate-800/30 overflow-hidden">
                    <ul className="flex flex-col gap-2 p-2 overflow-auto h-full w-full">
                        {sortedNotes.map((note, index) => {

                            const time = new Date(note.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (

                                <li key={`msg${index}`} className={`flex w-full`}>
                                    <Notification note={note} />
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </div>
    )

}

export default NotificationsMenu;