# Search Scope and Requirements

## Searchable Entities and Fields

- **Users**: email, profile data
- **Organizations**: name, contact_email, address, website
- **Documentation**: title, content, category, tags
- **Billing Information**: organization name, invoice numbers
- **Subscriptions**: plan_name, organization name
- **Global Translations**: translation_key, value, language
- **Global Theme Settings**: name, theme_config properties

## Search Result Display Format
- **title**: Main display title (e.g., organization name, user email)
- **subtitle**: Secondary info (e.g., user role, organization address)
- **type**: Entity type (user, organization, etc.)
- **link**: URL to entity detail page

## Search API Response Structure
```json
{
  "results": [
    {
      "entity_type": "string",
      "entity_id": "string",
      "title": "string",
      "subtitle": "string",
      "url": "string",
      "relevance": 0.0,
      "created_at": "ISO8601 string"
    }
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 100
  }
}
```

## Search Relevance Scoring Requirements
- Use PostgreSQL full-text search ranking (e.g., `ts_rank`, `similarity` with `pg_trgm`)
- Results should be ordered by relevance descending
- Optionally boost certain fields (e.g., title matches > content matches)

## Wireframes
- [TODO: Insert Figma link or screenshots here] 