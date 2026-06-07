/**
 * Lambda: GET/POST /api/comments
 * GET — List approved comments for a blog post
 * POST — Submit a comment (requires auth)
 */
import { put, scan, table } from '../shared/db';
import { verifyToken } from '../shared/auth';
import { sanitize, apiResponse, parseBody, getAuthHeader } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});

  if (event.httpMethod === 'GET') {
    const postSlug = event.queryStringParameters?.slug || '';
    const comments = await scan(table('comments'), postSlug ? { postSlug, status: 'approved' } : { status: 'approved' });
    return apiResponse(200, { comments });
  }

  if (event.httpMethod === 'POST') {
    const token = getAuthHeader(event);
    const payload = token ? verifyToken(token) : null;
    if (!payload) return apiResponse(401, { error: 'Login required to comment' });

    const body = parseBody(event);
    const content = sanitize(String(body.content || ''), 5000);
    const postSlug = sanitize(String(body.postSlug || ''), 200);

    if (content.length < 3) return apiResponse(400, { error: 'Comment too short (min 3 characters)' });
    if (!postSlug) return apiResponse(400, { error: 'Post slug required' });

    const comment = {
      id: `c${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      postSlug,
      authorEmail: payload.email,
      authorName: payload.email.split('@')[0],
      content,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await put(table('comments'), comment);
    return apiResponse(201, { message: 'Comment submitted for review', comment });
  }

  return apiResponse(405, { error: 'Method not allowed' });
}
