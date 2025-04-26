import { useEffect, useState } from "react";
import { createRoot} from "react-dom/client";

function CreateBlock(){
    console.log("creating new block")
    const parent = document.getElementById('block-container');
    const el = document.createElement("div");
    parent.insertAdjacentElement("afterbegin", el);
    const root = createRoot(el);
    root.render(<Block/>);
    // el.innerHTML[el.innerHTML.length] = <Block/>
}

const Block = ({...props}) => {
    return(
        <div>
            This is the new div.
        </div>
    )
}

export default function BlogEditor(){
    return (
        <div id="blog-editor" className="editor hidden">
            <div className="editor-nav">
                <button className="editor-button" onClick={() => {CreateBlock()}}>Add Block</button>
            </div>
            <div id="block-container"></div>
        </div>
    )
}