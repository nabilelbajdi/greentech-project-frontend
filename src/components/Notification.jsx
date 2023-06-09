import Image from 'next/image';
import { useRouter } from 'next/router';
import UnseenNote from './UnseenNote';

const Notification = ({ note }) => {
    const router = useRouter();

    let callback;

    switch (note.type) {

        case 'friendrequest':
            callback = () => {

                router.push('/myfriendrequests');

            }
            break;

        case 'friendrequest confirmed':
            callback = () => {

                router.push(`/${note.userPath}`);

            }
            break;

    }

    let renderUnseen = '';

    console.log(note)

    if (!note.seen) {

        renderUnseen = true;

    } else {

        renderUnseen = false

    }

    return (

        <button
            onClick={callback}
            className="flex items-center gap-3 w-full h-[5rem] bg-slate-700 hover:bg-slate-700/70 text-chas-secondary rounded-lg p-3">

            <div className='relative'>
                <Image
                    src={note.image}
                    alt='profile'
                    width={50}
                    height={50}
                    className='rounded-full border border-chas-secondary'
                />
                {renderUnseen && <UnseenNote />}
            </div>



            <div className='flex flex-col items-start justify-start h-full w-full'>
                <p className='text-xs'>{new Date(note.updated).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="text-left text-ellipsis text-sm  w-4/5 overflow-hidden">{note.message}</div>

            </div>
        </button>



    )

}

export default Notification;