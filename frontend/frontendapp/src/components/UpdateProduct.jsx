import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Directly retrieve the token


    useEffect(() => {
        getProductDetails();
    }, [params.id]); // Empty dependency array ensures this runs only once after initial render

    const getProductDetails = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/product/${params.id}`,{
                headers: {
                    Authorization: `Bearer ${token}` // Use the token directly
                  }
            });
             if (result.data) {
                setName(result.data.name);
                setPrice(result.data.price);
                setCategory(result.data.category);
                setCompany(result.data.company);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const updateProducts = async () => {
        try {
            const result = await axios.put(`http://localhost:5000/product/${params.id}`, {
                name,
                price,
                category,
                company
            },{
                headers: {
                    Authorization: `Bearer ${token}` // Use the token directly
                  }
            });
            console.log(result.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
       navigate("/");
    };
    

    return (
        <div className="form-container">
            <h1>Update Product</h1>
            <input 
                type="text" 
                placeholder="Enter Product name" 
                value={name} // Ensure value is set from state
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter Product price" 
                value={price} // Ensure value is set from state
                onChange={(e) => setPrice(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter Product category" 
                value={category} // Ensure value is set from state
                onChange={(e) => setCategory(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter Product company" 
                value={company} // Ensure value is set from state
                onChange={(e) => setCompany(e.target.value)} 
            />
            <button onClick={updateProducts}>Update Product</button>
        </div>
    );
}

export default UpdateProduct;
