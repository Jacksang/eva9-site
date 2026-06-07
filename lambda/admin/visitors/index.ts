/**
 * Lambda: GET /api/admin/visitors
 * Admin-only: analytics dashboard data.
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
    const [visits, comments, users, messages] = await Promise.all([
      scan(table('visits')),
      scan(table('comments')),
      scan(table('users')),
      scan(table('messages')),
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayISO = todayStart.toISOString();

    const todayVisits = (visits as any[]).filter((v: any) => v.timestamp >= todayISO);

    // Top pages
    const pageCounts: Record<string, number> = {};
    for (const v of visits as any[]) {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    }
    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }));

    // Recent visitors
    const recentVisitors = (visits as any[])
      .sort((a: any, b: any) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 20)
      .map(({ id, userAgent, ...v }: any) => v);

    return apiResponse(200, {
      stats: {
        pageViews: todayVisits.length,
        uniqueVisitors: new Set(todayVisits.map((v: any) => v.ip)).size,
        totalComments: (comments as any[]).length,
        totalUsers: (users as any[]).length,
        totalMessages: (messages as any[]).length,
      },
      topPages,
      recentVisitors,
    });
  }

  return apiResponse(405, { error: 'Method not allowed' });
}
