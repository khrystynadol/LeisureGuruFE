import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { React, useContext, useState } from "react";
import { Filters } from "./filters/Filters";
import { SearchContext } from "./context/SearchContext";
import style from './style.css'
import {AiOutlineUser} from "react-icons/ai";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const NavigationBar = function (props) {
  const location = useLocation();
  const [data, setData] = useState([])
  var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
  var auth = { "Authorization": `Basic ${credentials}` }
  let id = localStorage.getItem("id")
  const searchContext = useContext(SearchContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);


  const handleInput = (e) => {
    setData(e.target.value);
  }

  const WorkWithInput = (e) => {
    e.preventDefault();
    searchContext.setSearchString(data);
    console.log(data);
  }
  const renderSearchContainer = (pathname) => {
    if (pathname == '/' || pathname == '/login' || pathname == '/registration') {
      return (
        // <div className="searchTxt">

        // </div>
        <></>
      );
    } else {
      return (
        <form onSubmit={e => WorkWithInput(e)}>
          <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
          <input type="submit" value="Goooo" className="searchButton"></input>
        </form>
      );
    }
  }
  const renderUserContainer = (pathname) => {
    switch (pathname) {
      case '/':
        return (
          <div className="userMenu">
          
            <div className="myDropdown">
              <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down" className="userButton">
                <DropdownToggle caret size="lg" color="primary" className="userButton"><AiOutlineUser className="profileIcon"/></DropdownToggle>
                <DropdownMenu className="dpMenu">
                  <DropdownItem ><Link to='/login' className="notification" style={{ textDecoration: 'none' }}>Login</Link></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem><Link to='/registration' className="user" style={{ textDecoration: 'none' }}>Registration</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="bigButtons">
              <Link to='/login' className="notification" style={{ textDecoration: 'none' }}>Login</Link>
              <Link to='/registration' className="user" style={{ textDecoration: 'none' }}>Registration</Link>

            </div>
        
        </div>
        );
      case '/login':
        return (
          <ul style={{listStyle: 'none'}}>
            <li><Link to='/registration' className="user" style={{ textDecoration: 'none' }}>Registration</Link></li>
          </ul>
        );
      case '/registration':
        return (
          <ul style={{listStyle: 'none'}}>
            <li><Link to='/login' className="user" style={{ textDecoration: 'none' }}>Login</Link></li>
          </ul>
        );
      default:
        return (
          <div className="userMenu">
          
            <div className="myDropdown">
              <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down" className="userButton">
                <DropdownToggle caret size="lg" color="primary" className="userButton"><AiOutlineUser className="profileIcon"/></DropdownToggle>
                <DropdownMenu className="dpMenu">
                  <DropdownItem><Link to='/notifications' className="notification" style={{ textDecoration: 'none' }}>Notifications</Link></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem><Link to='/Profile' className="user" style={{ textDecoration: 'none' }}>User</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="bigButtons">
              <Link to='/notifications' className="notification" style={{ textDecoration: 'none' }}>Notifications</Link>
              <Link to='/Profile' className="user" style={{ textDecoration: 'none' }}>User</Link>

            </div>
        
        </div>

        );

    }
  }


  return (
      <header>
        {
          location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration' ?
          <></>
          : <div className="filterMenu">
              <Filters/>
            </div>
        }
        
        <div className="logoMenu">
          {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration' ? 
            <>
            <Link to='/' className="logo">LeisureGuru</Link>
            <Link to='/' className="logoSmall">LG</Link>
           </> :
            <>
              <Link to='/homepage' className="logo">LeisureGuru</Link>
              <Link to='/homepage' className="logoSmall">LG</Link>
            </>}
        </div>
        <div className="searchMenu">
          {renderSearchContainer(location.pathname)}
        </div>
        <div className="userMenu">
          {renderUserContainer(location.pathname)}
        </div>

      </header>
  );
}