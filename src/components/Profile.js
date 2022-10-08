import { useEffect, useState, history, location } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";


export const Profile = function () {
    function LogOut(){
        localStorage.clear();
    }
      
    return (
        <>
            <div class = "Container emp-profile">
                <form class="forma" method=""> 
                    <div class = "Row">
                        <div>
                            <img class = "userImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt = "Your profile picture"></img>
                        </div>    

                        <div class = "col-md-6">
                            <div class = "profile-head">
                                <ul class = "nav nav-tabs" role = "tablist">
                                    <li class = "nav-item">
                                        <a class = "editProfile" id = "home-tab" data-toggle = "tab" href = "#" role = "tab">Edit profile</a>
                                    </li>
                                    <li class = "nav-item">
                                        <a class = "settings" id = "profile-tab" data-toggle = "tab" href = "#" role = "tab">Settings</a>
                                    </li>
                                    <li class = "nav-item">
                                        <Link to = "/">
                                        <a type = 'submit' class = "logOut" id = "profile-tab" data-toggle = "tab" role = "tab" href="/" onClick={LogOut}>Log out</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
        

    );
}
