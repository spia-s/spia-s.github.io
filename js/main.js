document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksList = document.querySelectorAll('.nav-link');

    // Toggle Mobile Nav
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = navToggle.querySelector('.icon-menu');
            if (icon) {
                icon.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
            }
        });
    }

    // Close Mobile Nav on link click
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = navToggle.querySelector('.icon-menu');
                if (icon) icon.textContent = '☰';
            }
            
            // Set active class for in-page anchors
            if (link.getAttribute('href').startsWith('#')) {
                navLinksList.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Sticky Header & Scroll Spy
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            const href = link.getAttribute('href');
            if (current && href.includes('#' + current)) {
                navLinksList.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Language Switcher
    initLanguageSwitcher();
});

function initLanguageSwitcher() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let navRight = nav.querySelector('.nav-right');
    if (!navRight) {
        navRight = document.createElement('div');
        navRight.className = 'nav-right';
        nav.appendChild(navRight);
    }

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    
    const activeLang = languages.find(l => l.code === currentLanguage) || languages[0];
    
    switcher.innerHTML = `
        <button class="lang-current" id="lang-toggle">
            <span class="flag">${activeLang.flag}</span>
            <span class="lang-name">${activeLang.name}</span>
        </button>
        <div class="lang-dropdown" id="lang-dropdown">
            ${languages.map(lang => `
                <button class="lang-option ${lang.code === currentLanguage ? 'active' : ''}" data-lang="${lang.code}">
                    <span class="flag">${lang.flag}</span>
                    <span class="lang-name">${lang.name}</span>
                </button>
            `).join('')}
        </div>
    `;
    
    navRight.appendChild(switcher);

    const toggle = switcher.querySelector('#lang-toggle');
    const dropdown = switcher.querySelector('#lang-dropdown');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    switcher.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            dropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!switcher.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}
