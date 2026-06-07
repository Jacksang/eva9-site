/**
 * API client for blog.eva9.ai Lambda API.
 * Handles auth tokens, base URL, and common headers.
 */

const API_BASE = import.meta.env.PROD ? '/api' : '/api';

function getToken(admin = false): string | null {
  return localStorage.getItem(admin ? 'eva9-admin-token' : 'eva9-user-token');
}

function getUserName(): string | null {
  return localStorage.getItem('eva9-user-name');
}

async function apiFetch(path: string, options: RequestInit = {}, admin = false): Promise<Response> {
  const token = getToken(admin);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

// ─── Auth ───

export async function register(name: string, email: string, password: string) {
  return apiFetch('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email: string, password: string) {
  return apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogin(email: string, password: string) {
  return apiFetch('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ─── Comments ───

export async function getComments(slug?: string) {
  const query = slug ? `?slug=${encodeURIComponent(slug)}` : '';
  return apiFetch(`/comments${query}`);
}

export async function submitComment(postSlug: string, content: string) {
  return apiFetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ postSlug, content }),
  });
}

// ─── Contact ───

export async function submitContact(name: string, email: string, message: string) {
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  });
}

// ─── Admin ───

export async function getAdminComments(status = 'pending') {
  return apiFetch(`/admin/comments?status=${status}`, {}, true);
}

export async function moderateComment(id: string, action: 'approve' | 'reject') {
  return apiFetch('/admin/comments', {
    method: 'PUT',
    body: JSON.stringify({ id, action }),
  }, true);
}

export async function getAdminUsers() {
  return apiFetch('/admin/users', {}, true);
}

export async function getAdminMessages() {
  return apiFetch('/admin/messages', {}, true);
}

export async function markMessageRead(id: string) {
  return apiFetch('/admin/messages', {
    method: 'PUT',
    body: JSON.stringify({ id }),
  }, true);
}

export async function getAdminAnalytics() {
  return apiFetch('/admin/visitors', {}, true);
}

// ─── Analytics ───

export async function logVisit(page: string, referrer = '') {
  return apiFetch('/log-visit', {
    method: 'POST',
    body: JSON.stringify({ page, referrer, userAgent: navigator.userAgent }),
  }).catch(() => {}); // Fire-and-forget
}

// ─── Auth State ───

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  return !!getToken(true);
}

export function getUserDisplayName(): string | null {
  return getUserName();
}

export function logout() {
  localStorage.removeItem('eva9-user-token');
  localStorage.removeItem('eva9-user-name');
}

export function adminLogout() {
  localStorage.removeItem('eva9-admin-token');
}
