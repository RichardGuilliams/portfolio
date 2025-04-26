import Links from "../components/Links"
import NavBar from "../components/NavBar";

export default function Home() {
    return (
      <div className="main p-8">
        <NavBar/>
        <div className="main-section">
          <h1 className="main-section-header text-4xl font-bold text-blue-600">
            <span className="secondary-text">Hello, my name is</span>
            Richard Guilliams
            </h1>
          <p className="main-section-text">I use NodeJS to build amazing web applications.</p>
          <p className="main-section-text bottom">I'm a Full-Stack Javascript Developer that builds scalable and user-friendly web solutions. I can leverage my skills on both the front and back-end to make sure you meet your digital goals.</p>
          <a className="link" href="/contact">Let's Connect</a>
        </div>
        <Links/>
      </div>
    );
  }