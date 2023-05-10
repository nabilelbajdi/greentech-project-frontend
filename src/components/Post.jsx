import { useRef, useState } from 'react';
import Comment from './Comment';

const Post = ({ post, deletePost, commentsArr, authorId }) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [comments, setComments] = useState(commentsArr);
  const editText = useRef();
  const commentText = useRef();

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
      console.log(newComment);
      setComments([...comments, newComment]);
      setReply(false);
    }
  };

  return (
    <div className='relative bg-slate-300 p-4 rounded-lg'>
      {edit ? (
        <>
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
          <p>{postText}</p>
          {authorId !== post.author_id ? (
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
              {authorId === post.author_id && (
                <div className='relative'>
                  <textarea
                    className='w-full h-20 rounded-lg p-2 resize-none mt-2'
                    ref={commentText}
                  />
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
            <>
              <button
                className='absolute top-4 right-4'
                onClick={() => setReply(true)}
              >
                Reply
              </button>
            </>
          )}
        </>
      )}

      {comments.length !== 0 && (
        <div className='flex flex-col gap-4 my-2'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              authorId={authorId}
              setComments={setComments}
              comments={comments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
