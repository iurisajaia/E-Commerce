import React from 'react';
import {render} from 'react-dom';
import {Router,Link} from 'react-router-dom'

// buttons here
const AdRegister =()=>{
    return(
        <div className="container">
            <form>
                <div><input type="text"/>Username</div>
                <div><input type="text"/>Password</div>
                {/* <div><input type="text"/>Enter Email</div>
                <input type="date"/> */}
                <button>SEND</button>
            </form>
            
        </div>
    )
}

export default AdRegister
