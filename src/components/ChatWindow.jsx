import { useSession } from "next-auth/react";
import { useRef, useEffect, useContext } from "react";
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai';
import socket from "@/socket";
import { SocketContext } from "@/context";


const ChatWindow = ({ conversationId }) => {

    const { openConversations, setOpenConversations, setUnseenConvos, setConversations } = useContext(SocketContext);
    const { data: session } = useSession();

    const openExists = [];

    useEffect(() => {

        const seen = {

            messages: [],
            time: new Date(Date.now()),

        }

        for (let i = 0; i < openConversations[conversationId].messages.length; i++) {

            const msg = openConversations[conversationId].messages[i];

            if (!msg.seen && msg.from.userPath !== session.user.userPath) {

                seen.messages.push(msg.id);

            }
        }

        if (seen.messages.length > 0) {

            socket.io.emit('messages seen', { seenMsgs: seen });

            setOpenConversations((openConvos) => {

                const newConvos = [...openConvos];

                for (let i = 0; i < newConvos[conversationId].messages.length; i++) {

                    const msg = newConvos[conversationId].messages[i];

                    if (!msg.seen && msg.from.userPath !== session.user.userPath) {

                        msg.seen = seen.time;

                    }

                }

                return newConvos;

            })

            setConversations((oldConvos) => {

                const newConvos = [...oldConvos];

                for (let i = 0; i < openExists.length; i++) {

                    newConvos[openExists[i]].unseen = 0;

                }

                return newConvos;

            })
        }
    }, [openConversations])

    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    const sendMsg = (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        const newMsg = {

            to: openConversations[conversationId].with,
            message: inputRef.current.value,

        }

        socket.io.emit('private message', newMsg);

        newMsg.created = Date.now();
        newMsg.from = { userPath: session.user.userPath }

        setOpenConversations((oldConvos) => {

            const checkExisting = () => {

                for (let i = 0; i < oldConvos.length; i++) {

                    if (oldConvos[i].with === newMsg.to) {
                        return i;
                    }

                }

                return -1;

            }

            const exists = checkExisting()

            if (exists > -1) {

                const newConvos = [...oldConvos];
                newConvos[exists].messages.push(newMsg);
                return newConvos;

            } else {

                return oldConvos;

            }

        })

        inputRef.current.value = '';

    }

    useEffect(() => { scrollRef.current.scrollIntoView(); }, [openConversations])

    return (
        <div className="h-96 w-72 z-50 rounded-t-xl overflow-hidden mx-2 border border-slate-600">
            <div className="grid grid-rows-[1.5rem_auto_3rem] w-full h-full px-2 pt-2 bg-slate-500">
                <div className="flex justify-between text-chas-primary text-sm">
                    {openConversations[conversationId].displayName}
                    <button onClick={() => {
                        setOpenConversations(oldConvos => {
                            return oldConvos.filter(convo => convo.with !== openConversations[conversationId].with);
                        })
                    }} className="h-full flex items-start"><AiOutlineClose className={`text-xl hover:bg-red-500 text-gray-200`} /></button>
                </div>
                <div className="w-full h-full bg-slate-600 rounded-lg shadow-inner shadow-slate-800/30 overflow-hidden">
                    <ul className="flex flex-col gap-2 p-2 overflow-auto h-full w-full">
                        {openConversations[conversationId].messages.map((msg, index) => {

                            if (msg.from.userPath === session.user.userPath) {

                                msg.self = true

                            }

                            const time = new Date(msg.created).toLocaleString();

                            if (msg.serverMessage) {

                                return <li key={`msg${index}`} className="flex justify-center items-center text-xs text-slate-400 pt-2">{msg.user} {msg.action} @ {time}</li>

                            }

                            let color = 'bg-slate-500';
                            let align = 'justify-start';


                            if (msg.self) {

                                color = 'bg-blue-500';
                                align = 'justify-end';

                            }

                            return (

                                <li key={`msg${index}`} className={`flex flex-col items-center w-full ${align}`}>
                                    <div className="flex justify-between gap-2 text-xs text-slate-400 p-2"><div>{time}</div></div>
                                    <div className={`flex w-full ${align}`}>

                                        <div className={`grid grid-cols-[0.5rem_auto] items-end gap-4 w-4/5 ${align}`}>

                                            {!msg.self && <div className={`flex justify-center items-center w-4 h-4 mb-0.5 text-xs bg-gray-500 text-slate-200 rounded-full`}>{openConversations[conversationId].displayName[0].toUpperCase()}</div>}
                                            <div className="col-start-2">

                                                <div className={`${color} rounded-xl py-2 px-3 text-sm text-slate-100 w-fit shadow shadow-slate-800/30`}>{msg.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                        <li ref={scrollRef}></li>
                    </ul>

                </div>
                <form onSubmit={sendMsg} className="grid grid-cols-[auto_2rem] items-center gap-2 w-full">
                    <input type="text" ref={inputRef} className="rounded-full h-8 px-2 text-slate-700 bg-slate-200 shadow-inner shadow-slate-800/30" />
                    <button type="submit" className="flex justify-center items-center text-gray-200 hover:text-gray-50 text-xl w-8 h-8">{<AiOutlineSend />}</button>
                </form>
            </div>
        </div>

    )
}

export default ChatWindow;