import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = useState("");
    const auth = useSelector((state)=>state.auth.auth);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = () => {
        axios.get('http://localhost:5000/products',{
            headers:{authorization: `bearer ${auth}`}
        }).then((result) => {
            setProducts(result.data);
        }).catch((error) => {
            // Handle error
            console.error('Error:', error.message);
        });

    }
    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/product/${id}`,{
            headers:{authorization: `bearer ${auth}`}
        }).then((res) => {
            alert(res.data.result);
            getProducts();
        });

    }
    const searchItem = (event)=> {
        const item = event.target.value;
        if (item){
        axios.get(`http://localhost:5000/search/${item}`,{
            headers:{authorization: `bearer ${auth}`}
        }).then((result)=>{
         const res = result.data;
         setProducts(res);
        }).catch((e)=>{alert(e)});
    } else {
        getProducts();
    }

    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product-box" placeholder="Search Product" onChange={searchItem}></input>
            {/* <ul>
                <li>S.NO</li>
                <li>name</li>
                <li>price</li>
                <li>category</li>
            </ul> */}
            {
                products && products.length > 0 ? products.map((item, index) =>
                    <ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button type="button" onClick={() => { deleteItem(item._id) }}>Delete</button></li>
                        <li><Link to={`/update/${item._id}`}>Update</Link></li>
                    </ul>
                ) : <h1>No Result Found</h1>

            }

        </div>

    );
}
export default ProductList;