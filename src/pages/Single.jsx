import React, { useContext, useState,useEffect } from 'react'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { Menu } from '../components/Menu'
import moment from "moment"
import axios from "axios"
import { AuthContext } from '../context/authContext'

const baseUrl = "http://localhost:8800/uploads/";
export const Single = () => {
  const [post, setPost] = useState({})
  const location = useLocation();
  const {currentUser} = useContext(AuthContext)
const postId = location.pathname.split("/")[2]
   const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
       const res = await axios.get(`/posts/${postId}`)
       console.log(res);
       setPost(res.data);
      }
      catch(error){
        console.error(error)
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async() =>{
    try{
       await axios.delete(`/posts/${postId}`)
       navigate("/")
     }
     catch(error){
       console.error(error)
     }
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={baseUrl +post?.img} alt="Post image" />
        <div className='user'>
         { post.userImg && <img src={baseUrl + post.userImg} alt="User image" /> }
        <div className="info">
          <span>{post?.username} </span>
          <p>Posted {moment(post.data).fromNow()}</p>
        </div>
         { currentUser && currentUser.username === post.username && 
         <div className="edit">
          <Link to={`/write?edit=${postId}`} state={post}>
          <img src={Edit} alt="Edit" />
          </Link>
          <img className='delete-post' onClick={handleDelete} src={Delete} alt="Delete" />
        </div>
}
        </div>
        <h1>{post.title}</h1>
       {getText(post.description)}
      </div>
      <Menu category={post.categoryName} skipPostId={postId}></Menu>
    </div>
  )
}
