/**
 * Lambda: POST /api/login
 * Authenticates a user and returns a JWT.
 */
import { query, table } from '../shared/db';
import { signToken, verifyPassword } from '../shared/auth';
import { isValidEmail, apiResponse, parseBody } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});
  if (event.httpMethod !== 'POST') return apiResponse(405, { error: 'Method not allowed' });

  const body = parseBody(event);
  const email = String(body.email || '').toLowerCase().trim();
  const password = String(body.password || '');

  if (!isValidEmail(email)) return apiResponse(400, { error: 'Invalid email' });
  if (!password) return apiResponse(400, { error: 'Password required' });

  const users = await query(table('users'), { email }, 'email-index');
  const user = users[0] as any;

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return apiResponse(401, { error: 'Invalid credentials' });
  }

  const token = signToken({
    email: user.email,
    role: user.role || 'user',
    sub: user.email,
  });

  return apiResponse(200, {
    token,
    name: user.name,
    email: user.email,
  });
}
