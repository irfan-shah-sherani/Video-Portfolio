import axios from 'axios';

// src/api/client.js
const API_BASE = (import.meta.env.VITE_API_BASE ?? '').trim().replace(/\/+$/, '');

// Builds full URL with optional base
function withBase(path) {
  return API_BASE ? `${API_BASE}${path}` : path;
}

async function request(path, {
  method = 'GET',
  body,
  headers = {},
  signal,
  retries = 0,
  retryDelay = 500
} = {}) {

  const url = withBase(path);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios({
        url,
        method,
        headers,
        data: body, // Axios automatically JSON.stringify() if Content-Type is JSON
        signal,
        withCredentials: true // send cookies
      });

      return res.data; // Axios already parses JSON automatically

    } catch (err) {
      const isLastAttempt = attempt === retries;

      // Axios abort errors also come through here
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        throw err;
      }

      if (isLastAttempt) {
        // Attach status & payload if available
        if (err.response) {
          err.status = err.response.status;
          err.payload = err.response.data;
        }
        throw err;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

export { request, withBase };
