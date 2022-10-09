import { useEffect, useState, history, location } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";


export const Profile = function () {
    function LogOut(){
        localStorage.clear();
    }
      
    return (
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
            </div>
        </div>
    );
}
