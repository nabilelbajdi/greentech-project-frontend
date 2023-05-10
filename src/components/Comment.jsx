import timeAgo from '@/functions/timeAgo';

const Comment = ({ comment, authorId, comments, setComments }) => {
  const timeStamp = timeAgo(comment.created);
  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/prisma/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const deletedComment = await response.json();

      setComments(
        comments.filter((comment) => {
          return comment.id !== deletedComment.id;
        })
      );
    }
  };

  return (
    <div className='relative w-full bg-white p-2 rounded-lg'>
      {comment.text}
      {comment.author_id === authorId && (
        <button
          className='absolute right-4'
          onClick={() => deleteComment(comment.id)}
        >
          X
        </button>
      )}
      <p className=' text-xs text-slate-500'>{timeStamp}</p>
    </div>
  );
};

export default Comment;
