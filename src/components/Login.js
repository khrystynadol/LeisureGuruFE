import React, {useEffect, useState, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import 'whatwg-fetch';

export const Login = function() {
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[dirtyEmail, setDirtyEmail] = useState(false)
  const[dirtyPassword, setDirtyPassword] = useState(false)
  const[errorEmail, setErrorEmail] = useState('Field can`t be empty')
  const[errorPassword, setErrorPassword] = useState('Field can`t be empty')
  const[formValid, setFormValid] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fieldEmail = useRef();
  const[serverEror, setServerError] = useState('');

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
    setEmail(e.target.value)
      const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!e.target.value) {
      setErrorEmail('Field can`t be empty')
    } else if(!re.test(String(e.target.value).toLowerCase())) {
        setErrorEmail('Incorrect email')
    } else {
      setErrorEmail("")
    }
  
  }

  const passwordHandler = (e) => {
    setDirtyPassword(true)
    setPassword(e.target.value)
    localStorage.setItem("password", e.target.value)
    if (e.target.value.length < 5) {
      setErrorPassword('Make it more than 5')
      if (!e.target.value) {
        setErrorPassword('Field can`t be empty');
      }
    }else{
      setErrorPassword("")
    }
    
  }

  

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    // var { email, pass } = document.forms[0];
    // // Find user login info
    // const userData = database.find((user) => user.email === email.value);
    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     setLoginErrorMessage("Invalid password");
    //   } else {
    //     navigate("/homepage");
    //   }
    // } else {
    //   setLoginErrorMessage("Email not found");
    // }

    setIsLoading(true);
    fetch('http://127.0.0.1:5000/login', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: email,
          password: password
        }
      )
    })
    .catch(e => {
      throw new Error('Service unreachable')
    })
    .then(response => {
      if (response.headers.get('content-type') == 'application/json') {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(jsonResponse => {
      if (jsonResponse.status) {
        throw new Error(jsonResponse.message)
      } else {
        localStorage.setItem("id", jsonResponse.id)
        localStorage.setItem("email", jsonResponse.email)
        setIsLoading(false);
        navigate("/homepage");
      }
    })
    .catch(e => {
      setIsLoading(false);
      setServerError(e.message);  
    });
  };
    
  const renderForm = (
    <div className="form">
        <div className="form-body">
      <form onSubmit={handleSubmit}>
        <div className="form__element">
          <label className="form__label">Email</label>

          <input onChange={e => emailHandler(e)}  onBlur={e=>emailHandler(e)} type="text" className="form__input" placeholder = "Email" name="email" required ref={fieldEmail}/>

          {(dirtyEmail && errorEmail) && <div style = {{color: 'red'}}>{errorEmail}</div>}
        </div>
        <div className="form__element">
          <label className="form__label">Password </label>
          <input onChange={e=>passwordHandler(e)} onBlur={e=>passwordHandler(e)} type="password" className="form__input" placeholder = "Password" name="pass" required />
          {(dirtyPassword && errorPassword) && <div style = {{color: 'red'}}>{errorPassword}</div>}
        </div >
        <div className = "submitDiv">
          <button disabled = {!formValid || isLoading} className = "submitButton" type="submit">Login</button>
          {(serverEror) && <div style = {{color: 'red'}}>{serverEror}</div>}
        </div>
          
      </form>
      </div>
    </div>
  );
    
  // User Login info
  // const database = [
  //   {
  //     email: "jonny.hehheh.kn.2021@lpnu.ua",
  //     password: "pass1234"
  //   },
  //   {
  //     email: "leisure.guru@lpnu.ua",
  //     password: "pass2"
  //   }
  // ];

    return(
    <div className="Login">
      <div className="login-form">
        <div>{Header("Log in")}</div>
        {isLoading ? <LoadingSpinner />  : renderForm}
      </div>
    </div>
  );
}
