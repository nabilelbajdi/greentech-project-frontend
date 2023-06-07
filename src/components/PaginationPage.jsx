import { Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import DonationPreview from './DonationPreview';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import EventPreview from './EventPreview';

const PaginationPage = ({ length, item, title }) => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('Kläder');
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);

  // Fetches new data when user clicks changes page
  const { data } = useQuery(
    [item, page],
    async () =>
      await fetch(`/api/prisma/${item}?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((result) => result.json()),
    {
      keepPreviousData: true,
    }
  );
  // If user accesses a page query directly, the correct donations are loaded
  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);

  // Updates the page query when user changes page
  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`${item}?page=${value}`, undefined, { shallow: true });
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex justify-between w-full'>
        <p className='font-bold text-xl'>{title}</p>
        {/* <select
          id='category'
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)`)
          }
          className='ml-auto'
        >
          <option value='Kläder'>Kläder</option>
          <option value='Leksaker'>Leksaker</option>
          <option value='Möbler'>Möbler</option>
          <option value='Inredning'>Inredning</option>
          <option value='Fordon'>Fordon</option>
        </select> */}
      </div>
      <div className='grid md:grid-cols-3 grid-cols-2 gap-2 lg:grid-rows-2'>
        {data &&
          data.map((i) => (
            <Link href={`/${item}/${i.id}`} key={i.id}>
              {item === 'donations' ? (
                <DonationPreview donation={i} />
              ) : (
                <EventPreview event={i} />
              )}
            </Link>
          ))}
      </div>
      <Pagination
        // count = how many donations are fetched
        count={Math.ceil(length / 8)}
        page={page}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default PaginationPage;
