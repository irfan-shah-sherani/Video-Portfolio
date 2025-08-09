const API_BASE = (import.meta.env.VITE_API_BASE ?? '').trim();

// If API_BASE is empty, use same-origin requests (Vite proxy handles /api -> backend in dev)
function withBase(path) {
  const base = (API_BASE || '').replace(/\/+$/, '');
  if (!base) return path; // same-origin
  return `${base}${path}`;
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(withBase(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    const errPayload = isJson ? await res.json().catch(() => ({})) : { error: await res.text().catch(() => 'Request failed') };
    const error = new Error(errPayload.error || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.payload = errPayload;
    throw error;
  }

  return isJson ? res.json() : res.text();
}

export const api = {
  // Auth
  signup: (data) => request('/api/auth/signup', { method: 'POST', body: data }),
  login: (data) => request('/api/auth/login', { method: 'POST', body: data }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request('/api/auth/me'),
  resendVerification: (data) => request('/api/auth/resend-verification', { method: 'POST', body: data }),

  // Videos
  listVideos: ({ all } = {}) => request(`/api/videos${all ? '?all=true' : ''}`),
  presignUpload: (data) => request('/api/videos/presign', { method: 'POST', body: data }),
  finalizeUpload: (data) => request('/api/videos/finalize', { method: 'POST', body: data }),
  getVideo: (id) => request(`/api/videos/${id}`),
  updateVideo: (id, data) => request(`/api/videos/${id}`, { method: 'PUT', body: data }),
  deleteVideo: (id) => request(`/api/videos/${id}`, { method: 'DELETE' }),
};

export function getOAuthUrl(provider) {
  const base = (API_BASE || '').replace(/\/+$/, '');
  if (!base) return `/api/auth/${provider}`;
  return `${base}/api/auth/${provider}`;
}