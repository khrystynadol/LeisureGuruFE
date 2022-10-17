import { useEffect, useState, history, location } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";


export const Profile = function () {
    const[serverEror, setServerEror] = useState('');
    const navigate = useNavigate();
    const id = 0;
    function LogOut(){
        localStorage.clear();
        fetch('http://127.0.0.1:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            id:id
          }
        )
      })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {
          setServerEror('')
            navigate("/homepage");
         } else if (response.status == 400) {
          setServerEror('Bad Request')
         } else if (response.status == 404) {
          setServerEror('Not Found')
         } else if (response.status == 500) {
          setServerEror ('Internal Server Error')
         } else if (response.status == 502) {
          setServerEror('Bad Gateway')
         } else if (response.status == 503) {
          setServerEror('Service Unavailable')
         } else if (response.status == 503) {
          setServerEror ('Gateway Timeout')
          }
        })
      navigate("/");
    }

    const HandleDelete = (e) => {
        e.stopPropagation();
           if(window.confirm('Are sure want to delete?')) {
                fetch('http://127.0.0.1:5000/user', {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                    {
                        id:id
                    }
                    )
                })
                .then((response) => {
                    if (response.status >= 200 && response.status <= 299) {
                        alert('We now don`t have any information about you');
                        localStorage.clear();
                        setServerEror('')
                        navigate("/homepage");
                    } else if (response.status == 400) {
                        setServerEror('Bad Request')
                    } else if (response.status == 404) {
                        setServerEror('Not Found')
                    } else if (response.status == 500) {
                        setServerEror ('Internal Server Error')
                    } else if (response.status == 502) {
                        setServerEror('Bad Gateway')
                    } else if (response.status == 503) {
                        setServerEror('Service Unavailable')
                    } else if (response.status == 503) {
                        setServerEror ('Gateway Timeout')
                    }
                })
            navigate("/");
           } else {
               navigate("/profile")
           }

           
     }
      
    return (
    <main>
        <div className = "Container emp-profile">
            <div className="forma"> 
                <div className = "Row">
                    <div>
                        <img className = "userImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt = "Your profile picture"></img>
                    </div>    

                    <div className = "col-md-6">
                        <div className = "profile-head">
                            <ul className = "nav nav-tabs" role = "tablist">
                                <li className = "nav-item">
                                    <Link className = "editProfile"  to= '/editprofile' id = "home-tab" data-toggle = "tab"  role = "tab">Edit profile</Link>
                                </li>
                                <li className = "nav-item">
                                    <Link className = "settings"  to='/settings' id = "profile-tab" data-toggle = "tab" href = "#" role = "tab">Settings</Link>
                                </li>
                                <li className = "nav-item">
                                    <Link className = "logOut" to = "/" onClick={LogOut}>Log out </Link>
                        
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <button className = "deleteButton" onClick={(e) =>HandleDelete(e)}>
                        Delete my account
                    </button>
                </div>
            </div>
        </div>
    </main>
    );
}
