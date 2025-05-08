import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Links from "../components/Links"
import NavBar from "../components/NavBar";
import { Get } from "../methods/requests"

// function useGetPost(id, setPost, setLoading){
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/v1/posts/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setPost(data.data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);  
// }

function setAlignment(alignment){
  switch(alignment){
    case "center" :return "text-center"
    case "end" :return "text-right"
    case "start" :return "text-left"
  }
}

function setSize(size){
  switch(size){
    case "sm" : return "small"
    case "md" : return "medium"
    case "lg" : return "large"
    case "xl" : return "extra-large"
  }
}

function setDisplay(display){
  switch(display){
    case "flex" : return "display-flex"
    case "block" : return ""
  }
}

function setLayout(layout){
  switch(layout){
    case "horizontal" : return "layout-horizontal"
    case "vertical" : return "layout-vertical"
  }
}

function Block(post){
  // console.log(post)
  return post.blocks.map((block, index) => {
    const alignmentClass = setAlignment(block.alignment);
    const sizeClass = setSize(block.size);
    const display = setDisplay(block.display);
    const layout = setLayout(block.layout);

    return <div  key={index} className={`blog-block ${display} ${layout} ${alignmentClass} ${sizeClass} prose max-w-none`}>{Section(block)}</div>
  })
}

function getSectionType(section, block){
  switch(section.type){
    case "p": return <p className="blog-text">{section.content}</p>
    case "h1": return <h1 className="blog-header-lg">{section.content}</h1>
    case "h2": return <h2 className="blog-header-md">{section.content}</h2>
    case "h3": return <h3 className="blog-header-sm">{section.content}</h3>
    case "img": return <img className={`blog-img ${block.alignment} ${section.alignment} ${section.size}`} src={`http://localhost:8000/${section.content}`} alt="" height={100} width={100}/>
  }
}

function Section(block){
  return block.sections.map((section, index) => { return getSectionType(section, block)})
}

export default function BlogPost() {
  // Gets the param of the url. in this case posts/:id
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {Get(`posts/${id}`, setPost, setLoading)}, []);
  // useGetPost(id, setPost, setLoading);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!post) return <div className="p-6 text-red-600">Post not found.</div>;

  return (
    <div className="main p-6 space-y-6">
        <NavBar/>
        <div className="main-section">
          <div className="blog-section">
            <h1 className="main-section-header text-4xl font-bold">{post.title}</h1>
            {Block(post)}
            {/* {post.content} */}
          </div>
          <Links/>
      </div>
    </div>
  );
}
