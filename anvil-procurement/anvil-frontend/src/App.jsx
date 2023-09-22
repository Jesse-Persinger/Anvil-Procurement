import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import AuthenticatedLandingPage from './components/dashboard/AuthenticatedLandingPage';
import StoreFront from './components/StoreFront'
import VendorItems from './components/VendorItems'
import React, { useState } from 'react';
import AppBarSearch from './components/AppBarSearch'

function App() {

  const [items, setItems] = useState([]); // State for items

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/registration" element={<UserRegistration />}></Route >
          <Route path="/login" element={<UserLogin />}></Route >
          <Route path="/welcome/:email" element={<AuthenticatedLandingPage />}></Route>
          <Route path="/store" element={<StoreFront />}></Route>
          <Route path="/vendor/:vendorId/:vendorName" element={<VendorItems items={items} setItems={setItems} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;