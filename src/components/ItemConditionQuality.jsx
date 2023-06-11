const ItemConditionQuality = ({ item }) => {
  return (
    <div className='flex flex-col justify-between p-2 mb-4 w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <p className='font-bold'>Kategori:</p> {item.category}
          <p className='font-bold'>Skick:</p> {item.condition}
        </div>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemConditionQuality;
