/**
 * Lambda: POST /api/register
 * Registers a new user account.
 */
import { put, get, table, query } from '../shared/db';
import { hashPassword, generateVerificationCode } from '../shared/auth';
import { isValidEmail, isValidPassword, sanitize, apiResponse, parseBody } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});
  if (event.httpMethod !== 'POST') return apiResponse(405, { error: 'Method not allowed' });

  const body = parseBody(event);
  const email = sanitize(String(body.email || ''), 255).toLowerCase();
  const password = String(body.password || '');
  const name = sanitize(String(body.name || ''), 100);

  if (!isValidEmail(email)) return apiResponse(400, { error: 'Invalid email' });
  if (!isValidPassword(password)) return apiResponse(400, { error: 'Password must be at least 8 characters' });
  if (!name) return apiResponse(400, { error: 'Name is required' });

  // Check for existing user
  const existing = await query(table('users'), { email }, 'email-index');
  if (existing.length > 0) {
    return apiResponse(409, { error: 'Email already registered' });
  }

  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();
  const verificationCode = generateVerificationCode();

  const user = {
    email,
    name,
    passwordHash,
    role: 'user',
    verified: false,
    verificationCode,
    createdAt: now,
    updatedAt: now,
  };

  await put(table('users'), user);

  return apiResponse(201, {
    message: 'Account created. Verification code sent.',
  });
}
