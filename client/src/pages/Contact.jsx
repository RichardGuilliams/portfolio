import ContactForm from "../components/ContactForm"
import Links from "../components/Links"
import NavBar from "../components/NavBar";

export default function Contact() {
  return (
    <div className="main">
      <NavBar/>
      <div className="main-section">
        <h1 className="main-section-header">Shoot Me A Message</h1>
        <p className="main-section-text">Fill out the form below then hit submit and I will get back to you as soon as I am able.</p>
        <ContactForm/>
      </div>
      <Links/>
    </div>
  )
}