import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CustomSnackbar from './Snackbar';

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
    
      if (response.status === 200) {
        setMessage(response.data.message)
        setOpen(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setMessage('Registration failed')
        setOpen(true)
      }
    } catch (err) {
      console.error(err);
      setMessage('Registration failed')
      setOpen(true)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
      <CustomSnackbar open={open} message={message} onClose={handleClose} />
    </form>
  );
}

export default Register;
