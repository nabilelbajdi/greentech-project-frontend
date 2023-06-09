import { useRef, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';


const NotificationsMenu = ({ setDropdown }) => {

    const [conversations, setConversations] = useState([]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    const search = () => {

    }

    return (

        <div className="fixed z-50 right-0 h-5/6 w-96 rounded-b-xl overflow-hidden mx-1 border border-slate-600">
            <div className="grid grid-rows-[1.5rem_auto] w-full h-full px-2 py-2 bg-slate-500">
                <div className="flex justify-between text-chas-primary text-sm">
                    Aviseringar
                    <div className="flex items-center gap-1">

                        <button onClick={() => setDropdown('')} className="h-full flex items-start"><AiOutlineClose className={`text-xl hover:bg-red-500 text-gray-200`} /></button>
                    </div>
                </div>

                <div className="w-full h-full bg-slate-600 rounded-lg shadow-inner shadow-slate-800/30 overflow-hidden">
                    <ul className="flex flex-col gap-2 p-2 overflow-auto h-full w-full">
                        {conversations.map((convo, index) => {

                            const time = new Date(msg.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            if (msg.serverMessage) {

                                return <li key={`msg${index}`} className="flex justify-center items-center text-xs text-slate-400 pt-2">{msg.user} {msg.action} @ {time}</li>

                            }

                            let color = 'bg-slate-500';
                            let align = 'justify-start';
                            let sender = msg.sender;

                            if (msg.from_id === session.user.id) {

                                color = 'bg-blue-500';
                                align = 'justify-end';
                                sender = '';

                            }

                            return (

                                <li key={`msg${index}`} className={`flex w-full ${align}`}>
                                    <div className={`flex w-3/4 ${align}`}>
                                        <div className="grid grid-cols-[1rem_auto] items-end gap-4">
                                            {!msg.self && <div className={`flex justify-center items-center w-6 h-6 mb-0.5 text-lg ${colors[0]} text-slate-200 rounded-full`}>{conversation.displayName.toUpperCase()}</div>}
                                            <div className="col-start-2">
                                                <div className="flex justify-between gap-2 text-xs text-slate-300 p-2"><div>{time}</div></div>
                                                <div className={`${color} rounded-xl py-2 px-3 text-slate-100 w-fit shadow shadow-slate-800/30`}>{msg.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                        <li ref={scrollRef}></li>
                    </ul>

                </div>
            </div>
        </div>
    )

}

export default NotificationsMenu;