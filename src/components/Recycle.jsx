import Widget from './Widget';

const Recycle = () => {
  return (
    <div className='w-full h-screen'>
      <main className='flex h-3/4'>
        <div className='lg:ml-28 bg-white rounded-xl overflow-hidden w-full'>
          <section className='relative p-4 bg-gray-100 rounded-xl h-full'>
            <iframe
              src={`https://www.google.com/maps/d/embed?mid=1A0qWdxKlNarOdxkKk4Sc6Tr_bvOS2Bc&ehbc=2E312Fz=5key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              className='h-full w-full'
            ></iframe>
          </section>
        </div>
        <Widget />
      </main>
    </div>
  );
};

export default Recycle;
