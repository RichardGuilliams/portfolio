import ProjectCard from "../components/ProjectCard"
import Links from "../components/Links"
import NavBar from "../components/NavBar";

export default function Projects() {
    return (
      <div className="main p-8">
        <NavBar/>
        <div className="main-section">
          <h1 className="main-section-header text-4xl font-bold text-blue-600">My Projects</h1>
          <div className="">
            <ProjectCard/>
          </div>
        </div>
        <Links/>
      </div>
    );
  }