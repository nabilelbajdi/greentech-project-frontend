import { useContext } from 'react';
import ChatWindow from './ChatWindow';
import { ChatAlt2Icon } from '@heroicons/react/outline';
import { SocketContext } from '@/context';
import Unseen from './Unseen';

const Messenger = ({ setDropdown }) => {

    const { openConversations, unseenConvos } = useContext(SocketContext);

    let renderUnseen = '';

    if (unseenConvos > 0) {

        renderUnseen = true;

    } else {

        renderUnseen = false;

    }

    return (
        <>
            <button onClick={() => {
                setDropdown((dropdown) => {
                    if (dropdown === 'conversations') {

                        return '';

                    } else {

                        return 'conversations'

                    }
                })
            }}>
                <div className='relative'>
                    <ChatAlt2Icon className='headerIcon' />
                    {renderUnseen && <Unseen unseen={unseenConvos} />}
                </div>
            </button>
            <div className='flex justify-end w-full px-2 fixed left-0 bottom-0 '>
                {openConversations.map((convo, index) => {

                    return (
                        <ChatWindow key={`messenger${index}`} conversationId={index} />
                    )
                })}
            </div>
        </>

    )

}

export default Messenger;