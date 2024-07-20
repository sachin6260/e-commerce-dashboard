import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem('token'); // Directly retrieve the token

  const getProduct = async () => {
    try {
       const result = await axios.get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}` // Use the token directly
        }
      });
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  // console.log(product);

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:5000/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}` // Use the token directly
        }
      }
    );

    if (response.data) {
        getProduct();
        alert("Record is deleted");
    } 
}
const searchHandle = async (e) => {
  let key = e.target.value;
 
 if(key){
  const result = await axios.get(`http://localhost:5000/search/${key}`,{
    headers: {
      Authorization: `Bearer ${token}` // Use the token directly
    }
  });
  if(result.data){
    setProduct(result.data)
  }
 }
  else{
    getProduct();

  }
}

  return (
    <div class="productlist-container">
         <div className="productlist">
        <h2>Product List</h2>
        <input type="text" className="searchProduct" placeholder="search product" onChange={searchHandle}/>
        <ul>
          <li className="list-header">
            <span>S.no</span>
            <span>Name</span>
            <span>Price</span>
            <span>Category</span>
            <span>Company</span>
            <span>Operation</span>
          </li>
        </ul>

        {
          product.length>0 ?  product.map((item,index) =>
                <ul key={item._id}>
            <li className="list-header">
              <span>{index+1}</span>
              <span>{item.name}</span>
              <span> ${item.price}</span>
              <span> {item.category}</span>
              <span> {item.company}</span>
              <span><button onClick={()=> deleteProduct(item._id)}className="btn" >Delete</button></span>
              <span><Link to={`/update/${item._id}`}>Update</Link></span>
            </li>
          </ul>
            ):
            <h2>No Result Found</h2>

        }
      </div>
    </div>
   );
};

export default ProductList;
