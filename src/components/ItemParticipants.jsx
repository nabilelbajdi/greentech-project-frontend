import ParticipantCard from './ParticipantCard';

const ItemParticipants = () => {
  return (
    <div className='bg-white p-4 rounded-xl flex flex-col'>
      <h2 className='text-xl font-semibold text-center'>Deltagare</h2>
      <div className='grid grid-cols-6 overflow-clip max-h-40 overflow-scroll gap-4 mt-2 px-4'>
        {/* map through participants when function is added */}
        <ParticipantCard img='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80' />
        <ParticipantCard img='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
        <ParticipantCard img='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
        <ParticipantCard img='https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
      </div>
    </div>
  );
};

export default ItemParticipants;
