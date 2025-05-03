import { useState, useEffect} from "react";
import { FormCreate } from "../methods/requests"

function Submit(setLoading, setData){
    
    const formData = new FormData();
    
    formData.append("name", document.getElementById("project-title").value);
    formData.append("description", document.getElementById("project-description").value);
    formData.append("projectImage", document.getElementById("project-image").files[0]);
    formData.append("photo", "");
    formData.append("url", document.getElementById("project-url").value);

    FormCreate('projects', setData, setLoading, formData);
}


const Editor = ({setLoading, setData}) => {
    return(
        <div id="project-editor" className="editor hidden">
            <div className="editor-nav">
                <section className="editor-nav-section">
                    <label htmlFor="project-title">Title: </label>
                    <input type="text" name="project-title" id="project-title"/>
                </section>
                <section className="editor-nav-section">
                    <label htmlFor="project-description">Description: </label>
                    <input type="text" name="project-description" id="project-description"/>
                </section>
                <section className="editor-nav-section">
                    <label htmlFor="project-image">Image: </label>
                    <input type="file" name="project-image" id="project-image"/>
                </section>
                <section className="editor-nav-section">
                    <label htmlFor="project-url">URL: </label>
                    <input type="text" name="project-url" id="project-url"/>
                </section>
                <button id="project-submit-button" className="editor-button" onClick={() => {Submit(setLoading, setData)}}>Submit</button>
            </div>
        </div>
    )
}

export default function ProjectEditor(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);
    return(
        <Editor setLoading={setLoading} setData={setData}/>
    )
}