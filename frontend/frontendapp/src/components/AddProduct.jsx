import React, { useState } from 'react';
import "./AddProduct.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const AddProduct = () => {

    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[category, setCategory] = useState("");
    const[company, setCompany] = useState("");
    const[error, setError] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('token'); // Directly retrieve the token


    

    const addProduct = async () => {

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        // const userId = JSON.parse(localStorage.getItem('user'))._id;
        const productData = { name, price, category, company };
    
        console.log("Sending Data: ", productData);
    
        const result = await axios.post("http://localhost:5000/add-product", productData,{
          headers: {
            Authorization: `Bearer ${token}` // Use the token directly
          }
        });
        // console.log(result.data);
        navigate('/');
      };
    
  return (
    <div className="form-container">
      <h1>Add Product</h1>
      <input type="text" placeholder="Enter Product name" onChange={(e) => setName(e.target.value)} />
      {error && !name &&  <span className='invalid-input'>Enter Valid Name</span>}
      <input type="text" placeholder="Enter Product price" onChange={(e) => setPrice(e.target.value)} />
      {error && !price &&  <span className='invalid-input'>Enter Valid price</span>}

      <input type="text" placeholder="Enter Product category" onChange={(e) => setCategory(e.target.value)} />
      {error && !category &&  <span className='invalid-input'>Enter Valid category</span>}

      <input type="text" placeholder="Enter Product company" onChange={(e) => setCompany(e.target.value)} />
      {error && !company &&  <span className='invalid-input'>Enter Valid company</span>}

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;

