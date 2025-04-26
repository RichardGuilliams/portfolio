import Links from "../components/Links"
import NavBar from "../components/NavBar";

export default function About() {
    return (
      <div className="main">
        <NavBar/>
        <div className="main-section">
          <h1 className="main-section-header">About Me</h1>
          <p className="main-section-text">Hi, I’m a MERN stack developer with 5 years of hands-on experience building dynamic, scalable web applications using JavaScript. From designing RESTful APIs with Node.js and Express to crafting seamless user experiences with React and MongoDB, I thrive in turning ideas into clean, functional code. I’m passionate about writing maintainable, efficient applications and staying up to date with the latest in the JavaScript ecosystem. Whether it's building full-stack apps from scratch, optimizing performance, or collaborating with teams, I bring both technical expertise and a problem-solving mindset to every project.</p>
          <p className="main-section-text bottom">Let’s build something awesome.</p>
          <a className="link" href="/contact">Let's Connect</a>
        </div>
        <Links/>
      </div>
    );
  }