import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { PencilIcon } from '@heroicons/react/outline';
import TimeStamp from './TimeStamp';

const Comment = ({
  comment,
  comments,
  setComments,
  setNrOfComments,
  author,
}) => {
  const { data: session } = useSession();
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

      setNrOfComments((prev) => prev - 1);
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
    <div className='flex items-center px-2 '>
      <Image
        src={comment.author.image}
        alt='author image'
        height={25}
        width={25}
        className='rounded-full mr-4'
      />
      <div className='flex flex-col w-full'>
        <div className='relative w-fit bg-white p-2 px-4 rounded-3xl'>
          <div className={`flex justify-between ${edit && 'flex-col'}`}>
            <p className=' text-sm font-semibold'>
              {comment.author.firstName + ' ' + comment.author.lastName}
            </p>
            <div>
              {comment.author_id === session.user.id &&
                (edit ? (
                  <div className='relative'>
                    <button
                      className='absolute bottom-4 right-4 text-slate-500'
                      onClick={() => updateComment(comment.id)}
                    >
                      Save
                    </button>
                    <textarea
                      className='w-full h-20 rounded-lg p-2 resize-none mt-10'
                      ref={editText}
                    />
                  </div>
                ) : (
                  <div className='flex gap-4'>
                    <button onClick={() => editComment(comment.id)}>
                      <PencilIcon className='h-4 w-4' />
                    </button>
                    <button onClick={() => deleteComment(comment.id)}>X</button>
                  </div>
                ))}
            </div>
          </div>
          {!edit && commentText}
          {/* <TimeStamp time={comment.created} /> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
