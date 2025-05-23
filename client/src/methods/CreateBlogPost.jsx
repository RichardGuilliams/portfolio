import react from "react";
import { createRoot} from "react-dom/client";
import Icons from "../components/Icons.jsx";
import { FormCreate, Update, Get } from "../methods/requests.jsx";
const Editor = {};

Editor.CreateElement = (type, id) => {
	console.log(type, id);
    const parent = document.getElementById(type == "block" ? "block-container" : `${id}-section-container`);
    const el = document.createElement("div");
    parent.appendChild(el);
    const root = createRoot(el); 
    const count = parent.childNodes.length;
    root.render(type === "block" ? <Editor.Block id={`block-${count - 1}`}/> : <Editor.Section id={`${id}-section-${count - 1}`}/>);
}


Editor.Section = ({...props}) => {
    return (
        <div className="section" id={props.id}>
            <div className="block-section">
                <select onChange={Editor.HandleSelect} className="section-select form-text" id={`${props.id}-section-type`}>
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

Editor.ProcessInput = (type, id, element) => {
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
  
Editor.CreateInput = (type, id) => {
  const parent = document.getElementById(id.replace("section-type", "input-section"));
  parent.classList.add('form-input')
  const input = Editor.ProcessInput(type, id, type === "textarea" ? "textarea" : "input");
  input.classList.add(type === "img" ? "input-img" : "input-text")
  const label = Editor.ProcessInput(type, id, 'label');
  if(parent.children.length > 0) parent.innerHTML = null; 
  parent.appendChild(label);
  parent.appendChild(input)  
}


Editor.HandleSelect = (event) => {
  if(event.target.id.includes('section-type')) return Editor.ProcessSectionChange(event.target); 
    switch(event.target.id){
        case "block-alignment" : return
        case "block-layout" : return
        case "block-display" : return
    }
}

Editor.ProcessSectionChange = (target) => {
  switch(target.value){
    case "h1": return Editor.CreateInput('h1', target.id);
    case "h2": return Editor.CreateInput('h2', target.id);
    case "h3": return Editor.CreateInput('h3', target.id);
    case "img": return Editor.CreateInput('img', target.id);
    case "a": return Editor.CreateInput('a', target.id);
    case "p": return Editor.CreateInput('textarea', target.id);
  }
}

Editor.CreatePost = (formData) => {
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


Editor.ProcessSections = (sections, block, formData) => {
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


Editor.GetArrayFromCollection = (collection) => {
  const arr = [];
  for(let i = 0; i < collection.length; i++){
    arr.push(collection[i]);
  }
  return arr;
}


Editor.ProcessBlocks = () => {
  const formData = new FormData();

  formData.append("title", document.getElementById("title").value)
  formData.append("description", document.getElementById("description").value)
  
  
  const blocks = []

  
  const thumbnailFile = document.getElementById('thumbnail').files[0];
  if(thumbnailFile) formData.append("thumbnail", thumbnailFile);
  
  const blockElements = Editor.GetArrayFromCollection(document.getElementsByClassName("block"));
  blockElements.map((el, i) => {
    blocks.push({});
    blocks[i]["layout"] = "vertical";
    blocks[i]["alignment"] = "center";
    blocks[i]["display"] = "flex";
    blocks[i]["sections"] = [];
    blocks[i]['name'] = `block-${i}`;
    const sections = Editor.GetArrayFromCollection(el.children[1].children)
    Editor.ProcessSections(sections, blocks[i], formData);
  })

  formData.append("blocks", JSON.stringify(blocks));

  // body = ConvertJSONToForm(body);
  Editor.CreatePost(formData); 
}



Editor.Block = ({...props}) => {
    return(
        <div className="block" id={props.id}>
          <section>
            <section onClick={() => {Editor.CreateElement("section", props.id)}} className="form-button">
              <button className="block-button form-text">Add Section</button>
            </section>
            <select onChange={Editor.HandleSelect} id="alignment" className="block-select form-text">
                <option className="block-option" value="start">Start</option>
                <option className="block-option" value="center">Center</option>
                <option className="block-option" value="end">End</option> 
            </select>
            <select onChange={Editor.HandleSelect} id="layout" className="block-select form-text">
                <option className="block-option" value="horizontal">Horizontal</option>
                <option className="block-option" value="vertical">Vertical</option>
            </select>
            <select onChange={Editor.HandleSelect} id="display" className="block-select form-text">
                <option className="block-option" value="block">Block</option>
                <option className="block-option" value="flex">Flex</option>
            </select>
            <button><Icons.X className="block-button button-close"/></button>
          </section>
          <div className="section-container" id={`${props.id}-section-container`}/>
        </div>
    )
}



Editor.BlockButton = () => {
	return(
                <section onClick={() => {Editor.CreateElement("block")}} className="form-button">
        		<button className="editor-button form-text">Add Block</button>
                </section>
	)	
}

Editor.EditBlogPost = async function EditBlogPost (id, setData, setLoading){
	/*
	 * populate the form with the new sections and blocks.
	 * blocks contain aligment, display, layout, description, thumnail, title and sections.
	 * keep track of the blocks id. this is important so we can update the database entry.
	 * sections contains content and type.
	 * tell the new post form the we are editing. that way we can change the submit buttons function from create to update.
	 *
	 * its possible we will need to keep track of the ids of the sections as well for the purpose of updating. unsure exactly how this will create conflicts.
	 */	
	const data = await Get(`posts/${id}`, setData, setLoading);
	document.getElementById("post-section").classList.add("hidden");
	const form = document.getElementById("blog-editor");
	form.classList.remove("hidden");
	const submitButton = document.getElementById("submit-button");
	submitButton.innerHTML = '';
	submitButton.onclick = () => {Editor.ProcessBlocks('patch')}
	submitButton.innerHTML = `<button className='form-text'>Update</button>`;
	Editor.PopulateForm(form, data);
}

Editor.WaitForElement = (selector, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const start = performance.now();

    function check() {
      const el = document.getElementById(selector);
      if (el) return resolve(el);
      if (performance.now() - start > timeout) return react(`Timeout: ${selector} not found`);
      requestAnimationFrame(check);
    }

    check();
  });
}

Editor.PopulateForm = async function (form, data) {
	console.log(data);
	document.getElementById("title").value = data.title;
	document.getElementById("description").value = data.description;
	document.getElementById("thumbnail").placeholder = data.thumbnail;
	let el = '';
	for(let i = 0; i < data.blocks.length; i++){
		const block = data.blocks[i];
		const blockId = `block-${i}`;
		Editor.CreateElement("block", blockId);

		try{
			await Editor.WaitForElement(`${blockId}-section-container`);
			for(let j = 0; j < block.sections.length; j++){
				console.log("trying to create sections")
				Editor.CreateElement("section", blockId);
				await Editor.WaitForElement(`block-${i}-section-${j}-input`)
				document.getElementById(`block-${i}-section-${j}-input`).value = data.blocks[i].sections[j].content;
			}
		}catch(err){
			console.error("Error populating section:", err);
		}
	}
}

export default Editor;
