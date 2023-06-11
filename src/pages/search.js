import SearchBarContainer from '@/components/SearchBarContainer';
import Widget from '@/components/Widget';
import getSearchPageProps from '@/utils/getSearchPageProps';
export const getServerSideProps = getSearchPageProps;

const SearchPage = (props) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        <SearchBarContainer results={props.results} />
        <Widget />
      </main>
    </div>
  );
};

export default SearchPage;
