/* books-grid.js — Book display grid with color extraction and hover effects */

document.addEventListener('DOMContentLoaded', () => {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;

    const books = [
        { id: 1, title: "The Little Prince", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", lang: "en", age: "7-9", bg: "#D4E6C3" },
        { id: 2, title: "Wonder", author: "R.J. Palacio", cover: "https://covers.openlibrary.org/b/isbn/9780375869020-L.jpg", lang: "en", age: "9-12", bg: "#C8D8E8" },
        { id: 3, title: "The Dot", author: "Peter H. Reynolds", cover: "https://covers.openlibrary.org/b/isbn/9780763619619-L.jpg", lang: "en", age: "4-6", bg: "#F2D6A8" },
        { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", lang: "en", age: "9-12", bg: "#C3D4B8" },
        { id: 5, title: "The Arrival", author: "Shaun Tan", cover: "https://covers.openlibrary.org/b/isbn/9780439895295-L.jpg", lang: "en", age: "9-12", bg: "#D5CFC0" },
        { id: 6, title: "The Very Hungry Caterpillar", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9780399226908-L.jpg", lang: "en", age: "0-3", bg: "#D6E8B8" },
        { id: 7, title: "Le Petit Prince", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9782070612758-L.jpg", lang: "fr", age: "7-9", bg: "#C5D8E8" },
        { id: 8, title: "La Chenille Qui Fait des Trous", author: "Eric Carle", cover: "https://covers.openlibrary.org/b/isbn/9782744500626-L.jpg", lang: "fr", age: "0-3", bg: "#E8E0C0" },
        { id: 9, title: "La Couleur des \u00c9motions", author: "Anna Llenas", cover: "https://covers.openlibrary.org/b/isbn/9782345002246-L.jpg", lang: "fr", age: "4-6", bg: "#E8C8C0" },
        { id: 10, title: "Le Petit Nicolas", author: "Ren\u00e9 Goscinny", cover: "https://covers.openlibrary.org/b/isbn/9782203001039-L.jpg", lang: "fr", age: "7-9", bg: "#D0D8E0" },
        { id: 11, title: "Tobie Lolness", author: "Timoth\u00e9e de Fombelle", cover: "https://covers.openlibrary.org/b/isbn/9782070616695-L.jpg", lang: "fr", age: "9-12", bg: "#C0D8C8" },
        { id: 12, title: "Il Piccolo Principe", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9788845901034-L.jpg", lang: "it", age: "7-9", bg: "#E0D8C8" },
        { id: 13, title: "Favole al Telefono", author: "Gianni Rodari", cover: "https://covers.openlibrary.org/b/isbn/9788807901010-L.jpg", lang: "it", age: "7-9", bg: "#F0D8B8" },
        { id: 14, title: "Le Avventure di Pinocchio", author: "Carlo Collodi", cover: "https://covers.openlibrary.org/b/isbn/9788807900242-L.jpg", lang: "it", age: "7-9", bg: "#D8D0B8" },
        { id: 15, title: "Mio Fratello Rincorre i Dinosauri", author: "Giacomo Mazzariol", cover: "https://covers.openlibrary.org/b/isbn/9788807492914-L.jpg", lang: "it", age: "9-12", bg: "#C8E0D8" },
        { id: 16, title: "La Vita Segreta degli Alberi per Bambini", author: "Peter Wohlleben", cover: "https://covers.openlibrary.org/b/isbn/9788845932465-L.jpg", lang: "it", age: "7-9", bg: "#B8D8C0" },
        { id: 17, title: "El Principito", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9780156013987-L.jpg", lang: "es", age: "7-9", bg: "#D8E0D0" },
        { id: 18, title: "El Punto", author: "Peter H. Reynolds", cover: "https://covers.openlibrary.org/b/isbn/9788494643125-L.jpg", lang: "es", age: "4-6", bg: "#F0D8D0" },
        { id: 19, title: "Mafalda", author: "Quino", cover: "https://covers.openlibrary.org/b/isbn/9788420469355-L.jpg", lang: "es", age: "9-12", bg: "#E0D0C8" },
        { id: 20, title: "Invisible", author: "Eloy Moreno", cover: "https://covers.openlibrary.org/b/isbn/9788423352135-L.jpg", lang: "es", age: "9-12", bg: "#D0D8D8" },
        { id: 21, title: "La Vida Secreta de los \u00c1rboles para Ni\u00f1os", author: "Peter Wohlleben", cover: "https://covers.openlibrary.org/b/isbn/9788416962020-L.jpg", lang: "es", age: "7-9", bg: "#C0D8B8" },
        { id: 22, title: "Meu P\u00e9 de Laranja Lima", author: "Jos\u00e9 Mauro de Vasconcelos", cover: "https://covers.openlibrary.org/b/isbn/9788501414083-L.jpg", lang: "pt", age: "9-12", bg: "#F0D8C0" },
        { id: 23, title: "Menina Bonita do La\u00e7o de Fita", author: "Ana Maria Machado", cover: "https://covers.openlibrary.org/b/isbn/9788508085507-L.jpg", lang: "pt", age: "4-6", bg: "#E8D0E0" },
        { id: 24, title: "O Pequeno Pr\u00edncipe", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9788574064292-L.jpg", lang: "pt", age: "7-9", bg: "#D0E0E8" },
        { id: 25, title: "A Bolsa Amarela", author: "Lygia Bojunga", cover: "https://covers.openlibrary.org/b/isbn/9788508010332-L.jpg", lang: "pt", age: "7-9", bg: "#F0E8C0" },
        { id: 26, title: "O Menino Maluquinho", author: "Ziraldo", cover: "https://covers.openlibrary.org/b/isbn/9788532240439-L.jpg", lang: "pt", age: "4-6", bg: "#E8D8C0" },
        { id: 27, title: "A Droga da Obedi\u00eancia", author: "Pedro Bandeira", cover: "https://covers.openlibrary.org/b/isbn/9788575423509-L.jpg", lang: "pt", age: "9-12", bg: "#C0C8D8" },
        { id: 28, title: "Turma da M\u00f4nica", author: "Mauricio de Sousa", cover: "https://covers.openlibrary.org/b/isbn/9788531300134-L.jpg", lang: "pt", age: "4-6", bg: "#E8E0C8" },
        { id: 29, title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", cover: "https://covers.openlibrary.org/b/isbn/9788532511011-L.jpg", lang: "pt", age: "9-12", bg: "#C8D0E0" },
        { id: 30, title: "O Pote Vazio", author: "Demi", cover: "https://covers.openlibrary.org/b/isbn/9788575420515-L.jpg", lang: "pt", age: "4-6", bg: "#E0E0D0" },
        { id: 31, title: "Pequenos Cientistas", author: "V\u00e1rios", cover: "https://covers.openlibrary.org/b/isbn/9788577520312-L.jpg", lang: "pt", age: "7-9", bg: "#C8E0E0" },
        { id: 32, title: "The Little Prince / Le Petit Prince", author: "Antoine de Saint-Exup\u00e9ry", cover: "https://covers.openlibrary.org/b/isbn/9780156013987-L.jpg", lang: "bilingual", age: "7-9", bg: "#D0D8E0" },
        { id: 33, title: "Dreamers / So\u00f1adores", author: "Yuyi Morales", cover: "https://covers.openlibrary.org/b/isbn/9780823440559-L.jpg", lang: "bilingual", age: "4-6", bg: "#E8D0C0" },
        { id: 34, title: "The Arrival", author: "Shaun Tan", cover: "https://covers.openlibrary.org/b/isbn/9780439895295-L.jpg", lang: "bilingual", age: "9-12", bg: "#D0D0C8" },
        { id: 35, title: "Last Stop on Market Street", author: "Matt de la Pe\u00f1a", cover: "https://covers.openlibrary.org/b/isbn/9780399257742-L.jpg", lang: "bilingual", age: "4-6", bg: "#E0D8E0" },
        { id: 36, title: "Ada Twist, Scientist", author: "Andrea Beaty", cover: "https://covers.openlibrary.org/b/isbn/9781419721373-L.jpg", lang: "bilingual", age: "4-6", bg: "#D0E8E0" }
    ];

    function createBookCard(book) {
        var card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', book.title + ' by ' + book.author);
        card.style.backgroundColor = book.bg;

        var coverImg = document.createElement('img');
        coverImg.className = 'book-cover';
        coverImg.src = book.cover;
        coverImg.alt = 'Cover of ' + book.title;
        coverImg.loading = 'lazy';
        coverImg.decoding = 'async';
        coverImg.onerror = function() {
            coverImg.style.display = 'none';
            var fallback = document.createElement('div');
            fallback.className = 'fallback-icon';
            fallback.textContent = '\ud83d\udcd6';
            card.insertBefore(fallback, card.firstChild);
        };

        var overlay = document.createElement('div');
        overlay.className = 'book-overlay';
        overlay.innerHTML = '<div class="book-title-overlay">' + book.title + '</div><div class="book-author-overlay">' + book.author + '</div>';

        card.appendChild(coverImg);
        card.appendChild(overlay);
        return card;
    }

    function renderBooks() {
        if (!booksGrid) return;
        booksGrid.innerHTML = '';
        books.forEach(function(book) {
            booksGrid.appendChild(createBookCard(book));
        });
    }

    renderBooks();
});
