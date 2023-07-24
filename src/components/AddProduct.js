import axios from "axios";
import React,{useState} from "react";

const AddProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [errors,setErrors] = useState("");
    const addProduct = async () => {
        if (!name || !price || !category|| !company) {
            setErrors(true);
            return false;
        }
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      const result = await axios.post('http://localhost:5000/add-product',{
            data:{
                userId,
                name,
                price,
                category,
                company,
            },
            headers:{
                "Content-Type": "application/json",
                "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        console.log(result);
    }
    return (<div className="product">
        <h1>Add Product</h1>
        <input type='text' className="inputbox" placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        {errors && !name && <span className="invalid-field">Enter Valide Name</span>}

        <input type='text' className="inputbox" placeholder="Enter Product Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        {errors && !price && <span className="invalid-field">Enter Valide Price</span>}

        <input type='text' className="inputbox" placeholder="Enter Product Category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        {errors && !category && <span className="invalid-field">Enter Valide Category</span>}

        <input type='text' className="inputbox" placeholder="Enter Product Company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        {errors && !company && <span className="invalid-field">Enter Valide Company</span>}

        <button className="appButton" onClick={addProduct}>Add Product</button>

    </div>)
}
export default AddProduct;
