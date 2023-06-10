import Widget from './Widget';

const CardSlugPage = ({ children, notFoundTitle, props }) => {
  return (
    <div className='w-full'>
      <main className='flex'>
        {props ? (
          <>
            <div className='lg:ml-28 w-full'>{children}</div>
            <Widget />
          </>
        ) : (
          { notFoundTitle }
        )}
      </main>
    </div>
  );
};

export default CardSlugPage;
