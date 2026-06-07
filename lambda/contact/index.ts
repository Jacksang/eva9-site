/**
 * Lambda: POST /api/contact
 * Submits a contact form message.
 */
import { put, table } from '../shared/db';
import { isValidEmail, sanitize, apiResponse, parseBody } from '../shared/validation';

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return apiResponse(200, {});
  if (event.httpMethod !== 'POST') return apiResponse(405, { error: 'Method not allowed' });

  const body = parseBody(event);
  const name = sanitize(String(body.name || ''), 100);
  const email = sanitize(String(body.email || ''), 255).toLowerCase();
  const message = sanitize(String(body.message || ''), 5000);

  if (!name) return apiResponse(400, { error: 'Name required' });
  if (!isValidEmail(email)) return apiResponse(400, { error: 'Invalid email' });
  if (message.length < 10) return apiResponse(400, { error: 'Message too short' });

  const msg = {
    id: `m${Date.now()}`,
    name,
    email,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  await put(table('messages'), msg);
  return apiResponse(200, { message: 'Message sent successfully' });
}
