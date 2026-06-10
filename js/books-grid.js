/* books-grid.js — Book display grid with Supabase integration */

// Fallback static data
const staticBooks = [
    { id: 1, title: "The Little Prince", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", lang: "en", age: "7-9", bg: "#D4E6C3", slug: "the-little-prince" },
    { id: 2, title: "Wonder", author: "R.J. Palacio", cover: "https://covers.openlibrary.org/b/isbn/9780375869020-L.jpg", lang: "en", age: "9-12", bg: "#C8D8E8", slug: "wonder" },
    { id: 3, title: "The Dot", author: "Peter H. Reynolds", cover: "https://covers.openlibrary.org/b/isbn/9780763619619-L.jpg", lang: "en", age: "4-6", bg: "#F2D6A8", slug: "the-dot" },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", lang: "en", age: "9-12", bg: "#C3D4B8", slug: "the-hobbit" },
    { id: 5, title: "The Arrival", author: "Shaun Tan", cover: "https://covers.openlibrary.org/b/isbn/9780439895295-L.jpg", lang: "en", age: "9-12", bg: "#D5CFC0", slug: "the-arrival" },
    { id: 6, title: "The Very Hungry Caterpillar", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9780399226908-L.jpg", lang: "en", age: "0-3", bg: "#D6E8B8", slug: "the-very-hungry-caterpillar" },
    { id: 7, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9782070612758-L.jpg", lang: "fr", age: "7-9", bg: "#C5D8E8", slug: "le-petit-prince" },
    { id: 8, title: "La Chenille Qui Fait des Trous", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9782744500626-L.jpg", lang: "fr", age: "0-3", bg: "#E8E0C0", slug: "la-chenille-qui-fait-des-trous" }
];

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
        console.warn('Supabase client not initialized, using static fallback data');
        renderStaticBooks();
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
                cover_url,
                age_label,
                primary_category,
                filters,
                language_order,
                authors (name)
            `)
            .order('language_order', { ascending: true });

        if (error) {
            console.error('Error fetching books:', error);
            console.warn('Using static fallback data due to Supabase error');
            renderStaticBooks();
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
        console.warn('Using static fallback data due to error');
        renderStaticBooks();
    }

    function renderStaticBooks() {
        const languageOrder = ['en', 'fr', 'it', 'es', 'pt', 'bilingual'];
        const sortedStaticBooks = staticBooks.map(book => ({
            id: book.id,
            slug: book.slug,
            title: book.title,
            cover_url: book.cover,
            age_label: book.age,
            primary_category: null,
            authors: { name: book.author }
        })).sort((a, b) => {
            const langA = staticBooks.find(s => s.id === a.id)?.lang || 'en';
            const langB = staticBooks.find(s => s.id === b.id)?.lang || 'en';
            const indexA = languageOrder.indexOf(langA);
            const indexB = languageOrder.indexOf(langB);
            return indexA - indexB;
        });
        renderBooks(sortedStaticBooks);
    }

    function createBookCard(book) {
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
        coverImg.src = book.cover_url || '../assets/placeholder-book.jpg';
        coverImg.alt = 'Cover of ' + book.title;
        coverImg.loading = 'lazy';
        coverImg.decoding = 'async';
        coverImg.onerror = function() {
            coverImg.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'fallback-icon';
            fallback.textContent = '\ud83d\udcd6';
            card.insertBefore(fallback, card.firstChild);
        };

        const overlay = document.createElement('div');
        overlay.className = 'book-overlay';
        overlay.innerHTML = '<div class="book-title-overlay">' + book.title + '</div><div class="book-author-overlay">' + (book.authors ? book.authors.name : 'Unknown') + '</div>';

        // Make card clickable to navigate to book detail page
        const link = document.createElement('a');
        link.href = 'book.html?slug=' + book.slug;
        link.className = 'book-card-link';
        link.style.display = 'contents';
        link.appendChild(coverImg);
        link.appendChild(overlay);

        card.appendChild(link);
        return card;
    }

    function renderBooks(books) {
        if (!booksGrid) return;
        booksGrid.innerHTML = '';
        books.forEach(function(book) {
            booksGrid.appendChild(createBookCard(book));
        });
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
