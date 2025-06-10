import type { VercelRequest, VercelResponse } from '@vercel/node';
import { searchApi } from '../lib/database/search';

function sortResults(results: any[], sort: string) {
  switch (sort) {
    case 'date':
      return results.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    case 'alpha':
      return results.slice().sort((a, b) => a.title.localeCompare(b.title));
    case 'relevance':
    default:
      return results.slice().sort((a, b) => b.relevance - a.relevance);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const q = (req.query.q as string) || '';
  const type = (req.query.type as string) || '';
  const limit = parseInt((req.query.limit as string) || '20', 10);
  const offset = parseInt((req.query.offset as string) || '0', 10);
  const sort = (req.query.sort as string) || 'relevance';

  if (!q.trim()) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  // Parse entity types
  let entityTypes: string[] = ['organizations', 'users', 'subscriptions', 'documentation'];
  if (type) {
    entityTypes = type.split(',').map((t) => t.trim()).filter(Boolean);
  }

  try {
    const allResults = await searchApi.globalSearch(q, entityTypes);
    const sortedResults = sortResults(allResults, sort);
    // Pagination
    const paginatedResults = sortedResults.slice(offset, offset + limit);
    res.status(200).json({
      results: paginatedResults,
      pagination: {
        limit,
        offset,
        total: allResults.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Search failed' });
  }
} 