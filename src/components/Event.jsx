import Image from 'next/image';
import Posts from './Posts';
import { useState } from 'react';
import Button from './Button';
import ParticipantCard from './ParticipantCard';
import { useRouter } from 'next/router';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import ModalCreator from './ModalCreator';
import ItemTimeDate from './ItemTimeDate';
import ItemInformation from './ItemInformation';
import { handleDelete, handleEdit } from '@/functions/itemRequestHandler';
import Item from './Item';

const Event = ({ event }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(event.posts);
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();
  const imagePlaceholder =
    'https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1686321068~exp=1686321668~hmac=a85f1ecd8642a60dda33114f5167b3e5cf47f4b590fcb13f0d3aae61301408e5';

  return (
    <section className='relative p-4 w-full bg-gray-100 rounded-xl'>
      <Item
        item={event}
        btnTitle='Anmäl dig till evenemanget'
        imagePlaceholder={imagePlaceholder}
        posts={posts}
        setPosts={setPosts}
        setEdit={setEdit}
        push={push}
        itemType='event'
      />
      {edit && (
        <ModalCreator
          setNewItem={setEdit}
          typeOfItem='event'
          showEndTime={true}
          item={event}
          edit={true}
        />
      )}
    </section>
  );
};

export default Event;
