import { render } from "@testing-library/react";
import Header from "./Header";
import './style.css'
import React, {useState,setState} from 'react';
import { useNavigate } from "react-router-dom";


export const Registration = function() {
    // return (<div>
    //     {/* <div><span >Gmail</span> </div> 
    //     <div><span >Password</span> </div> 
    //     <div><span >First name</span> </div> 
    //     <div><span >Last name</span> </div>  */}
    //   </div>);

    // const renderForm = (
    // //     <div className="form">
    // //       <form>
    // //         <div className="input-container">
    // //           <label>Email </label>
    // //           <input type="text" name="uname" required />
    // //         </div>
    // //         <div className="input-container">
    // //           <label>Password </label>
    // //           <input type="password" name="pass" required />
    // //         </div>
    // //         <div className="input-container">
    // //           <label>First name</label>
    // //           <input type="text" name="firstname" required />
    // //         </div>
    // //         <div className="input-container">
    // //           <label>Last name</label>
    // //           <input type="text" name="lastname" required />
    // //         </div>
    // //         <div className="button-container">
    // //           <input type="submit" />
    // //         </div>
    // //       </form>
    // //     </div>
    // //  );
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
       // console.log(firstName,lastName,email,password,confirmPassword);
       navigate("/homepage");
    }

    const registrationForm = (
        <div className="form">
        <div className="form-body">
            <div className="username">
                <label className="form__label" for="firstName">First Name </label>
                <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
            </div>
            <div className="lastname">
                <label className="form__label" for="lastName">Last Name </label>
                <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
            </div>
            <div className="email">
                <label className="form__label" for="email">Email </label>
                <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
            </div>
            <div className="password">
                <label className="form__label" for="password">Password </label>
                <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
            </div>
            <div className="confirm-password">
                <label className="form__label" for="confirmPassword">Confirm Password </label>
                <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
            </div>
        </div>
        <div class="footer">
            <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
        </div>
    </div>
              
    );

     return(
        <div className="Login">
        <div className="login-onClick={()=>handleSubmit()}m">
        <div>{Header("Registration")} </div>
        {registrationForm}
        </div>
    </div>
     );
}