import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {React, useContext, useState} from "react";
import { SearchContext } from "./context/SearchContext";

export const NavigationBar = function (props) {
  const location = useLocation();
  const[data, setData] = useState([])
  var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
  var auth = { "Authorization" : `Basic ${credentials}` }
  let id = localStorage.getItem("id")
  const searchContext = useContext(SearchContext);

  const handleInput = (e) => {
    setData(e.target.value);
  }

const WorkWithInput = (e) =>{
  e.preventDefault();
  searchContext.setSearchString(data);
  console.log(data);
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
      case '/confirm':
        return(
          <div>
            
          </div>
        );
      default:
        return (
          <ul>
            <form onSubmit={e => WorkWithInput(e)}>
              <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
              {/* <input type="Submit" value="Goooo" className="searchButton" onClick = {e => WorkWithInput}></input> */}
              <input type="submit" value="Goooo" className="searchButton"></input>
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