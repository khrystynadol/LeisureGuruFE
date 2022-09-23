import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import { Home } from "./Home";
import { Main } from "./Main";
import { useNavigate } from "react-router-dom";


export const Login = function() {
    // return (<div>
    //     <div><span >Username</span> </div> 
      
    //     <div><span >Password</span> </div> 

    //   </div>);

    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
      
        var { uname, pass } = document.forms[0];
      
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
        console.log(userData);
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            setIsSubmitted(true);
            navigate("/homepage");
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        }
      };
    

    const renderForm = (
        <div className="form">
            <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="username">
              <label className="form__label">Username </label>
              <input type="text" name="uname" required />
              {/* {renderErrorMessage("uname")} */}
            </div>
            <div className="password">
              <label className="form__label">Password </label>
              <input type="password" name="pass" required />
              {/* {renderErrorMessage("pass")} */}
            </div>
            
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
          </div>
        </div>
     );

    
      //<form onSubmit={handleSubmit}></form>
      // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];
  
  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  
  
    return(
        <div className="Login">
        <div className="login-form">
        <div>{Header("Log in")} </div>
        {renderForm}
      </div>
    </div>
    );
}