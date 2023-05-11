import timeAgo from '@/functions/timeAgo';
import { useRef, useState } from 'react';

const Comment = ({ comment, authorId, comments, setComments }) => {
  const timeStamp = timeAgo(comment.created);
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const editText = useRef();

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

  const editComment = async (commentId) => {
    setEdit(!edit);

    const response = await fetch(`/api/prisma/comments/${commentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const data = await response.json();
      editText.current.value = data.text;
    }
  };

  const updateComment = async (commentId) => {
    setEdit(!edit);

    const response = await fetch(`/api/prisma/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText.current.value }),
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const data = await response.json();
      setCommentText(data.text);
    }
  };

  return (
    <div className='relative w-full bg-white p-2 rounded-lg'>
      {comment.author_id === authorId &&
        (edit ? (
          <>
            <button
              className='absolute top-4 right-12'
              onClick={() => updateComment(comment.id)}
            >
              Save
            </button>
            <textarea
              className='w-full h-20 rounded-lg p-2 resize-none mt-10'
              ref={editText}
            />
          </>
        ) : (
          <>
            {commentText}
            <button
              className='absolute top-4 right-12'
              onClick={() => editComment(comment.id)}
            >
              Edit
            </button>
            <button
              className='absolute top-4 right-4'
              onClick={() => deleteComment(comment.id)}
            >
              X
            </button>
          </>
        ))}
      <p className=' text-xs text-slate-500'>{timeStamp}</p>
    </div>
  );
};

export default Comment;
