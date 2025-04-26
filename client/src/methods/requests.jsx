/**
 * Creates data at the given API endpoint and updates state.
 * 
 * @param {string} endpoint - The API endpoint (e.g., "posts" || "users").
 * @param {Function} func - State setter to update data.
 * @param {Function} setLoading - State setter to control loading UI.
 * @param {Object} dataToCreate - The data that will be updated in the document.
 */
export async function Create(endpoint, func, setLoading,  dataToCreate) {
  try {
    const token = localStorage.getItem("token");
    
    const res = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dataToCreate),
    });

    const data = await res.json();
    func(data.data.data); // or handle returned post
  } 
  catch (err) {
    console.error("Create failed", err);
    return false;
  }
  finally{
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
export async function Update(endpoint, func, setLoading, updatedData) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    func(data.data.data); // or handle updated post
  } catch (err) {
    console.error("Update failed", err);
  }
  finally{
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

    const res = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    
    if (!res.ok) throw new Error("Failed to delete post");
    
    return true;
    // const data = await res.json();
    // func(data.data.data); // or handle updated post
  } 
  catch (err) {
    console.error("Delete failed", err);
    return false;
  }
  finally{
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
export async function Get(endpoint, func, setLoading){
  try{
    const token = localStorage.getItem("token");
    
    const res = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json();
    func(data.data.data);
  }
  catch (err) {
    console.error("Get Failed:", err);
    return false;
  }
  finally{
    setLoading(false);
  }
}

// async function useGetPost(endpoint, setPost, setLoading){
//     useEffect(() => {
//       fetch(`http://localhost:3000/api/v1/posts/${endpoint}`)
//         .then(res => res.json())
//         .then(data => {
//           setPost(data.data.data);
//           setLoading(false);
//         })
//         .catch(() => setLoading(false));
//     }, [endpoint]);  
// }