/**
 * Lambda: GET /api/admin/users
 * Admin-only: list all users.
 */
import { scan, table } from '../../shared/db';
import { verifyToken } from '../../shared/auth';
import { apiResponse, getAuthHeader } from '../../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});

  const token = getAuthHeader(event);
  const payload = token ? verifyToken(token, 'admin') : null;
  if (!payload) return apiResponse(401, { error: 'Admin access required' });

  if (event.httpMethod === 'GET') {
    const users = await scan(table('users'));
    // Don't expose password hashes
    const safeUsers = (users as any[]).map(({ passwordHash, verificationCode, ...u }) => u);
    return apiResponse(200, { users: safeUsers.sort((a: any, b: any) => b.createdAt?.localeCompare(a.createdAt)) });
  }

  return apiResponse(405, { error: 'Method not allowed' });
}
