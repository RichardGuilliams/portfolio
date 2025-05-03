import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectCard({title, description, photo, url}){
    return(
        <a className="card card-link" href={url}>
            <img className="card-image" src={photo} width={100} height={100} alt="" />
            <div className="card-section">
                <h1 className="card-header">{title}</h1>
                <p className="card-description">{description}</p>
            </div>
        </a>
    )
}
