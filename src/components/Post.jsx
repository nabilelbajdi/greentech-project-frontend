import { useRef, useState } from 'react';

const Post = ({ post, deletePost }) => {
  const [edit, setEdit] = useState(false);
  const editText = useRef();

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
    }
  };

  return (
    <div className='relative bg-slate-300 p-4 rounded-lg'>
      <p>{post.text}</p>
      {edit ? (
        <button
          className='absolute top-4 right-12'
          onClick={() => updatePost(post.id)}
        >
          Save
        </button>
      ) : (
        <button
          className='absolute top-4 right-12'
          onClick={() => editPost(post.id)}
        >
          Edit
        </button>
      )}
      <button
        className='absolute top-4 right-4'
        onClick={() => deletePost(post.id)}
      >
        X
      </button>
      {edit && (
        <textarea
          className='w-full h-20 rounded-lg p-2 resize-none mt-4'
          ref={editText}
        />
      )}
    </div>
  );
};

export default Post;
