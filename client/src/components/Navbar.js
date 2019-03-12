import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar =()=>{
return(
    <nav className="nav-wrapper">
         <div className="container">
         <Link to="/" className="brand-logo">Home</Link>
             <ul>
                 <li><Link to="/user">Login as User</Link></li>
                 <li><Link to="/admin">Login as Admin</Link></li>
             </ul>
         </div>
    </nav>
    )
}

export default Navbar