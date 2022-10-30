import React, { useState, useEffect } from "react";
import "./filter.css";

export const  Filter = function ({ children, onApply, label }) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(undefined);
  const buttonRef = useRef(undefined);
  const modalRef = useRef(undefined);

  useEffect(() => {
    const handleClickOutside = event => {
    const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(event.target);
    const isButtonClick = buttonRef.current && buttonRef.current.contains(event.target);
    const isModalClick = modalRef.current && modalRef.current.contains(event.target);
  
    if (isDropdownClick || isButtonClick || isModalClick) {
      /* If the ref is not defined or the user clicked on the menu, we don’t do anything. */
      return;
    }
  
    /* Otherwise we close the menu. */    setIsOpen(false);
    };
  
    document.addEventListener("mousedown", handleClickOutside); /* handle desktops */
    document.addEventListener("touchstart", handleClickOutside); /* handle touch devices */
  
    /* Event cleanup */
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); /* handle desktops */
      document.removeEventListener("touchstart", handleClickOutside); /* handle touch devices */
    };}, [dropdownRef, buttonRef, modalRef]);

const handleApply = () =>  {
    setIsOpen(false);
};



  return (
    <div>
    <div classname="filter"></div>
    <button  ref={buttonRef}
      onClick={() => setIsOpen(!isOpen)} className="filter__button">Technologies</button>
      
      {/* {isOpen && (
      <div ref="{dropdownRef}" classname="filter__dropdown"></div>
      {children}
          <div classname="filter__dropdown__actions"></div>
‍
        <button onclick="{handleApply}" classname="filter__dropdown_button">Apply</button>
‍       )} */}
          
    </div>
    
  );
   
}