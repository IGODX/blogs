import React, { useState  } from 'react'
import {Link, useNavigate } from'react-router-dom'
import axios from "axios"

export const Register = () => {
  const [file, setFile] = useState(null);
 const [err, setError] = useState(null)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username : "",
    email : "",
    password : "",
  });
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


  
const handleChange = e =>{
setInputs(prev=>({...prev, [e.target.name] : e.target.value}))
}
const handleSubmit = async e=>{
e.preventDefault();
try {
  const imgUrl = await upload();
  const formData = {
    ...inputs,
    img: imgUrl,
  };
  await axios.post("/auth/register",formData)
  navigate('/login?registered=true');
} catch (error) {
  setError(error.response.data)
}
}
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
            <input required type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input  required type="email" placeholder='Email' name='email' onChange={handleChange} />
            <input required type="password" placeholder='Password' name='password'  onChange={handleChange} />
            <input style={{display : "none"}} type="file" name='file' id='file' onChange={e=>setFile(e.target.files[0])} />
           <label className='file' htmlFor="file">Upload Image</label>
            <button onClick={handleSubmit}>Register</button>
           {err && <p>{err}</p>}

            <span>Do you have an account? <Link to="/login">Login</Link></span>
        </form>
    </div>
  )
}
