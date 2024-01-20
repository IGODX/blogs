import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
const baseUrl = "http://localhost:8800/uploads/";
export const Menu = ({category, skipPostId}) => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      const fetchData = async()=>{
      try {
        console.log(skipPostId)
        const res = await axios.get(`/posts?cat=${category}&skipPostId=${skipPostId}`);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    }, [category, skipPostId]);
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
                <img src={baseUrl + post.img} alt="Post image" />
                <h2>{post.title}</h2>
                <Link className='link' to={`/post/${post.id}`}>
                <button>Read more</button>
                </Link>
            </div>
        ))}
    </div>
  )
}
