import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectCard(){
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    return(
        <a className="card card-link" href="https://www.google.com">
            <img className="card-image" src="images/richard-guilliams.jpg" width={100} height={100} alt="" />
            <div className="card-section">
                <h1 className="card-header">Natours</h1>
                <p className="card-description">This project was built using MongoDB, Express, Pug and NodeJS. Although it is not a true MERN Stack project. I am proud of it as it represents the completion of my backend course from Jonas Schmedtmann on Udemy and gave me the foundation I needed for my journey into building web apps.</p>
            </div>
        </a>
    )
}
