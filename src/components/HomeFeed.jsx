import StatusBox from "./StatusBox";

const HomeFeed = ({posts}) => {
  
    /* const deletePost = async (postId) => {
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
      };*/
console.log(posts) 
    return (  
        <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
        <div className="mx-auto mx-w-md md:max-w-lg lg:max-w-2xl">
        <StatusBox/>
        </div>
       {/*  {posts.map(post =>(
        <Post
        key={post.id}
        name={post.author_id}
        message={post.text}
        timestamp={post.created}
        />))
           }
         */}
  
        
        
        </div>
    );
}
 
export default HomeFeed;