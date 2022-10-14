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
import { Protected } from './components/Protected';
import { NotAuthorized } from './components/NotAuthorized';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route path='/' element={<NotAuthorized><Home /></NotAuthorized>} />
        <Route path='/login' element={<NotAuthorized><Login /></NotAuthorized>} />
        <Route path='/registration' element={<NotAuthorized><Registration /></NotAuthorized>} />
        <Route path='/editprofile' element={<Protected><Registration /></Protected>} />
        <Route path='/homepage' element={<Protected> <Main /> </Protected>} />
        <Route path='/profile' element={  <Protected> <Profile /></Protected>}  />
        <Route path='/settings' element={<Protected> <Settings /></Protected>} />
        <Route path='/notifications' element={<Protected> <Notifications /></Protected>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
