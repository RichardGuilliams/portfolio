import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";
import BlogPost from "./pages/BlogPost";
import Blog from "./pages/Blog";
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./pages/context/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard/>
          </ProtectedRoute>
          } />
        {/* <Route path="/blog" element={<BlogPost />} /> */}
      </Routes>
    </div>
  );
}

export default App;
