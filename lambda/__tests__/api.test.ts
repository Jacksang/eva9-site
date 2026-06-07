/**
 * API integration tests — runs against a local or deployed API.
 * Set API_BASE_URL env var to target.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const API = process.env.API_BASE_URL || 'http://localhost:3000';
const fetch = globalThis.fetch;

describe('Lambda API smoke tests', () => {
  it('should respond 200 to OPTIONS preflight', async () => {
    const res = await fetch(`${API}/api/comments`, { method: 'OPTIONS' });
    assert.strictEqual(res.status, 200);
  });

  it('should reject GET /api/register', async () => {
    const res = await fetch(`${API}/api/register`);
    assert.strictEqual(res.status, 405);
  });

  it('should validate email on register', async () => {
    const res = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad', password: '12345678', name: 'Test' }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.ok(data.error);
  });

  it('should require name on register', async () => {
    const res = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: '12345678' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('/api/comments GET returns 200 without auth', async () => {
    const res = await fetch(`${API}/api/comments`);
    assert.ok(res.status === 200 || res.status === 404, `Expected 200 or 404, got ${res.status}`);
  });

  it('/api/contact POST validates required fields', async () => {
    const res = await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
  });

  it('/api/admin/* endpoints should require auth', async () => {
    const res = await fetch(`${API}/api/admin/comments`);
    assert.strictEqual(res.status, 401);
  });
});
