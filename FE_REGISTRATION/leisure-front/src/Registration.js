import React, { useEffect, useState } from "react";

function Reg(){
    const[email, setEmail] = useState("")
    const[dirtyEmail, setDirtyEmail] = useState(false)
    const[errorEmail, setErrorEmail] = useState('Email field can`t be empty')

    const[password, setPassword] = useState("")
    const[dirtyPassword, setDirtyPassword] = useState(false)
    const[errorPassword, setErrorPassword] = useState('Password field can`t be empty')
    
    const[formValid, setFormValid] = useState(false)
    
    const[name, setName]  = useState('')
    const[errorName, setErrorName] = useState('Name can`t be empty')
    const[dirtyName, setDirtyName] = useState(false)
    
    const[surname, setSurname]  = useState('')
    const[errorSurname, setErrorSurname] = useState('Surname can`t be empty')
    const[dirtySurname, setDirtySurname] = useState(false)
    
    const[birthDate, setBirthDate]  = useState('')
    const[errorBirthDate, setErrorBirthDate] = useState('Surname can`t be empty')
    const[dirtyBirthDate, setDirtyBirthDate] = useState(false)
    
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
      /^(([^<>()[\],;:\s@\"]+([^<>()[\],;:\s@\"]+)*)|(\".+\"))@(([^<>()[\],;:\s@\"]+)+[^<>()[\],;:\s@\"]{2,})$/i;
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

      const nameHandler = (e) =>{
        setName(e.target.value)
        if(!/^[a-zA-Z]+$/.test(e.target.value)){
          setErrorName('Your name contains inapropriate symbols')
        }else{
          setErrorName('')
        }
      }

      const surnameHandler = (e) => {
        setSurname(e.target.value)
        if(!/^[a-zA-Z]+$/.test(e.target.value)){
          setErrorSurname('Your surname contains inapropriate symbols')
        }else{
          setErrorSurname('')
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
        case 'name':
            setDirtyName(true)
            break
        case 'surname':
            setDirtySurname(true)
            break
      }
    }
    
    return(

<div class = 'app'>
      <form>
        <h1>
          Registration
        </h1>
        {(dirtyName && errorName) && <div style = {{color: 'red'}}>{errorName}</div>}
        <input onChange={e=>nameHandler(e)} value = {name} onBlur={e=>blurHandle(e)} name = 'name' type = 'text' placeholder = 'Enter your name...'/>
        {(dirtySurname && errorSurname) && <div style = {{color: 'red'}}>{errorSurname}</div>}
        <input onChange={e=>surnameHandler(e)} value = {surname} onBlur={e=>blurHandle(e)} name = 'surname' type = 'text' placeholder = 'Enter your surname...'/>
        {(dirtyEmail && errorEmail) && <div style = {{color: 'red'}}>{errorEmail}</div>}
        <input onChange={e=>emailHandler(e)} value = {email} onBlur={e=>blurHandle(e)} name = 'email' type = 'text' placeholder = 'Enter your email...'/>
        {(dirtyPassword && errorPassword) && <div style = {{color: 'red'}}>{errorPassword}</div>}
        <input onChange={e=>passwordHandler(e)} value = {password} onBlur={e=>blurHandle(e)} name = 'password' type = 'text' placeholder = 'Enter your password...'/>
        <button disabled = {!formValid} type = 'submit'>Register</button>
      </form>
      </div>


    )
}

export default Reg;