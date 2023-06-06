import Image from 'next/image';
import socket from "@/socket";
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context';
import Unseen from './Unseen';


const Conversation = ({ conversation }) => {

    const { openConversations } = useContext(SocketContext);
    const [unseen, setUnseen] = useState(0);

    useEffect(() => {

        setUnseen(conversation.unseen)

    }, [conversation])

    let renderUnseen = '';

    if (unseen > 0) {

        renderUnseen = unseen;

    } else {

        renderUnseen = undefined

    }

    const openConversation = async (userPath) => {

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

    return (

        <button
            onClick={() => { openConversation(conversation.to.userPath) }}
            className="flex gap-3 w-full h-[4.5rem] bg-slate-700 hover:bg-slate-700/70 text-chas-secondary rounded-lg p-3">

            <div className='relative'>
                <Image
                    src={conversation.to.image}
                    alt='profile'
                    width={50}
                    height={50}
                    className='rounded-full border border-chas-secondary'
                />
                {renderUnseen && <Unseen unseen={renderUnseen} />}

            </div>
            <div className='flex flex-col items-start justify-start h-full w-full'>
                <p className='font-semibold'>{conversation.to.firstName} {conversation.to.lastName}</p>
                <div className="whitespace-nowrap text-ellipsis text-sm  w-4/5 overflow-hidden">{conversation.message}</div>

            </div>
        </button>



    )

}

export default Conversation;