import axios from "axios";
import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productAction } from "./reducer/productItem";

const UpdateProduct = () => {
    // const [name,setName] = useState("");
    // const [price,setPrice] = useState("");
    // const [category,setCategory] = useState("");
    // const [company,setCompany] = useState("");
    // const [errors,setErrors] = useState("");
    const params = useParams();
    const name = useSelector((state)=>{return state.product.name});
    const price = useSelector((state)=>{return state.product.price});
    const category = useSelector((state)=>{return state.product.category});
    const company = useSelector((state)=>{return state.product.company});
    const auth = useSelector((state)=>state.auth.auth);
    const  dispatch = useDispatch();

    useEffect(()=>{
        getProuctDetail();
    },[]);

    const getProuctDetail = () => {
        axios.get(`http://localhost:5000/product/${params.id}`,{
            headers:{authorization: `bearer ${auth}`}
        }
        ).then((res)=>{
           
            dispatch(productAction.updateName(res.data.name));
            dispatch(productAction.updatePrice(res.data.price));
            dispatch(productAction.updateCategory(res.data.category));
            dispatch(productAction.updateCompany(res.data.company));
        }).catch((error)=>{
            alert(error);
        });

    }

    const updateProduct = async () => {
        // if (!name || !price || !category|| !company) {
        //     setErrors(true);
        //     return false;
        // }

        axios.put(`http://localhost:5000/product/${params.id}`,{
            body:{
                name: name,
                price: price,
                category: category,
                company: company,
            },
            headers:{authorization: `bearer ${auth}`}
        }).then((res)=>{
            console.log(res);
            if(res){
                alert(res.data.result);
            }

        }).catch((error)=>{
            alert(error);
        });
    }
    return (<div className="product">
        <h1>Update Product</h1>
        <input type='text' className="inputbox" placeholder="Update Product Name" value={name} onChange={(e)=>{dispatch(productAction.updateName(e.target.value));}}/>
        {/* {errors && !name && <span className="invalid-field">Enter Valide Name</span>} */}

        <input type='text' className="inputbox" placeholder="Update Product Price" value={price} onChange={(e)=>{dispatch(productAction.updatePrice(e.target.value));}}/>
        {/* {errors && !price && <span className="invalid-field">Enter Valide Price</span>} */}

        <input type='text' className="inputbox" placeholder="Update Product Category" value={category} onChange={(e)=>{dispatch(productAction.updateCategory(e.target.value));}}/>
        {/* {errors && !category && <span className="invalid-field">Enter Valide Category</span>} */}

        <input type='text' className="inputbox" placeholder="Update Product Company" value={company} onChange={(e)=>{dispatch(productAction.updateCompany(e.target.value));}}/>
        {/* {errors && !company && <span className="invalid-field">Enter Valide Company</span>} */}

        <button className="appButton" onClick={updateProduct}>Upate Product</button>

    </div>)
}
export default UpdateProduct;
