/**
 * Diff Search and Filter Module
 * Provides search and filtering capabilities for diff results
 */

const DiffSearch = {
    currentQuery: '',
    currentFilters: {
        added: true,
        removed: true,
        modified: true,
        unchanged: false
    },
    matchedResults: [],
    currentMatchIndex: -1,

    /**
     * Initialize search functionality
     */
    init() {
        this.attachEventListeners();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Search input
        const searchInput = document.getElementById('diffSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.previousMatch();
                    } else {
                        this.nextMatch();
                    }
                }
            });
        }

        // Filter checkboxes
        ['added', 'removed', 'modified', 'unchanged'].forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    this.currentFilters[type] = e.target.checked;
                    this.applyFilters();
                });
            }
        });

        // Clear search button
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    },

    /**
     * Perform search
     * @param {string} query - Search query
     */
    performSearch(query) {
        this.currentQuery = query.toLowerCase().trim();

        if (!this.currentQuery) {
            this.clearHighlights();
            this.updateSearchStatus('');
            return;
        }

        const store = useStore.getState();
        if (!store.diffResult) {
            return;
        }

        // Search in all changes
        this.matchedResults = [];
        const allChanges = [
            ...store.diffResult.added.map(c => ({ ...c, type: 'added' })),
            ...store.diffResult.removed.map(c => ({ ...c, type: 'removed' })),
            ...store.diffResult.modified.map(c => ({ ...c, type: 'modified' }))
        ];

        allChanges.forEach(change => {
            const pathMatch = change.path.toLowerCase().includes(this.currentQuery);
            const valueMatch = this.valueContainsQuery(change);

            if (pathMatch || valueMatch) {
                this.matchedResults.push(change);
            }
        });

        // Highlight matches
        this.highlightMatches();

        // Update status
        this.updateSearchStatus(`${this.matchedResults.length} match${this.matchedResults.length !== 1 ? 'es' : ''} found`);

        // Jump to first match
        if (this.matchedResults.length > 0) {
            this.currentMatchIndex = 0;
            this.scrollToMatch(0);
        }
    },

    /**
     * Check if value contains query
     * @param {object} change - Change object
     * @returns {boolean} - Contains query
     */
    valueContainsQuery(change) {
        if (!this.currentQuery) return false;

        const searchIn = (value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') {
                return value.toLowerCase().includes(this.currentQuery);
            }
            if (typeof value === 'object') {
                return JSON.stringify(value).toLowerCase().includes(this.currentQuery);
            }
            return String(value).toLowerCase().includes(this.currentQuery);
        };

        if (change.value !== undefined) {
            return searchIn(change.value);
        }

        if (change.oldValue !== undefined || change.newValue !== undefined) {
            return searchIn(change.oldValue) || searchIn(change.newValue);
        }

        return false;
    },

    /**
     * Highlight search matches
     */
    highlightMatches() {
        this.clearHighlights();

        if (!this.currentQuery || this.matchedResults.length === 0) return;

        // Highlight in all diff views
        this.matchedResults.forEach((match, index) => {
            const elements = document.querySelectorAll(`[data-path="${match.path}"]`);
            elements.forEach(el => {
                el.classList.add('search-match');
                el.setAttribute('data-match-index', index);
            });
        });
    },

    /**
     * Clear all search highlights
     */
    clearHighlights() {
        document.querySelectorAll('.search-match').forEach(el => {
            el.classList.remove('search-match', 'search-match-current');
            el.removeAttribute('data-match-index');
        });
    },

    /**
     * Scroll to match
     * @param {number} index - Match index
     */
    scrollToMatch(index) {
        if (index < 0 || index >= this.matchedResults.length) return;

        this.currentMatchIndex = index;

        // Remove current highlight
        document.querySelectorAll('.search-match-current').forEach(el => {
            el.classList.remove('search-match-current');
        });

        // Add current highlight
        const elements = document.querySelectorAll(`[data-match-index="${index}"]`);
        if (elements.length > 0) {
            elements.forEach(el => el.classList.add('search-match-current'));
            elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Update status
        this.updateSearchStatus(`Match ${index + 1} of ${this.matchedResults.length}`);
    },

    /**
     * Next match
     */
    nextMatch() {
        if (this.matchedResults.length === 0) return;

        const nextIndex = (this.currentMatchIndex + 1) % this.matchedResults.length;
        this.scrollToMatch(nextIndex);
    },

    /**
     * Previous match
     */
    previousMatch() {
        if (this.matchedResults.length === 0) return;

        const prevIndex = this.currentMatchIndex - 1 < 0 ?
            this.matchedResults.length - 1 :
            this.currentMatchIndex - 1;
        this.scrollToMatch(prevIndex);
    },

    /**
     * Clear search
     */
    clearSearch() {
        const searchInput = document.getElementById('diffSearch');
        if (searchInput) {
            searchInput.value = '';
        }

        this.currentQuery = '';
        this.matchedResults = [];
        this.currentMatchIndex = -1;

        this.clearHighlights();
        this.updateSearchStatus('');
    },

    /**
     * Update search status display
     * @param {string} status - Status message
     */
    updateSearchStatus(status) {
        const statusEl = document.getElementById('searchStatus');
        if (statusEl) {
            statusEl.textContent = status;
        }
    },

    /**
     * Apply filters to diff views
     */
    applyFilters() {
        const store = useStore.getState();
        if (!store.diffResult) return;

        // Get all diff elements
        const diffElements = document.querySelectorAll('.diff-line, .tree-node, .jsonata-query-block, .unified-line');

        diffElements.forEach(el => {
            const changeType = this.getElementChangeType(el);

            if (changeType && !this.currentFilters[changeType]) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        });

        // Update filter badge counts
        this.updateFilterCounts();
    },

    /**
     * Get change type of element
     * @param {HTMLElement} el - Element
     * @returns {string|null} - Change type
     */
    getElementChangeType(el) {
        if (el.classList.contains('added') || el.classList.contains('addition')) return 'added';
        if (el.classList.contains('removed') || el.classList.contains('deletion')) return 'removed';
        if (el.classList.contains('modified') || el.classList.contains('modification')) return 'modified';
        if (el.classList.contains('unchanged') || el.classList.contains('context')) return 'unchanged';
        return null;
    },

    /**
     * Update filter counts
     */
    updateFilterCounts() {
        const store = useStore.getState();
        if (!store.diffStats) return;

        const counts = {
            added: store.diffStats.added,
            removed: store.diffStats.removed,
            modified: store.diffStats.modified,
            unchanged: store.diffStats.unchanged
        };

        Object.keys(counts).forEach(type => {
            const badge = document.getElementById(`filter-${type}-count`);
            if (badge) {
                badge.textContent = counts[type];
            }
        });
    },

    /**
     * Reset filters to default
     */
    resetFilters() {
        this.currentFilters = {
            added: true,
            removed: true,
            modified: true,
            unchanged: false
        };

        // Update checkboxes
        Object.keys(this.currentFilters).forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            if (checkbox) {
                checkbox.checked = this.currentFilters[type];
            }
        });

        this.applyFilters();
    },

    /**
     * Get filter summary
     * @returns {string} - Summary text
     */
    getFilterSummary() {
        const active = Object.keys(this.currentFilters).filter(k => this.currentFilters[k]);
        if (active.length === 4) return 'Showing all changes';
        if (active.length === 0) return 'Hiding all changes';
        return `Showing: ${active.join(', ')}`;
    }
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DiffSearch.init());
} else {
    DiffSearch.init();
}
