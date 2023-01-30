import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect, useState, history, location, useRef } from "react";
import { json, redirect, useNavigate } from 'react-router-dom';
import { Link} from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProfileStrings} from './ProfileStrings'


export const Profile = function () {
    const[serverEror, setServerError] = useState('');
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
    var auth = { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }
    let id = JSON.parse(atob(localStorage.getItem("access_token").split('.')[1])).user_id
    const[profileData, setProfileData] = useState({})

    function LogOut(){
       
        fetch(`http://127.0.0.1:5000/profile/logout/${localStorage.getItem("id")}`,  {
            method: 'GET',
            headers : auth,
            mode:'cors'
        })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {

            localStorage.clear()
            setServerError('')
            navigate("/");
         } else if (response.status >= 400) {
            setServerError('Bad Request')
         } 
        })
      navigate("/profile");
    }
    
    const toggleYes = () =>{
        setModal(!modal);
        fetch(`http://127.0.0.1:5000/profile/${localStorage.getItem("id")}`, {
            method: 'DELETE',
            headers : auth,
            mode:'cors' 
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                localStorage.clear();
                setServerError('')
                navigate("/");
            } else if (response.status >= 400) {
                setServerError('Bad Request')
            } else{
                setServerError('Unknown error')
                navigate("/profile");
            }
        })
        
    }


    useEffect(()=>{
        function GetInfo(){
            fetch(`http://127.0.0.1:5000/profile/${localStorage.getItem("id")}`,  {
                method: 'GET',
                headers : auth,
                mode:'cors'
            })
            .then(response => response.json())
            .then(respData => {
                setProfileData(respData);
            }
            )
            .then((response) => {
             if (response.status === 200) {
                setServerError('')
             } else if (response.status > 200) {
                setServerError('Bad Request')
             } 
            })
            .catch(e => console.log("failed: " + e));
        };
        GetInfo();
    }, []);

    return(
        <>
            <div className="forma">
                <div className="row">
                    <div className="row" >
                        <div className="row">
                            <div className="col justify-content-right align-items-right">
                                <div className="imageContainer col d-flex">
                                    <img 
                                    className = "userImage" 
                                    src= {profileData.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
                                    alt = "Your profile picture">
                                    </img>
                                </div>
                            </div>
                            <div className="personDataContainer col d-flex justify-content-right">
                                <div className="personData">
                                    <ProfileStrings
                                        profData={profileData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center justify-content-center " >
                            <div className="row mt-5 d-flex align-items-center justify-content-center" >
                                <ul role = "tablist" className="listWrapper">
                                    <li className = "nav-item">
                                        <Link className = "editProfile"  to= '/editprofile' id = "home-tab" data-toggle = "tab"  role = "tab">Edit profile</Link>
                                    </li>
                                    <li className = "nav-item">
                                        <Link className = "settings"  to='/settings' id = "profile-tab" data-toggle = "tab" href = "#" role = "tab">Settings</Link>
                                    </li>
                                    <li className = "nav-item">
                                        <Link className = "logOut " to = "/" onClick={LogOut}>Log out </Link>
                                    </li>
                                    <li className = "nav-item">
                                        <button className = "deleteButton" onClick={toggle}>
                                            Delete my account
                                        </button>
                                    </li>
                                </ul>
                                    <div className="modalContainer d-flex justify-content-center align-items-center">
                                        <Modal className=" position-relative" isOpen={modal} toggle={toggle} style={{width:'50%', justifySelf:'center', alignSelf:'center'}}>
                                            <ModalHeader toggle={toggle}>
                                                Delete my account
                                            </ModalHeader>
                                            <ModalBody>
                                                Do you want to delete your account on LeisureGuru?
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" onClick={toggleYes}>
                                                    Delete
                                                </Button>{' '}
                                                <Button color="secondary" onClick={toggle}>
                                                    Cancel
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
