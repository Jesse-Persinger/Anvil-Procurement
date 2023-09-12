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
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing features and content.</p>
      </header>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature">
          <h3>Feature 1</h3>
          <p>Description of Feature 1.</p>
        </div>
        <div className="feature">
          <h3>Feature 2</h3>
          <p>Description of Feature 2.</p>
        </div>
        {/* Add more features as needed */}
      </section>

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