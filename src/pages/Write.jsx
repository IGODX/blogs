import axios from 'axios'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment"

export const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description: value,
            categoryId,
            img: imgUrl ? imgUrl : state.img,
          })
        : await axios.post(`/posts/`, {
            title,
            description: value,
            categoryId,
            img: imgUrl ? imgUrl : state.img,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(state?.categoryId || 0);
  const upload = async()=>{
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData)
      return res.data
    } catch (error) {
     console.error(error); 
    }
  }
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=> setTitle(e.target.value)}/>
        <div className="editerContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue}></ReactQuill>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display : "none"}} type="file" name='' id='file' onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='item-holder'>
<input type="radio" name='cat'  value="1" id="art" checked={categoryId == 1} onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="art">Art</label>
</div>
<div className='item-holder'>
<input type="radio" name='cat' checked={categoryId == 2} value="2" id="science" onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="science">Science</label>
</div>
<div className='item-holder'>
<input type="radio" name='cat' checked={categoryId== 3} value="3" id="technology" onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="technology">Technology</label>
</div>

<div className='item-holder'>
<input type="radio" name='cat' value="4" checked={categoryId == 4} id="cinema" onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="cinema">Cinema</label>
</div>

<div className='item-holder'>
<input type="radio" name='cat' value="5" checked={categoryId == 5} id="design" onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="design">Design</label>
</div>

<div className='item-holder'>
<input type="radio" name='cat' value="6" checked={categoryId ==6} id="food" onChange={e=>setCategoryId(e.target.value)}/>
<label htmlFor="food">Food</label>
</div>

        </div>
      </div>
    </div>
  )
}
