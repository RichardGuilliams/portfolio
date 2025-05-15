import { useEffect, useState } from "react";
import { createRoot} from "react-dom/client";
import Icons from "./Icons";
import { FormCreate } from "../methods/requests"

//TODO: Create error alerts for the

function CreateElement(type, id){
    const parent = document.getElementById(type == "block" ? "block-container" : `${id}-section-container`);
    const el = document.createElement("div");
    parent.appendChild(el);
    const root = createRoot(el); 
    const count = parent.childNodes.length;
    root.render(type === "block" ? <Block id={`block-${count - 1}`}/> : <Section id={`${id}-section-${count - 1}`}/>);
}

function ProcessInput(type, id, element){
  const el = document.createElement(element);
  if(element === "textarea"){
    el.id = `${id.replace('section-type', "")}input`
    el.rows = 10;
  }
  else if(element === "input"){
    el.type = type === "img" ? "file" : "text"
    el.id = `${id.replace('section-type', "")}input`
    // el.className = type === "img" ? "input-file" : "input-text"
  }
  else {
    el.htmlFor = `${id.replace('section-type', "input")}`
    el.textContent = type === 'img' ? "Image: " : "Text: "
  }
  return el;
}
  
function CreateInput(type, id){
  const parent = document.getElementById(id.replace("section-type", "input-section"));
  parent.classList.add('form-input')
  const input = ProcessInput(type, id, type === "textarea" ? "textarea" : "input");
  input.classList.add(type === "img" ? "input-img" : "input-text")
  const label = ProcessInput(type, id, 'label');
  if(parent.children.length > 0) parent.innerHTML = null; 
  parent.appendChild(label);
  parent.appendChild(input)  
}


function HandleSelect(event){
  if(event.target.id.includes('section-type')) return processSectionChange(event.target); 
    switch(event.target.id){
        case "block-alignment" : return
        case "block-layout" : return
        case "block-display" : return
    }
}

function processSectionChange(target){
  switch(target.value){
    case "h1": return CreateInput('h1', target.id);
    case "h2": return CreateInput('h2', target.id);
    case "h3": return CreateInput('h3', target.id);
    case "img": return CreateInput('img', target.id);
    case "a": return CreateInput('a', target.id);
    case "p": return CreateInput('textarea', target.id);
  }
}


function handleBlockAlignment(){
    
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

const Section = ({...props}) => {
    return (
        <div className="section" id={props.id}>
            <div className="block-section">
                <select onChange={HandleSelect} className="section-select form-text" id={`${props.id}-section-type`}>
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="img">Image</option>
                    <option value="a">Link</option>
                    <option value="p">Text</option>
                </select>
                <div className="input-section form-section-container" id={`${props.id}-input-section`}>
                  <label className="input-label form-text" htmlFor={`${props.id}-input`}>Text: </label>
                  <input className=" form-text" type="text" name={`${props.id}-input`} id={`${props.id}-input`}/>
                </div>
                <button><Icons.X className="block-button"/></button>
            </div>
        </div>
    )
}

const Block = ({...props}) => {
    return(
        <div className="block" id={props.id}>
          <section>
            <section onClick={() => {CreateElement("section", props.id)}} className="form-button">
              <button className="block-button form-text">Add Section</button>
            </section>
            <select onChange={HandleSelect} id="alignment" className="block-select form-text">
                <option className="block-option" value="start">Start</option>
                <option className="block-option" value="center">Center</option>
                <option className="block-option" value="end">End</option> 
            </select>
            <select onChange={HandleSelect} id="layout" className="block-select form-text">
                <option className="block-option" value="horizontal">Horizontal</option>
                <option className="block-option" value="vertical">Vertical</option>
            </select>
            <select onChange={HandleSelect} id="display" className="block-select form-text">
                <option className="block-option" value="block">Block</option>
                <option className="block-option" value="flex">Flex</option>
            </select>
            <button><Icons.X className="block-button button-close"/></button>
          </section>
          <div className="section-container" id={`${props.id}-section-container`}/>
        </div>
    )
}

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
                <section onClick={() => {CreateElement("block")}} className="form-button">
                  <button className="editor-button form-text">Add Block</button>
                </section>
                <div id="block-container"/>
                <section onClick={() => {processBlocks()}} className="form-button" >
                  <button className="form-text">Submit</button>
                </section>
            </div>
        </div>
    )
}
