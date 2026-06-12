/* books-grid.js — Book display grid with Supabase integration and multi-source cover fallback */

// Cache for successfully fetched cover URLs to avoid repeated API calls
const coverUrlCache = new Map();

// Fallback static data
const staticBooks = [
    { id: 1, title: "The Little Prince", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", lang: "en", age: "8-99", bg: "#D4E6C3", slug: "the-little-prince" },
    { id: 2, title: "Wonder", author: "R.J. Palacio", cover: "https://covers.openlibrary.org/b/isbn/9780375869020-L.jpg", lang: "en", age: "8-12", bg: "#C8D8E8", slug: "wonder" },
    { id: 3, title: "The Dot", author: "Peter H. Reynolds", cover: "https://covers.openlibrary.org/b/isbn/9780763619619-L.jpg", lang: "en", age: "4-8", bg: "#F2D6A8", slug: "the-dot" },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", lang: "en", age: "9-14", bg: "#C3D4B8", slug: "the-hobbit" },
    { id: 5, title: "The Arrival", author: "Shaun Tan", cover: "https://covers.openlibrary.org/b/isbn/9780439895295-L.jpg", lang: "en", age: "8-99", bg: "#D5CFC0", slug: "the-arrival" },
    { id: 6, title: "The Very Hungry Caterpillar", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9780399226908-L.jpg", lang: "en", age: "2-6", bg: "#D6E8B8", slug: "the-very-hungry-caterpillar" },
    { id: 7, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9782070408504-L.jpg", lang: "fr", age: "8-99", bg: "#C5D8E8", slug: "le-petit-prince" },
    { id: 8, title: "La Chenille Qui Fait des Trous", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9782871421368-L.jpg", lang: "fr", age: "2-6", bg: "#E8E0C0", slug: "la-chenille-qui-fait-des-trous" },
    { id: 9, title: "La Couleur des Émotions", author: "Anna Llenas", cover: "https://covers.openlibrary.org/b/isbn/9782367460150-L.jpg", lang: "fr", age: "3-8", bg: "#E8C8C0", slug: "la-couleur-des-emotions" },
    { id: 10, title: "Le Petit Nicolas", author: "René Goscinny", cover: "https://covers.openlibrary.org/b/isbn/9782070619542-L.jpg", lang: "fr", age: "7-12", bg: "#D0D8E0", slug: "le-petit-nicolas" },
    { id: 11, title: "Tobie Lolness", author: "Timothée de Fombelle", cover: "https://covers.openlibrary.org/b/isbn/9782070578139-L.jpg", lang: "fr", age: "10-15", bg: "#C8D8E8", slug: "tobie-lolness" },
    { id: 12, title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9788845299810-L.jpg", lang: "it", age: "8-99", bg: "#C5D8E8", slug: "il-piccolo-principe" },
    { id: 13, title: "Favole al Telefono", author: "Gianni Rodari", cover: "https://covers.openlibrary.org/b/isbn/9788779265669-L.jpg", lang: "it", age: "5-10", bg: "#F2D6A8", slug: "favole-al-telefono" },
    { id: 14, title: "Le Avventure di Pinocchio", author: "Carlo Collodi", cover: "https://covers.openlibrary.org/b/isbn/9788280420668-L.jpg", lang: "it", age: "7-12", bg: "#C3D4B8", slug: "le-avventure-di-pinocchio" },
    { id: 15, title: "Mio Fratello Rincorre i Dinosauri", author: "Giacomo Mazzariol", cover: "https://covers.openlibrary.org/b/isbn/9788806226120-L.jpg", lang: "it", age: "11-16", bg: "#E8C8C0", slug: "mio-fratello-rincorre-i-dinosauri" },
    { id: 16, title: "La Vita Segreta degli Alberi per Bambini", author: "Peter Wohlleben", cover: "https://covers.openlibrary.org/b/isbn/9788873861928-L.jpg", lang: "it", age: "8-13", bg: "#D6E8B8", slug: "la-vita-segreta-degli-alberi-per-bambini" },
    { id: 17, title: "El Principito", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9788498383355-L.jpg", lang: "es", age: "8-99", bg: "#C5D8E8", slug: "el-principito" },
    { id: 18, title: "El Punto", author: "Peter H. Reynolds", cover: "https://covers.openlibrary.org/b/isbn/9788426134448-L.jpg", lang: "es", age: "4-8", bg: "#F2D6A8", slug: "el-punto" },
    { id: 19, title: "Mafalda", author: "Quino", cover: "https://covers.openlibrary.org/b/isbn/9788426413383-L.jpg", lang: "es", age: "9-99", bg: "#D0D8E0", slug: "mafalda" },
    { id: 20, title: "Invisible", author: "Eloy Moreno", cover: "https://covers.openlibrary.org/b/isbn/9788490700457-L.jpg", lang: "es", age: "11-16", bg: "#C8D8E8", slug: "invisible" },
    { id: 21, title: "La Vida Secreta de los Árboles para Niños", author: "Peter Wohlleben", cover: "https://covers.openlibrary.org/b/isbn/9788497775496-L.jpg", lang: "es", age: "8-13", bg: "#D6E8B8", slug: "la-vida-secreta-de-los-arboles" },
    { id: 22, title: "Meu Pé de Laranja Lima", author: "José Mauro de Vasconcelos", cover: "https://covers.openlibrary.org/b/isbn/9788506054413-L.jpg", lang: "pt", age: "10-99", bg: "#E8C8C0", slug: "meu-pe-de-laranja-lima" },
    { id: 23, title: "Menina Bonita do Laço de Fita", author: "Ana Maria Machado", cover: "https://covers.openlibrary.org/b/isbn/9788508045945-L.jpg", lang: "pt", age: "4-8", bg: "#F2D6A8", slug: "menina-bonita-do-laco-de-fita" },
    { id: 24, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", cover: "https://covers.openlibrary.org/b/isbn/9788501081933-L.jpg", lang: "pt", age: "8-99", bg: "#C5D8E8", slug: "o-pequeno-principe" },
    { id: 25, title: "A Bolsa Amarela", author: "Lygia Bojunga", cover: "https://covers.openlibrary.org/b/isbn/9788585933234-L.jpg", lang: "pt", age: "9-14", bg: "#D5CFC0", slug: "a-bolsa-amarela" },
    { id: 26, title: "O Menino Maluquinho", author: "Ziraldo", cover: "https://covers.openlibrary.org/b/isbn/9788506018001-L.jpg", lang: "pt", age: "5-10", bg: "#D0D8E0", slug: "o-menino-maluquinho" },
    { id: 27, title: "A Droga da Obediência", author: "Pedro Bandeira", cover: "https://covers.openlibrary.org/b/isbn/9788516026653-L.jpg", lang: "pt", age: "10-15", bg: "#C8D8E8", slug: "a-droga-da-obediencia" },
    { id: 28, title: "Turma da Mônica", author: "Mauricio de Sousa", cover: "https://covers.openlibrary.org/b/isbn/9788594600011-L.jpg", lang: "pt", age: "4-12", bg: "#F2D6A8", slug: "turma-da-monica" },
    { id: 29, title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", cover: "https://covers.openlibrary.org/b/isbn/9788532522023-L.jpg", lang: "pt", age: "9-14", bg: "#C3D4B8", slug: "harry-potter-e-a-pedra-filosofal" },
    { id: 30, title: "O Pote Vazio", author: "Demi", cover: "https://covers.openlibrary.org/b/isbn/9788574510415-L.jpg", lang: "pt", age: "4-8", bg: "#E8E0C0", slug: "o-pote-vazio" },
    { id: 31, title: "Pequenos Cientistas", author: "Vários Autores", cover: "https://covers.openlibrary.org/b/isbn/9788532200013-L.jpg", lang: "pt", age: "5-10", bg: "#D6E8B8", slug: "pequenos-cientistas" },
    { id: 32, title: "Dreamers", author: "Yuyi Morales", cover: "https://covers.openlibrary.org/b/isbn/9780823441501-L.jpg", lang: "en", age: "4-8", bg: "#E8C8C0", slug: "dreamers" },
    { id: 33, title: "Last Stop on Market Street", author: "Matt de la Peña", cover: "https://covers.openlibrary.org/b/isbn/9780399167799-L.jpg", lang: "en", age: "4-8", bg: "#D0D8E0", slug: "last-stop-on-market-street" },
    { id: 34, title: "Ada Twist, Scientist", author: "Andrea Beaty", cover: "https://covers.openlibrary.org/b/isbn/9781419716379-L.jpg", lang: "en", age: "4-8", bg: "#C5D8E8", slug: "ada-twist-scientist" }
];

// Function to fetch cover from Google Books API
async function fetchGoogleBooksCover(title, author) {
    const cacheKey = `google:${title}:${author}`;
    if (coverUrlCache.has(cacheKey)) {
        return coverUrlCache.get(cacheKey);
    }

    try {
        const query = encodeURIComponent(`${title} ${author}`);
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&fields=items(volumeInfo(imageLinks(thumbnail)))`);
        const data = await response.json();
        
        if (data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks) {
            const coverUrl = data.items[0].volumeInfo.imageLinks.thumbnail.replace('http://', 'https://');
            coverUrlCache.set(cacheKey, coverUrl);
            return coverUrl;
        }
    } catch (error) {
        console.warn('Google Books API error:', error);
    }
    
    return null;
}

// Function to fetch cover from OpenLibrary using title
async function fetchOpenLibraryCover(title, author) {
    const cacheKey = `openlibrary:${title}:${author}`;
    if (coverUrlCache.has(cacheKey)) {
        return coverUrlCache.get(cacheKey);
    }

    try {
        const query = encodeURIComponent(`${title} ${author}`);
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=cover_i&limit=1`);
        const data = await response.json();
        
        if (data.docs && data.docs[0] && data.docs[0].cover_i) {
            const coverId = data.docs[0].cover_i;
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            coverUrlCache.set(cacheKey, coverUrl);
            return coverUrl;
        }
    } catch (error) {
        console.warn('OpenLibrary API error:', error);
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

        // Try the original cover_url first
        let coverUrl = book.cover_url || '../assets/placeholder-book.jpg';
        console.log(`Loading cover for "${book.title}": ${coverUrl}`);
        coverImg.src = coverUrl;

        // Set up fallback chain for failed images or tiny placeholders
        let fallbackAttempted = false;
        
        const tryFallback = async function() {
            if (fallbackAttempted) {
                // All fallbacks failed, show placeholder icon
                console.log(`All fallbacks failed for "${book.title}", showing placeholder`);
                coverImg.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'fallback-icon';
                fallback.textContent = '\ud83d\udcd6';
                card.insertBefore(fallback, card.firstChild);
                return;
            }

            fallbackAttempted = true;
            const author = book.authors ? book.authors.name : 'Unknown';
            
            // Try Google Books API first
            console.log(`Trying Google Books API for "${book.title}" by ${author}`);
            const googleCover = await fetchGoogleBooksCover(book.title, author);
            if (googleCover) {
                console.log(`Found Google Books cover for "${book.title}": ${googleCover}`);
                coverImg.src = googleCover;
                return;
            }

            // Try OpenLibrary API as second fallback
            console.log(`Trying OpenLibrary API for "${book.title}" by ${author}`);
            const openLibraryCover = await fetchOpenLibraryCover(book.title, author);
            if (openLibraryCover) {
                console.log(`Found OpenLibrary cover for "${book.title}": ${openLibraryCover}`);
                coverImg.src = openLibraryCover;
                return;
            }

            // All fallbacks failed, trigger the error handler again to show placeholder
            console.log(`No covers found for "${book.title}"`);
            tryFallback();
        };

        // Check if image loaded but is too small (OpenLibrary 1x1 GIF placeholder)
        coverImg.onload = function() {
            if (coverImg.naturalWidth <= 10 || coverImg.naturalHeight <= 10) {
                console.log(`"${book.title}" loaded tiny placeholder (${coverImg.naturalWidth}x${coverImg.naturalHeight}), trying fallback`);
                tryFallback();
            } else {
                console.log(`"${book.title}" loaded successfully (${coverImg.naturalWidth}x${coverImg.naturalHeight})`);
            }
        };

        coverImg.onerror = function() {
            console.log(`"${book.title}" failed to load, trying fallback`);
            tryFallback();
        };

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
