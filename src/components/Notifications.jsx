import { useContext, useState } from 'react'
import { BellIcon } from '@heroicons/react/outline';
import Unseen from './Unseen';
import { SocketContext } from '@/context';
import socket from '@/socket';

const Notifications = ({ setDropdown }) => {

    const { unseenNotifications, setUnseenNotifications } = useContext(SocketContext);

    let renderUnseen;

    if (unseenNotifications > 0) {

        renderUnseen = true;

    } else {

        renderUnseen = false

    }

    return (

        <button onClick={() => {
            socket.io.emit('get notifications');
            setUnseenNotifications(0);
            setDropdown((dropdown) => {
                if (dropdown === 'notifications') {

                    return '';

                } else {

                    return 'notifications';

                }
            })
        }}>
            <div className='relative'>
                <BellIcon className='sm:headerIcon h-8 w-8 ' />
                {renderUnseen && <Unseen unseen={unseenNotifications} />}
            </div>

        </button>



    )

}

export default Notifications;