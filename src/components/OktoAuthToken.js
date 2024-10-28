// components/OktoAuthToken.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OktoAuthToken = () => {
  const [appSecret, setAppSecret] = useState('');
  const [googleIdToken, setGoogleIdToken] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [error, setError] = useState('');

  const handleGetOktoToken = async () => {
    if (!appSecret || !googleIdToken) {
      setError('Please enter both Okto App Secret and Google ID Token.');
      return;
    }

    try {
      const response = await fetch('https://sandbox-api.okto.tech/api/v2/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': appSecret,
        },
        body: JSON.stringify({
          id_token: googleIdToken,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAuthToken(data.data.auth_token);
        setError('');
      } else {
        setError(data.message || 'Failed to get Okto token');
      }
    } catch (err) {
      setError('An error occurred while fetching the Okto token');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(authToken);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>Okto Auth Token Page</h2>
      <Link to="/">
        <button style={buttonStyle}>Back to Home</button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        {error && (
          <div
            style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '10px',
            }}
          >
            {error}
          </div>
        )}
        <input
          type="password"
          placeholder="Enter Okto App Secret"
          value={appSecret}
          onChange={(e) => setAppSecret(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter Google ID Token"
          value={googleIdToken}
          onChange={(e) => setGoogleIdToken(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleGetOktoToken}>
          Get Okto Auth Token
        </button>
        {authToken && (
          <div style={{ marginTop: '20px' }}>
            <button style={buttonStyle} onClick={copyToClipboard}>
              Copy Okto Auth Token to Clipboard
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
              {authToken}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default OktoAuthToken;
