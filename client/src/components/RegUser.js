import React from 'react';
import {render} from 'react-dom';
import {Router,Link} from 'react-router-dom';

// buttons here
const Registeruser =()=>{
    return(
        <div className="container">
        <form>
                <div>Firstname<input type="text" placeholder="Firstname"/></div>
                <div>Lastname<input type="text" placeholder="Lastname"/></div>
                <div>Username<input type="text" placeholder="Username"/></div>
                <div>Email<input type="text" placeholder="Email"/></div>
                <div>Birthdate<input type="date"/></div>
                <div> 
                <legend>Choose your gender:</legend>
                <label for="male">Male</label>
                <input type="radio" name="gender" id="male" value="male" checked></input>
                </div>
                <div>
                <label for="female">Female</label>
                <input type="radio" name="gender" id="female" value="female"></input>      
                </div>
                
                <button>SEND</button>
            </form>
        </div>
    )
}

export default Registeruser