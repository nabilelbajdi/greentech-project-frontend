import Image from 'next/image';

const ItemPreview = ({ item, type }) => {
  const image = {
    group:
      'https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?w=1480&t=st=1686327839~exp=1686328439~hmac=b58b87a031dd8b0102c6091cec22c7858508071c6f07f4427a2d9cdd451f0215',
    event:
      'https://img.freepik.com/free-vector/employee-marking-deadline-day-man-with-pencil-appointing-date-event-making-note-calendar-vector-illustration-schedule-agenda-time-management_74855-8347.jpg?w=2000&t=st=1686321068~exp=1686321668~hmac=a85f1ecd8642a60dda33114f5167b3e5cf47f4b590fcb13f0d3aae61301408e5',
    donation:
      'https://img.freepik.com/free-vector/volunteers-packing-donation-boxes_74855-5299.jpg?w=2000&t=st=1686327711~exp=1686328311~hmac=71c46c36c286de092735e84d3c70e8077107177a674e6bbf513827910a2e4558',
  };

  return (
    <div className='relative h-full flex flex-col items-center overflow-hidden rounded-xl shadow-md'>
      {item.category && (
        <p className='absolute top-2 right-2 bg-chas-gradient-primary text-white p-2 rounded-xl'>
          {item.category}
        </p>
      )}
      <div className='bg-white w-full h-60 rounded-xl flex items-center justify-center'>
        <Image
          src={!item.image ? image[type] : item.image}
          alt='förhandsbild'
          height={200}
          width={300}
          priority
        />
      </div>
      <div className='flex flex-col gap-2 w-full p-2'>
        <p className='font-bold'>{item.name}</p>
        {item.condition && <p>{item.condition}</p>}
      </div>
    </div>
  );
};

export default ItemPreview;
