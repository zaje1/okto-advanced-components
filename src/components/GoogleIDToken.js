// components/GoogleIDToken.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GoogleIDToken = () => {
  const [idToken, setIdToken] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '891275458673-dfga9slg2jv00mird5ojjq3a8tb5sgd6.apps.googleusercontent.com', // Replace with your actual client ID
          callback: handleCredentialResponse,
        });
      }
    };

    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = (response) => {
    if (response.credential) {
      setIdToken(response.credential);
      setIsSignedIn(true);
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(idToken);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>Google ID Token Page</h2>
      <Link to="/">
        <button style={buttonStyle}>Back to Home</button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        {!isSignedIn ? (
          <button style={buttonStyle} onClick={handleGoogleLogin}>
            Login to Google Account
          </button>
        ) : (
          <>
            <button style={buttonStyle} onClick={copyToClipboard}>
              Copy Google ID Token to Clipboard
            </button>
            <div
              style={{
                marginTop: '10px',
                wordBreak: 'break-all',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
              }}
            >
              {idToken}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default GoogleIDToken;
