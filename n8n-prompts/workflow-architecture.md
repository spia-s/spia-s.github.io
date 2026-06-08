# n8n Workflow Architecture for KidsCorner Book Research

## Overview
Split book research into three separate workflows to avoid timeout errors and improve data quality.

## Problem Solved
- Single large AI requests exceed 120-second timeout
- Cover images not found in bulk research
- Better data quality through targeted enrichment

## Workflow 1: Minimal Research

**Purpose:** Discover high-quality books with minimal data

**Input:** Manual trigger

**Process:**
1. Manual Trigger
2. AI Node (workflow-1-research-minimal.md)
   - Returns 5 books with: title, author, source_url
   - Output: ~200 tokens (fast, no timeout)
3. Split Out Items
   - Splits array into individual book items

**Output:** 5 individual book items with minimal data

---

## Workflow 2: Cover Image Search

**Purpose:** Find and upload cover images per book

**Input:** Individual book from Workflow 1

**Process (per book):**
1. AI Node (workflow-2-cover-search.md)
   - Input: title, author
   - Returns: cover_url
   - Output: ~50 tokens per book
2. HTTP Request (Download)
   - GET cover_url
   - Response: File
3. Set Node (Filename)
   - Convert title to slug: "the-snowy-day.jpg"
4. HTTP Request (Upload to Supabase Storage)
   - POST to: https://PROJECT.supabase.co/storage/v1/object/book-covers/filename
   - Headers: Authorization, apikey, Content-Type
   - Body: Binary image data
5. Set Node (Public URL)
   - Build: https://PROJECT.supabase.co/storage/v1/object/public/book-covers/filename

**Output:** Book item with uploaded cover_url

---

## Workflow 3: Full Content Enrichment

**Purpose:** Generate comprehensive KidsCorner content per book

**Input:** Book item with cover_url from Workflow 2

**Process (per book):**
1. AI Node (workflow-3-enrichment.md)
   - Input: title, author, cover_url
   - Returns: Full book object + author object
   - Output: ~2,000 tokens per book (acceptable for single book)
2. Supabase Node (Insert Author)
   - Check if author exists by slug
   - Insert if new
3. Supabase Node (Insert Book)
   - Insert book with author_id
   - Include all enriched fields

**Output:** Book record in Supabase database

---

## Complete Flow

```
Manual Trigger
    ↓
Workflow 1: Research (5 books)
    ↓
Split Out Items
    ↓
For each book:
    ↓
    Workflow 2: Cover Search & Upload
    ↓
    Workflow 3: Full Enrichment
    ↓
    Insert to Supabase
    ↓
Next book
```

## Token Usage Comparison

**Original Approach (Single Workflow):**
- 5 books × ~1,700 tokens = ~8,500 tokens
- Timeout risk: HIGH

**Split Approach:**
- Workflow 1: ~200 tokens
- Workflow 2 (per book): ~50 tokens × 5 = ~250 tokens
- Workflow 3 (per book): ~2,000 tokens × 5 = ~10,000 tokens (but spread across 5 calls)
- Timeout risk: LOW

## Benefits

1. **No Timeouts:** Each AI call stays under 120-second limit
2. **Better Covers:** Dedicated cover search per book
3. **Higher Quality:** Focused enrichment per book
4. **Retry Logic:** Can retry individual books if they fail
5. **Parallel Processing:** Can run Workflow 2/3 in parallel for multiple books

## n8n Node Configuration

### Workflow 1
- Manual Trigger
- OpenAI Chat Model (workflow-1-research-minimal.md)
- Split Out Items

### Workflow 2 (Loop)
- AI Model (workflow-2-cover-search.md)
- HTTP Request (Download)
- Set (Filename)
- HTTP Request (Upload to Supabase)
- Set (Public URL)

### Workflow 3 (Loop)
- AI Model (workflow-3-enrichment.md)
- Supabase (Insert Author)
- Supabase (Insert Book)

## Error Handling

Add "Continue On Fail" to all AI nodes with retry logic:
- IF Error → Wait 2 minutes → Retry
- Max retries: 3

## Scaling

For larger datasets:
- Run Workflow 1 multiple times with different award categories
- Process in batches of 5 books
- Use n8n's queue system for parallel processing
