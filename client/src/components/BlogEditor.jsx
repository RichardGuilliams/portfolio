import { useEffect, useState } from "react";
import { createRoot} from "react-dom/client";
import Icons from "./Icons";
import { FormCreate, Create } from "../methods/requests"


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
  if(element === "input"){
    el.type = type === "img" ? "file" : "text"
    el.id = `${id.replace('section-type', "")}input`
  }
  else {
    el.htmlFor = `${id.replace('section-type', "input")}`
    el.textContent = type === 'img' ? "Image: " : "Text: "
  }
  return el;
}
  
function CreateInput(type, id){
  const parent = document.getElementById(id.replace("section-type", "input-section"));
  const input = ProcessInput(type, id, "input");
  const label = ProcessInput(type, id, 'label');
  if(parent.children.length > 0) parent.innerHTML = null; 
  parent.appendChild(label);
  parent.appendChild(input)  
}

const Section = ({...props}) => {
    return (
        <div className="block-section section" id={props.id}>
            <div className="block-section">
                <select onChange={HandleSelect} className="block-select" id={`${props.id}-section-type`}>
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="img">Image</option>
                    <option value="a">Link</option>
                    <option value="p">Text</option>
                </select>
                <div id={`${props.id}-input-section`}>
                  <label className="input-label" htmlFor={`${props.id}-input`}>Text: </label>
                  <input className="input" type="text" name={`${props.id}-input`} id={`${props.id}-input`}/>
                </div>
                <button><Icons.X className="block-button"/></button>
            </div>
        </div>
    )
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
    case "p": return CreateInput('p', target.id);
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

const Block = ({...props}) => {
    return(
        <div className={`block-section block`} id={props.id}>
            <div className="block-section">
            <button onClick={() => {CreateElement("section", props.id)}} className="block-button">Add Section</button>
            <select onChange={HandleSelect} id="alignment" className="block-select">
                <option className="block-option" value="start">Start</option>
                <option className="block-option" value="center">Center</option>
                <option className="block-option" value="end">End</option>
            </select>
            <select onChange={HandleSelect} id="layout" className="block-select">
                <option className="block-option" value="horizontal">Horizontal</option>
                <option className="block-option" value="vertical">Vertical</option>
            </select>
            <select onChange={HandleSelect} id="display" className="block-select">
                <option className="block-option" value="block">Block</option>
                <option className="block-option" value="flex">Flex</option>
            </select>
            <button><Icons.X className="block-button"/></button>
            </div>
            <div id={`${props.id}-section-container`}/>
        </div>
    )
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

function processSections(sections, block, formData){
  sections.forEach((el, i) => {
    const type = el.querySelector("select").value;
    const content = type === "img" ? "" : el.querySelector("input").value;
    
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

export default function BlogEditor(){
    return (
        <div id="blog-editor" className="editor hidden">
            <div className="editor-nav">
                {/* <button className="editor-button" onClick={() => {CreateElement("block", getElementCount("block"))}}>Add Block</button> */}
                <button className="editor-button" onClick={() => {CreateElement("block")}}>Add Block</button>
                <section>
                  <label htmlFor="title">Title: </label>
                  <input id="title" name="title" type="text"/>
                </section>
                <section>
                  <label htmlFor="description">Description: </label>
                  <input id="description" name="description" type="text"/>
                </section>
                <section>
                  <label htmlFor="thumbnail">Thumbnail: </label>
                  <input id="thumbnail" name="thumbnail" type="file"/>
                </section>
            </div>
            <div id="block-container">
                
            </div>
            <button onClick={() => {processBlocks()}}>Submit</button>
        </div>
    )
}
