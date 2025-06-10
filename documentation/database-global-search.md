# Global Search Database Function Documentation

## Overview
The `global_search` function provides a unified, full-text search across multiple entities (organizations, users, subscriptions, documentation) in the XFusion platform. It aggregates results from entity-specific search functions and returns a standardized result set for the frontend.

## Sub-functions
- `search_organizations(search_query text)`
- `search_users(search_query text)`
- `search_subscriptions(search_query text)`
- `search_documentation(search_query text)`

Each sub-function uses PostgreSQL full-text search (`ts_rank`, `plainto_tsquery`) and returns relevant fields and a `relevance` score.

## global_search Function Signature
```sql
CREATE OR REPLACE FUNCTION public.global_search(
  search_query text,
  entity_types text[] DEFAULT ARRAY['organizations', 'users', 'subscriptions', 'documentation']
)
RETURNS TABLE (
  entity_type text,
  entity_id uuid,
  title text,
  subtitle text,
  url text,
  relevance real,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
...
```

## Result Format
- `entity_type`: The type of entity (organization, user, subscription, documentation)
- `entity_id`: The unique ID of the entity
- `title`: Main display field (e.g., name, email, plan name, doc title)
- `subtitle`: Secondary info (e.g., contact email, status, category)
- `url`: Link to the entity detail page
- `relevance`: Search ranking score
- `created_at`: Entity creation date

## Security & Multi-Tenancy
- The function is marked as `SECURITY DEFINER` for safe access.
- **RLS (Row Level Security)** is enabled for analytics, and documentation search only returns published docs.
- **Recommendation:**
  - If your platform is multi-tenant, consider adding tenant/user filtering to the organization, user, and subscription search functions to ensure users only see results from their own organization/tenant.

## Indexing & Performance
- GIN indexes are created for all relevant text fields.
- Each sub-function limits results to 50; the global function limits to 100.
- Regularly analyze and vacuum indexes for optimal performance.

## Test Plan
- Test with various query types (exact, partial, typo, multi-word).
- Test filtering by entity type.
- Test with different user roles and tenants (if multi-tenant).
- Test performance with large datasets.

## Example Usage
```sql
SELECT * FROM public.global_search('acme', ARRAY['organizations', 'users']);
```

---
For more details, see the migration file: `supabase/migrations/20250610114229-...sql`. 