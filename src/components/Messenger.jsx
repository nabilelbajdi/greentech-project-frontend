import { useState } from 'react';
import { RiMessengerFill } from 'react-icons/Ri'
import ChatWindow from './ChatWindow';
import { ChatAlt2Icon } from '@heroicons/react/outline';

const Messenger = ({ setDropdown, openConversations, setOpenConversations }) => {

    const [unseen, setUnseen] = useState(0);

    let renderUnseen = '';

    if (unseen > 0) {

        renderUnseen = unseen;

    } else {

        renderUnseen = undefined

    }

    return (
        <>
            <button>
                <div className='relative'>
                    <ChatAlt2Icon
                        className='headerIcon'
                        onClick={() => {
                            setDropdown((dropdown) => {
                                if (dropdown === 'conversations') {

                                    return '';

                                } else {

                                    return 'conversations'

                                }
                            })
                        }} />
                    {renderUnseen && <div className='absolute flex justify-center items-center -top-2 -right-2 text-red-400 font-bold rounded-full bg-gray-300 h-5 w-5'>
                        {renderUnseen}
                    </div>}
                </div>
            </button>
            <div className='flex justify-end w-full px-2 fixed left-0 bottom-0 '>
                {openConversations.map((convo, index) => {
                    console.log(convo)
                    return (
                        <ChatWindow key={`messenger${index}`} conversation={convo} setOpenConversations={setOpenConversations} openConversations={openConversations} />
                    )
                })}
            </div>
        </>

    )

}

export default Messenger;