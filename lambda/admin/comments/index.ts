/**
 * Lambda: GET/PUT /api/admin/comments
 * Admin-only: list pending comments, approve/reject.
 */
import { scan, update, table } from '../../shared/db';
import { verifyToken } from '../../shared/auth';
import { apiResponse, parseBody, getAuthHeader } from '../../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});

  const token = getAuthHeader(event);
  const payload = token ? verifyToken(token, 'admin') : null;
  if (!payload) return apiResponse(401, { error: 'Admin access required' });

  if (event.httpMethod === 'GET') {
    const status = event.queryStringParameters?.status || 'pending';
    const comments = await scan(table('comments'), status !== 'all' ? { status } : undefined);
    return apiResponse(200, { comments: comments.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt)) });
  }

  if (event.httpMethod === 'PUT') {
    const body = parseBody(event);
    const { id, action } = body;
    if (!id || !['approve', 'reject'].includes(action as string)) {
      return apiResponse(400, { error: 'id and action (approve|reject) required' });
    }
    await update(table('comments'), { id }, { status: action === 'approve' ? 'approved' : 'rejected', moderatedAt: new Date().toISOString() });
    return apiResponse(200, { message: `Comment ${action}d` });
  }

  return apiResponse(405, { error: 'Method not allowed' });
}
