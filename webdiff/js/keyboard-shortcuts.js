/**
 * Keyboard Shortcuts Module
 * Provides keyboard navigation and shortcuts
 */

const KeyboardShortcuts = {
    shortcuts: {},
    enabled: true,

    /**
     * Initialize keyboard shortcuts
     */
    init() {
        this.registerShortcuts();
        this.attachEventListeners();
    },

    /**
     * Register all shortcuts
     */
    registerShortcuts() {
        // File operations
        this.registerShortcut('ctrl+o', 'Open file', () => {
            document.getElementById('fileInput')?.click();
        });

        this.registerShortcut('ctrl+s', 'Save session', () => {
            SessionManager.saveSession();
        });

        this.registerShortcut('ctrl+e', 'Export diff', () => {
            App.exportDiff();
        });

        // Navigation
        this.registerShortcut('alt+left', 'Previous change', () => {
            DiffNavigation.previous();
        });

        this.registerShortcut('alt+right', 'Next change', () => {
            DiffNavigation.next();
        });

        this.registerShortcut('alt+up', 'Previous change', () => {
            DiffNavigation.previous();
        });

        this.registerShortcut('alt+down', 'Next change', () => {
            DiffNavigation.next();
        });

        // Search
        this.registerShortcut('ctrl+f', 'Focus search', () => {
            document.getElementById('diffSearch')?.focus();
        });

        this.registerShortcut('f3', 'Next search result', () => {
            DiffSearch.nextMatch();
        });

        this.registerShortcut('shift+f3', 'Previous search result', () => {
            DiffSearch.previousMatch();
        });

        this.registerShortcut('esc', 'Clear search', () => {
            DiffSearch.clearSearch();
        });

        // View switching
        this.registerShortcut('ctrl+1', 'Unified view', () => {
            document.getElementById('unified-tab')?.click();
        });

        this.registerShortcut('ctrl+2', 'Side-by-side view', () => {
            document.getElementById('sidebyside-tab')?.click();
        });

        this.registerShortcut('ctrl+3', 'JSONata view', () => {
            document.getElementById('jsonata-tab')?.click();
        });

        this.registerShortcut('ctrl+4', 'Tree view', () => {
            document.getElementById('tree-tab')?.click();
        });

        // Dark mode
        this.registerShortcut('ctrl+d', 'Toggle dark mode', () => {
            document.getElementById('darkModeToggle')?.click();
        });

        // Sidebar
        this.registerShortcut('ctrl+b', 'Toggle sidebar', () => {
            if (window.SidebarToggle) {
                window.SidebarToggle.toggle();
            }
        });

        // Fullscreen
        this.registerShortcut('f11', 'Toggle fullscreen', () => {
            App.toggleFullscreen();
        });

        // Help
        this.registerShortcut('?', 'Show shortcuts', () => {
            this.showShortcutsModal();
        });

        // API
        this.registerShortcut('ctrl+enter', 'Send to API', () => {
            document.getElementById('sendToApi')?.click();
        });
    },

    /**
     * Register a keyboard shortcut
     * @param {string} keys - Key combination (e.g., 'ctrl+s')
     * @param {string} description - Description
     * @param {Function} handler - Handler function
     */
    registerShortcut(keys, description, handler) {
        this.shortcuts[keys.toLowerCase()] = {
            keys,
            description,
            handler
        };
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.enabled) return;

            // Don't trigger shortcuts when typing in input fields
            const activeElement = document.activeElement;
            if (activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.isContentEditable
            )) {
                // Allow some shortcuts even in inputs
                if (!['esc', 'f3', 'shift+f3'].includes(this.getKeyCombo(e))) {
                    return;
                }
            }

            const combo = this.getKeyCombo(e);
            const shortcut = this.shortcuts[combo];

            if (shortcut) {
                e.preventDefault();
                shortcut.handler();
            }
        });
    },

    /**
     * Get key combination from event
     * @param {KeyboardEvent} e - Keyboard event
     * @returns {string} - Key combination
     */
    getKeyCombo(e) {
        const parts = [];

        if (e.ctrlKey) parts.push('ctrl');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey) parts.push('shift');
        if (e.metaKey) parts.push('meta');

        const key = e.key.toLowerCase();

        // Handle special keys
        if (key === 'escape') parts.push('esc');
        else if (key === 'arrowleft') parts.push('left');
        else if (key === 'arrowright') parts.push('right');
        else if (key === 'arrowup') parts.push('up');
        else if (key === 'arrowdown') parts.push('down');
        else if (key !== 'control' && key !== 'alt' && key !== 'shift' && key !== 'meta') {
            parts.push(key);
        }

        return parts.join('+');
    },

    /**
     * Show shortcuts modal
     */
    showShortcutsModal() {
        let modal = document.getElementById('shortcutsModal');

        if (!modal) {
            // Create modal
            const modalHTML = `
                <div class="modal fade" id="shortcutsModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="bi bi-keyboard"></i> Keyboard Shortcuts
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${this.renderShortcutsList()}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('shortcutsModal');
        }

        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    },

    /**
     * Render shortcuts list HTML
     * @returns {string} - HTML
     */
    renderShortcutsList() {
        const categories = {
            'File Operations': ['ctrl+o', 'ctrl+s', 'ctrl+e'],
            'Navigation': ['alt+left', 'alt+right', 'alt+up', 'alt+down'],
            'Search': ['ctrl+f', 'f3', 'shift+f3', 'esc'],
            'View Switching': ['ctrl+1', 'ctrl+2', 'ctrl+3', 'ctrl+4'],
            'Other': ['ctrl+b', 'ctrl+d', 'f11', '?', 'ctrl+enter']
        };

        let html = '';

        Object.entries(categories).forEach(([category, keys]) => {
            html += `<h6 class="mt-3 mb-2">${category}</h6>`;
            html += '<table class="table table-sm">';

            keys.forEach(key => {
                const shortcut = this.shortcuts[key];
                if (shortcut) {
                    html += `
                        <tr>
                            <td style="width: 30%">
                                <kbd class="px-2 py-1">${this.formatKeys(shortcut.keys)}</kbd>
                            </td>
                            <td>${shortcut.description}</td>
                        </tr>
                    `;
                }
            });

            html += '</table>';
        });

        return html;
    },

    /**
     * Format keys for display
     * @param {string} keys - Key combination
     * @returns {string} - Formatted keys
     */
    formatKeys(keys) {
        return keys.toUpperCase()
            .replace('CTRL', '⌃')
            .replace('ALT', '⌥')
            .replace('SHIFT', '⇧')
            .replace('META', '⌘')
            .replace('LEFT', '←')
            .replace('RIGHT', '→')
            .replace('UP', '↑')
            .replace('DOWN', '↓')
            .replace('ESC', 'Esc')
            .replace('ENTER', '↵');
    },

    /**
     * Enable shortcuts
     */
    enable() {
        this.enabled = true;
    },

    /**
     * Disable shortcuts
     */
    disable() {
        this.enabled = false;
    }
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => KeyboardShortcuts.init());
} else {
    KeyboardShortcuts.init();
}
