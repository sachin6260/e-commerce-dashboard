import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'

const Register = () => {
     const[userdata,setuserdata]  = useState({
    
     });

     const handelchange = (e)=>{
        setuserdata({
            ...userdata,
            name:e.target.value,
            email:e.target.value,
            passwprd:e.target.value,
         })
     }

  const handelsubmit = async()=>{
    const res =  await axios.post('http://localhost:5000/created',{userdata});
    console.log(res);

  }
   
  return (
    <div>
     <input type="text"    onChange={(e)=>handelchange(e)} />
     <input type="email"  onChange={(e)=>handelchange(e)}/>
     <input type="email"   onChange={(e)=>handelchange(e)} />
    <button onClick={handelsubmit}>submit</button>
    </div>
  )
}

// export default Register
