
import { supabase } from "@/integrations/supabase/client";

export interface SearchResult {
  entity_type: string;
  entity_id: string;
  title: string;
  subtitle: string;
  url: string;
  relevance: number;
  created_at: string;
}

export interface SearchAnalytics {
  id: string;
  user_id: string;
  search_query: string;
  entity_types: string[];
  results_count: number;
  clicked_result_id?: string;
  clicked_result_type?: string;
  search_duration_ms?: number;
  created_at: string;
}

export const searchApi = {
  async globalSearch(
    query: string, 
    entityTypes: string[] = ['organizations', 'users', 'subscriptions', 'documentation']
  ): Promise<SearchResult[]> {
    const startTime = Date.now();
    
    const { data, error } = await supabase.rpc('global_search', {
      search_query: query,
      entity_types: entityTypes
    });

    if (error) {
      console.error('Search error:', error);
      throw error;
    }

    const searchDuration = Date.now() - startTime;
    
    // Log search analytics
    await this.logSearchAnalytics(query, entityTypes, data?.length || 0, searchDuration);

    return data || [];
  },

  async logSearchAnalytics(
    query: string,
    entityTypes: string[],
    resultsCount: number,
    durationMs: number
  ): Promise<string | null> {
    try {
      const { data, error } = await supabase.rpc('log_search_analytics', {
        search_query_param: query,
        entity_types_param: entityTypes,
        results_count_param: resultsCount,
        search_duration_ms_param: durationMs
      });

      if (error) {
        console.error('Error logging search analytics:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error logging search analytics:', error);
      return null;
    }
  },

  async logSearchClick(
    analyticsId: string,
    clickedResultId: string,
    clickedResultType: string
  ): Promise<void> {
    try {
      const { error } = await supabase.rpc('log_search_click', {
        analytics_id_param: analyticsId,
        clicked_result_id_param: clickedResultId,
        clicked_result_type_param: clickedResultType
      });

      if (error) {
        console.error('Error logging search click:', error);
      }
    } catch (error) {
      console.error('Error logging search click:', error);
    }
  },

  async getSearchAnalytics(): Promise<SearchAnalytics[]> {
    const { data, error } = await supabase
      .from('search_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching search analytics:', error);
      throw error;
    }

    return data || [];
  }
};
