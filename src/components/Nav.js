import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logOut = ()=> {
        localStorage.clear();
        navigate("/signup");
    }
    return(
        <div>
            <img alt='logo' className='logo' src='https://miro.medium.com/v2/resize:fit:1400/1*SwFB1o_k1LGprN-XRUZQ8w.jpeg'/>
            {auth ? <ul class='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logOut} to="/signup">Logout</Link></li>
            </ul> :
                <ul class='nav-ul nav-ul-right'>
                    <li><Link to="/signup">Sing Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }

        </div>
    )
}

export default Nav;