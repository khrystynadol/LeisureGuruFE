import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';

export const ProfileStrings = function({profData})  {
  return (
    <Table borderless>
      <thead>
        <tr>
          <td>First Name</td>
          <td>{profData.first_name}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Last Name</td>
          <td>{profData.last_name}</td>
        </tr>
        <tr>
          <td>Birth date</td>
          <td>{profData.birth_date}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{profData.email}</td>
        </tr>
        <tr>
          <td>Verification</td>
          <td>{profData.verification ? "Complete" : "Not yet"}</td>
        </tr>
      </tbody>
    </Table>
  );
}

//export default ProfileStrings;