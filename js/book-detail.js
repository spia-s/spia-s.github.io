/* book-detail.js — Fetch and render book detail page from Supabase */

document.addEventListener('DOMContentLoaded', async () => {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const bookContent = document.getElementById('book-content');
    
    // Get slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) {
        showError();
        return;
    }
    
    try {
        // Fetch book with author, edition, and similar books
        const { data: book, error: bookError } = await supabase
            .from('books')
            .select(`
                *,
                authors (*),
                editions (*)
            `)
            .eq('slug', slug)
            .single();
        
        if (bookError || !book) {
            console.error('Error fetching book:', bookError);
            showError();
            return;
        }
        
        // Fetch similar books
        const { data: similarBooksData, error: similarError } = await supabase
            .from('similar_books')
            .select(`
                description,
                display_order,
                similar_book_id,
                books!similar_books_similar_book_id_fkey (
                    id,
                    title,
                    slug,
                    cover_url,
                    authors (name)
                )
            `)
            .eq('book_id', book.id)
            .order('display_order', { ascending: true });
        
        const similarBooks = similarBooksData ? similarBooksData.map(sb => sb.books) : [];
        
        // Render the book
        renderBook(book, similarBooks);
        
        // Update page metadata
        updatePageMetadata(book);
        
        // Inject JSON-LD schema
        injectSchemaMarkup(book);
        
        // Show content
        loadingState.style.display = 'none';
        bookContent.style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
    
    function showError() {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
    
    function renderBook(book, similarBooks) {
        // Book Header
        document.getElementById('book-cover').src = book.cover_url || '../assets/placeholder-book.jpg';
        document.getElementById('book-cover').alt = `Cover of ${book.title}`;
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.authors ? `by ${book.authors.name}` : '';
        
        // Metadata badges
        document.getElementById('metadata-language').textContent = book.original_language || 'English';
        document.getElementById('metadata-published').textContent = book.first_published ? `First Published: ${book.first_published}` : '';
        document.getElementById('metadata-age').textContent = book.age_label || `${book.age_min}${book.age_max ? '-' + book.age_max : '+'}`;
        document.getElementById('metadata-category').textContent = book.primary_category || '';
        document.getElementById('metadata-reading-type').textContent = book.reading_type || '';
        
        // Languages available
        if (book.languages_available && book.languages_available.length > 0) {
            const langContainer = document.getElementById('languages-available');
            langContainer.innerHTML = '<strong>Languages Available:</strong> ' + book.languages_available.join(', ');
        }
        
        // KidsCorner Rating
        const rating = book.kc_rating || 5.0;
        document.getElementById('kc-rating-stars').textContent = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
        
        // Quick Overview
        document.getElementById('why-read').textContent = book.why_read || '';
        
        // Summary
        document.getElementById('short-summary').textContent = book.short_summary || '';
        document.getElementById('full-summary').textContent = book.full_summary || '';
        
        // Toggle full summary
        const toggleBtn = document.getElementById('toggle-summary');
        const fullSummaryContainer = document.getElementById('full-summary-container');
        let isExpanded = false;
        
        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            fullSummaryContainer.classList.toggle('expanded', isExpanded);
            toggleBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
        });
        
        // All Editions
        renderAllEditions(book.editions);
        
        // Developmental Benefits
        renderDevelopmentalBenefits(book.developmental_benefits);
        
        // Themes
        renderThemes(book.themes);
        
        // Educational Value
        document.getElementById('educational-value').textContent = book.educational_value || '';
        
        // Why This Book Matters
        document.getElementById('why-it-matters').textContent = book.why_it_matters || '';
        
        // Review Consensus
        renderReviewConsensus(book);
        
        // Awards
        renderAwards(book.awards);
        
        // About the Author
        renderAuthor(book.authors);
        
        // Who This Book Is For
        renderWhoItsFor(book.who_its_for);
        
        // Similar Books
        renderSimilarBooks(similarBooks);
        
        // KidsCorner Assessment
        renderKCAssessment(book.kc_assessment);
        
        // Book Data Table
        renderBookDataTable(book);
        
        // Internal Links
        renderInternalLinks(book);
    }
    
    function renderAllEditions(editions) {
        const container = document.getElementById('editions-content');
        if (!editions || editions.length === 0) {
            container.innerHTML = '<p>No edition information available.</p>';
            return;
        }
        
        // Group editions by format type
        const grouped = {};
        editions.forEach(edition => {
            const format = edition.format || 'Unknown';
            if (!grouped[format]) {
                grouped[format] = [];
            }
            grouped[format].push(edition);
        });
        
        let html = '';
        Object.keys(grouped).sort().forEach(format => {
            html += `<div class="format-group">
                <h3 class="format-title">${format}</h3>
                <div class="editions-grid">`;
            
            grouped[format].forEach(edition => {
                const marketplaces = [];
                if (edition.amazon_fr) marketplaces.push('FR');
                if (edition.amazon_de) marketplaces.push('DE');
                if (edition.amazon_it) marketplaces.push('IT');
                if (edition.amazon_es) marketplaces.push('ES');
                if (edition.amazon_pt) marketplaces.push('PT');
                if (edition.amazon_br) marketplaces.push('BR');
                if (edition.amazon_mx) marketplaces.push('MX');
                
                html += `
                    <div class="edition-card ${edition.is_recommended ? 'recommended' : ''}">
                        ${edition.is_recommended ? '<span class="recommended-badge">Recommended</span>' : ''}
                        <h4 class="edition-name">${edition.edition_name || 'Standard Edition'}</h4>
                        <p class="edition-publisher"><strong>Publisher:</strong> ${edition.publisher || 'N/A'}</p>
                        ${edition.isbn ? `<p class="edition-isbn"><strong>ISBN:</strong> ${edition.isbn}</p>` : ''}
                        <p class="edition-marketplaces"><strong>Available on Amazon:</strong> ${marketplaces.length > 0 ? marketplaces.join(', ') : 'N/A'}</p>
                        ${edition.why_this_edition ? `<p class="edition-reason">${edition.why_this_edition}</p>` : ''}
                        ${edition.affiliate_url ? `<a href="${edition.affiliate_url}" class="btn-primary btn-small" target="_blank" rel="noopener noreferrer">Buy This Edition</a>` : ''}
                    </div>
                `;
            });
            
            html += `</div></div>`;
        });
        
        container.innerHTML = html;
    }
    
    function renderDevelopmentalBenefits(benefits) {
        const container = document.getElementById('developmental-benefits');
        if (!benefits || Object.keys(benefits).length === 0) {
            container.innerHTML = '<p>No developmental benefits information available.</p>';
            return;
        }
        
        const benefitLabels = {
            critical_thinking: 'Critical Thinking',
            curiosity: 'Curiosity',
            creativity: 'Creativity',
            empathy: 'Empathy',
            language_development: 'Language Development',
            cultural_awareness: 'Cultural Awareness',
            independence: 'Independence',
            problem_solving: 'Problem Solving'
        };
        
        container.innerHTML = Object.entries(benefits)
            .filter(([key, value]) => value && value.trim())
            .map(([key, value]) => `
                <div class="benefit-card">
                    <h3>${benefitLabels[key] || key}</h3>
                    <p>${value}</p>
                </div>
            `).join('');
    }
    
    function renderThemes(themes) {
        const container = document.getElementById('themes');
        if (!themes || themes.length === 0) {
            container.innerHTML = '<p>No themes information available.</p>';
            return;
        }
        
        container.innerHTML = themes.map(theme => `
            <span class="theme-tag">${theme}</span>
        `).join('');
    }
    
    function renderReviewConsensus(book) {
        const positivesList = document.getElementById('review-positives-list');
        const criticismsList = document.getElementById('review-criticisms-list');
        const consensusText = document.getElementById('review-consensus-text');
        
        if (book.review_what_readers_like && book.review_what_readers_like.length > 0) {
            positivesList.innerHTML = book.review_what_readers_like.map(point => `<li>${point}</li>`).join('');
        } else {
            positivesList.innerHTML = '<li>No information available</li>';
        }
        
        if (book.review_criticisms && book.review_criticisms.length > 0) {
            criticismsList.innerHTML = book.review_criticisms.map(point => `<li>${point}</li>`).join('');
        } else {
            criticismsList.innerHTML = '<li>No information available</li>';
        }
        
        consensusText.textContent = book.review_consensus || '';
    }
    
    function renderAwards(awards) {
        const container = document.getElementById('awards-list');
        if (!awards || awards.length === 0) {
            container.innerHTML = '<li>No awards information available.</li>';
            return;
        }
        
        container.innerHTML = awards.map(award => `<li>${award}</li>`).join('');
    }
    
    function renderAuthor(author) {
        const container = document.getElementById('author-content');
        if (!author) {
            container.innerHTML = '<p>No author information available.</p>';
            return;
        }
        
        container.innerHTML = `
            <h3>${author.name}</h3>
            <p>${author.biography || 'No biography available.'}</p>
            ${author.major_works && author.major_works.length > 0 ? `
                <p><strong>Major Works:</strong> ${author.major_works.join(', ')}</p>
            ` : ''}
        `;
    }
    
    function renderWhoItsFor(whoItsFor) {
        const container = document.getElementById('who-its-for');
        if (!whoItsFor || Object.keys(whoItsFor).length === 0) {
            container.innerHTML = '<p>No information available.</p>';
            return;
        }
        
        let html = '';
        if (whoItsFor.enjoys && whoItsFor.enjoys.length > 0) {
            html += `<p><strong>Recommended for children who enjoy:</strong> ${whoItsFor.enjoys.join(', ')}</p>`;
        }
        if (whoItsFor.suitable_for && whoItsFor.suitable_for.length > 0) {
            html += `<p><strong>Particularly suitable for:</strong> ${whoItsFor.suitable_for.join(', ')}</p>`;
        }
        container.innerHTML = html || '<p>No information available.</p>';
    }
    
    function renderSimilarBooks(similarBooks) {
        const container = document.getElementById('similar-books');
        if (!similarBooks || similarBooks.length === 0) {
            container.innerHTML = '<p>No similar books available.</p>';
            return;
        }
        
        container.innerHTML = similarBooks.map(book => `
            <div class="similar-book-card">
                <a href="book.html?slug=${book.slug}" class="similar-book-link">
                    <img src="${book.cover_url || '../assets/placeholder-book.jpg'}" alt="${book.title}" class="similar-book-cover">
                    <div class="similar-book-info">
                        <h4>${book.title}</h4>
                        <p>${book.authors ? book.authors.name : ''}</p>
                    </div>
                </a>
            </div>
        `).join('');
    }
    
    function renderKCAssessment(assessment) {
        const container = document.getElementById('kc-assessment');
        if (!assessment || Object.keys(assessment).length === 0) {
            container.innerHTML = '<p>No assessment information available.</p>';
            return;
        }
        
        const ratingLabels = {
            critical_thinking: 'Critical Thinking',
            curiosity: 'Curiosity',
            creativity: 'Creativity',
            honesty: 'Honesty',
            empathy: 'Empathy',
            independence: 'Independence',
            cultural_awareness: 'Cultural Awareness',
            respect_for_others: 'Respect for Others'
        };
        
        container.innerHTML = Object.entries(assessment)
            .filter(([key, value]) => key !== 'explanation')
            .map(([key, value]) => `
                <div class="assessment-item">
                    <span class="assessment-label">${ratingLabels[key] || key}</span>
                    <span class="assessment-rating">${'★'.repeat(Math.round(value))}${'☆'.repeat(5 - Math.round(value))}</span>
                </div>
            `).join('');
        
        if (assessment.explanation) {
            container.innerHTML += `<p class="assessment-explanation">${assessment.explanation}</p>`;
        }
    }
    
    function renderBookDataTable(book) {
        const tbody = document.getElementById('book-data-table-body');
        const data = [
            { label: 'Author', value: book.authors ? book.authors.name : 'Information not reliably available' },
            { label: 'Illustrator', value: book.illustrator || 'Information not reliably available' },
            { label: 'Publisher', value: book.editions && book.editions[0] ? book.editions[0].publisher : 'Information not reliably available' },
            { label: 'Publication Year', value: book.first_published || 'Information not reliably available' },
            { label: 'Pages', value: book.pages || 'Information not reliably available' },
            { label: 'ISBN', value: book.editions && book.editions[0] ? book.editions[0].isbn : 'Information not reliably available' },
            { label: 'Original Language', value: book.original_language || 'Information not reliably available' },
            { label: 'Category', value: book.primary_category || 'Information not reliably available' },
            { label: 'Subcategory', value: book.subcategory || 'Information not reliably available' },
            { label: 'Reading Level', value: book.age_label || 'Information not reliably available' },
            { label: 'Age Range', value: `${book.age_min || '?'}${book.age_max ? '-' + book.age_max : '+'}` },
            { label: 'Series', value: book.series || 'Information not reliably available' },
            { label: 'Formats', value: book.formats ? book.formats.join(', ') : 'Information not reliably available' }
        ];
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td class="data-label">${item.label}</td>
                <td class="data-value">${item.value}</td>
            </tr>
        `).join('');
    }
    
    function renderInternalLinks(book) {
        const container = document.getElementById('internal-links');
        const links = [];
        
        if (book.authors && book.authors.slug) {
            links.push(`<a href="#" class="internal-link">More by ${book.authors.name}</a>`);
        }
        
        if (book.primary_category) {
            links.push(`<a href="books.html" class="internal-link">${book.primary_category} Books</a>`);
        }
        
        if (book.themes && book.themes.length > 0) {
            links.push(`<a href="books.html" class="internal-link">Books about ${book.themes[0]}</a>`);
        }
        
        links.push(`<a href="books.html" class="internal-link">Browse All Books</a>`);
        
        container.innerHTML = links.join(' | ');
    }
    
    function updatePageMetadata(book) {
        document.title = `${book.title} by ${book.authors ? book.authors.name : ''} | Best Edition, Summary & Review | KidsCorner`;
        document.getElementById('page-description').setAttribute('content', 
            `Discover ${book.title} by ${book.authors ? book.authors.name : ''}. Read a summary, explore themes, age recommendations, developmental benefits, and the best edition available.`
        );
    }
    
    function injectSchemaMarkup(book) {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Book',
            'name': book.title,
            'author': book.authors ? {
                '@type': 'Person',
                'name': book.authors.name
            } : undefined,
            'publisher': book.editions && book.editions[0] ? {
                '@type': 'Organization',
                'name': book.editions[0].publisher
            } : undefined,
            'isbn': book.editions && book.editions[0] ? book.editions[0].isbn : undefined,
            'datePublished': book.first_published ? `${book.first_published}-01-01` : undefined,
            'aggregateRating': book.schema_aggregate_rating ? {
                '@type': 'AggregateRating',
                'ratingValue': book.schema_aggregate_rating,
                'bestRating': '5',
                'ratingCount': '1'
            } : undefined,
            'inLanguage': book.original_language,
            'numberOfPages': book.pages,
            'about': book.themes ? book.themes.map(theme => ({
                '@type': 'Thing',
                'name': theme
            })) : undefined
        };
        
        // Remove undefined values
        Object.keys(schema).forEach(key => {
            if (schema[key] === undefined) {
                delete schema[key];
            }
        });
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
});
