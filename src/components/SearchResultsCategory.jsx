import getImage from '@/functions/getTemporaryImage';
import Image from 'next/image';
import Link from 'next/link';
import SearchedProfile from './SearchedProfile';

const SearchResultsCategory = ({ title, item, setInput }) => {
  const path = {
    Evenemang: 'events',
    Grupper: 'groups',
    Donationer: 'donations',
  };

  let temporaryImage;
  if (path[title]) {
    temporaryImage = path[title].split('s')[0];
  }

  return (
    <div
      className={`flex flex-col border-b-2 mb-2 ${!setInput &&
        'lg:ml-28 bg-white rounded-xl overflow-hidden mb-6 p-4 max-h-96 overflow-y-scroll'
        }`}
    >
      <p className='text-xl font-bold'>{title}:</p>
      <div className='flex flex-col gap-2 my-2 '>
        {title === 'Användare'
          ? item.map((i) => (
            <SearchedProfile
              user={i}
              setInput={setInput}
              title={title}
              key={i.userPath}
            />
          ))
          : item.map((i) => (
            <Link
              href={`/${path[title]}/${i.id}`}
              key={i.id}
              onClick={() => setInput && setInput('')}
              className='flex items-center gap-3 hover:bg-gray-100 p-2'
            >
              <>
                <Image
                  src={!i.image && getImage(temporaryImage)}
                  alt='förhandsbild'
                  height={setInput ? 30 : 70}
                  width={setInput ? 30 : 70}
                  className={
                    setInput ? 'rounded-full' : 'rounded-lg h-full w-auto'
                  }
                />
                <p>{i.name}</p>
              </>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchResultsCategory;