import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
import { Forgot } from './Forgot';
import { Sent } from './Sent';
import { Home } from './Home';
import { Calculator } from './Calculator';
import { Account } from './Account';
import { Verify } from './Verify';
import React from "react";
import { Getverified } from './Getverified';
import { Main } from './main';

function App() {
  const h = new Main();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<Forgot />} />
          <Route path="/email_sent" element={<Sent />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/gpa' element={<Calculator/>}/>
          <Route path='/account' element={<Account/>} />
          <Route path='/verify/:id/:key/:expires/:signiture' element={<Verify />} />
          <Route path='/get_verify' element={<Getverified />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;