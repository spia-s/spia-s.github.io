# n8n Workflow 3: Full Content Enrichment

## Purpose
Generate comprehensive KidsCorner content for a single book. This runs per book after cover is uploaded.

## System Prompt
You are a children's literature expert. Generate detailed content matching the KidsCorner database schema.

## Input
You will receive:
- title: Book title
- author: Author name
- cover_url: URL to uploaded cover image

## Task
Generate all required fields for the KidsCorner database schema for this single book.

## Data Format
Return ONLY valid JSON:

```json
{
  "book": {
    "slug": "url-friendly-title",
    "title": "Book Title",
    "illustrator": "Illustrator (if any)",
    "original_language": "en",
    "first_published": 1943,
    "age_min": 7,
    "age_max": 12,
    "age_label": "7-12",
    "reading_type": "fiction",
    "primary_category": "adventure",
    "cover_url": "https://...",
    "kc_rating": 5.0,
    "is_spia_spotlight": true,
    "short_summary": "1-2 sentence summary",
    "full_summary": "2-3 paragraph summary",
    "why_read": "Why read this",
    "why_it_matters": "Significance",
    "educational_value": "Educational benefits",
    "review_what_readers_like": ["aspect1", "aspect2"],
    "review_criticisms": ["criticism1"],
    "review_consensus": "Critical consensus",
    "awards": ["Award1"],
    "themes": ["theme1", "theme2", "theme3"],
    "developmental_benefits": {
      "critical_thinking": "brief",
      "curiosity": "brief",
      "creativity": "brief",
      "empathy": "brief",
      "cultural_awareness": "brief"
    },
    "kc_assessment": {
      "critical_thinking": 5,
      "curiosity": 5,
      "creativity": 5,
      "empathy": 5,
      "cultural_awareness": 4,
      "explanation": "brief explanation"
    },
    "who_its_for": {
      "enjoys": ["interest1"],
      "suitable_for": ["context1"]
    },
    "languages_available": ["English"],
    "formats": ["Hardcover"],
    "pages": 96,
    "series": null,
    "filters": {
      "language": "en",
      "age": "7-12",
      "style": "illustrated",
      "genre": "fantasy"
    }
  },
  "author": {
    "slug": "author-slug",
    "name": "Author Name",
    "biography": "Brief bio",
    "major_works": ["Work1", "Work2"]
  }
}
```

## Field Guidelines

**Essential fields:** slug, title, original_language, age_min, age_max, age_label, reading_type, primary_category, short_summary, themes

**Optional fields (use null if unknown):** illustrator, first_published, subcategory, series, pages

**Categories:** adventure, fantasy, contemporary, history, fairy-tales, poetry, science, nature, family, friendship, biography, art, music

**Reading types:** fiction, non-fiction

**Languages:** English, Spanish, French, Italian, Portuguese

**Important:** Do not invent data. Use null or empty arrays for unknown information. Only include verifiable facts.

## Output
Return ONLY the JSON object. No additional text.
