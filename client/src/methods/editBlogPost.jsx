import { useEffect, useState } from "react"
import { Get } from "./requests.jsx"

export default async function EditBlogPost (id, setData, setLoading){
	/*
	 * hide the posts section of the admin ui.
	 * unhide the new post section of the admin ui
	 * get the form element so we can populate and manipulate it.
	 * populate the form with the new sections and blocks.
	 * blocks contain aligment, display, layout, description, thumnail, title and sections.
	 * keep track of the blocks id. this is important so we can update the database entry.
	 * sections contains content and type.
	 * tell the new post form the we are editing. that way we can change the submit buttons function from create to update.
	 *
	 * its possible we will need to keep track of the ids of the sections as well for the purpose of updating. unsure exactly how this will create conflicts.
	 */	
	const data = await Get(`posts/${id}`, setData, setLoading);
	console.log(data);
	console.log("Hiding Post Section.");	
	document.getElementById("post-section").classList.add("hidden");
	const form = document.getElementById("blog-editor");
	form.classList.remove("hidden");
} 
