import React, {useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export const Login = function() {
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[dirtyEmail, setDirtyEmail] = useState(false)
  const[dirtyPassword, setDirtyPassword] = useState(false)
  const[errorEmail, setErrorEmail] = useState('Email field can`t be empty')
  const[errorPassword, setErrorPassword] = useState('Password field can`t be empty')
  const[formValid, setFormValid] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState();

  const navigate = useNavigate();


  useEffect (() => {
    if (errorEmail || errorPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorEmail, errorPassword])


  const emailHandler = (e) => {
    setDirtyEmail(true)
      const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!e.target.value) {
      setErrorEmail('Email can`t be empty')
    } else if(!re.test(String(e.target.value).toLowerCase())) {
        setErrorEmail('Incorrect email')
    } else {
      setErrorEmail("")
    }
    localStorage.setItem("email", e.target.value);
  }

  const passwordHandler = (e) => {
    setDirtyPassword(true)
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setErrorPassword('Your password should have at least 8 characters')
      if (!e.target.value) {
        setErrorPassword('Password can`t be empty');
      }
    }else{
      setErrorPassword("")
    }
    localStorage.setItem("password", e.target.value);
  }

  

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.email === email.value);
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        setLoginErrorMessage("Invalid password");
      } else {
        navigate("/homepage");
      }
    } else {
      setLoginErrorMessage("Email not found");
    }
  };
    
  const renderForm = (
    <div className="form">
        <div className="form-body">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label className="form__label">Email</label>
          <input onChange={e => emailHandler(e)}  onBlur={e=>emailHandler(e)} type="text" name="email" required />
          {(dirtyEmail && errorEmail) && <div style = {{color: 'red'}}>{errorEmail}</div>}
        </div>
        <div className="password">
          <label className="form__label">Password </label>
          <input onChange={e=>passwordHandler(e)} onBlur={e=>passwordHandler(e)} type="password" name="pass" required />
          {(dirtyPassword && errorPassword) && <div style = {{color: 'red'}}>{errorPassword}</div>}
        </div>
          <button disabled = {!formValid} type="submit">Login</button>
          {(loginErrorMessage) && <div style = {{color: 'red'}}>{loginErrorMessage}</div>}
      </form>
      </div>
    </div>
  );
    
  // User Login info
  const database = [
    {
      email: "jonny.hehheh.kn.2021@lpnu.ua",
      password: "pass1234"
    },
    {
      email: "leisure.guru@lpnu.ua",
      password: "pass2"
    }
  ];

    return(
    <div className="Login">
      <div className="login-form">
        <div>{Header("Log in")}</div>
        {renderForm}
      </div>
    </div>
  );
}
