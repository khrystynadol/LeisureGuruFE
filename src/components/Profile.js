import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect, useState, history, location } from "react";
import { useNavigate } from 'react-router-dom';
import { Link} from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProfileStrings} from './ProfileStrings'

export const Profile = function () {
    const[serverEror, setServerError] = useState('');
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    
    //const id = 0;

    var credentials = btoa(localStorage.getItem("email") + ":" + localStorage.getItem("password"))
    console.log(credentials)
    var auth = { "Authorization" : `Basic ${credentials}` }
    let id = localStorage.getItem("id")
    const[profileData, setProfileData] = useState('')
  //  const id = 0;
    function LogOut(){
       
        fetch(`http://127.0.0.1:5000/profile/${id}`,  {
            method: 'GET',
            headers : auth,
            mode:'cors'
        })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {

            localStorage.clear()
            setServerError('')
            navigate("/");
         } else if (response.status === 400) {
            setServerError('Bad Request')
         } else if (response.status === 404) {
            setServerError('Not Found')
         } else if (response.status === 500) {
            setServerError ('Internal Server Error')
         } else if (response.status === 502) {
            setServerError('Bad Gateway')
         } else if (response.status === 503) {
            setServerError('Service Unavailable')
         } else if (response.status === 503) {
            setServerError ('Gateway Timeout')
          }
        })
      navigate("/profile");
    }
    
    const toggleYes = () =>{
        setModal(!modal);
        fetch('http://127.0.0.1:5000/profile/' + localStorage.getItem("id"), {
            method: 'DELETE',
            headers : auth,
            mode:'cors' 
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                localStorage.clear();
                setServerError('')
                navigate("/");
            } else if (response.status == 400) {
                setServerError('Bad Request')
            } else if (response.status == 404) {
                setServerError('Not Found')
            } else if (response.status == 500) {
                setServerError ('Internal Server Error')
            } else if (response.status == 502) {
                setServerError('Bad Gateway')
            } else if (response.status == 503) {
                setServerError('Service Unavailable')
            } else if (response.status == 503) {
                setServerError ('Gateway Timeout')
            }else{
                setServerError('Unknown error')
                navigate("/profile");
            }
        })
        
    }

    useEffect(()=>{
        const getInformation = async() => {
            const conn = await fetch('http://127.0.0.1:5000/profile/'+ localStorage.getItem("id")); //create connection with db
            const getdata = await conn.json();
            setProfileData(getdata);
        }
        getInformation();
    })

    return (
    <main>
        <div >
            <div className="forma"> 
                <div >
                    <div>
                        <img className = "userImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt = "Your profile picture"></img>
                    </div>    
                    <div className="personData">
                        <ProfileStrings
                            first_name={profileData.first_name}
                            second_name={profileData.last_name}
                            birth_date={profileData.birth_date}
                            email={profileData.email}
                        />
                    </div>
                    <div >
                        <div className="listWrapper" >
                            <ul role = "tablist" className="tblist">
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
                    <button className = "deleteButton" onClick={toggle}>
                        Delete my account
                    </button>
                    
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Delete my account</ModalHeader>
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
    </main>
    );
}
