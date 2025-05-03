import { useState, useEffect } from "react"
import { useAuth, getRole } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Blog from "./Blog"
import BlogEditor from "../components/BlogEditor"
import ProjectEditor from "../components/ProjectEditor"

function Unauthorized(){
  return <div className="main">
    <div className="main-section">
      <div className="main-section-header">Unauthorized Access</div>;
    </div>
  </div>
}

function activate(section){
  // console.log("button clicked")
  const postElement = document.getElementById("post-section");
  const projectElement = document.getElementById("project-editor");
  const editorElement = document.getElementById("blog-editor");
  // console.log("This is the editor", editorElement)
  if(section === "post"){
    postElement.classList.remove("hidden");
    projectElement.classList.add("hidden");
    editorElement.classList.add("hidden");
  }
  if(section === "project"){
    projectElement.classList.remove("hidden");
    editorElement.classList.add("hidden");
    postElement.classList.add("hidden");
  }
  if(section === "editor"){
    editorElement.classList.remove("hidden");
    projectElement.classList.add("hidden");
    postElement.classList.add("hidden");
  }
}

const AdminUI = () => {
  return(
    <nav className="admin-nav">
      <ul className="admin-ul">
        <li>
          <button onClick={() => activate("editor")}>New Post</button>
          <button onClick={() => activate("post")}>Posts</button>
        </li>
        <li>
          <button onClick={() => activate("project")}>Projects</button>
        </li>
      </ul>
    </nav>
  )
}

const Analytics = () => {
  return(
    <div></div>
  )
}

const Posts = () => {
  return(
    <div className="hidden" id="post-section">
      <Blog admin={true}/>
    </div>
  )
}

const Projects = () => {
  return(
    <div className="hidden" id="project-section">
      These are the projects.
    </div>
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
        <AdminUI/>
        <div className="admin-section">
            <h1 className="admin-header text-3xl font-bold">Admin Panel</h1>
            <div className="admin-panel">
              <BlogEditor/>
              <Posts/>
              <ProjectEditor/>
            </div>
          <Analytics/>
        </div>
      {/* your admin content here */}
    </div>
  );
}
