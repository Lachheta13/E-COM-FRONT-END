import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "./reducer/auth";

const Login = ()=> {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useSelector((state)=>state.auth.auth);
    const dispatch = useDispatch();
    useEffect(()=>{
        // const auth = localStorage.getItem('token');
        if(auth){
            navigate('/');
        }

    }, []);
    const setAuthentication = (key) => {
        console.log(key)
        dispatch(authAction.setUser(key));
    }
    const handlelogin = async ()=> {
        const result = await axios.post('http://localhost:5000/login',{
            body:{
                email: email,
                password: password,
            },
            headers: {
                "Content-Type": "application/json",
              },
        });
        if (result.data.auth) {
            localStorage.setItem('user',JSON.stringify(result.data.result));
            // localStorage.setItem('token',JSON.stringify(result.data.auth));
            setAuthentication(result.data.auth);
            navigate("/");
        }else{
            console.log(result.data);
            alert(result.data.result);
        }
        
    }


    return (<div className="login">
           <input className="inputbox"  type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
           <input className="inputbox"  type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
           <button className="appButton" onClick={handlelogin} type="button" >Login</button>
           </div>);
}
export default Login;