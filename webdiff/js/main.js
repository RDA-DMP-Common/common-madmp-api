/**
 * Main Application Entry Point
 * Initializes the app and sets up event handlers
 */

// Application state
const App = {
    initialized: false,

    /**
     * Initialize the application
     */
    async init() {
        if (this.initialized) return;

        console.log('Initializing maDMP Validator & Diff Tool...');

        // Initialize dark mode
        this.initDarkMode();

        // Set up event listeners
        this.setupEventListeners();

        // Load saved API endpoint
        this.loadAPIEndpoint();

        // Clear all views
        this.clearAllViews();

        // Show welcome message
        Utils.showToast('Welcome to maDMP Validator & Diff Tool!', 'info');

        this.initialized = true;
        console.log('Application initialized successfully');
    },

    /**
     * Initialize dark mode from saved preference
     */
    initDarkMode() {
        const darkMode = Utils.storage.get('darkMode', false);
        if (darkMode) {
            document.body.classList.add('dark-mode');
            const btn = document.getElementById('darkModeToggle');
            if (btn) {
                btn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
            }
        }
    },

    /**
     * Load saved API endpoint
     */
    loadAPIEndpoint() {
        const endpoint = Utils.storage.get('apiEndpoint', '');
        const input = document.getElementById('apiEndpoint');
        if (input && endpoint) {
            input.value = endpoint;
            useStore.getState().setAPIEndpoint(endpoint);
        }
    },

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // File upload
        this.setupFileUpload();

        // Drag and drop
        this.setupDragAndDrop();

        // Paste JSON
        this.setupPasteJSON();

        // API controls
        this.setupAPIControls();

        // Dark mode toggle
        this.setupDarkMode();

        // Export/copy controls
        this.setupExportControls();

        // Tab change listeners
        this.setupTabListeners();
    },

    /**
     * Setup file upload
     */
    setupFileUpload() {
        const fileInput = document.getElementById('fileInput');

        if (fileInput) {
            // Enable multiple file selection
            fileInput.setAttribute('multiple', 'multiple');

            fileInput.addEventListener('change', async (e) => {
                const files = Array.from(e.target.files);
                if (files.length === 0) return;

                const store = useStore.getState();
                const addToLibrary = store.addToLibrary;

                try {
                    Utils.toggleLoading(true);

                    if (addToLibrary) {
                        // Add all files to library
                        for (const file of files) {
                            const content = await Utils.readFileAsText(file);
                            FileLibrary.addFile(content, file.name, 'upload');
                        }

                        if (files.length === 1) {
                            Utils.showToast('File added to library', 'success');
                        } else {
                            Utils.showToast(`${files.length} files added to library`, 'success');
                        }
                    } else {
                        // Original behavior: use first file as input
                        const file = files[0];
                        const content = await Utils.readFileAsText(file);
                        await this.processInputJSON(content);
                        Utils.showToast('File loaded successfully', 'success');
                    }
                } catch (error) {
                    Utils.showToast('Error loading file: ' + error.message, 'error');
                } finally {
                    Utils.toggleLoading(false);
                    // Clear input to allow re-upload of same file
                    e.target.value = '';
                }
            });
        }
    },

    /**
     * Setup drag and drop
     */
    setupDragAndDrop() {
        const dropZone = document.getElementById('dropZone');

        if (dropZone) {
            // Click to browse
            dropZone.addEventListener('click', () => {
                const fileInput = document.getElementById('fileInput');
                if (fileInput) fileInput.click();
            });

            // Drag over
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            // Drag leave
            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            // Drop
            dropZone.addEventListener('drop', async (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');

                const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.json'));
                if (files.length === 0) {
                    Utils.showToast('Please drop JSON file(s)', 'warning');
                    return;
                }

                const store = useStore.getState();
                const addToLibrary = store.addToLibrary;

                try {
                    Utils.toggleLoading(true);

                    if (addToLibrary) {
                        // Add all files to library
                        for (const file of files) {
                            const content = await Utils.readFileAsText(file);
                            FileLibrary.addFile(content, file.name, 'upload');
                        }

                        if (files.length === 1) {
                            Utils.showToast('File added to library', 'success');
                        } else {
                            Utils.showToast(`${files.length} files added to library`, 'success');
                        }
                    } else {
                        // Original behavior: use first file as input
                        const file = files[0];
                        const content = await Utils.readFileAsText(file);
                        await this.processInputJSON(content);
                        Utils.showToast('File loaded successfully', 'success');
                    }
                } catch (error) {
                    Utils.showToast('Error loading file: ' + error.message, 'error');
                } finally {
                    Utils.toggleLoading(false);
                }
            });
        }
    },

    /**
     * Setup paste JSON
     */
    setupPasteJSON() {
        const pasteArea = document.getElementById('pasteArea');
        const loadBtn = document.getElementById('loadPastedJson');

        if (loadBtn && pasteArea) {
            loadBtn.addEventListener('click', async () => {
                const content = pasteArea.value.trim();

                if (!content) {
                    Utils.showToast('Please paste JSON content first', 'warning');
                    return;
                }

                try {
                    Utils.toggleLoading(true);

                    await this.processInputJSON(content);

                    Utils.showToast('JSON loaded successfully', 'success');
                    pasteArea.value = ''; // Clear textarea
                } catch (error) {
                    Utils.showToast('Error loading JSON: ' + error.message, 'error');
                } finally {
                    Utils.toggleLoading(false);
                }
            });
        }
    },

    /**
     * Setup API controls
     */
    setupAPIControls() {
        const endpointInput = document.getElementById('apiEndpoint');
        const sendBtn = document.getElementById('sendToApi');
        const testBtn = document.getElementById('testConnection');

        // Save endpoint on change
        if (endpointInput) {
            endpointInput.addEventListener('change', (e) => {
                const endpoint = e.target.value.trim();
                useStore.getState().setAPIEndpoint(endpoint);
            });
        }

        // Send to API
        if (sendBtn) {
            sendBtn.addEventListener('click', async () => {
                await API.send();
            });
        }

        // Test connection
        if (testBtn) {
            testBtn.addEventListener('click', async () => {
                await API.test();
            });
        }
    },

    /**
     * Setup dark mode toggle
     */
    setupDarkMode() {
        const btn = document.getElementById('darkModeToggle');

        if (btn) {
            btn.addEventListener('click', () => {
                useStore.getState().toggleDarkMode();

                if (document.body.classList.contains('dark-mode')) {
                    btn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
                } else {
                    btn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
                }
            });
        }
    },

    /**
     * Setup export controls
     */
    setupExportControls() {
        const copyBtn = document.getElementById('copyDiff');
        const fullscreenBtn = document.getElementById('toggleFullscreen');
        const saveSessionBtn = document.getElementById('saveSession');
        const showShortcutsBtn = document.getElementById('showShortcuts');
        const clearHistoryBtn = document.getElementById('clearHistory');

        // Export formats
        const exportJSON = document.getElementById('exportJSON');
        const exportHTML = document.getElementById('exportHTML');
        const exportPDF = document.getElementById('exportPDF');
        const exportCSV = document.getElementById('exportCSV');
        const exportMarkdown = document.getElementById('exportMarkdown');

        if (exportJSON) {
            exportJSON.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportDiff();
            });
        }

        if (exportHTML) {
            exportHTML.addEventListener('click', (e) => {
                e.preventDefault();
                HTMLExporter.export();
            });
        }

        if (exportPDF) {
            exportPDF.addEventListener('click', (e) => {
                e.preventDefault();
                PDFExporter.export({ includeDetails: false });
            });
        }

        if (exportCSV) {
            exportCSV.addEventListener('click', (e) => {
                e.preventDefault();
                CSVExporter.export();
            });
        }

        if (exportMarkdown) {
            exportMarkdown.addEventListener('click', (e) => {
                e.preventDefault();
                MarkdownExporter.export();
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                await this.copyDiff();
            });
        }

        if (saveSessionBtn) {
            saveSessionBtn.addEventListener('click', () => {
                SessionManager.saveSession();
                SessionManager.renderHistory();
            });
        }

        if (showShortcutsBtn) {
            showShortcutsBtn.addEventListener('click', () => {
                KeyboardShortcuts.showShortcutsModal();
            });
        }

        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                SessionManager.clearAllSessions();
            });
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    },

    /**
     * Setup tab change listeners
     */
    setupTabListeners() {
        // Listen for diff view tab changes
        const diffTabs = ['sidebyside-tab', 'unified-tab', 'jsonata-tab', 'tree-tab'];

        diffTabs.forEach(tabId => {
            const tab = document.getElementById(tabId);
            if (tab) {
                tab.addEventListener('shown.bs.tab', () => {
                    this.refreshCurrentView();
                });
            }
        });
    },

    /**
     * Process input JSON
     * @param {string} jsonString - JSON string
     */
    async processInputJSON(jsonString) {
        // Parse JSON
        const parseResult = Utils.parseJSON(jsonString);

        if (!parseResult.success) {
            throw new Error('Invalid JSON: ' + parseResult.error);
        }

        const jsonData = parseResult.data;

        // Store in state
        const store = useStore.getState();
        store.setInputJSON(jsonData, Utils.formatJSON(jsonData));

        // Validate against schema
        const validation = Validator.validateData(jsonData);
        store.setInputValidation(validation);

        // Render validation result
        Validator.renderValidation(validation, 'inputValidationStatus');

        // Update statistics
        this.updateStatistics();

        // Refresh views if output exists
        if (store.outputJSON) {
            this.refreshAllViews();
        }
    },

    /**
     * Update statistics display
     */
    updateStatistics() {
        const store = useStore.getState();
        const container = document.getElementById('statsContainer');

        if (!container) return;

        let html = '';

        // Input stats
        if (store.inputJSON) {
            const stats = Utils.calculateStats(store.inputJSON);

            html += '<h6 class="mb-2">Input Statistics</h6>';
            html += '<div class="mb-3">';
            html += `<div class="stat-item"><span class="stat-label">Size:</span><span class="stat-value">${Utils.formatBytes(stats.size)}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Objects:</span><span class="stat-value">${stats.totalObjects}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Arrays:</span><span class="stat-value">${stats.totalArrays}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Depth:</span><span class="stat-value">${stats.depth}</span></div>`;
            html += '</div>';
        }

        // Diff stats
        if (store.diffStats) {
            html += '<h6 class="mb-2 mt-3">Diff Statistics</h6>';
            html += '<div>';
            html += `<div class="stat-item"><span class="stat-label">Total Changes:</span><span class="stat-value">${store.diffStats.totalChanges}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Added:</span><span class="stat-value text-success">${store.diffStats.added}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Removed:</span><span class="stat-value text-danger">${store.diffStats.removed}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Modified:</span><span class="stat-value text-warning">${store.diffStats.modified}</span></div>`;
            html += `<div class="stat-item"><span class="stat-label">Change %:</span><span class="stat-value">${store.diffStats.changePercentage}%</span></div>`;
            html += '</div>';
        }

        if (!html) {
            html = '<p class="text-muted">Upload a file to see statistics</p>';
        }

        container.innerHTML = html;
    },

    /**
     * Refresh all diff views
     */
    refreshAllViews() {
        const store = useStore.getState();

        if (!store.inputJSON || !store.outputJSON) {
            this.clearAllViews();
            return;
        }

        // Render all views
        SideBySideRenderer.render(
            store.inputJSONString,
            store.outputJSONString,
            store.diffResult
        );

        UnifiedRenderer.render(
            store.inputJSONString,
            store.outputJSONString,
            store.diffResult
        );

        JSONataRenderer.render(store.diffResult);

        TreeRenderer.render(
            store.inputJSON,
            store.outputJSON,
            store.diffResult
        );

        // Update statistics
        this.updateStatistics();
    },

    /**
     * Refresh current view only
     */
    refreshCurrentView() {
        const store = useStore.getState();

        if (!store.inputJSON || !store.outputJSON) return;

        // Determine active tab
        const activeTab = document.querySelector('.nav-pills .nav-link.active');
        if (!activeTab) return;

        const tabId = activeTab.id;

        switch (tabId) {
            case 'sidebyside-tab':
                SideBySideRenderer.render(
                    store.inputJSONString,
                    store.outputJSONString,
                    store.diffResult
                );
                break;

            case 'unified-tab':
                UnifiedRenderer.render(
                    store.inputJSONString,
                    store.outputJSONString,
                    store.diffResult
                );
                break;

            case 'jsonata-tab':
                JSONataRenderer.render(store.diffResult);
                break;

            case 'tree-tab':
                TreeRenderer.render(
                    store.inputJSON,
                    store.outputJSON,
                    store.diffResult
                );
                break;
        }
    },

    /**
     * Clear all diff views
     */
    clearAllViews() {
        SideBySideRenderer.clear();
        UnifiedRenderer.clear();
        JSONataRenderer.clear();
        TreeRenderer.clear();
    },

    /**
     * Export diff
     */
    exportDiff() {
        const store = useStore.getState();

        if (!store.diffResult) {
            Utils.showToast('No diff available to export', 'warning');
            return;
        }

        const content = DiffEngine.exportAsJSON(store.diffResult, store.diffStats);
        const filename = `madmp-diff-${Date.now()}.json`;

        Utils.downloadFile(content, filename);
        Utils.showToast('Diff exported successfully', 'success');
    },

    /**
     * Copy diff to clipboard
     */
    async copyDiff() {
        const store = useStore.getState();

        if (!store.diffResult) {
            Utils.showToast('No diff available to copy', 'warning');
            return;
        }

        const content = DiffEngine.exportAsText(store.diffResult);
        const success = await Utils.copyToClipboard(content);

        if (success) {
            Utils.showToast('Diff copied to clipboard', 'success');
        } else {
            Utils.showToast('Failed to copy to clipboard', 'error');
        }
    },

    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
        const card = document.querySelector('.col-lg-8 .card');

        if (!card) return;

        if (!document.fullscreenElement) {
            card.requestFullscreen().catch(err => {
                Utils.showToast('Error entering fullscreen: ' + err.message, 'error');
            });
        } else {
            document.exitFullscreen();
        }
    }
};

// Subscribe to store changes
useStore.subscribe((state) => {
    // Auto-refresh views when diff result changes
    if (state.diffResult) {
        App.updateStatistics();

        // Update navigation
        if (typeof DiffNavigation !== 'undefined') {
            DiffNavigation.buildChangesList(state.diffResult);
        }

        // Update filter counts
        if (typeof DiffSearch !== 'undefined') {
            DiffSearch.updateFilterCounts();
        }

        // Render session history
        if (typeof SessionManager !== 'undefined') {
            SessionManager.renderHistory();
        }
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    Utils.showToast('An error occurred: ' + e.error.message, 'error');
});

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
    Utils.showToast('An error occurred: ' + e.reason, 'error');
});
