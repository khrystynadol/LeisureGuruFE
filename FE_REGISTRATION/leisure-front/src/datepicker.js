import React, { useState } from "react";

function PickDate(){
    const [date, setDate] = useState('')
    return(
        <>
        <h1>Selected date: {date}</h1>
        <input type = 'date' onChange = {e=>setDate(e.target.value)}/>
        </>
    )
}

export default PickDate;