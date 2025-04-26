import Icons from "./Icons"
export default function Links(){
    return(
        <div className="section-links">
            <a className="section-links-link" href="https://github.com/RichardGuilliams?tab=repositories"><Icons.Github className="icon"/></a>
            <a className="section-links-link" href="https://www.linkedin.com/in/richard-guilliams-9849a425b/"><Icons.LinkedIn className="icon"/></a>
            <a className="section-links-link" href="https://www.facebook.com/richardguilliamswebdevelopement"><Icons.Facebook className="icon"/></a>
        </div>
    )
}