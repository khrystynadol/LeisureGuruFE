import Header from "./Header";
import './style.css'
import React, {useState,setState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import 'whatwg-fetch';



export const Registration = function() {
    const navigate = useNavigate();
    const[firstName, setFirstName] = useState('');
    const[errorFirstName, setErrorFirstName] = useState('Name can`t be empty')
    const[dirtyFirstName, setDirtyFirstName] = useState(false)

    const[lastName, setLastName] = useState('');
    const[errorLastName, setErrorLastName] = useState('')
    const[dirtyLastName, setDirtyLastName] = useState(false)

    const[email, setEmail] = useState('')
    const[dirtyEmail, setDirtyEmail] = useState(false)
    const[errorEmail, setErrorEmail] = useState('Email field can`t be empty')

    const[password, setPassword] = useState('')
    const[dirtyPassword, setDirtyPassword] = useState(false)
    const[errorPassword, setErrorPassword] = useState('Password field can`t be empty')
    
    const[confirmPassword,setConfirmPassword] = useState("");
    const[dirtyConfirmPassword, setDirtyConfirmPassword] = useState(false)
    const[errorConfirmPassword, setErrorConfirmPassword] = useState('Confirm password field can`t be empty')

    const [date, setDate] = useState('')
    const[formValid, setFormValid] = useState(false)

    const FirstName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Password = useRef();

    useEffect(() =>{
    if(errorEmail || errorPassword || errorFirstName || errorLastName || !date){
      setFormValid(false)//якщо хоч один з елементів форми заповнений неправильно то форма вважається не валідною
    }else{
      setFormValid(true)
    }
  }, [errorEmail, errorPassword, errorFirstName, errorLastName, date])


  const[serverEror, setServerEror] = useState('');

  const emailHandler = (e) => {
      setDirtyEmail(true)
      setEmail(e.target.value)
      const re =
  /^(([^<>()[\],;:\s@\"]+([^<>()[\],;:\s@\"]+)*)|(\".+\"))@(([^<>()[\],;:\s@\"]+)+[^<>()[\],;:\s@\"]{2,})$/i;
  if(!e.target.value){
    setErrorEmail('Email can`t be empty')
  } else if(!re.test(String(e.target.value).toLowerCase())){
        setErrorEmail('Incorrect email')
    }else{
      setErrorEmail("")
    }
    localStorage.setItem("email", Email.current.value);
  }
//перевірка для форми password на довжину
  const passwordHandler = (e) => {
    setDirtyPassword(true)
    setPassword(e.target.value);
    if(e.target.value.length < 5 || e.target.value.length > 10){
      setErrorPassword('Your password should be between 5 and 10 symbols')
      if(!e.target.value){
        setErrorPassword('Password can`t be empty')
      }
    }else{
      setErrorPassword("")
    }
    localStorage.setItem("password", Password.current.value);
  }

  const confirmPasswordHandler = (e) => {
    setDirtyConfirmPassword(true)
    setConfirmPassword(e.target.value)
    if (e.target.value ===''){
      setErrorConfirmPassword('Confirm password can`t be empty')
    } else if(e.target.value !== password) {
      setErrorConfirmPassword("This password does not match the password you entered above")
    }else{
      setErrorConfirmPassword("")
    }
  }

  //функція перевірки форми name на правильність написання і відсутність неправльних знаків
  const firstNameHandler = (e) =>{
    setDirtyFirstName(true)
    setFirstName(e.target.value)
    if (e.target.value ===''){
      setErrorFirstName('Name can`t be empty')
    } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
      setErrorFirstName('Your name contains inapropriate symbols')
    }else{
      setErrorFirstName('')
    }
    localStorage.setItem("firstName", FirstName.current.value);
  }

  //функція перевірки форми surname на правильність написання і відсутність неправльних знаків
  const lastNameHandler = (e) => {
    setDirtyLastName(true)
    setLastName(e.target.value)
    if (e.target.value ===''){
      setErrorLastName('Surname can`t be empty')
    } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
      setErrorLastName('Your surname contains inapropriate symbols')
    } else {
      setErrorLastName('')
    }
    localStorage.setItem("lastName", LastName.current.value);
  }

    const handleSubmit  = () => {
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            date : date,
            password: password
          }
        )
      })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {
          setServerEror('')
            navigate("/homepage");
         } else if (response.status == 400) {
          setServerEror('Bad Request')
         } else if (response.status == 404) {
          setServerEror('Not Found')
         } else if (response.status == 500) {
          setServerEror ('Internal Server Error')
         } else if (response.status == 502) {
          setServerEror('Bad Gateway')
         } else if (response.status == 503) {
          setServerEror('Service Unavailable')
         } else if (response.status == 503) {
          setServerEror ('Gateway Timeout')
          }
        //  return response.text()
        })
       //.then((text) => console.log(text));
      // navigate("/homepage");
    }



    const registrationForm = (
        <div className="form">
        <div className="form-body">
            <div className="username">
                <label className="form__label" htmlFor="firstName">First Name </label>
                <input className="form__input" onChange={e=>firstNameHandler(e)}  onBlur={e=>firstNameHandler(e)} type="text" value={firstName}  name="firstName" placeholder="First Name" ref={FirstName}/>
                {(dirtyFirstName && errorFirstName) && <div style = {{color: 'red'}}>{errorFirstName}</div>}
            </div>
            <div className="lastname">
                <label className="form__label" htmlFor="lastName">Last Name </label>
                <input  onChange={e=>lastNameHandler(e)} onBlur={e=>lastNameHandler(e)} type="text"  name="lastName" value={lastName}  className="form__input" placeholder="LastName" ref={LastName}/>
                {(dirtyLastName && errorLastName) && <div style = {{color: 'red'}}>{errorLastName}</div>}
            </div>
            <div className="email">
                <label className="form__label" htmlFor="email">Email </label>
                <input  onChange={e=>emailHandler(e)} value = {email} onBlur={e=>emailHandler(e)} type="email" name="email" className="form__input"   placeholder="Email" ref={Email}/>
                {(dirtyEmail && errorEmail) && <div style = {{color: 'red'}}>{errorEmail}</div>}
            </div>
            <div>
            <label className="form__label" htmlFor="date">Birth date </label>
            <input type = 'date' onChange = {e=>setDate(e.target.value)} value = {date}  name = 'date' placeholder = 'Pick your birth date...'/>
            </div>
            <div className="password">
                <label className="form__label" htmlFor="password">Password </label>
                <input className="form__input" onChange={e=>passwordHandler(e)} value = {password} onBlur={e=>passwordHandler(e)} type="password"  name="password"   placeholder="Password" ref={Password}/>
                {(dirtyPassword && errorPassword) && <div style = {{color: 'red'}}>{errorPassword}</div>}
            </div>
            <div className="password">
                <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                <input className="form__input" onChange={e=>confirmPasswordHandler(e)} value = {confirmPassword} onBlur={e=>confirmPasswordHandler(e)} type="password" name="confirmPassword" placeholder="Confirm Password"/>
                {(dirtyConfirmPassword && errorConfirmPassword) && <div style = {{color: 'red'}}>{errorConfirmPassword}</div>}
            </div>
        </div>
        <div className="footer">
           
            <button disabled = {!formValid} type = 'submit' onClick={()=>handleSubmit()}>Register</button>
            { <div style = {{color: 'red'}}>{serverEror}</div>}

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


