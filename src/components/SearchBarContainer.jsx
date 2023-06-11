import SearchResultsCategory from './SearchResultsCategory';

const SearchBarContainer = ({ results, setInput }) => {
  return (
    <div className='w-full lg:p-0 p-3'>
      {results.users.length !== 0 && (
        <SearchResultsCategory
          title='Användare'
          item={results.users}
          setInput={setInput ? setInput : null}
        />
      )}
      {results.groups.length !== 0 && (
        <SearchResultsCategory
          title='Grupper'
          item={results.groups}
          setInput={setInput ? setInput : null}
        />
      )}
      {results.events.length !== 0 && (
        <SearchResultsCategory
          title='Evenemang'
          item={results.events}
          setInput={setInput ? setInput : null}
        />
      )}
      {results.donations.length !== 0 && (
        <SearchResultsCategory
          title='Donationer'
          item={results.donations}
          setInput={setInput ? setInput : null}
        />
      )}
    </div>
  );
};

export default SearchBarContainer;
