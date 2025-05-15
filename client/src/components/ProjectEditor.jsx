import { useState, useEffect} from "react";
import { FormCreate } from "../methods/requests"

function Submit(setLoading, setData){
    
    const formData = new FormData();
    
    formData.append("name", document.getElementById("project-title").value);
    formData.append("description", document.getElementById("project-description").value);
    formData.append("projectImage", document.getElementById("project-image").files[0]);
    formData.append("photo", "");
    formData.append("url", document.getElementById("project-url").value);
    formData.append("tools", document.getElementById("project-tools").value);

    FormCreate('projects', setData, setLoading, formData);
}


const Editor = ({setLoading, setData}) => {
    return(
        <div id="project-editor" className="form hidden">
            <div className="editor-nav">
                <section className="form-section">
                    <label className="form-text" htmlFor="project-title">Title: </label>
                    <input className="form-input" type="text" name="project-title" id="project-title"/>
                </section>
                <section className="form-section">
                    <label className="form-text" htmlFor="project-description">Description: </label>
                    <input className="form-input" type="text" name="project-description" id="project-description"/>
                </section>
                <section className="form-section">
                    <label className="form-text" htmlFor="project-image">Image: </label>
                    <input className="form-input" type="file" name="project-image" id="project-image"/>
                </section>
                <section className="form-section">
                    <label className="form-text" htmlFor="project-url">URL: </label>
                    <input className="form-input" type="text" name="project-url" id="project-url"/>
                </section>
                <section className="form-section">
                    <label className="form-text" htmlFor="project-tools">Tools: <span className="form-text">Separate tags by comma.</span> </label>
                    <input className="form-input" type="text" name="project-tools" id="project-tools"/>
                </section>
                <section onClick={() => {Submit(setLoading, setData)}} className="form-button">
                    <button id="project-submit-button" className="form-text">Submit</button>
                </section>
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