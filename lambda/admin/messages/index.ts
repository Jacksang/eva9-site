/**
 * Lambda: GET/PUT /api/admin/messages
 * Admin-only: list and manage contact messages.
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
    const messages = await scan(table('messages'));
    return apiResponse(200, { messages: (messages as any[]).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  }

  if (event.httpMethod === 'PUT') {
    const body = parseBody(event);
    const { id } = body;
    if (!id) return apiResponse(400, { error: 'id required' });
    await update(table('messages'), { id }, { read: true });
    return apiResponse(200, { message: 'Marked as read' });
  }

  return apiResponse(405, { error: 'Method not allowed' });
}
