import React from 'react';
import { useParams } from 'react-router-dom';

const AuthenticatedLandingPage = () => {
    const { email } = useParams();

    return (
        <div>
            <h1>Welcome, {email}!</h1>
            {/* Add content specific to authenticated users */}
        </div>
    );
};

export default AuthenticatedLandingPage;