import ItemTimeDate from './ItemTimeDate';
import ItemInformation from './ItemInformation';
import ItemParticipants from './ItemParticipants';
import { handleDelete, handleEdit } from '@/functions/itemRequestHandler';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Posts from './Posts';
import { useSession } from 'next-auth/react';
import Button from './Button';
import ItemConditionQuality from './ItemConditionQuality';

const Item = ({
  item,
  setEdit,
  push,
  posts,
  setPosts,
  btnTitle,
  imagePlaceholder,
  itemType,
}) => {
  const { data: session } = useSession();
  return (
    <div>
      <div className='w-fit h-[450px] rounded-xl overflow-hidden m-auto'>
        {item.image ? (
          <Image
            src={item.image.url}
            alt='evenemangsbild'
            priority
            height={300}
            width={700}
            className='h-full w-auto'
          />
        ) : (
          <Image
            src={imagePlaceholder}
            alt='evenemangsbild'
            priority
            height={300}
            width={600}
            className='h-full w-auto'
          />
        )}
      </div>
      <div>
        {/* Edit/delete if session user is the admin  */}
        {(item.admin_id === session.user.id ||
          item.user_id === session.user.id) && (
          <div className='absolute top-2 right-2 flex gap-4'>
            <button
              onClick={() => handleEdit(item, setEdit, `${itemType}`)}
              className='h-5 w-5'
            >
              <PencilIcon />
            </button>
            <button
              className='h-5 w-5'
              onClick={() => handleDelete(item, push, `${itemType}`)}
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 p-2 border-b-2 mb-4'>
        <h1 className='text-4xl font-bold'>{item.name}</h1>
        <div className='flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3'>
          {itemType === 'donation' ? (
            <ItemConditionQuality item={item} />
          ) : (
            <ItemTimeDate item={item} />
          )}

          <div className='flex flex-col gap-2 my-4 w-40'>
            {/* add functionality */}
            {itemType === 'event' && <Button title='Lägg till i kalendern' />}
            <button className='border-b-2 border-black'>Dela med en vän</button>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <Image
            src={itemType === 'donation' ? item.user.image : item.admin.image}
            alt='admins profilbild'
            height={40}
            width={40}
            className='rounded-full'
          />
          {itemType === 'donation'
            ? `${item.user.firstName} ${item.user.lastName}`
            : `${item.admin.firstName} ${item.admin.lastName}`}
          {itemType === 'donation' && item.user_id !== session.user.id && (
            <>
              <Button title='Skicka meddelande' />
              <Button title='Chatta' />
            </>
          )}
        </div>
      </div>
      <div className='flex gap-4 w-full'>
        <div className='flex flex-col w-full gap-2'>
          <ItemInformation
            item={item}
            btnTitle={btnTitle}
            itemType={itemType}
          />
          {/* Participants */}
          {itemType !== 'donation' && (
            <>
              <ItemParticipants />
              <div>
                <Posts
                  posts={posts}
                  setPosts={setPosts}
                  itemId={item.id}
                  itemType={itemType}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
