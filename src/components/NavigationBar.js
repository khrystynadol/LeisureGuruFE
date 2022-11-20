import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
//import LoadingSpinner from "./LoadingSpinner";
import { ResultPage } from './ResultPage';
import {React, useState, navigate, setServerError} from "react";


export const NavigationBar = function () {
  const location = useLocation();
  const[data, setData] = useState('')
  const[resp, setResp] = useState('')
  //const[isLoading, setIsLoading] = useState(false);

const handleInput = (e) => {
  setData(e.target.value);
}

const WorkWithInput = () =>{
  //setIsLoading(true);
      fetch('http://127.0.0.1:5000/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            search_box: data
          }
        )
      })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {
          setServerError('')
          /*response.json().then((jsonResponse) => {
            setResp(jsonResponse);
          })*/
          
         } else if (response.status === 400) {
          setServerError('Bad Request')
         } else if (response.status === 404) {
          setServerError('Not Found')
         } else if (response.status === 500) {
          setServerError ('Internal Server Error')
         } else if (response.status === 502) {
          setServerError('Bad Gateway')
         } else if (response.status === 503) {
          setServerError('Service Unavailable')
         } else if (response.status === 503) {
          setServerError ('Gateway Timeout')
          }
          //setIsLoading(false);
        }).then(information=>{
          setResp(information);
          ResultPage({resp});
          navigate("/result");
        })
}

  const renderButtons = (pathname) => {
    switch (pathname) {
      case '/':
        return (
          <ul>
            <li><Link to='/login' className="login">Login</Link></li>
            <li><Link to='/registration' className="user">Registration</Link></li>
          </ul>
        );
      case '/login':
        return (
          <ul>
            <li><Link to='/registration' className="user">Registration</Link></li>
          </ul>
        );
      case '/registration':
        return (
          <ul>
            <li><Link to='/login' className="user">Login</Link></li>
          </ul>
        );
      default:
        return (
          <ul>
            <form>
              <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
              <input type="Submit" value="Goooo" className="searchButton" onClick = {WorkWithInput}></input>
            </form>
            <li><Link to='/notifications' className="notification">Notification</Link></li>
            <li><Link to='/Profile' className="user">User</Link></li>
          </ul>
        );
    }
  };

  return (
    <header>
      <div className="all-header-menu">
      {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration' ? <Link to='/' className="logo">LeisureGuru</Link> : 
        <Link to='/homepage' className="logo">LeisureGuru</Link>}
        
        <div className="menu">
          {renderButtons(location.pathname)}
        </div>
      </div>
    </header>
  );
}

