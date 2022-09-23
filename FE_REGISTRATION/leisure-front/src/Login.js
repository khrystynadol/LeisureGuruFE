import React, { useEffect, useState } from "react";


function Login(){
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[dirtyEmail, setDirtyEmail] = useState(false)
    const[dirtyPassword, setDirtyPassword] = useState(false)
    const[errorEmail, setErrorEmail] = useState('Email field can`t be empty')
    const[errorPassword, setErrorPassword] = useState('Password field can`t be empty')
    const[formValid, setFormValid] = useState(false)
  
  
    useEffect(() =>{
      if(errorEmail || errorPassword){
        setFormValid(false)
      }else{
        setFormValid(true)
      }
    }, [errorEmail, errorPassword])
  
  
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!re.test(String(e.target.value).toLowerCase())){
          setErrorEmail('Incorrect email')
      }else{
        setErrorEmail("")
      }
      
    }
  
    const passwordHandler = (e) => {
      setPassword(e.target.value)
      if(e.target.value < 3 || e.target.value > 10){
        setErrorPassword('Your password should be between 3 and 10 symbols')
        if(!e.target.value){
          setErrorPassword('Password can`t be empty')
        }
      }else{
        setErrorPassword("")
      }
    }
  
    const blurHandle = (e) =>{
    switch(e.target.name){
      case 'email':
        setDirtyEmail(true)
        break
      case 'password':
        setDirtyPassword(true)
        break    
    }
  }
    return (
    <div class = 'app'>
      <form>
        <h1>
          Login
        </h1>
        {(dirtyEmail && errorEmail) && <div style = {{color: 'red'}}>{errorEmail}</div>}
        <input onChange={e=>emailHandler(e)} value = {email} onBlur={e=>blurHandle(e)} name = 'email' type = 'text' placeholder = 'Enter your email...'/>
        {(dirtyPassword && errorPassword) && <div style = {{color: 'red'}}>{errorPassword}</div>}
        <input onChange={e=>passwordHandler(e)} value = {password} onBlur={e=>blurHandle(e)} name = 'password' type = 'text' placeholder = 'Enter your password...'/>
        <button disabled = {!formValid} type = 'submit'>Login</button>
      </form>
      </div>
      
      
    )
  
}

export default Login;