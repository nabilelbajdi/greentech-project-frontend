import socket from "@/socket";
import { useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import Conversation from "./Conversation";

const ConversationsMenu = ({ setDropdown, conversationsList }) => {

    const inputRef = useRef(null);

    const initConversations = () => {

        socket.io.emit('get conversation list');

    }

    useEffect(initConversations, [])

    const search = (e) => {
        e.preventDefault();

        if (inputRef.current.value.length < 1) return;
        inputRef.current.value = '';
        console.log('search convos')
    }

    const newConversation = () => {

        console.log('New convo')

    }


    return (

        <div className="fixed z-50 right-0 h-5/6 w-96 rounded-b-xl overflow-hidden mx-1 border border-slate-600">
            <div className="grid grid-rows-[1.5rem_3rem_auto] w-full h-full px-2 py-2 bg-slate-500">
                <div className="flex justify-between text-chas-primary text-sm">
                    Konversationer
                    <div className="flex items-center gap-1">
                        <button onClick={() => newConversation()} className="h-full flex items-start"><BiMessageRoundedAdd className={`text-xl hover:text-gray-50 text-gray-200`} /></button>
                        <button onClick={() => setDropdown('')} className="h-full flex items-start"><AiOutlineClose className={`text-xl hover:bg-red-500 text-gray-200`} /></button>
                    </div>
                </div>
                <form onSubmit={(e) => { search(e) }} className="grid grid-cols-[auto_2rem] items-center gap-2 w-full">
                    <input placeholder="Sök konversationer" type="text" ref={inputRef} className="rounded-full h-8 px-2 text-slate-700 bg-slate-200 shadow-inner shadow-slate-800/30" />
                    <button type="submit" className="flex justify-center items-center text-gray-200 hover:text-gray-50 text-xl w-8 h-8">{<AiOutlineSearch />}</button>
                </form>
                <div className="w-full h-full bg-slate-600 rounded-lg shadow-inner shadow-slate-800/30 overflow-hidden">
                    <ul className="flex flex-col gap-2 p-2 overflow-auto h-full w-full">
                        {conversationsList.map((convo, index) => {

                            const time = new Date(convo.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (

                                <li key={`msg${index}`} className={`flex w-full`}>
                                    <Conversation conversation={convo} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ConversationsMenu;