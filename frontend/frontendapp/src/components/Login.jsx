import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
 

const Login = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword]  = useState("");
    const navigate = useNavigate();

// useEffect(()=>{
//     const auth = localStorage.getItem("user");
//     if(auth){
//         navigate('/');

//     }
// })

const handleLogin = async () => {
  try {
    console.log(email, password);

    const response = await axios.post("http://localhost:5000/login", { email, password });

    console.log(response.data);

    if (response.data.message === "User already registered") {
      alert("Login successful");
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.auth); // No need to stringify the token

      navigate('/');
    } else {
      alert("Please enter correct details");
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert("An error occurred during login. Please try again.");
  }
};




  return (
    <>
     <div className="form-data">
      <form className='register-form' onSubmit={handleLogin} >
        <h1>Login</h1>
        <input type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
         <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin} className='submit-btn' >Login</button>
      </form>
    </div>
    </>
  )
}

export default Login;
