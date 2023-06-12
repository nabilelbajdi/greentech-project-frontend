import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import TimeStamp from './TimeStamp';
import Link from 'next/link';
import DotDotDotMeny from './DotDotDotMeny';
import { AiOutlineEllipsis } from 'react-icons/ai';

const Comment = ({ comment, comments, setComments, setNrOfComments }) => {
  const { data: session } = useSession();
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const editText = useRef();
  const [menuVisable, setMenuVisible] = useState(false);

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

  const menuContent = [
    { title: 'Redigera', callback: () => editComment(comment.id) },
    { title: 'Ta bort', callback: () => deleteComment(comment.id) },
  ];

  console.log('comment: ', comment);

  return (
    <div
      className={`flex ${
        comment.author_id === session.user.id && 'flex-row-reverse ml-auto'
      } items-center px-2`}
    >
      <Link href={`/${comment.author.userPath}`}>
        <Image
          src={comment.author.image}
          alt='author image'
          height={25}
          width={25}
          className={`rounded-full ${
            comment.author_id === session.user.id ? 'ml-4' : 'mr-4'
          }`}
        />
      </Link>
      <div className='flex flex-col w-full'>
        <div className='relative w-fit bg-gray-200 p-2 px-4 rounded-3xl'>
          <div className={`flex justify-between ${edit && 'flex-col'}`}>
            <Link
              href={`/${comment.author.userPath}`}
              className=' text-sm font-semibold mr-4 border-b-2 border-gray-200 hover:border-b-2 hover:border-black'
            >
              {comment.author.firstName + ' ' + comment.author.lastName}
            </Link>
            <div>
              {comment.author_id === session.user.id && (
                <>
                  {menuVisable && (
                    <DotDotDotMeny
                      menuContent={menuContent}
                      setMenuVisible={setMenuVisible}
                      comment={true}
                    />
                  )}
                  {edit && (
                    <div className='relative'>
                      <button
                        className='absolute bottom-4 right-4 text-slate-500'
                        onClick={() => updateComment(comment.id)}
                      >
                        Save
                      </button>
                      <textarea
                        className='w-full h-20 rounded-lg p-2 resize-none mt-10 outline outline-1 outline-black'
                        ref={editText}
                      />
                    </div>
                  )}
                </>

                // ) : (
                //   <div className='flex gap-4'>
                //     <button onClick={() => editComment(comment.id)}>
                //       <PencilIcon className='h-4 w-4' />
                //     </button>
                //     <button onClick={() => deleteComment(comment.id)}>X</button>
                //   </div>
              )}
            </div>
          </div>
          {!edit && commentText}
          <TimeStamp time={comment.created} />
        </div>
      </div>
      {comment.author_id === session.user.id && (
        <button
          onClick={() => {
            setMenuVisible((value) => !value);
          }}
        >
          <AiOutlineEllipsis className='hover:text-slate-900 text-2xl text-slate-600 rotate-90' />
        </button>
      )}
    </div>
  );
};

export default Comment;
