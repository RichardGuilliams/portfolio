import { Link } from 'react-router-dom';
import Icons from "./Icons"

function CloseNav(){
  // console.log('closing menu')
  document.getElementById('mobile-nav').classList.add('hidden')
}

function OpenMenu(){
  // console.log('opening menu')
  document.getElementById('mobile-nav').classList.remove('hidden')
}

function Nav({ ...props }){
  return (
    <nav className={`${props.className} bg-blue-600 p-4`} id={`${props.id}`}>
      <ul className="flex space-x-8">
      <button className={`${props.arrowClass}`} onClick={() => CloseNav()}>
        <Icons.RightArrow className={`mobile-nav-arrow`}/>
      </button>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li>
          <Link to="/projects" className="nav-link">Projects</Link>
        </li>
        <li>
          <Link to="/blog" className="nav-link">Blog</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

function DesktopNav(){
  return(
    <div className="desktop-nav">
      <Nav arrowClass="hidden" className="desktop-navbar"/>
    </div>
  )
}

function MobileNav(){
  return (
    <div className="mobile-nav">
      <button className="mobile-nav-button" onClick={() => OpenMenu()}>
        <Icons.Menu className="mobile-nav-icon"/>
      </button>
      <Nav className="mobile-navbar hidden" id="mobile-nav"/>
    </div>
  ) 
}

export default function Navbar() {
  return (
    <div>
      <DesktopNav/>
      <MobileNav/>
    </div>
  );
}