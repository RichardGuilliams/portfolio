/**
 * Creates data at the given API endpoint and updates state.
 * 
 * @param {string} endpoint - The API endpoint (e.g., "posts" || "users").
 * @param {Function} func - State setter to update data.
 * @param {Function} setLoading - State setter to control loading UI.
 * @param {Object} dataToCreate - The data that will be updated in the document.
 */

export async function FormCreate(endpoint, func, setLoading, data, type) {
	const token = localStorage.getItem("token");

	try {
		const res = await fetch(`http://localhost:8000/api/v1/${endpoint}`, {
			method: type,
			headers: {
				"Authorization": `Bearer ${token}`,
				// DO NOT add Content-Type here when using FormData
			},
			body: data
		});

		if (!res.ok) {
			const errorText = await res.text();
			throw new Error(`Error ${res.status}: ${errorText}`);
		}

		const d = await res.json();
		func(d); // update state or handle result
		return d.data.data;
	} catch (err) {
		console.error("Submission error:", err);
		return false;
	} finally {
		setLoading(false);
	}
}

export async function Fetch(endpoint, method, token, data) {
	const body = data != undefined ? JSON.stringify(data) : undefined;
	// console.log(body);
	return await fetch(`http://localhost:8000/api/v1/${endpoint}`, {
		method: `${method}`,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body
	});
}

export async function Create(endpoint, func, setLoading, newData) {
	try {
		const token = localStorage.getItem("token");
		const res = await Fetch(endpoint, "POST", token, newData);
		// console.log(res.data)
		const data = await res.json();
		console.log("Sucess", data)
		func(data.data.data);
		return data.data.data// or handle returned post
	}
	catch (err) {
		console.error("Create failed", err.message, err.errors);
		return false;
	}
	finally {
		setLoading(false);
	}
}

/**
 * Updates data at the given API endpoint and updates state.
 * Be sure to include the id of the data you wish to update
 * 
 * @param {string} endpoint - The API endpoint (e.g., "posts/id" || "users/id").
 * @param {Function} func - State setter to update data.
 * @param {Function} setLoading - State setter to control loading UI.
 * @param {Object} updatedData - The data that will be updated in the document.
 */
export async function Update(endpoint, func, setLoading, newData) {
	try {
		const token = localStorage.getItem("token");
		const res = await Fetch(endpoint, "PUT", token, newData);
		const data = await res.json();
		func(data.data.data); // or handle updated post
		return data.data.data;
	} catch (err) {
		console.error("Update failed", err);
	}
	finally {
		setLoading(true)
	}
}

/**
 * Delets data from the given API endpoint and updates state.
 * Be sure to include the id param if you only wish to delete a specific element from the database
 * if no id is given the function will delete all documents from the api endpoint 
 * 
 * example: 
 * 
 * posts/id will delete the document with the specified id.
 * 
 * posts will delete all documents from the posts in the database
 * 
 * @param {string} endpoint - The API endpoint (e.g., "posts" || "users").
 * @param {Function} func - State setter to update data.
 * @param {Function} setLoading - State setter to control loading UI.
 */

export async function Delete(endpoint, func, setLoading) {
	try {
		const token = localStorage.getItem("token");
		const res = await Fetch(endpoint, "DELETE", token);
		if (!res.ok) throw new Error("Failed to delete post");
		return true;
	}
	catch (err) {
		console.error("Delete failed", err);
		return false;
	}
	finally {
		setLoading(false);
	}
}

/**
 * Fetches data from the given API endpoint and updates state.
 * 
 * @param {string} endpoint - The API endpoint (e.g., "posts" || "users").
 * @param {Function} func - State setter to update data.
 * @param {Function} setLoading - State setter to control loading UI.
 */
export async function Get(endpoint, func, setLoading) {
	try {
		const token = localStorage.getItem("token");
		const res = await Fetch(endpoint, "GET", token);
		const data = await res.json();
		func(data.data.data);
		return data.data.data;
	}
	catch (err) {
		console.error("Get Failed:", err);
		return false;
	}
	finally {
		setLoading(false);
	}
}
