import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Snackbar from '@mui/material/Snackbar';

export const Login = () => {
  const registered = useLocation().search;

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setError] = useState(null);
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      setOpen(true);
    }
  }, [registered]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" onChange={handleChange} name="username" placeholder="Username" />
        <input required type="password" onChange={handleChange} name="password" placeholder="Password" />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{ err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'horizontal' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Register successful!"
      />
    </div>
  );
};
