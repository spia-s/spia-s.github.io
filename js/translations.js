const languages = [
    { code: 'en', name: 'English', flag: 'Reference (Spia)/CountryFlagsIcons/uk.png' },
    { code: 'fr', name: 'Français', flag: 'Reference (Spia)/CountryFlagsIcons/fr.png' },
    { code: 'it', name: 'Italiano', flag: 'Reference (Spia)/CountryFlagsIcons/it.png' },
    { code: 'es', name: 'Español', flag: 'Reference (Spia)/CountryFlagsIcons/es.png' },
    { code: 'pt', name: 'Português', flag: 'Reference (Spia)/CountryFlagsIcons/br.png' }
];

let currentLanguage = 'en';
let translations = {};

async function setLanguage(lang) {
    if (!translations[lang]) {
        try {
            const response = await fetch(`js/locales/${lang}.json`);
            if (response.ok) {
                translations[lang] = await response.json();
            } else {
                console.error(`Failed to load translations for ${lang}`);
                return;
            }
        } catch (e) {
            console.error(`Failed to load translations for ${lang}`);
            return;
        }
    }
    currentLanguage = lang;
    localStorage.setItem('spia-language', lang);
    applyTranslations();
    updateLanguageSelector();
}

function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = getTranslation(key);
        if (text) {
            el.textContent = text;
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = getTranslation(key);
        if (text) {
            el.placeholder = text;
        }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const text = getTranslation(key);
        if (text) {
            el.title = text;
        }
    });
}

function updateLanguageSelector() {
    const activeLang = languages.find(l => l.code === currentLanguage);
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLanguage);
    });
    const currentDisplay = document.querySelector('.lang-current');
    if (currentDisplay && activeLang) {
        currentDisplay.innerHTML = `<img src="${activeLang.flag}" alt="${activeLang.name}" class="flag-img">`;
    }
}

function initLanguageSwitcher() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let navRight = nav.querySelector('.nav-right');
    if (!navRight) {
        navRight = document.createElement('div');
        navRight.className = 'nav-right';
        nav.appendChild(navRight);
    }

    if (nav.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    
    const activeLang = languages.find(l => l.code === currentLanguage) || languages[0];
    
    let dropdownHTML = '<div class="lang-dropdown" id="lang-dropdown">';
    for (let i = 0; i < languages.length; i++) {
        const lang = languages[i];
        const isActive = lang.code === currentLanguage ? 'active' : '';
        dropdownHTML += `<button class="lang-option ${isActive}" data-lang="${lang.code}">`;
        dropdownHTML += `<img src="${lang.flag}" alt="${lang.name}" class="flag-img">`;
        dropdownHTML += '</button>';
    }
    dropdownHTML += '</div>';
    
    switcher.innerHTML = `
        <button class="lang-current" id="lang-toggle">
            <img src="${activeLang.flag}" alt="${activeLang.name}" class="flag-img">
        </button>
        ${dropdownHTML}
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

function detectLanguage() {
    const saved = localStorage.getItem('spia-language');
    if (saved && languages.find(l => l.code === saved)) {
        return saved;
    }
    
    const browserLang = navigator.language.split('-')[0];
    const matched = languages.find(l => l.code === browserLang);
    return matched ? browserLang : 'en';
}

async function loadTranslations() {
    const lang = detectLanguage();
    
    try {
        const response = await fetch(`js/locales/${lang}.json`);
        if (response.ok) {
            translations[lang] = await response.json();
            currentLanguage = lang;
        } else {
            throw new Error('Failed to load');
        }
    } catch (e) {
        console.warn(`Failed to load ${lang}, falling back to English`);
        try {
            const response = await fetch('js/locales/en.json');
            translations['en'] = await response.json();
            currentLanguage = 'en';
        } catch (e2) {
            console.error('Failed to load any translations');
        }
    }
    
    applyTranslations();
    initLanguageSwitcher();
}

loadTranslations();