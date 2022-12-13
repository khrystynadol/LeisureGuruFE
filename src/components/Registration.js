import Header from "./Header";
import './style.css'
import React, {useState,setState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import 'whatwg-fetch';
import LoadingSpinner from "./LoadingSpinner";
import { Alert, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";


export const Registration = function(props) {
    //can be either 'editprofile' or 'registration'
    const { formType = 'registration' } = props;

    const navigate = useNavigate();
    const[firstName, setFirstName] = useState('');
    const[errorFirstName, setErrorFirstName] = useState('Field can`t be empty')
    const[dirtyFirstName, setDirtyFirstName] = useState(false)

    const[lastName, setLastName] = useState('');
    const[errorLastName, setErrorLastName] = useState('')
    const[dirtyLastName, setDirtyLastName] = useState(false)

    const[email, setEmail] = useState('')
    const[dirtyEmail, setDirtyEmail] = useState(false)
    const[errorEmail, setErrorEmail] = useState('Field can`t be empty')

    const[password, setPassword] = useState('')
    const[dirtyPassword, setDirtyPassword] = useState(false)
    const[errorPassword, setErrorPassword] = useState('Field can`t be empty')
    
    const[confirmPassword,setConfirmPassword] = useState("");
    const[dirtyConfirmPassword, setDirtyConfirmPassword] = useState(false)
    const[errorConfirmPassword, setErrorConfirmPassword] = useState('Field can`t be empty')

    const [date, setDate] = useState('')
    const[formValid, setFormValid] = useState(false)
    const formCaption = (formType === 'editprofile' ? 'Edit Profile' : 'Registration');

    const [isLoading, setIsLoading] = useState(false);

    const fieldFirstName = useRef();
    const fieldLastName = useRef();
    const fieldEmail = useRef();
    const fieldDate = useRef();
    const[serverError, setServerError] = useState('');

    useEffect(() =>{
      console.log("use effect " + new Date());
    if(errorEmail || errorPassword || errorFirstName || errorLastName || !date){
      console.log("use effect: invalid");
      setFormValid(false)//якщо хоч один з елементів форми заповнений неправильно то форма вважається не валідною
    }else{
      console.log("use effect: valid");
      setFormValid(true)
    }
  }, [errorEmail, errorPassword, errorFirstName, errorLastName, date])


  

  const emailHandler = (e) => {
      setDirtyEmail(true)
      setEmail(e.target.value)
      const re =
  /^(([^<>()[\],;:\s@\"]+([^<>()[\],;:\s@\"]+)*)|(\".+\"))@(([^<>()[\],;:\s@\"]+)+[^<>()[\],;:\s@\"]{2,})$/i;
  if(!e.target.value){
    setErrorEmail('Field can`t be empty')
  } else if(!re.test(String(e.target.value).toLowerCase())){
        setErrorEmail('Incorrect email')
    }else{
      setErrorEmail("")
    }
   
  }
//перевірка для форми password на довжину
  const passwordHandler = (e) => {
    setDirtyPassword(true)
    setPassword(e.target.value)
    localStorage.setItem("password", e.target.value)
    if(e.target.value.length < 5 ){
      setErrorPassword('Make it more than 5')
      if(!e.target.value){
        setErrorPassword('Field can`t be empty')
      }
    }else if(e.target.value.length > 10){
      setErrorPassword('Make it less than 10')
      if(!e.target.value){
        setErrorPassword('Field can`t be empty')
      }
    }else{
      setErrorPassword("")
    }
   // localStorage.setItem("password", Password.current.value);
  }

  const confirmPasswordHandler = (e) => {
    setDirtyConfirmPassword(true)
    setConfirmPassword(e.target.value)
    if (e.target.value ===''){
      setErrorConfirmPassword('Field can`t be empty')
    } else if(e.target.value !== password) {
      setErrorConfirmPassword("No match with password above")
    }else{
      setErrorConfirmPassword("")
    }
  }

  //функція перевірки форми name на правильність написання і відсутність неправльних знаків
  const firstNameHandler = (e) =>{
    console.log("first name h: " + e.target.value);
    setDirtyFirstName(true)
    setFirstName(e.target.value)
    if (e.target.value ===''){
      setErrorFirstName('Field can`t be empty')
    } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
      setErrorFirstName('Your name contains inapropriate symbols')
    }else{
      setErrorFirstName('')
    }

  }

  //функція перевірки форми surname на правильність написання і відсутність неправльних знаків
  const lastNameHandler = (e) => {
    setDirtyLastName(true)
    setLastName(e.target.value)
    if (e.target.value ===''){
      setErrorLastName('Field can`t be empty')
    } else if(!/^[a-zA-Z]+$/.test(e.target.value)){
      setErrorLastName('Your surname contains inapropriate symbols')
    } else {
      setErrorLastName('')
    }
    //localStorage.setItem("lastName", LastName.current.value);
  }
//http://127.0.0.1:5000/
    const handleSubmit  = () => {
      setIsLoading(true);
      fetch('http://127.0.0.1:5000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            birth_date : date,
            password: password,
            photo: "https://static.wikia.nocookie.net/disney/images/d/da/Profile_-_Judy_Hopps.jpeg/revision/latest?cb=20190415002656"
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
        if (jsonResponse.code >=300) {
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

    const registrationForm = (
        <div className="form">
        <Form className="form-body">
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="firstName">First Name </Label>
                <Input invalid={dirtyFirstName && errorFirstName} className="form__input" onChange={e=>firstNameHandler(e)}  onBlur={e=>firstNameHandler(e)} type="text" value={firstName}  name="firstName" placeholder="First Name" ref={fieldFirstName}/>
                <FormFeedback invalid style={{width: '30%'}}>{errorFirstName}</FormFeedback>
            </FormGroup>
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="lastName">Last Name </Label>
                <Input invalid={dirtyLastName && errorLastName}  onChange={e=>lastNameHandler(e)} onBlur={e=>lastNameHandler(e)} type="text"  name="lastName" value={lastName}  className="form__input" placeholder="LastName" ref={fieldLastName}/>
                <FormFeedback invalid style={{width: '30%'}}>{errorLastName}</FormFeedback>
            </FormGroup>
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="email">Email </Label>
                <Input invalid={dirtyEmail && errorEmail}  onChange={e=>emailHandler(e)} value = {email} onBlur={e=>emailHandler(e)} type="email" name="email" className="form__input"   placeholder="Email" ref={fieldEmail}/>
                <FormFeedback invalid style={{width: '30%'}}>{errorEmail}</FormFeedback>
            </FormGroup>
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="date">Birth date </Label>
                <Input  type = 'date' onChange = {e=>setDate(e.target.value)} value = {date} className = "form__input" name = 'date' placeholder = 'Pick your birth date...' ref={fieldDate}/>
                
            </FormGroup>
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="password">Password </Label>
                <Input invalid={dirtyPassword && errorPassword} className="form__input" onChange={e=>passwordHandler(e)} value = {password} onBlur={e=>passwordHandler(e)} type="password"  name="password"   placeholder="Password" />
                <FormFeedback invalid style={{width: '30%'}}>{errorPassword}</FormFeedback>
            </FormGroup>
            <FormGroup className="form__element">
                <Label className="form__label" htmlFor="confirmPassword">Confirm Password </Label>
                <Input invalid={dirtyConfirmPassword && errorConfirmPassword} className="form__input" onChange={e=>confirmPasswordHandler(e)} value = {confirmPassword} onBlur={e=>confirmPasswordHandler(e)} type="password" name="confirmPassword" placeholder="Confirm Password"/>
                <FormFeedback invalid style={{width: '30%'}}>{errorConfirmPassword}</FormFeedback>
            </FormGroup>
            <div className="submitDiv">
           
           <button disabled = {!formValid || isLoading} className = "submitButton" type = 'submit' onClick={()=>handleSubmit()}>{formCaption}</button>

           </div>
           <div className="formError">
             { serverError == '' ? null : <Alert color="danger" style={{width: "100%"}} >{serverError}</Alert>}
           </div>

        </Form>

    </div>
              
    );
    
    
     return(
        <div className="Login">
        <div className="login-onClick={()=>handleSubmit()}m">
        <div><Header word={formCaption}></Header></div> 
        {isLoading ? <LoadingSpinner />  : registrationForm}
        </div>
    </div>
     );
}

