import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect, useState, history, location } from "react";
import { useNavigate } from 'react-router-dom';
import { Link} from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Profile = function () {
    const[serverEror, setServerEror] = useState('');
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
  //  const id = 0;
    function LogOut(){
        fetch('http://127.0.0.1:5000/profile/' + localStorage.getItem("id"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
         if (response.status >= 200 && response.status <= 299) {

            localStorage.clear()
            setServerEror('')
            navigate("/");
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
        })
      navigate("/profile");
    }
    
    const toggleYes = () =>{
        setModal(!modal);
        fetch('http://127.0.0.1:5000/user/' + localStorage.getItem("id"), {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                localStorage.clear();
                setServerEror('')
                navigate("/");
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
            }else{
                setServerEror('Unknown error')
                navigate("/profile");
            }
        })
        
    }

    return (
    <main>
        <div >
            <div className="forma"> 
                <div >
                    <div>
                        <img className = "userImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt = "Your profile picture"></img>
                    </div>    

                    <div >
                        <div >
                            <ul role = "tablist">
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
