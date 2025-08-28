import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiClient } from '../../shared/frontend-base/src/api/apiClient'; // Changed to relative import
import config from '@opalsuite/frontend-base/src/config';
import { jwtDecode } from 'jwt-decode';

const OAuthCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (code) {
            const loginWithGoogle = async () => {
                try {
                    const data = await apiClient(`${config.backendApi.authService}/oauth/callback/google?code=${code}`, { method: 'POST' });

                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);

                    try {
                        const decodedToken = jwtDecode(data.access_token);
                        if (decodedToken.roles) {
                            localStorage.setItem('user_roles', decodedToken.roles);
                        }
                    } catch (decodeError) {
                        console.error("Failed to decode JWT token:", decodeError);
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        localStorage.removeItem('user_roles');
                    }

                    navigate('/portal');
                } catch (err) {
                    setError(err.message);
                }
            };

            loginWithGoogle();
        } else {
            setError('No authorization code found.');
        }
    }, [location, navigate]);

    return (
        <div>
            {error ? (
                <div>
                    <h2>Authentication Failed</h2>
                    <p>{error}</p>
                </div>
            ) : (
                <p>Authenticating...</p>
            )}
        </div>
    );
};

export default OAuthCallbackPage;
