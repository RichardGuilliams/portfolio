import { useEffect, useState } from "react";
import { createRoot} from "react-dom/client";
import Icons from "./Icons";
import { FormCreate } from "../methods/requests";
import Editor from "../methods/CreateBlogPost.jsx";
//TODO: Create error alerts for the

/* function handleBlockAlignment(){
    
}

function handleBlockLayout(){

}

function handleBlockDisplay(){

}

function handleSectionType(){

}

function getElementCount(type){
    return document.getElementsByClassName(type).length
}

function getArrayFromCollection(collection){
  const arr = [];
  for(let i = 0; i < collection.length; i++){
    arr.push(collection[i]);
  }
  return arr;
}

function processBlocks(){
  const formData = new FormData();

  formData.append("title", document.getElementById("title").value)
  formData.append("description", document.getElementById("description").value)
  
  
  const blocks = []

  
  const thumbnailFile = document.getElementById('thumbnail').files[0];
  if(thumbnailFile) formData.append("thumbnail", thumbnailFile);
  
  const blockElements = getArrayFromCollection(document.getElementsByClassName("block"));
  blockElements.map((el, i) => {
    blocks.push({});
    blocks[i]["layout"] = "vertical";
    blocks[i]["alignment"] = "center";
    blocks[i]["display"] = "flex";
    blocks[i]["sections"] = [];
    blocks[i]['name'] = `block-${i}`;
    const sections = getArrayFromCollection(el.children[1].children)
    processSections(sections, blocks[i], formData);
  })

  formData.append("blocks", JSON.stringify(blocks));

  // body = ConvertJSONToForm(body);
  CreatePost(formData); 
}

function CreatePost(formData){
  // console.log(body)
  const state = {
    data: {},
    loading: false
  }
  const setData = (newData) => {state.data = newData}
  const setLoading = (bool) => {state.loading = bool}

  FormCreate("posts", setData, setLoading, formData)
}

function getContentValue(type, el){
  console.log("firing getContentValue", type)
  switch(type){
    case "img": return "";
    case "p": 
      console.log('content: ', el.querySelector("textarea").value)
      return el.querySelector("textarea").value
    default:
      console.log("content:", el.querySelector("input").value)
      return el.querySelector("input").value
  }
}

function processSections(sections, block, formData){
  sections.forEach((el, i) => {
    const type = el.querySelector("select").value;
    const content = getContentValue(type, el);
    
    let id = el.children[0].children[0].children[1].id
    id = id.slice(0, id.length - 8)
    const input = document.getElementById(id);

    if (type === "img" && input.files.length > 0) {
      input.files[0].originalname = id;
      formData.append("sectionsImages", input.files[0], `${id.replace("-input", '')}`);
    }


    block.sections.push({
      name: id.replace('-input', ''),
      type: type,
      content: content
    });
    console.log(block.sections[i])
  });
}
*/
export default function BlogEditor(){
    return (
        <div id="blog-editor" className="form hidden">
            <div className="editor-nav">
                {/* <button className="editor-button" onClick={() => {CreateElement("block", getElementCount("block"))}}>Add Block</button> */}
                <section className="form-section">
                  <label className="form-text" htmlFor="title">Title: </label>
                  <input className="form-text" id="title" name="title" type="text"/>
                </section>
                <section className="form-section">
                  <label className="form-text" htmlFor="description">Description: </label>
                  <input className="form-text" id="description" name="description" type="text"/>
                </section>
                <section className="form-section">
                  <label className="form-text" htmlFor="thumbnail">Thumbnail: </label>
                  <input className="form-text" id="thumbnail" name="thumbnail" type="file"/>
                </section>
                <section onClick={() => {Editor.CreateElement("block")}} className="form-button">
                  <button className="editor-button form-text">Add Block</button>
                </section>
                <div id="block-container"/>
                <section id="submit-button" onClick={() => {Editor.ProcessBlocks('post')}} className="form-button" >
                  <button className="form-text">Submit</button>
                </section>
            </div>
        </div>
    )
}
