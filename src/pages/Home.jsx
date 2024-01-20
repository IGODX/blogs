import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import ContentLoader from "react-content-loader"
const baseUrl = "http://localhost:8800/uploads/";
export const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const cat = useLocation().search;

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setIsLoading(true);
       const res = await axios.get(`/posts${cat}`)
       setPosts(res.data);
      }
      catch(error){
        console.error(error)
      }
      setIsLoading(false);
    }
    fetchData()

  }, [cat])
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='home'>
      <div className="posts">
        { posts.map((post) => (
              <div className="post" key={post.id}>
                <div className='img'>
                  <img src={baseUrl + post.img} alt="Post image" />
                </div>
                <div className='content'>
                  <Link className='link' to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{getText(post.description)}</p>
                  <Link className='link' to={`/post/${post.id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}  