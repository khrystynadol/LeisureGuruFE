import React, { useEffect, useState } from "react";


function Reg(){
    const[email, setEmail] = useState("")// ініціалізація змінної email
    const[dirtyEmail, setDirtyEmail] = useState(false)//перевірка змінної на спробу змінити(якщо натиснути на форму для вводу і прибрати курсор, залишивши поле пустим, то буде помилка)
    const[errorEmail, setErrorEmail] = useState('Email field can`t be empty')//ініціалізація помилки для змінної email

    const[password, setPassword] = useState("")// ініціалізація змінної password
    const[dirtyPassword, setDirtyPassword] = useState(false)//перевірка змінної на спробу змінити(якщо натиснути на форму для вводу і прибрати курсор, залишивши поле пустим, то буде помилка)
    const[errorPassword, setErrorPassword] = useState('Password field can`t be empty')//ініціалізація помилки для змінної password
    
    const[formValid, setFormValid] = useState(false)//ініціалізація пеевірки форми на валідність
    
    const[name, setName]  = useState('')// ініціалізація змінної name
    const[errorName, setErrorName] = useState('Name can`t be empty')//перевірка змінної на спробу змінити(якщо натиснути на форму для вводу і прибрати курсор, залишивши поле пустим, то буде помилка)
    const[dirtyName, setDirtyName] = useState(false)//ініціалізація помилки для змінної name
    
    const[surname, setSurname]  = useState('')// ініціалізація змінної surname
    const[errorSurname, setErrorSurname] = useState('Surname can`t be empty')//перевірка змінної на спробу змінити(якщо натиснути на форму для вводу і прибрати курсор, залишивши поле пустим, то буде помилка)
    const[dirtySurname, setDirtySurname] = useState(false)//ініціалізація помилки для змінної surname
    

    const [date, setDate] = useState('')
    // const[birthDate, setBirthDate]  = useState('')
    // const[errorBirthDate, setErrorBirthDate] = useState('Surname can`t be empty')
    // const[dirtyBirthDate, setDirtyBirthDate] = useState(false)
    //перевірка всіх елементів на правильність заповнення
    useEffect(() =>{
        if(errorEmail || errorPassword || errorName || errorSurname || !date){
          setFormValid(false)//якщо хоч один з елементів форми заповнений неправильно то форма вважається не валідною
        }else{
          setFormValid(true)
        }
      }, [errorEmail, errorPassword, errorName, errorSurname, date])
    
    //функція перевірки для форми email для відповідності стандарту email
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
    //перевірка для форми password на довжину
      const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 5 || e.target.value.length > 10){
          setErrorPassword('Your password should be between 5 and 10 symbols')
          if(!e.target.value){
            setErrorPassword('Password can`t be empty')
          }
        }else{
          setErrorPassword("")
        }
      }
      //функція перевірки форми name на правильність написання і відсутність неправльних знаків
      const nameHandler = (e) =>{
        setName(e.target.value)
        if(!/^[a-zA-Z]+$/.test(e.target.value)){
          setErrorName('Your name contains inapropriate symbols')
        }else{
          setErrorName('')
        }
      }
      //функція перевірки форми surname на правильність написання і відсутність неправльних знаків
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

        <input type = 'date' onChange = {e=>setDate(e.target.value)} value = {date} onBlur = {e=>blurHandle(e)} name = 'date' placeholder = 'Pick your birth date...'/>
        
        <button disabled = {!formValid} type = 'submit'>Register</button>
      </form>
      </div>


    )
}

export default Reg;
