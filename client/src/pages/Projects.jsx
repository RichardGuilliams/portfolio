import { useState, useEffect } from "react"
import ProjectCard from "../components/ProjectCard"
import Links from "../components/Links"
import NavBar from "../components/NavBar";
import { Get } from "../methods/requests"

const DisplayProjects = ({data}) => {
  return(
    // <div className="project-section">
      data.length === 0 ? (<div>No Posts Available...</div>) :
      (data.map(project => (
          <ProjectCard title={project.name} description={project.description} photo={`http://localhost:8000/${project.photo}`} url={project.url}/>
      )))      
    // </div>
  )
}

export default function Projects() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {Get('projects', setData, setLoading)}, []);

    if(loading) return <div>Loading...</div>

    return (
      <div className="main p-8">
        <NavBar/>
        <div className="main-section">
          <h1 className="main-section-header text-4xl font-bold text-blue-600">My Projects</h1>
          <DisplayProjects data={data}/>
        </div>
        <Links/>
      </div>
    );
  }