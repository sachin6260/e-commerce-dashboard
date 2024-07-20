import React from 'react'
import { NavLink ,useNavigate } from 'react-router-dom'
import "./Nav.css"

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate =useNavigate();

  const logout =()=>{
    localStorage.clear();
    navigate('/singnup');
  }

  return (
    <>
    { auth ? <nav className='nav-section'>
       <ul>
      <h1>EcomEase</h1>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            Add Product
          </NavLink>
        </li>
       
        
        
        <li> <NavLink onClick={logout} to="/singnup" activeClassName="active">
            Logout ({JSON.parse(auth).name})
          </NavLink></li>
 
           
         
      </ul>
    </nav>: <nav className='nav-section nav-right'>
    <h1 className='logo'>EcomEase</h1>

    <ul>
  
   <li> <NavLink to="/singnup" activeClassName="active">
              SignUp
            </NavLink></li>
            <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
   </ul>

    </nav>
              }
      
    </>
  )
}

export default Nav
