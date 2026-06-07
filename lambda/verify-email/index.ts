/**
 * Lambda: GET /api/verify-email
 * Verifies a user's email with a verification code.
 */
import { query, update, table } from '../shared/db';
import { apiResponse } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});

  const email = String(event.queryStringParameters?.email || '').toLowerCase().trim();
  const code = String(event.queryStringParameters?.code || '').toUpperCase().trim();

  if (!email || !code) return apiResponse(400, { error: 'email and code required' });

  const users = await query(table('users'), { email }, 'email-index');
  const user = users[0] as any;

  if (!user) return apiResponse(404, { error: 'User not found' });
  if (user.verified) return apiResponse(200, { message: 'Email already verified' });
  if (user.verificationCode !== code) return apiResponse(400, { error: 'Invalid verification code' });

  await update(table('users'), { email }, { verified: true, verificationCode: null, updatedAt: new Date().toISOString() });

  return apiResponse(200, { message: 'Email verified successfully' });
}
