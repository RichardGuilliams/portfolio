import { useEffect, useState } from "react";
import { createRoot} from "react-dom/client";
import Icons from "./Icons";


function CreateElement(type, id){
    const parent = document.getElementById(type == "block" ? "block-container" : `${id}-section-container`);
    // const el = document.createElement("div");
    const el = document.createElement("div");
    parent.appendChild(el);
    const root = createRoot(el);
    const count = parent.childNodes.length;
    root.render(type === "block" ? <Block id={`block-${count}`}/> : <Section id={`block-${id}-section-${count}`}/>);
    // el.innerHTML[el.innerHTML.length] = <Block/>
}

function CreateSection(id){
    const parent = document.getElementById(`block-${id}-section-container`);
    // const el = document.createElement("div");
    const el = document.createElement("div");
    parent.appendChild(el);
    const root = createRoot(el);
    const count = parent.childNodes.length;
    root.render(<Section id={`block-${count}`}/>);
    // el.innerHTML[el.innerHTML.length] = <Block/>
}

const Section = ({...props}) => {
    return (
        <div className="block-section section" id={props.id}>
            <div className="block-section">
                <select onChange={HandleSelect} className="block-select" id="section-type">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="image">Image</option>
                    <option value="a">Link</option>
                    <option value="p">Text</option>
                </select>
                <button><Icons.X className="block-button"/></button>
            </div>
        </div>
    )
}

function HandleSelect(event){
    switch(event.target.id){
        case "block-alignment" : return
        case "block-layout" : return
        case "block-display" : return
        case "section-type" : return
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

export default function BlogEditor(){
    return (
        <div id="blog-editor" className="editor hidden">
            <div className="editor-nav">
                {/* <button className="editor-button" onClick={() => {CreateElement("block", getElementCount("block"))}}>Add Block</button> */}
                <button className="editor-button" onClick={() => {CreateElement("block")}}>Add Block</button>
            </div>
            <div id="block-container"/>
        </div>
    )
}