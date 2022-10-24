import React from 'react'
import { useState } from "react";
import {
    Button,
    Confirm
} from 'react-admin';
 
const DeleteConfirmation = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = (e) => {
        setOpen(false);
        e.stopPropagation();
           if(window.confirm('Are sure want to delete?')) {
                fetch('http://127.0.0.1:5000/user/' + id, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    if (response.status >= 200 && response.status <= 299) {
                        alert('We now don`t have any information about you');
                        localStorage.clear();
                        setServerEror('')
                        navigate("/");
                        alert('We now don`t have any information about you');
                        localStorage.clear();
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
           } else {
                navigate("/profile");
           }
    };

    return (
        <>
            <Button label="Delete account" onClick={handleClick} />
            <Confirm
                isOpen={open}
                title="Delete my account"
                content="Are you sure you want to delete your account on LeisureGuru?"
                onConfirm={(e) => handleConfirm(e)}
                onClose={handleDialogClose}
            />
        </>
    );
}
 
export default DeleteConfirmation;