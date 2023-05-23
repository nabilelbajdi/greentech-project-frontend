import { useState } from 'react'
import { MdNotifications } from 'react-icons/md'


const Notifications = ({ setDropdown }) => {

    const [unseen, setUnseen] = useState(0);

    let renderUnseen = '';

    if (unseen > 0) {

        renderUnseen = unseen;

    } else {

        renderUnseen = undefined

    }

    return (

        <button onClick={() => {
            setDropdown((dropdown) => {
                if (dropdown === 'notifications') {

                    return '';

                } else {

                    return 'notifications';

                }
            })
        }}>
            <div className='relative'>
                <MdNotifications className={`text-2xl hover:text-green-500 text-gray-500`} />
                {renderUnseen && <div className='absolute flex justify-center items-center -top-2 -right-2 text-red-400 font-bold rounded-full bg-gray-300 h-5 w-5'>
                    {renderUnseen}
                </div>}

            </div>

        </button>



    )

}

export default Notifications;