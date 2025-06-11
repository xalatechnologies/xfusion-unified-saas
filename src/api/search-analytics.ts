import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch the last 1000 search analytics rows
    const { data, error } = await supabase
      .from('search_analytics')
      .select('search_query')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Aggregate popular queries in-memory
    const counts: Record<string, number> = {};
    for (const row of (data || []) as Database['public']['Tables']['search_analytics']['Row'][]) {
      if (!row.search_query) continue;
      counts[row.search_query] = (counts[row.search_query] || 0) + 1;
    }
    const popularQueries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    res.status(200).json({ popularQueries });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      res.status(500).json({ error: (error as { message?: string }).message || 'Failed to fetch analytics' });
    } else {
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  }
} 