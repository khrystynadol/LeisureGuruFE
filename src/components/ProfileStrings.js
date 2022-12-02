import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';

export const ProfileStrings = function({first_name, second_name, birth_date, email})  {
  return (
    <Table borderless>
      <thead>
        <tr>
          <td>First Name</td>
          <td>{first_name}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Last Name</td>
          <td>{second_name}</td>
        </tr>
        <tr>
          <td>Birth date</td>
          <td>{birth_date}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{email}</td>
        </tr>
      </tbody>
    </Table>
  );
}

//export default ProfileStrings;