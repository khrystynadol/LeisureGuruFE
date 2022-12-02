import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
//import LoadingSpinner from "./LoadingSpinner";
import { ResultPage } from './ResultPage';
import {React, useState} from "react";
import { useNavigate } from "react-router-dom";

const dat = [{name:"Lviv Theatre of Opera and Ballet", country:"Ukraine", city:"Lviv",
            description:`Lviv’s resplendent opera house is one of the city’s symbols and stands alone on 
            Freedom Square. A design competition in the 1890s was won by Polish architect Zygmunt 
            Gorgolewski, and he made a few technical innovations: This location had been 
            marshland, watered by the Poltva River, which was diverted underground. The theatre 
            was then built onto a concrete platform, and after sinking for a couple of years 
            eventually stabilised. Almost 120 years later, this marvellous venue remains the 
            place to get a blast of high culture at a matinee or evening performance, where 
            seats are implausibly inexpensive. In residence is a 90-piece orchestra, first-class 
            soloists and a ballet troupe, all with an extensive repertoire.`,
          rate:5,
          image:`https://cdn.thecrazytourist.com/wp-content/
      uploads/2018/08/ccimage-shutterstock_212603344.jpg`}]
export const NavigationBar = function () {
  const location = useLocation();
  const[data, setData] = useState('')
  const[resp, setResp] = useState('')
  const[serverError, setServerError] = useState('');
  //const[isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleInput = (e) => {
  setData(e.target.value);
}

const WorkWithInput = (e) =>{

  e.preventDefault();
  <ResultPage respData = {dat}/>
  //ResultPage(dat);
  navigate("/result");
  //setIsLoading(true);
      // fetch('http://127.0.0.1:5000/filter', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(
      //     {
      //       search_box: data
      //     }
      //   )
      // })
      //   .then((response) => {
      //    if (response.status >= 200 && response.status <= 299) {
      //     setServerError('')
      //     response.json().then((jsonResponse) => {
      //       setResp(jsonResponse);
      //       ResultPage(jsonResponse);
      //       navigate("/result");
      //     })
      //     // ResultPage({resp});
      //     // navigate("/result");
      //    } else if (response.status === 400) {
      //     setServerError('Bad Request')
      //    } else if (response.status === 404) {
      //     setServerError('Not Found')
      //    } else if (response.status === 500) {
      //     setServerError ('Internal Server Error')
      //    } else if (response.status === 502) {
      //     setServerError('Bad Gateway')
      //    } else if (response.status === 503) {
      //     setServerError('Service Unavailable')
      //    } else if (response.status === 503) {
      //     setServerError ('Gateway Timeout')
      //     }
      //     //setIsLoading(false);
      //   }).then((response) => response.json())
      //   .then((jsonResponse) => {
      //       setServerError('')
      //       //setResp(jsonResponse);
      //       //ResultPage(resp);
      //       ResultPage(jsonResponse);
      //       navigate("/result");
      //   })

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
              <input type="Submit" value="Goooo" className="searchButton"></input>
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