import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getRole } from "./context/AuthContext"

async function LoadRole(){
  const token = localStorage.getItem("token");
  const role = await getRole(token);
  return role;
}

async function HandleSubmit(e, email, password, setUser, navigate) {
  e.preventDefault();
  const res = await fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    // console.log(data.data.user)
    // localStorage.setItem("user", JSON.stringify(data.data.user)); // store user

    // console.log(data.data.user)
    setUser({ ...data.data.user, token: data.token }); 
    navigate("/admin/dashboard");
    // Redirect to admin dashboard
  } else {
    alert(data.error);
  }
}

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  
  useEffect(() => {
    (async function CheckRole(){
      const role = await LoadRole();
      if(role === "admin") navigate("/admin/dashboard");
    })()
  }, [])

  return (
    <div className="main">
      <NavBar/>
      <div className="main-section login-section">
        <h1 className="main-section-header login-section-header">Login</h1>
        <form onSubmit={(e) => HandleSubmit(e, email, password, setUser, navigate)} className="form p-4 max-w-sm mx-auto">
          <section className="form-section">
            <p>Email:</p>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </section>
          <section className="form-section">
            <p>Password:</p>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </section>
          <button className="form-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}