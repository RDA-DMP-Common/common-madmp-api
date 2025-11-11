/**
 * Session Manager
 * Handles saving, loading, and managing comparison sessions
 */

const SessionManager = {
    maxSessions: 20,
    storageKey: 'madmp-sessions',
    bookmarksKey: 'madmp-bookmarks',

    /**
     * Save current session
     * @param {string} name - Session name (optional)
     * @returns {object} - Saved session
     */
    saveSession(name = null) {
        const store = useStore.getState();

        if (!store.inputJSON) {
            Utils.showToast('No input data to save', 'warning');
            return null;
        }

        const session = {
            id: Utils.generateId(),
            name: name || this.generateSessionName(),
            timestamp: new Date().toISOString(),
            inputJSON: store.inputJSON,
            outputJSON: store.outputJSON,
            inputValidation: store.inputValidation,
            outputValidation: store.outputValidation,
            diffResult: store.diffResult,
            diffStats: store.diffStats,
            apiEndpoint: store.apiEndpoint
        };

        // Get existing sessions
        const sessions = this.getSessions();

        // Add new session at beginning
        sessions.unshift(session);

        // Keep only max sessions
        if (sessions.length > this.maxSessions) {
            sessions.splice(this.maxSessions);
        }

        // Save to localStorage
        Utils.storage.set(this.storageKey, sessions);

        Utils.showToast('Session saved successfully', 'success');

        return session;
    },

    /**
     * Load session by ID
     * @param {string} sessionId - Session ID
     */
    loadSession(sessionId) {
        const sessions = this.getSessions();
        const session = sessions.find(s => s.id === sessionId);

        if (!session) {
            Utils.showToast('Session not found', 'error');
            return;
        }

        const store = useStore.getState();

        // Restore session data
        store.setInputJSON(session.inputJSON);
        store.setOutputJSON(session.outputJSON);
        store.setInputValidation(session.inputValidation);
        store.setOutputValidation(session.outputValidation);

        if (session.apiEndpoint) {
            store.setAPIEndpoint(session.apiEndpoint);
            const input = document.getElementById('apiEndpoint');
            if (input) input.value = session.apiEndpoint;
        }

        // Restore diff
        if (session.diffResult) {
            store.set({ diffResult: session.diffResult, diffStats: session.diffStats });
        }

        // Render validations
        if (session.inputValidation) {
            Validator.renderValidation(session.inputValidation, 'inputValidationStatus');
        }

        if (session.outputValidation) {
            Validator.renderValidation(session.outputValidation, 'outputValidationStatus');
        }

        // Refresh views
        App.refreshAllViews();

        Utils.showToast(`Loaded session: ${session.name}`, 'success');
    },

    /**
     * Get all sessions
     * @returns {array} - Sessions array
     */
    getSessions() {
        return Utils.storage.get(this.storageKey, []);
    },

    /**
     * Delete session
     * @param {string} sessionId - Session ID
     */
    deleteSession(sessionId) {
        const sessions = this.getSessions();
        const filtered = sessions.filter(s => s.id !== sessionId);

        Utils.storage.set(this.storageKey, filtered);
        this.renderHistory();

        Utils.showToast('Session deleted', 'success');
    },

    /**
     * Clear all sessions
     */
    clearAllSessions() {
        if (confirm('Are you sure you want to clear all session history?')) {
            Utils.storage.remove(this.storageKey);
            this.renderHistory();
            Utils.showToast('All sessions cleared', 'success');
        }
    },

    /**
     * Generate session name
     * @returns {string} - Session name
     */
    generateSessionName() {
        const store = useStore.getState();
        const timestamp = new Date().toLocaleString();

        let name = `Session ${timestamp}`;

        if (store.inputJSON && store.inputJSON.dmp && store.inputJSON.dmp.title) {
            name = `${store.inputJSON.dmp.title} - ${timestamp}`;
        }

        return name;
    },

    /**
     * Render session history
     */
    renderHistory() {
        const container = document.getElementById('sessionHistory');
        if (!container) return;

        const sessions = this.getSessions();
        const bookmarks = this.getBookmarks();

        if (sessions.length === 0) {
            container.innerHTML = `
                <div class="empty-state p-3">
                    <i class="bi bi-clock-history"></i>
                    <p class="mb-0 mt-2">No saved sessions</p>
                </div>
            `;
            return;
        }

        let html = '<div class="list-group list-group-flush">';

        sessions.forEach(session => {
            const isBookmarked = bookmarks.includes(session.id);
            const date = new Date(session.timestamp);
            const timeAgo = this.getTimeAgo(date);

            html += `
                <div class="list-group-item session-item" data-session-id="${session.id}">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center mb-1">
                                <button class="btn btn-link btn-sm p-0 me-2 bookmark-btn ${isBookmarked ? 'bookmarked' : ''}"
                                        data-session-id="${session.id}"
                                        title="${isBookmarked ? 'Remove bookmark' : 'Bookmark'}">
                                    <i class="bi bi-${isBookmarked ? 'star-fill' : 'star'}"></i>
                                </button>
                                <h6 class="mb-0">${Utils.escapeHTML(session.name)}</h6>
                            </div>
                            <small class="text-muted">
                                <i class="bi bi-clock"></i> ${timeAgo}
                            </small>
                            ${this.renderSessionStats(session)}
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary load-session-btn"
                                    data-session-id="${session.id}"
                                    title="Load session">
                                <i class="bi bi-folder-open"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-session-btn"
                                    data-session-id="${session.id}"
                                    title="Delete session">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        container.innerHTML = html;

        // Attach event listeners
        this.attachHistoryListeners();
    },

    /**
     * Render session statistics
     * @param {object} session - Session object
     * @returns {string} - HTML
     */
    renderSessionStats(session) {
        if (!session.diffStats) return '';

        return `
            <div class="mt-2">
                <span class="badge bg-success me-1">${session.diffStats.added} added</span>
                <span class="badge bg-danger me-1">${session.diffStats.removed} removed</span>
                <span class="badge bg-warning me-1">${session.diffStats.modified} modified</span>
            </div>
        `;
    },

    /**
     * Attach event listeners to history items
     */
    attachHistoryListeners() {
        // Load session buttons
        document.querySelectorAll('.load-session-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const sessionId = btn.getAttribute('data-session-id');
                this.loadSession(sessionId);
            });
        });

        // Delete session buttons
        document.querySelectorAll('.delete-session-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const sessionId = btn.getAttribute('data-session-id');
                if (confirm('Delete this session?')) {
                    this.deleteSession(sessionId);
                }
            });
        });

        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const sessionId = btn.getAttribute('data-session-id');
                this.toggleBookmark(sessionId);
            });
        });
    },

    /**
     * Get bookmarks
     * @returns {array} - Bookmarked session IDs
     */
    getBookmarks() {
        return Utils.storage.get(this.bookmarksKey, []);
    },

    /**
     * Toggle bookmark for session
     * @param {string} sessionId - Session ID
     */
    toggleBookmark(sessionId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(sessionId);

        if (index > -1) {
            bookmarks.splice(index, 1);
            Utils.showToast('Bookmark removed', 'info');
        } else {
            bookmarks.push(sessionId);
            Utils.showToast('Session bookmarked', 'success');
        }

        Utils.storage.set(this.bookmarksKey, bookmarks);
        this.renderHistory();
    },

    /**
     * Get time ago string
     * @param {Date} date - Date
     * @returns {string} - Time ago string
     */
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }

        return 'Just now';
    },

    /**
     * Export session
     * @param {string} sessionId - Session ID
     */
    exportSession(sessionId) {
        const sessions = this.getSessions();
        const session = sessions.find(s => s.id === sessionId);

        if (!session) return;

        const content = JSON.stringify(session, null, 2);
        const filename = `madmp-session-${session.id}.json`;

        Utils.downloadFile(content, filename);
        Utils.showToast('Session exported', 'success');
    },

    /**
     * Import session from file
     * @param {File} file - Session file
     */
    async importSession(file) {
        try {
            const content = await Utils.readFileAsText(file);
            const session = JSON.parse(content);

            // Validate session structure
            if (!session.id || !session.inputJSON) {
                throw new Error('Invalid session file');
            }

            // Add to sessions
            const sessions = this.getSessions();
            sessions.unshift(session);

            if (sessions.length > this.maxSessions) {
                sessions.splice(this.maxSessions);
            }

            Utils.storage.set(this.storageKey, sessions);
            this.renderHistory();

            Utils.showToast('Session imported successfully', 'success');
        } catch (error) {
            Utils.showToast('Error importing session: ' + error.message, 'error');
        }
    }
};
