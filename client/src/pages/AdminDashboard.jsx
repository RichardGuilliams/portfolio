import { useState, useEffect } from "react"
import { useAuth, getRole } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Blog from "./Blog"

function Unauthorized(){
  return <div className="main">
    <div className="main-section">
      <div className="main-section-header">Unauthorized Access</div>;
    </div>
  </div>
}

function activate(section){
  console.log("button clicked")
  const postElement = document.getElementById("postSection");
  const projectElement = document.getElementById("projectSection");
  if(section === "post"){
    postElement.classList.remove("hidden");
    projectElement.classList.add("hidden");
  }
  if(section === "project"){
    projectElement.classList.remove("hidden");
    postElement.classList.add("hidden");
  }
}

const AdminUI = () => {
  return(
    <nav className="admin-nav">
      <ul className="admin-ul">
        <li>
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
    <div className="hidden" id="postSection">
      <Blog admin={true}/>
    </div>
  )
}

const Projects = () => {
  return(
    <div className="hidden" id="projectSection">
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
            <div>
              <Posts/>
              <Projects/>
            </div>
          <Analytics/>
        </div>
      {/* your admin content here */}
    </div>
  );
}
