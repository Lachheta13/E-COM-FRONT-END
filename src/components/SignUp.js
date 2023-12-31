import axios from "axios";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { authAction } from "./reducer/auth";

const SingUp = ()=> {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth.auth);

    useEffect(()=>{
        // const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    },[]);

    const setAuthentication = (key) => {
        dispatch(authAction(key));
    }

   const collectData = () => {
        axios.post('http://localhost:5000/register',{
             body: {
                name:name,
                email:email,
                password:password,
             },
             headers: {
                "Content-Type": "application/json",
              },
        }).then((res)=> {
            if(res.data.auth){
                localStorage.setItem('user',JSON.stringify(res.data.result));
                // localStorage.setItem('token',JSON.stringify(res.data.auth));
                setAuthentication(res.data.result);

                navigate("/");
            }
        });
    }

    return(
        <div className="register">
            <h1>register</h1>
            <input className="inputbox" type="text" placeholder="Enter Name" value={name}
            onChange={(e) => setName(e.target.value)}/>
            <input className="inputbox" type="text" placeholder="Enter Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <input className="inputbox" type="password" placeholder="Inter Password" value={password}
            onChange={(e) => setpassword(e.target.value)}/>
            <button className="appButton" type="button" onClick={collectData}>Sing Up</button>
        </div>
    );
}
export default SingUp;