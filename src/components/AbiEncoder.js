// components/AbiEncoder.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const AbiEncoder = () => {
  const [abi, setAbi] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [parameters, setParameters] = useState('');
  const [providerUrl, setProviderUrl] = useState('');
  const [encodedData, setEncodedData] = useState('');
  const [error, setError] = useState('');

  // Define the provider URLs in an environment file or directly in code for simplicity
  const providerOptions = {
    'Polygon Mainnet': process.env.REACT_APP_POLYGON_MAINNET_URL || 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    'Base Mainnet': process.env.REACT_APP_BASE_MAINNET_URL || 'https://base-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    'Polygon Amoy Testnet': process.env.REACT_APP_POLYGON_AMOY_TESTNET_URL || 'https://polygon-amoy-testnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
  };

  const handleEncodeData = async () => {
    try {
      if (!abi || !contractAddress || !functionName || !providerUrl) {
        setError('Please fill in all required fields.');
        return;
      }

      const abiArray = JSON.parse(abi);
      const provider = new ethers.JsonRpcProvider(providerUrl);
      const contract = new ethers.Contract(contractAddress, abiArray, provider);

      // Parse the comma-separated parameters into an array
      let paramsArray = [];
      if (parameters) {
        paramsArray = parameters.split(',').map((param) => param.trim());
      }

      // Encode the function call data
      const data = contract.interface.encodeFunctionData(functionName, paramsArray);
      setEncodedData(data);
      setError('');
      console.log('Encoded Data:', data);
    } catch (err) {
      console.error('Encoding Error:', err);
      setError(`An error occurred while encoding the data: ${err.message}`);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>ABI Encoder with Provider Selection</h2>
      <Link to="/">
        <button style={buttonStyle}>Go Back to Home</button>
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
      <textarea
        placeholder="Enter ABI JSON"
        value={abi}
        onChange={(e) => setAbi(e.target.value)}
        style={{ ...inputStyle, height: '100px' }}
      />
      <input
        type="text"
        placeholder="Enter Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Enter Function Name"
        value={functionName}
        onChange={(e) => setFunctionName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Enter Parameters (comma-separated)"
        value={parameters}
        onChange={(e) => setParameters(e.target.value)}
        style={inputStyle}
      />
      <select
        value={providerUrl}
        onChange={(e) => setProviderUrl(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Provider URL</option>
        {Object.entries(providerOptions).map(([name, url]) => (
          <option key={name} value={url}>
            {name}
          </option>
        ))}
      </select>
      <button style={buttonStyle} onClick={handleEncodeData}>
        Encode Data
      </button>
      {encodedData && (
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              marginTop: '10px',
              wordBreak: 'break-all',
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <strong>Encoded Data (Check Console):</strong> {encodedData}
          </div>
        </div>
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

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontFamily: 'monospace',
};

export default AbiEncoder;
