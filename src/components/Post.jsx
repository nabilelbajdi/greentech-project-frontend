import { useRef, useState } from 'react';
import Comment from './Comment';
import Image from 'next/image';
import { ChatIcon, HeartIcon } from '@heroicons/react/outline';
import TimeStamp from './TimeStamp';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import ImageModal from './ImageModal';
import socket from '@/socket';

const Post = ({ post, posts, setPosts }) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [comments, setComments] = useState(post.comments);
  const editText = useRef();
  const commentText = useRef();
  const [nrOfComments, setNrOfComments] = useState(post.comments.length);
  const [likes, setLikes] = useState(post.likes.length);
  const { data: session } = useSession();
  const currentUser = session.user.id;

  const [modalImage, setModalImage] = useState();

  const closeModal = () => {
    setModalImage();
  };

  //checks to see if the logged in user already liked the post
  let alreadyLiked = post.likes.filter(
    (like) => like.liked_by_id === session.user.id
  );
  const [likeStatus, setLikeStatus] = useState(
    alreadyLiked.length === 1 ? true : false
  );

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

  const deletePost = async (postId) => {
    const response = await fetch(`/api/prisma/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const deletedPost = await response.json();

      setPosts(
        posts.filter((post) => {
          return post.id !== deletedPost.id;
        })
      );
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

  const handleLike = async (postId) => {
    const response = await fetch(`/api/prisma/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: postId }),
    });

    if (response.status !== 200) {
      console.log('something went wrong');
      //add error banner
    } else {
      const data = await response.json();

      setLikes(data.likes.length);
      setLikeStatus(data.likeStatus);
      const notification = {
        to: data.userPath,
      };

      socket.io.emit('notification', notification);
    }
  };

  let pic;

  if (post.author.profilePicture) {
    pic = post.author.profilePicture;
  } else {
    pic = post.author.image;
  }

  return (
    <article className='relative rounded-2xl bg-white p-4 pb-0 shadow-md'>
      <div className='flex items-center gap-4 w-full mb-2'>
        {pic && (
          <Link
            aria-label={`Länk till ${
              post.author.firstName + ' ' + post.author.lastName
            }s profil`}
            href={`/${post.author.userPath}`}
          >
            <Image
              className='aspect-square object-cover rounded-full'
              src={pic}
              alt='author image'
              height={40}
              width={40}
            />
          </Link>
        )}
        <div className='flex flex-col'>
          <Link
            aria-label={`Länk till ${
              post.author.firstName + ' ' + post.author.lastName
            }s profil`}
            href={`/${post.author.userPath}`}
            className='border-b-2 border-white hover:border-b-2 hover:border-black'
          >
            {post.author.firstName + ' ' + post.author.lastName}
          </Link>
          <TimeStamp time={post.created} />
        </div>
      </div>
      {edit ? (
        <>
          {/* if you are the author, and you are in edit mode, you may save the edits done to the post */}
          {currentUser === post.author_id && (
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
          <p className=' ml-1 my-4'>{postText}</p>
          {post.images.length ? (
            <div className={`flex my-4 rounded-lg overflow-hidden`}>
              {post.images.map((image, idx) => {
                return (
                  <Image
                    src={image.url}
                    key={image.id}
                    alt='bild'
                    height={0}
                    width={1000}
                    style={{ width: `${100 / post.images.length}%` }}
                    className='cursor-pointer object-cover'
                    onClick={() => {
                      setModalImage(idx);
                    }}
                  />
                );
              })}
            </div>
          ) : null}
          <div className='flex justify-between text-xs px-8 mb-1'>
            <div className='flex items-center space-x-2'>
              <div className=' rounded-full bg-red-600 outline-4 outline outline-red-600'>
                <HeartIcon
                  fill='true'
                  className='h-4 w-4 fill-white text-white'
                />
              </div>

              <p className=' text-base'> {likes} </p>
            </div>

            <p className=' text-base'>{nrOfComments} Kommentarer</p>
          </div>
          {/* if you are the author, and you are NOT in edit mode, you may edit the post */}
          {currentUser === post.author_id && (
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
          )}
          {reply && (
            // Reply mode
            <>
              <div className='relative'>
                <textarea
                  className='w-full h-20 rounded-lg p-2 resize-none mt-2 outline outline-1 outline-black'
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
            </>
          )}
          <div className='flex justify-between px-8 border-y-2 py-2 mb-4 border-gray-300'>
            {/* set edit state */}
            <div className='w-1/2 flex justify-center'>
              <button
                className='flex gap-2 items-center'
                onClick={() => handleLike(post.id)}
              >
                {likeStatus ? (
                  <HeartIcon
                    fill='true'
                    className={`h-5 w-5 fill-red-500 text-red-500`}
                  />
                ) : (
                  <HeartIcon className={`h-5 w-5`} />
                )}
                Gilla
              </button>
            </div>

            <div className='w-1/2 flex justify-center'>
              <button
                className='flex gap-2 items-center'
                onClick={() => setReply(true)}
              >
                <ChatIcon className='h-5 w-5' /> Kommentera
              </button>
            </div>
          </div>
        </>
      )}

      {/* creating Comment components */}
      {comments.length !== 0 && (
        <div className='flex flex-col gap-4 my-2 mb-3 bg-white rounded-xl p-2'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              setComments={setComments}
              comments={comments}
              setNrOfComments={setNrOfComments}
              author={post.author}
            />
          ))}
        </div>
      )}
      {modalImage >= 0 && (
        <ImageModal
          images={post.images}
          idx={modalImage}
          closeModal={closeModal}
        />
      )}
    </article>
  );
};

export default Post;
