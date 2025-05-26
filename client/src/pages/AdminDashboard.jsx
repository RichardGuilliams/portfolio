import { useState, useEffect } from "react";
import { getRole } from "./context/AuthContext";
import Blog from "./Blog";
import BlogEditor from "../components/BlogEditor";
import ProjectEditor from "../components/ProjectEditor";
import Editor from "../methods/CreateBlogPost";
import Icon from "../components/Icons";
import NavBar from "../components/NavBar";

function Unauthorized() {
	return <div className="main">
		<div className="main-section">
			<div className="main-section-header">Unauthorized Access</div>
		</div>
	</div>
}

function activate(section) {
	// console.log("button clicked")
	const postElement = document.getElementById("post-section");
	const projectElement = document.getElementById("project-editor");
	const editorElement = document.getElementById("blog-editor");
	// console.log("This is the editor", editorElement)
	if (section === "post") {
		postElement.classList.remove("hidden");
		projectElement.classList.add("hidden");
		editorElement.classList.add("hidden");
	}
	if (section === "project") {
		projectElement.classList.remove("hidden");
		editorElement.classList.add("hidden");
		postElement.classList.add("hidden");
	}
	if (section === "editor") {
		editorElement.classList.remove("hidden");
		document.getElementById("submit-button").onclick = () => { Editor.ProcessBlocks("post") }
		projectElement.classList.add("hidden");
		postElement.classList.add("hidden");
	}
}

const Posts = () => {
	return (
		<div className="hidden" id="post-section">
			<Blog admin={true} />
		</div>
	)
}

const AdminUI = () => {
	return (
		<nav id="admin-nav" className="admin-nav">
			<input type="checkbox" id="sidebar-active" className="sidebar-active" />
			<div className="nav-section-top">
				<label htmlFor="sidebar-active" >
					<Icon.RightArrow className="admin-nav-arrow open-sidebar-button" />
				</label>
			</div>
			<label className="overlay" htmlFor="sidebar-active" />
			<div class="nav-wrapper">
				<label htmlFor="sidebar-active">
					<Icon.LeftArrow className="admin-nav-arrow close-sidebar-button" />
				</label>
				<ul id="admin-ul" className="admin-ul">
					<li>
						<button onClick={() => activate("editor")}>New Post</button>
						<button onClick={() => activate("post")}>Posts</button>
					</li>
					<li>
						<button onClick={() => activate("project")}>Projects</button>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default function AdminDashboard() {
	const [role, setRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}

		getRole(token).then((r) => {
			setRole(r);
			setLoading(false);
		});
	}, []);

	if (loading) return <div>Loading...</div>;

	if (role !== "admin") return <Unauthorized />;

	return (
		<div className="main">
			<NavBar />
			<div className="admin-nav-wrapper">
				<AdminUI />
			</div>
			<div className="admin-section">
				<h1 className="admin-header text-3xl font-bold">Admin Panel</h1>
				<div className="admin-panel">
					<BlogEditor />
					<Posts />
					<ProjectEditor />
				</div>
			</div>
			{/* your admin content here */}
		</div>
	);
}
