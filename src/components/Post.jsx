import { useRef, useState } from 'react';
import Comment from './Comment';
import Image from 'next/image';
import { ChatIcon, HeartIcon } from '@heroicons/react/outline';
import TimeStamp from './TimeStamp';

const Post = ({ post, deletePost, authorId }) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [comments, setComments] = useState(post.comments);
  const editText = useRef();
  const commentText = useRef();
  const [nrOfComments, setNrOfComments] = useState(post.comments.length);

  const editPost = async (postId) => {
    setEdit(!edit);

    const response = await fetch(`/api/prisma/posts/${postId}`, {
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

  const updatePost = async (postId) => {
    setEdit(!edit);

    const response = await fetch(`/api/prisma/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText.current.value }),
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const data = await response.json();
      setPostText(data.text);
    }
  };

  const handleNewComment = async (postId) => {
    const text = commentText.current.value;

    if (text === '') {
      setReply(false);
      return;
    }
    const response = await fetch('/api/prisma/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text, postId }),
    });
    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      commentText.current.value = '';
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setReply(false);
      setNrOfComments((prev) => prev + 1);
    }
  };

  return (
    <div className='relative bg-green-100 p-4 rounded-lg'>
      <div className='flex items-center gap-4 w-full mb-2'>
        {post.author.image && (
          <Image
            className='rounded-full'
            src={post.author.image}
            alt='author image'
            height={40}
            width={40}
          />
        )}
        <div className='flex flex-col'>
          <p>{post.author.name}</p>
          <TimeStamp time={post.created} />
        </div>
      </div>
      {edit ? (
        <>
          {/* if you are the author, and you are in edit mode, you may save the edits done to the post */}
          {authorId === post.author_id && (
            <>
              <button
                className='absolute top-4 right-12'
                onClick={() => updatePost(post.id)}
              >
                Save
              </button>
              <textarea
                className='w-full h-20 rounded-lg p-2 resize-none mt-10'
                ref={editText}
              />
            </>
          )}
        </>
      ) : (
        <>
          <p className='my-4'>{postText}</p>
          <div className='flex justify-between text-xs px-8'>
            <p>0 gillar</p>
            <p>{nrOfComments} kommentarer</p>
          </div>
          {/* if you are the author, and you are NOT in edit mode, you may edit the post */}
          {authorId === post.author_id ? (
            <>
              <button
                className='absolute top-4 right-12'
                onClick={() => editPost(post.id)}
              >
                Edit
              </button>
              <button
                className='absolute top-4 right-4'
                onClick={() => deletePost(post.id)}
              >
                X
              </button>
            </>
          ) : reply ? (
            <>
              {/* if you're NOT the author you may only reply to the post */}
              {authorId !== post.author_id && (
                <div className='relative'>
                  <textarea
                    className='w-full h-20 rounded-lg p-2 resize-none mt-2'
                    ref={commentText}
                  />
                  <button
                    className='absolute top-4 right-4'
                    onClick={() => setReply(!reply)}
                  >
                    X
                  </button>
                  <button
                    className='absolute bottom-4 right-4'
                    onClick={() => handleNewComment(post.id)}
                  >
                    Send
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className='flex justify-between px-8 border-y-2 py-2 mb-4 border-green-300'>
              {/* set edit state */}
              <button className='flex gap-2 items-center'>
                <HeartIcon className='h-5 w-5' /> Gilla
              </button>
              <button
                className='flex gap-2 items-center'
                onClick={() => setReply(true)}
              >
                <ChatIcon className='h-5 w-5' /> Kommentera
              </button>
            </div>
          )}
        </>
      )}

      {/* creating Comment components */}
      {comments.length !== 0 && (
        <div className='flex flex-col gap-4 my-2'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              setComments={setComments}
              comments={comments}
              setNrOfComments={setNrOfComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
