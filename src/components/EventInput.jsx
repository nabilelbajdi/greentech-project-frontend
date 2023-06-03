const EventInput = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='px-2 py-4 border-2 rounded-lg'
    />
  );
};

export default EventInput;
