import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Links from "../components/Links"
import NavBar from "../components/NavBar";
import { Get, Delete } from "../methods/requests"

function useGetPosts(setPosts, setError, setLoading){
  useEffect(() => {
    // Async function to fetch posts
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/posts");
        const data = await res.json();
        setPosts(data.data.data);  // Set the posts state with fetched data
      } catch (err) {
        setError('Failed to fetch posts');  // Handle any errors
      } finally {
        setLoading(false);  // Set loading to false after the request completes  
      }
    };
  
    fetchPosts();  // Call the fetchPosts function
  }, []);  // Empty dependency array means this will run once on mount
}

const Posts = ({ posts, admin = false, setPosts, setLoading}) => {
  return(
    <div className="card">
      {posts.length === 0 ? (
        <p>No posts available</p>  // Show this if no posts are found
      ) : (
        posts.map(post => (
          <div>
              {console.log(post)}
              <button onClick={() => {Delete(`posts/${post._id}`, setPosts, setLoading)}} className="admin-button">Delete</button>
              <button onClick={() => {}} className="admin-button">Edit</button>
              <a href={`/blog/${post._id}`} className="card-link">
                <img className="card-image"  src={`http://localhost:3000/images/posts/${post.thumbnail}`} alt="" height={100} width={100}/>
                <div className="card-section">
                  {admin ? <div className="admin-section">
                  </div> : null}
                  <h1 className="card-header">{post.title}</h1>
                  <p className="card-description">{post.description}</p>
                </div>
              </a>
            </div>
        ))
      )}
    </div>
  )
}



export default function Blog( {admin = false} ) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state

  useEffect(() => {Get("posts", setPosts, setLoading)}, []);

  if (loading) return <div>Loading...</div>;  // Show loading message
  // if (error) return <div>{error}</div>;  // Show error message if fetching failed

  return (
    <div className="main">
      {!admin ? <NavBar/> : null}
      <div className="main-section">
        <h1 className="main-section-header">{admin ? "Posts" : "Blog"}</h1>
        <p className="main-section-text">This blog is for anyone who wishes to learn more about MERN development and javascript in general. In it you can find useful information about programming for the web.</p>
        <Posts admin={admin} posts={posts} setPosts={setPosts} setLoading={setLoading}/>
      </div>
      <Links/>
    </div>
  );
}
