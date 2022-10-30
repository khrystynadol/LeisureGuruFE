import React from 'react'
import { useState } from "react";
 
function DeleteConfirmation({message, onDialog}){

    return (
        <div className = "deleteWindow">
            <div className = "deleteDialog">
                <h3>{message}</h3>
                <div className = "dialog">
                    <button onClick={()=>onDialog(true)} classname = "dialogButtonYes">Yes</button>
                    <button onClick={()=>onDialog(false)} className='dialogButtonNo'>No</button>
                </div>
            </div>
        </div>
    );
}
 
export default DeleteConfirmation;