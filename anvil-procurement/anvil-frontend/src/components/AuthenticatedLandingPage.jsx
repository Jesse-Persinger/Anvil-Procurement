import React from 'react';

const AuthenticatedLandingPage = ({ username }) => {
    return (
        <div>
            <h1>Welcome, {username}!</h1>
            {/* Add content specific to authenticated users */}
        </div>
    );
};

export default AuthenticatedLandingPage;