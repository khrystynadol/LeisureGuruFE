import './styles.css';
import {React, useState} from 'react';
import LoadingSpinner from "./LoadingSpinner";
import { ResultPage } from '../../../src/components/ResultPage';

function App() {
const[data, setData] = useState('')
const[resp, setResp] = useState('')
const [isLoading, setIsLoading] = useState(false);

const handleInput = (e) => {
  setData(e.target.value);
}

const WorkWithInput = () =>{
  setIsLoading(true);
      fetch('http://127.0.0.1:5000/result', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            name: data,
            city: data,
            country: data
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
          navigate("/resut");
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
              <input type="text" placeholder='Browse for places here...' class = "searchTxt" onClick={e => handleInput(e)}></input>
              <input type="Submit" value="Goooo" class = "searchButton" disabled = {isLoading} onClick = {()=>WorkWithInput()}></input>
            </form>
            <li><a href="#" class = "notification">Notification</a></li>
            <li><a href="#" class = "user">User</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default App;
