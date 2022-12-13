import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import { ResultPage } from './components/ResultPage';
import { ConfirmEmailPage } from './components/ConfirmEmailPage';
import { Details } from './components/Details';
import { SearchContextProvider } from './components/context/SearchContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
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
          <Route path='/result/:search' element={<Authorized> <ResultPage /></Authorized>} />
          <Route path='/confirm' element={<Authorized> <ConfirmEmailPage /></Authorized>} />
          <Route path='/details' element={<Authorized> <Details /></Authorized>}></Route>
          <Route path='/details/:id' element={<Authorized> <Details /></Authorized>}></Route>
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
