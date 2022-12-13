import {React, useState} from 'react';
import { Alert } from 'reactstrap';

export const AlertComponent = function({authorized}) {
  return (
    <div>
      <Alert color="primary" style={{width:"300px"}}>
        
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
            <p className="mb-0">
                With the subscribtion you can forget about annoying ads 
                and create your personal calendar to plan your vacations and many more
            </p>
            :
            <p className="mb-0">
                So you can search for places using different filters and tags, 
                as well as getting detailed information about sertain places and many other features.  
                Go explore all the functions on LeisureGuru!!!
            </p>
        }
        
      </Alert>
    </div>
  );
};
