import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { MenuIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';
import SearchBarContainer from './SearchBarContainer';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (input !== '') {
      const fetchResult = async () => {
        const response = await fetch(`/api/prisma/search/${input}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (
          data.users.length !== 0 ||
          data.events.length !== 0 ||
          data.groups.length !== 0 ||
          data.donations.length !== 0
        ) {
          setResults(data);
          setShowResults(true);
        } else {
          setResults(null);
        }
      };
      fetchResult();
    }
  }, [input]);

  const goToSearch = () => {
    router.push(`/search?input=${input}`, undefined, { shallow: true });
    setInput('');
    setResults(null);
  };

  return (
    <div
      className={`absolute flex z-50 md:right-10 sm:right-0 sm:left-auto left-0 flex-col bg-white outline-black outline outline-1 ml-0 items-center p-2 rounded-md md:translate-y-0 sm:translate-y-8 -translate-y-5 ${
        showInput ? 'md:w-1/3 w-screen' : 'w-10'
      } `}
      onBlur={() =>
        setTimeout(() => {
          setShowResults(false);
        }, 200)
      }
    >
      <div className={`relative flex ${showInput ? 'w-full' : 'w-6'}`}>
        <SearchIcon
          className='absolute left-0 h-6 text-gray-400'
          onClick={() => setShowInput(!showInput)}
        />
        <input
          className='pl-6 w-full flex ml-2 items-center outline-none placeholder-gray-400 flex-shrink '
          type='text'
          placeholder='Sök'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && goToSearch()}
          role='search'
        />
      </div>
      {input !== '' && showResults && showInput && (
        <div
          className={`flex flex-col p-2 w-full max-h-40 overflow-y-scroll bg-white  ${
            !results && 'hidden'
          }`}
        >
          {showResults && results && (
            <>
              <SearchBarContainer results={results} setInput={setInput} />
              <button
                onClick={goToSearch}
                className='w-full flex items-center justify-center absolute bottom-0 left-0 bg-white rounded-b-lg hover:bg-chas-secondary p-2'
              >
                <SearchIcon className=' hidden sm:inline-flex h-6 text-gray-400' />
                Sök efter {input}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
