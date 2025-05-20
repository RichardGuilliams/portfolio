import { useEffect, useState } from "react";
import Links from "../components/Links"
import NavBar from "../components/NavBar";
import { Get, Delete } from "../methods/requests"

const Posts = ({ posts, admin = false, setPosts, setLoading}) => {
	return(
		//TODO: fix the design so the admin buttons are lined up with the header. as well as fix the way admin buttons are handled based on the url
		<div className="blog-post-section">
			{posts.length === 0 ? (
				<p>No posts available</p>  // Show this if no posts are found
			) : (
				<GetPosts posts={posts} admin={admin} setPosts={setPosts} setLoading={setLoading}/>
			)}
		</div>
	)
}

const GetPosts = ({ posts, admin = false, setPosts, setLoading }) => {
	return(
		posts.map(post => (
			<Card post={post} admin={admin} setPosts={setPosts} setLoading={setLoading}/>	
		))

	)	
}

const Card = ({ post, admin = false, setPosts, setLoading }) => {
	return(
		<div className="card-container">
			{/* {console.log(post)} */}
			<a href={`/blog/${post._id}`} className="card-link">
				<img className="card-image"  src={`http://localhost:8000/${post.thumbnail}`} alt="" height={100} width={100}/>
				<div className="card-section">
					<AdminButtons post={post} admin={admin} setPosts={setPosts} setLoading={setLoading}/>
					<h1 className="card-header">{post.title}</h1>
					<p className="card-description">{post.description}</p>
				</div>
			</a>
		</div>	
	)
}

const AdminButtons = ({post, admin = false, setPosts, setLoading}) => {
	return(
		admin ? <div className="admin-button-section">
			<button onClick={() => {Delete(`posts/${post._id}`, setPosts, setLoading)}} className="admin-button">Delete</button>
			<button onClick={() => {}} className="admin-button">Edit</button>
		</div> : null
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
