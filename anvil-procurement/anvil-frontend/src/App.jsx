import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingPage';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import AuthenticatedLandingPage from './components/dashboard/AuthenticatedLandingPage';
import StoreFront from './components/StoreFront'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/registration" element={<UserRegistration />}></Route >
          <Route path="/login" element={<UserLogin />}></Route >
          <Route path="/welcome/:email" element={<AuthenticatedLandingPage />}></Route>
          <Route path="/store" element={<StoreFront />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;