import './styles.css';
import {React, useState} from 'react';
import LoadingSpinner from "./LoadingSpinner";
import { ResultPage } from './ResultPage';

function App() {
const[data, setData] = useState('')
const[resp, setResp] = useState('')
const [isLoading, setIsLoading] = useState(false);

const handleInput = (e) => {
  setData(e.target.value);
}

const WorkWithInput = () =>{
  setIsLoading(true);
      fetch('http://127.0.0.1:5000/filter', {
        method: 'GET',
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
          setServerEror('')
          response.json().then((jsonResponse) => {
            setResp(jsonResponse);
          })
          ResultPage(resp);
          navigate("/result");
         } else if (response.status === 400) {
          setServerEror('Bad Request')
         } else if (response.status === 404) {
          setServerEror('Not Found')
         } else if (response.status === 500) {
          setServerEror ('Internal Server Error')
         } else if (response.status === 502) {
          setServerEror('Bad Gateway')
         } else if (response.status === 503) {
          setServerEror('Service Unavailable')
         } else if (response.status === 503) {
          setServerEror ('Gateway Timeout')
          }
          setIsLoading(false);
        })
}

  return (
    <header>
      <div class="all-header-menu">
        <a href = "#" class = "logo">LeisureGuru</a>
        <div class="menu">
          <ul>
            <form>
              <input type="text" placeholder='Browse for places here...' className = "searchTxt" onChange={e => handleInput(e)}></input>
              <input type="Submit" value="Goooo" className = "searchButton" disabled = {isLoading} onClick = {WorkWithInput}></input>
            </form>
            <li><a href="#" className = "notification">Notification</a></li>
            <li><a href="#" className = "user">User</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default App;
