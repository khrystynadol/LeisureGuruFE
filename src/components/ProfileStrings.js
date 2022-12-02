import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';

export const ProfileStrings = function({first_name, second_name, birth_date, email})  {
  return (
    <Table borderless>
      <thead>
        <tr>
          <td>First Name</td>
          <td>Dima</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Last Name</td>
          <td>Rabotiahov</td>
        </tr>
        <tr>
          <td>Birth date</td>
          <td>28.08.2004</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>mail@gmail.com</td>
        </tr>
      </tbody>
    </Table>
  );
}

//export default ProfileStrings;