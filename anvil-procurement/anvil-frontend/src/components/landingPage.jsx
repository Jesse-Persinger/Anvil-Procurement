import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the user registration page
    navigate('/registration');
  };

  const handleSignInClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Anvil Procurement</h1>
        <p>Make getting stuff easier because your bosses are cheap</p>
      </header>

      <section className="cta">
        <h2>Join Us Today</h2>
        <p>Sign up now to get started.</p>
        <button className="cta-button" onClick={handleSignUpClick}>
          Sign Up
        </button>
        <p>Already have an account?</p>
        <button className="cta-button" onClick={handleSignInClick}>
          Sign In
        </button>
      </section>
    </div>
  );
};

export default LandingPage;