import { Link } from 'react-router-dom';
import Icons from "./Icons"

function Nav({ ...props }){
	return (
		<nav className={`${props.className} bg-blue-600 p-4`} id={`${props.id}`}>
			<input type="checkbox" id="header-nav-active" title="header-nav-active" className="header-nav-active"/>
			<div className="nav-header-section">
				<label htmlFor="header-nav-active">
					<Icons.Menu className="main-nav-btn open-main-nav"/>
				</label>
			</div>
			<label className="overlay" htmlFor="header-nav-active"/>
			<div className="nav-header-wrapper">
				<label className="header-nav-wrapper-btn" htmlFor="header-nav-active">
					<Icons.RightArrow className="main-nav-btn close-main-nav"/>
				</label>
				<ul className="flex space-x-8">
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
			</div>	
		</nav>
	)
}


export default function Navbar() {
	return (
		<Nav className="main-nav" id="main-nav"/>
	);
}

