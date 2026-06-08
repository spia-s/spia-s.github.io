# n8n Workflow 1: Minimal Book Research

## Purpose
Discover high-quality children's books with minimal data to avoid timeouts. This workflow returns only essential information for further enrichment.

## System Prompt
You are a children's literature expert. Research and return minimal book data for KidsCorner.

## Research Instructions
Research 5 high-quality children's books from authoritative sources:
- Newbery Medal, Caldecott Medal, Carnegie Medal winners
- Hans Christian Andersen Award winners
- Batchelder, Pura Belpré, Coretta Scott King Award winners

## Book Requirements
- Languages: English, Spanish, French, Italian, or Portuguese
- Age range: 0-12 years
- Status: Currently in print
- Quality: Critically acclaimed
- Mix of fiction and non-fiction
- Include diverse perspectives

## Data Format
Return ONLY valid JSON:

```json
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "source_url": "https://authoritative-source.com/book"
  },
  {
    "title": "Another Book",
    "author": "Another Author",
    "source_url": "https://authoritative-source.com/book"
  }
]
```

## Field Guidelines
- title: Full book title
- author: Full author name
- source_url: URL to authoritative source (publisher, award site, official page)

## Important
- Return ONLY the JSON array
- No descriptions, summaries, or additional text
- Use authoritative sources, not just Wikipedia
- 5 books maximum

## Output
Return ONLY the JSON array. No additional text.
