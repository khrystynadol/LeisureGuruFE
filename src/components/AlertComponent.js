import {React, useState} from 'react';
import { Alert, Button } from 'reactstrap';

export const AlertComponent = function({authorized}) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen)

  }
  return (
    <div>
      <Alert color="primary" style={{position: 'fixed', right: 0, width:"240px"}} isOpen={isOpen}>
        
        {
            authorized ?
            <p>  
                Try our premium subscribtion for free for first 3 month
            </p>
            :
            <p>
                Create or sign in account
            </p>
          
        }
        
        <hr />
        { authorized ?
        <>
            <p className="mb-0">
                With the subscribtion you can forget about annoying ads 
                and create your personal calendar to plan your vacations and many more
                other functions. Enjoy!
            </p>
            <hr />
            
        </>
            :
            <p className="mb-0">
                So you can search for places using different filters and tags, 
                as well as getting detailed information about sertain places and many other features.  
                Go explore all the functions on LeisureGuru!!!
            </p>
            
        }
        <div className="d-flex justify-content-end">
          <Button onClick={toggle} color="primary">
            Got it!
          </Button>
        </div>
      </Alert>
     
    </div>
  );
};
