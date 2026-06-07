/* filter-page.js — Interactive filters and translation management for the books sub-page */

document.addEventListener('DOMContentLoaded', () => {
    // Accordion expand/collapse
    const headers = document.querySelectorAll('.filter-group-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const group = header.closest('.filter-group');
            if (group) {
                group.classList.toggle('collapsed');
            }
        });
    });

    const activeFiltersContainer = document.getElementById('active-filters-pills');
    const clearAllBtn = document.getElementById('clear-all-filters');
    const searchInput = document.getElementById('filter-search');
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    // Get translations wrapper (falls back to English translation or literal key if translations.js not loaded yet)
    function translate(key) {
        if (typeof window.getTranslation === 'function') {
            return window.getTranslation(key);
        }
        return key;
    }

    // Update the pills displayed under active filters row
    function updateActiveFilters() {
        if (!activeFiltersContainer) return;
        
        // Remove existing pills (keep clear all button if it is in the DOM)
        const existingPills = activeFiltersContainer.querySelectorAll('.active-filter-pill');
        existingPills.forEach(p => p.remove());

        let count = 0;
        
        // Add pills for checked checkboxes
        checkboxes.forEach(cb => {
            if (cb.checked) {
                count++;
                const labelElement = cb.closest('.filter-checkbox-label');
                const labelText = labelElement ? labelElement.textContent.trim() : cb.value;
                const filterId = cb.id;

                const pill = document.createElement('span');
                pill.className = 'active-filter-pill';
                pill.innerHTML = `
                    ${labelText}
                    <button class="active-filter-pill-remove" data-target="${filterId}">&times;</button>
                `;
                
                // Add event listener to remove pill button
                pill.querySelector('.active-filter-pill-remove').addEventListener('click', (e) => {
                    const targetId = e.currentTarget.getAttribute('data-target');
                    const targetCb = document.getElementById(targetId);
                    if (targetCb) {
                        targetCb.checked = false;
                        // Trigger change event to redraw and filter
                        targetCb.dispatchEvent(new Event('change'));
                    }
                });

                // Append pill
                activeFiltersContainer.insertBefore(pill, clearAllBtn);
            }
        });

        // Add pill for search text if any
        if (searchInput && searchInput.value.trim() !== '') {
            count++;
            const searchText = searchInput.value.trim();
            const pill = document.createElement('span');
            pill.className = 'active-filter-pill';
            pill.innerHTML = `
                "${searchText}"
                <button class="active-filter-pill-remove" id="remove-search-pill">&times;</button>
            `;
            
            pill.querySelector('#remove-search-pill').addEventListener('click', () => {
                searchInput.value = '';
                updateActiveFilters();
            });

            activeFiltersContainer.insertBefore(pill, clearAllBtn);
        }

        // Show/hide clear all button and filter container
        if (count > 0) {
            if (clearAllBtn) clearAllBtn.style.display = 'inline-block';
        } else {
            if (clearAllBtn) clearAllBtn.style.display = 'none';
        }
    }

    // Checkboxes change listeners
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateActiveFilters();
        });
    });

    // Search input listener (debounced slightly or on input)
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            updateActiveFilters();
        });
    }

    // Clear all click listener
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            checkboxes.forEach(cb => cb.checked = false);
            if (searchInput) searchInput.value = '';
            updateActiveFilters();
        });
    }

    // Parse URL query parameters to apply filters on page load
    function applyUrlParams() {
        const params = new URLSearchParams(window.location.search);
        let updated = false;

        params.forEach((val, key) => {
            // Support direct query formats like age=0-3, lang=en, format=comics, etc.
            checkboxes.forEach(cb => {
                const group = cb.getAttribute('data-filter-group');
                const cbVal = cb.value.toLowerCase().replace(/\s+/g, '-');
                const cleanVal = val.toLowerCase().replace(/\s+/g, '-');
                
                if (group === key && cbVal === cleanVal) {
                    cb.checked = true;
                    updated = true;

                    // Expand the collapsed group accordion
                    const groupContainer = cb.closest('.filter-group');
                    if (groupContainer && groupContainer.classList.contains('collapsed')) {
                        groupContainer.classList.remove('collapsed');
                    }
                }
            });
        });

        if (updated) {
            updateActiveFilters();
        }
    }

    // Wait a brief moment to let translations engine run, then apply URL params
    setTimeout(applyUrlParams, 200);

    // Monitor language changes to dynamically update pill labels if language switches
    const observer = new MutationObserver(() => {
        updateActiveFilters();
    });
    // Observe language switch triggers by monitoring dataset or class changes on language elements
    const langDropdown = document.getElementById('lang-dropdown');
    if (langDropdown) {
        observer.observe(langDropdown, { attributes: true, subtree: true });
    }
});
