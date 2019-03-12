import React from 'react'

const Navbar =()=>{
return(
    <nav className="nav-wrapper">
         <div className="container">
             <a href="/" className="brand-logo">Home</a>
             <ul>
                 <li><a href="/user">Login as User</a></li>
                 <li><a href="/admin">Login as Admin</a></li>
             </ul>
         </div>
    </nav>
    )
}

export default Navbar