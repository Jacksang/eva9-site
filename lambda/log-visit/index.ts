/**
 * Lambda: POST /api/log-visit
 * Logs a page visit for analytics.
 */
import { put, table } from '../shared/db';
import { sanitize, apiResponse, parseBody } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});
  if (event.httpMethod !== 'POST') return apiResponse(405, { error: 'Method not allowed' });

  const body = parseBody(event);
  const page = sanitize(String(body.page || ''), 500);
  const referrer = sanitize(String(body.referrer || ''), 500);
  const ip = event.requestContext?.http?.sourceIp || 'unknown';

  if (!page) return apiResponse(400, { error: 'Page required' });

  const visit = {
    id: `v${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    page,
    referrer,
    ip,
    userAgent: sanitize(String(event.headers?.['user-agent'] || ''), 500),
    timestamp: new Date().toISOString(),
  };

  await put(table('visits'), visit);
  return apiResponse(201, { ok: true });
}
