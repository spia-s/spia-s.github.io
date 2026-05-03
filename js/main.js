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
});
