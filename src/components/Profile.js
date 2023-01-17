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
    var auth = { "Authorization" : `Basic ${credentials}` }
    let id = localStorage.getItem("id")
    const[profileData, setProfileData] = useState({})

    function LogOut(){
       
        fetch(`http://127.0.0.1:5000/profile/logout/${id}`,  {
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
            fetch(`http://127.0.0.1:5000/profile/${id}`,  {
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

    // return (
    //     <>
    //     <div >
    //         <div className="forma"> 
    //             <div >
                    // <div className="row">
                    //     <img 
                    //     className = "userImage" 
                    //     src= {profileData.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
                    //     alt = "Your profile picture">
                    //     </img>
                    // </div>    
    //                 <div >
    //                     <div className="listWrapper" >
    //                         <ul role = "tablist" className="tblist">
    //                             <li className = "nav-item">
    //                                 <Link className = "editProfile"  to= '/editprofile' id = "home-tab" data-toggle = "tab"  role = "tab">Edit profile</Link>
    //                             </li>
    //                             <li className = "nav-item">
    //                                 <Link className = "settings"  to='/settings' id = "profile-tab" data-toggle = "tab" href = "#" role = "tab">Settings</Link>
    //                             </li>
    //                             <li className = "nav-item">
    //                                 <Link className = "logOut" to = "/" onClick={LogOut}>Log out </Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
                    
    //             </div>
                    // <div className="personData">
                    //     <ProfileStrings
                    //         profData={profileData}
                    //     />
                    // </div>
    //             <button className = "deleteButton" onClick={toggle}>
    //                     Delete my account
    //                 </button>
    //             <div>
                    
                    
    //                 <Modal isOpen={modal} toggle={toggle}>
    //                     <ModalHeader toggle={toggle}>Delete my account</ModalHeader>
    //                         <ModalBody>
    //                             Do you want to delete your account on LeisureGuru?
    //                         </ModalBody>
    //                     <ModalFooter>
    //                         <Button color="danger" onClick={toggleYes}>
    //                             Delete
    //                         </Button>{' '}
    //                         <Button color="secondary" onClick={toggle}>
    //                             Cancel
    //                         </Button>
    //                     </ModalFooter>
    //                 </Modal>
    //             </div>
    //         </div>
    //     </div>
    // </>
    //     );
    // return(
    //     <>
    //         <div className="forma">
    //             <div className="container-fluid">
    //                 <div className="row">
    //                     <div className="col-sm justify-content-center align-items-left">
                            // <div className="row">
                            //     <img 
                            //     className = "userImage" 
                            //     src= {profileData.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
                            //     alt = "Your profile picture">
                            //     </img>
                            // </div>
                            // <div className="row">
                            //     <div className="listWrapper mt-5" >
                            //         <ul role = "tablist" className="tblist">
                            //             <li className = "nav-item">
                            //                 <Link className = "editProfile"  to= '/editprofile' id = "home-tab" data-toggle = "tab"  role = "tab">Edit profile</Link>
                            //             </li>
                            //             <li className = "nav-item">
                            //                 <Link className = "settings"  to='/settings' id = "profile-tab" data-toggle = "tab" href = "#" role = "tab">Settings</Link>
                            //             </li>
                            //             <li className = "nav-item">
                            //                 <Link className = "logOut " to = "/" onClick={LogOut}>Log out </Link>
                            //             </li>
                            //         </ul>
                            //     </div>
                            // </div>    
    //                     </div>
    //                     <div className="col-lg">
    //                         <div className="row">
                                // <div className="personData">
                                //     <ProfileStrings
                                //         profData={profileData}
                                //     />
                                // </div>
    //                             <button className = "deleteButton" onClick={toggle}>
    //                                 Delete my account
    //                             </button>
    //                         </div>
                            
                            
                            // <Modal isOpen={modal} toggle={toggle}>
                            //     <ModalHeader toggle={toggle}>Delete my account</ModalHeader>
                            //     <ModalBody>
                            //         Do you want to delete your account on LeisureGuru?
                            //     </ModalBody>
                            //     <ModalFooter>
                            //         <Button color="danger" onClick={toggleYes}>
                            //             Delete
                            //         </Button>{' '}
                            //         <Button color="secondary" onClick={toggle}>
                            //             Cancel
                            //         </Button>
                            //     </ModalFooter>
                            // </Modal>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
    return(
        <>
            <div className="forma">
                <div className="container-fluid">
                    <div className="row">
                        <div className="row">
                            <div className="col-sm">
                                <div className="imageContainer col d-flex ">
                                    <img 
                                    className = "userImage" 
                                    src= {profileData.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} 
                                    alt = "Your profile picture">
                                    </img>
                                </div>
                            </div>
                            <div className="col d-flex">
                                <div className="personData">
                                    <ProfileStrings
                                        profData={profileData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex align-items-center justify-content-left">
                                <div className="">
                                    <div className="listWrapper mt-5" >
                                        <ul role = "tablist" className="tblist">
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
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="mt-5">
                                    
                                    <Modal isOpen={modal} toggle={toggle}>
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
