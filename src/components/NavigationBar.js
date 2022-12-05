import { json, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
//import LoadingSpinner from "./LoadingSpinner";
import { ResultPage } from './ResultPage';
import {React, useState} from "react";
import { useNavigate } from "react-router-dom";


export const NavigationBar = function () {
  const location = useLocation();
  const[data, setData] = useState('')
  const[resp, setResp] = useState('')
  const[serverError, setServerError] = useState('');
  const navigate = useNavigate();
  var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
  var auth = { "Authorization" : `Basic ${credentials}` }
  let id = localStorage.getItem("id")

const handleInput = (e) => {
  setData(e.target.value);
}

const WorkWithInput = (e) =>{

  e.preventDefault();
      fetch(`http://127.0.0.1:5000/filter`, {
        method: 'POST',
            headers: { 
                        'Authorization' : `Basic ${credentials}`,
                        'Content-Type': 'application/json'
                      },
            mode: 'cors',
    
        body: JSON.stringify(
          {
            search_box: data
          }
        )
      }).then(response => response.json())
        .then((jsonResponse) => {
            setServerError('')
            jsonResponse.map((infoIndex)=>(
              ResultPage (
              infoIndex.name ,
              infoIndex.image ,
              infoIndex.description ,
              infoIndex.rate ,
              infoIndex.country,
              infoIndex.city
            )
            ))
            //ResultPage(jsonResponse);
            
            navigate("/result");
        })
        .then((response) => {
         if (response.status === 200) {
          setServerError('')
         } else if (response.status === 401) {
          setServerError('Bad Request')
          alert("Not authourized")
         }
        })
        .catch(e => console.log("failed: " + e));
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
            <form onSubmit={WorkWithInput}>
              <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
              {/* <input type="Submit" value="Goooo" className="searchButton" onClick = {e => WorkWithInput}></input> */}
              <input type="Submit" value="Goooo" className="searchButton" onClick = {e => WorkWithInput}></input>
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