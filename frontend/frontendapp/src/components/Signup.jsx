import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // for signup button not work after user register
  // useEffect(()=>{
  //   const auth = localStorage.getItem('user');
  //   if(auth){
  //     navigate('/');
  //   }

  // },[navigate])

  const collectData = async () => {
    try {
      console.log("collect data is running", name, email, password);
  
      let res = await axios.post("http://localhost:5000/register", { name, email, password });
  
      if (res.status === 202 && res.data.message === "User already registered") {
        alert("User already registered");
      } else if (res.data.result && res.data.auth) {
        localStorage.setItem('token', res.data.auth);
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("An error occurred during registration. Please try again.");
    }
  };
  

  return (
    <div className="form-data">
      <form className='register-form' onSubmit={collectData}>
        <h1>Register</h1>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" className='submit-btn' onClick={collectData}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
