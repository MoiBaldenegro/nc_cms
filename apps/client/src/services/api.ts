// src/services/api.ts

const BASE_URL = 'http://localhost:3000';

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // manejo básico de errores
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Error en la petición');
  }

  return res.json();
}