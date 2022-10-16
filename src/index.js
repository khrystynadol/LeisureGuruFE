import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Main } from './components/Main';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { NavigationBar } from './components/NavigationBar';
import {Notifications} from './components/Notifications';
import { Authorized } from './components/Authorized';
import { NotAuthorized } from './components/NotAuthorized';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route path='/' element={<NotAuthorized><Home /></NotAuthorized>} />
        <Route path='/login' element={<NotAuthorized><Login /></NotAuthorized>} />
        <Route path='/registration' element={<NotAuthorized><Registration formType="registration" /></NotAuthorized>} />
        <Route path='/editprofile' element={<Authorized><Registration formType="editprofile" /></Authorized>} />
        <Route path='/homepage' element={<Authorized> <Main /> </Authorized>} />
        <Route path='/profile' element={  <Authorized> <Profile /></Authorized>}  />
        <Route path='/settings' element={<Authorized> <Settings /></Authorized>} />
        <Route path='/notifications' element={<Authorized> <Notifications /></Authorized>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
