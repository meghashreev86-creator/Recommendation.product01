const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const API_URL = import.meta.env.VITE_API_URL || `http://${runtimeHost}:5000/api`;

export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const shouldAttachAuth = options.attachAuth ?? !path.startsWith('/auth/');
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (shouldAttachAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });
  } catch {
    throw new Error('Could not reach backend server. Make sure backend is running.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 0) throw new Error('Could not reach backend server');
    throw new Error(data.message || 'Request failed');
  }
  return data;
}
