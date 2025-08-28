import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { apiClient } from '../../shared/frontend-base/src/api/apiClient'; // Changed to relative import
import config from '@opalsuite/frontend-base/src/config';

const SocialLoginButtons = () => {

    const handleGoogleLogin = async () => {
        try {
            const response = await apiClient(`${config.backendApi.authService}/oauth/url?provider=google`);
            window.location.href = response.authorization_url;
        } catch (error) {
            console.error('Error getting Google OAuth URL:', error);
        }
    };

    return (
        <Row className="mt-3">
            <Col>
                <Button variant="outline-dark" className="w-100" onClick={handleGoogleLogin}>
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="me-2" />
                    Sign in with Google
                </Button>
            </Col>
        </Row>
    );
};

export default SocialLoginButtons;
