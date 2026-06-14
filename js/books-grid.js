/* books-grid.js — Book display grid with Supabase storage integration */

// Cache for successfully fetched cover URLs to avoid repeated API calls
const coverUrlCache = new Map();

// Function to fetch cover from Supabase storage
async function fetchSupabaseStorageCover(bookId, slug, language) {
    const cacheKey = `supabase:${bookId}`;
    if (coverUrlCache.has(cacheKey)) {
        return coverUrlCache.get(cacheKey);
    }

    try {
        // Use the database function to find the matching file path
        const { data: filePath, error } = await window.supabaseClient
            .rpc('get_cover_path_by_slug', {
                book_slug: slug,
                book_language: language
            });

        if (error) {
            console.warn('Database function error:', error);
            return null;
        }

        if (filePath) {
            // Get public URL for the found file path
            const { data, error: urlError } = await window.supabaseClient
                .storage
                .from('book-covers')
                .getPublicUrl(filePath);

            if (!urlError && data && data.publicUrl) {
                coverUrlCache.set(cacheKey, data.publicUrl);
                return data.publicUrl;
            }
        }
    } catch (error) {
        console.warn('Supabase storage fetch error:', error);
    }

    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;

    // Show loading state
    booksGrid.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>Loading books...</p></div>';

    // Wait for supabase client to be initialized (with longer timeout)
    let attempts = 0;
    const maxAttempts = 30;
    
    while (!window.supabaseClient && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }

    // Check if supabase client is initialized
    if (!window.supabaseClient) {
        console.warn('Supabase client not initialized');
        showErrorState('Unable to connect to database. Please check your connection.');
        return;
    }

    try {
        // Fetch books from Supabase with author data and filters
        const { data: books, error } = await window.supabaseClient
            .from('books')
            .select(`
                id,
                slug,
                title,
                original_language,
                age_label,
                primary_category,
                filters,
                language_order,
                authors (name)
            `)
            .order('language_order', { ascending: true });

        if (error) {
            console.error('Error fetching books:', error);
            showErrorState('Failed to load books. Please try again later.');
            return;
        }

        if (!books || books.length === 0) {
            showEmptyState();
            return;
        }

        // Render books (already sorted by language_order from database)
        renderBooks(books);

    } catch (error) {
        console.error('Error:', error);
        showErrorState('Failed to load books. Please try again later.');
    }

    async function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', book.title + ' by ' + (book.authors ? book.authors.name : 'Unknown'));
        
        // Generate background color based on category or random
        const bgColor = getBackgroundColor(book.primary_category);
        card.style.backgroundColor = bgColor;

        const coverImg = document.createElement('img');
        coverImg.className = 'book-cover';
        coverImg.alt = 'Cover of ' + book.title;
        coverImg.loading = 'lazy';
        coverImg.decoding = 'async';

        // Try Supabase storage only
        const coverUrl = await fetchSupabaseStorageCover(book.id, book.slug, book.original_language);

        if (coverUrl) {
            console.log(`Loading cover for "${book.title}": ${coverUrl}`);
            coverImg.src = coverUrl;

            // Handle image load errors
            coverImg.onerror = function() {
                console.log(`"${book.title}" failed to load from storage, showing placeholder`);
                showPlaceholder();
            };

            coverImg.onload = function() {
                console.log(`"${book.title}" loaded successfully (${coverImg.naturalWidth}x${coverImg.naturalHeight})`);
            };
        } else {
            console.log(`No cover found in storage for "${book.title}", showing placeholder`);
            showPlaceholder();
        }

        function showPlaceholder() {
            coverImg.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'fallback-icon';
            fallback.textContent = '\ud83d\udcd6';
            card.insertBefore(fallback, card.firstChild);
        }

        const overlay = document.createElement('div');
        overlay.className = 'book-overlay';
        overlay.innerHTML = '<div class="book-title-overlay">' + book.title + '</div><div class="book-author-overlay">' + (book.authors ? book.authors.name : 'Unknown') + '</div>';

        // Make card clickable to navigate to book detail page
        const link = document.createElement('a');
        link.href = book.slug + '.html';
        link.className = 'book-card-link';
        link.style.display = 'contents';
        link.appendChild(coverImg);
        link.appendChild(overlay);

        card.appendChild(link);
        return card;
    }

    async function renderBooks(books) {
        if (!booksGrid) return;
        booksGrid.innerHTML = '';
        
        // Create book cards asynchronously to allow API calls for fallback covers
        for (const book of books) {
            const card = await createBookCard(book);
            booksGrid.appendChild(card);
        }
    }

    function getBackgroundColor(category) {
        const colors = {
            'adventure': '#D4E6C3',
            'fantasy': '#C8D8E8',
            'contemporary': '#F2D6A8',
            'history': '#C3D4B8',
            'fairy-tales': '#D5CFC0',
            'poetry': '#D6E8B8',
            'science': '#C5D8E8',
            'nature': '#E8E0C0',
            'family': '#E8C8C0',
            'friendship': '#D0D8E0'
        };
        return colors[category] || '#E0D8C8';
    }

    function showErrorState(message) {
        booksGrid.innerHTML = `
            <div class="error-state">
                <p>${message || 'Failed to load books. Please try again later.'}</p>
            </div>
        `;
    }

    function showEmptyState() {
        booksGrid.innerHTML = `
            <div class="empty-state">
                <p>No books found. Check back soon!</p>
            </div>
        `;
    }
});
