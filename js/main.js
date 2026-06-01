document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu') || document.getElementById('nav-links');
    const navLinksList = document.querySelectorAll('.nav-link');

    // Toggle Mobile Nav
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('.icon-menu');
            if (icon) {
                icon.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
            }
        });
    }

    // Close Mobile Nav on link click
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
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

    // Language Switcher - ensure it's initialized after page load
    if (typeof initLanguageSwitcher === 'function') {
        setTimeout(() => {
            if (!document.querySelector('.language-switcher')) {
                initLanguageSwitcher();
            }
        }, 100);
    }
});
