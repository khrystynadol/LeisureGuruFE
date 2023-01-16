import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { React, useContext, useState } from "react";
import { Filters } from "./filters/Filters";
import { SearchContext } from "./context/SearchContext";
import style from './NavigationBar.css'
import {
  Button,
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
        <div className="searchTxt">

        </div>
      );
    } else {
      return (
        <form onSubmit={e => WorkWithInput(e)}>
          <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
          {/* <input type="Submit" value="Goooo" className="searchButton" onClick = {e => WorkWithInput}></input> */}
          <input type="submit" value="Goooo" className="searchButton"></input>
        </form>
      );
    }
  }
  const renderUserContainer = (pathname) => {
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
          <div className="userMenu">
          
            <div className="myDropdown">
              <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down" className="userButton">
                <DropdownToggle caret size="lg" color="primary" className="userButton">Profile</DropdownToggle>
                <DropdownMenu className="dpMenu">
                  <DropdownItem ><Link to='/notifications' className="notification" style={{ textDecoration: 'none' }}>Notifications</Link></DropdownItem>
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
  // const renderButtons = (pathname) => {
  //   switch (pathname) {
  //     case '/':
  //       return (
  //         <ul>
  //           <li><Link to='/login' className="login">Login</Link></li>
  //           <li><Link to='/registration' className="user">Registration</Link></li>
  //         </ul>
  //       );
  //     case '/login':
  //       return (
  //         <ul>
  //           <li><Link to='/registration' className="user">Registration</Link></li>
  //         </ul>
  //       );
  //     case '/registration':
  //       return (
  //         <ul>
  //           <li><Link to='/login' className="user">Login</Link></li>
  //         </ul>
  //       );

  //     default:
  //       return (
  //         <>
  //           <div className="searchMenu">
  //             <form onSubmit={e => WorkWithInput(e)}>
  //               <input type="text" placeholder='Browse for places here...' className="searchTxt" onChange={e => handleInput(e)}></input>
  //               {/* <input type="Submit" value="Goooo" className="searchButton" onClick = {e => WorkWithInput}></input> */}
  //               <input type="submit" value="Goooo" className="searchButton"></input>
  //             </form>
  //           </div>

  //           <div className="userMenu">
  //             <div>
  //               <div className="dropdown">
  //                 <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
  //                   <DropdownToggle caret size="lg" color="primary">Me</DropdownToggle>
  //                   <DropdownMenu >
  //                     <DropdownItem><Link to='/notifications' >Notification</Link></DropdownItem>
  //                     <DropdownItem divider />
  //                     <DropdownItem><Link to='/Profile' >User</Link></DropdownItem>
  //                   </DropdownMenu>
  //                 </Dropdown>
  //               </div>

  //               <div className="bigButtons">
  //                 <ul style={{listStyle: 'none'}}>
  //                   <li><Link to='/notifications' className="notification">Notification</Link></li>
  //                   <li><Link to='/Profile' className="user">User</Link></li>
  //                 </ul>
  //               </div>
  //             </div>
  //           </div>
  //         </>
  //       );
  //   }
  // };

  return (
    <>
      {/* <div className="myHeader">
        <div className="myLogo">
          <Link to='/homepage' className="logo">LeisureGuru</Link>
          <Link to='/homepage' className="logoSmall">LG</Link>
        </div>
        <div className="mySearch">
          <form onSubmit={e => WorkWithInput(e)}>
            <input type="text" placeholder='Browse for places here...' className="mySearchTxt" onChange={e => handleInput(e)}></input>
            <input type="submit" value="Goooo" className="mySearchButton"></input>
          </form>
        </div>
        <div className="myButtons"></div>
      </div> */}
      <header>
        <div className="filterMenu">
          <Filters/>
        </div>
        <div className="logoMenu">
          {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration' ? <Link to='/' className="logo">LeisureGuru</Link> :
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
    </>
  );
}