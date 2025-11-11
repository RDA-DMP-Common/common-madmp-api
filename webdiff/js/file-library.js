/**
 * File Library Manager
 * Handles multiple JSON file uploads and comparison selection
 *
 * @fileoverview Manages a library of uploaded maDMP JSON files,
 * allowing users to upload multiple files and select any two for comparison
 *
 * @version 1.0.0
 */

const FileLibrary = {
    /**
     * Initialize file library
     * - Load persisted files if enabled
     * - Preload example files if library is empty
     * - Set up event listeners
     * - Render initial UI
     */
    async init() {
        console.log('Initializing File Library...');

        // Load persisted files from localStorage
        this.loadPersistedFiles();

        // Preload example files if library is empty
        await this.preloadExampleFiles();

        // Render file list
        this.render();

        // Set up event listeners
        this.setupEventListeners();

        console.log('File Library initialized');
    },

    /**
     * Load persisted files from localStorage
     */
    loadPersistedFiles() {
        const store = useStore.getState();

        if (store.persistFiles) {
            const savedFiles = Utils.storage.get('madmp-file-library', []);
            if (savedFiles.length > 0) {
                console.log(`Loading ${savedFiles.length} persisted files`);
                store.importFileLibrary(savedFiles, false);
            }
        }
    },

    /**
     * Preload example files from examples folder
     * Only loads if the library is empty to avoid duplicates
     */
    async preloadExampleFiles() {
        const store = useStore.getState();

        // Only preload if library is empty
        if (store.uploadedFiles.length > 0) {
            console.log('File library not empty, skipping example preload');
            return;
        }

        console.log('Preloading example files...');

        const exampleFiles = [
            'examples/JSON/ex1-header-fundedProject.json',
            'examples/JSON/ex2-dataset-planned.json',
            'examples/JSON/ex3-dataset-finished.json',
            'examples/JSON/missing-title.json',
            'examples/JSON/missing-dataset.json'
        ];

        for (const filePath of exampleFiles) {
            try {
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    const filename = filePath.split('/').pop();

                    // Create file object and add to library silently (no toast)
                    const fileObj = this.createFileObject(content, filename, 'example');
                    store.addFile(fileObj);
                    console.log(`Preloaded: ${filename}`);
                } else {
                    console.warn(`Failed to load example file: ${filePath}`);
                }
            } catch (error) {
                console.warn(`Error loading example file ${filePath}:`, error);
            }
        }

        console.log(`Preloaded ${store.uploadedFiles.length} example files`);
    },

    /**
     * Create a file object from uploaded data
     * @param {string} content - JSON content as string
     * @param {string} filename - Original filename
     * @param {string} source - Source of file ('upload' or 'api')
     * @returns {object} - File object
     */
    createFileObject(content, filename, source = 'upload') {
        // Parse JSON
        const parseResult = Utils.parseJSON(content);
        if (!parseResult.success) {
            throw new Error('Invalid JSON: ' + parseResult.error);
        }

        const jsonData = parseResult.data;
        const formattedString = Utils.formatJSON(jsonData);

        // Validate
        const validation = Validator.validateData(jsonData);

        // Calculate stats
        const stats = Utils.calculateStats(jsonData);

        // Generate unique ID
        const id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Extract display name from DMP title or use filename
        let displayName = filename.replace(/\.json$/i, '');
        if (jsonData.dmp && jsonData.dmp.title) {
            displayName = jsonData.dmp.title;
        }

        return {
            id: id,
            name: displayName,
            originalName: filename,
            content: jsonData,
            contentString: formattedString,
            validation: validation,
            timestamp: new Date().toISOString(),
            stats: stats,
            source: source
        };
    },

    /**
     * Add file to library
     * @param {string} content - JSON content
     * @param {string} filename - Filename
     * @param {string} source - Source ('upload' or 'api')
     */
    addFile(content, filename, source = 'upload') {
        try {
            const fileObj = this.createFileObject(content, filename, source);
            const store = useStore.getState();
            store.addFile(fileObj);
            this.render();
            Utils.showToast(`Added "${fileObj.name}" to library`, 'success');
        } catch (error) {
            Utils.showToast('Error adding file: ' + error.message, 'error');
            throw error;
        }
    },

    /**
     * Remove file from library
     * @param {string} fileId - File ID
     */
    removeFile(fileId) {
        const store = useStore.getState();
        const file = store.getFileById(fileId);

        if (file && confirm(`Remove "${file.name}" from library?`)) {
            store.removeFile(fileId);
            this.render();
            Utils.showToast('File removed', 'success');
        }
    },

    /**
     * Rename file
     * @param {string} fileId - File ID
     */
    renameFile(fileId) {
        const store = useStore.getState();
        const file = store.getFileById(fileId);

        if (file) {
            const newName = prompt('Enter new name:', file.name);
            if (newName && newName.trim() && newName !== file.name) {
                store.renameFile(fileId, newName.trim());
                this.render();
                Utils.showToast('File renamed', 'success');
            }
        }
    },

    /**
     * Clear all files from library
     */
    clearAll() {
        const store = useStore.getState();
        if (store.uploadedFiles.length > 0) {
            if (confirm('Remove all files from library? This cannot be undone.')) {
                store.clearAllFiles();
                this.render();
                Utils.showToast('All files removed', 'success');
            }
        }
    },

    /**
     * Handle file selection for comparison
     * @param {string} fileId - File ID
     * @param {string} side - 'left' or 'right'
     */
    selectFile(fileId, side) {
        const store = useStore.getState();
        const currentLeft = store.selectedLeftFile;
        const currentRight = store.selectedRightFile;

        if (side === 'left') {
            store.setSelectedFiles(fileId, currentRight);
        } else {
            store.setSelectedFiles(currentLeft, fileId);
        }

        this.render();

        // Auto-trigger comparison if both files are now selected
        if (store.selectedLeftFile && store.selectedRightFile) {
            const leftFile = store.getFileById(store.selectedLeftFile);
            const rightFile = store.getFileById(store.selectedRightFile);

            // Set the input and output JSON for comparison
            store.setInputJSON(leftFile.content, leftFile.contentString);
            store.setOutputJSON(rightFile.content, rightFile.contentString);

            // Calculate diff using the store method
            store.calculateDiff();

            // Render all views
            if (typeof App !== 'undefined' && App.refreshAllViews) {
                App.refreshAllViews();
            }

            Utils.showToast(`Comparing: ${leftFile.name} ↔ ${rightFile.name}`, 'info');
        }
    },

    /**
     * Export file library
     */
    exportLibrary() {
        const store = useStore.getState();
        const json = store.exportFileLibrary();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `madmp-library-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Utils.showToast('Library exported', 'success');
    },

    /**
     * Import file library
     */
    importLibrary() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const content = await Utils.readFileAsText(file);
                const parseResult = Utils.parseJSON(content);

                if (!parseResult.success) {
                    throw new Error('Invalid JSON file');
                }

                const filesData = parseResult.data;
                if (!Array.isArray(filesData)) {
                    throw new Error('Invalid library format: expected array of files');
                }

                const merge = confirm('Merge with existing files? (Cancel to replace)');
                const store = useStore.getState();
                store.importFileLibrary(filesData, merge);
                this.render();
                Utils.showToast(`Imported ${filesData.length} files`, 'success');
            } catch (error) {
                Utils.showToast('Error importing library: ' + error.message, 'error');
            }
        };

        input.click();
    },

    /**
     * Toggle persistence setting
     */
    togglePersistence() {
        const store = useStore.getState();
        store.toggleFilePersistence();
        this.render();

        const enabled = store.persistFiles;
        Utils.showToast(
            enabled ? 'File persistence enabled' : 'File persistence disabled',
            'info'
        );
    },

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Clear all button
        const clearAllBtn = document.getElementById('clearAllFiles');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAll());
        }

        // Export library button
        const exportBtn = document.getElementById('exportLibrary');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportLibrary());
        }

        // Import library button
        const importBtn = document.getElementById('importLibrary');
        if (importBtn) {
            importBtn.addEventListener('click', () => this.importLibrary());
        }

        // Persistence toggle
        const persistToggle = document.getElementById('persistFilesToggle');
        if (persistToggle) {
            persistToggle.addEventListener('change', () => this.togglePersistence());
        }

        // Add to library checkbox
        const addToLibraryCheck = document.getElementById('addToLibraryCheck');
        if (addToLibraryCheck) {
            addToLibraryCheck.addEventListener('change', (e) => {
                const store = useStore.getState();
                store.toggleAddToLibrary();
            });
        }
    },

    /**
     * Render file library UI
     */
    render() {
        const container = document.getElementById('fileLibraryList');
        if (!container) return;

        const store = useStore.getState();
        const files = store.uploadedFiles;
        const selectedLeft = store.selectedLeftFile;
        const selectedRight = store.selectedRightFile;

        // Update file count in header
        const countElement = document.getElementById('fileLibraryCount');
        if (countElement) {
            countElement.textContent = files.length;
        }

        // Empty state
        if (files.length === 0) {
            container.innerHTML = `
                <div class="empty-state p-3 text-center">
                    <i class="bi bi-folder2-open" style="font-size: 2rem; opacity: 0.5;"></i>
                    <p class="mb-0 mt-2 text-muted">No files in library</p>
                    <small class="text-muted">Upload files to get started</small>
                </div>
            `;
            return;
        }

        // Render file list
        const html = files.map(file => {
            const isLeft = selectedLeft === file.id;
            const isRight = selectedRight === file.id;
            const validationBadge = file.validation.valid
                ? '<span class="badge bg-success"><i class="bi bi-check-circle"></i> Valid</span>'
                : `<span class="badge bg-danger"><i class="bi bi-exclamation-triangle"></i> ${file.validation.errors.length} errors</span>`;

            const fileSize = file.stats.size ? `${(file.stats.size / 1024).toFixed(1)}KB` : 'N/A';
            const timeAgo = this.getTimeAgo(new Date(file.timestamp));

            return `
                <div class="file-library-item ${isLeft || isRight ? 'selected' : ''}" data-file-id="${file.id}">
                    <div class="file-info">
                        <div class="file-name">${Utils.escapeHTML(file.name)}</div>
                        <div class="file-meta">
                            ${validationBadge}
                            <span class="text-muted small">• ${fileSize}</span>
                            <span class="text-muted small">• ${timeAgo}</span>
                        </div>
                    </div>
                    <div class="file-actions">
                        <div class="btn-group btn-group-sm me-2" role="group">
                            <input type="radio" class="btn-check" name="leftFile" id="left_${file.id}" ${isLeft ? 'checked' : ''}>
                            <label class="btn btn-outline-primary" for="left_${file.id}" data-file-id="${file.id}" data-side="left">
                                <i class="bi bi-arrow-left"></i> L
                            </label>

                            <input type="radio" class="btn-check" name="rightFile" id="right_${file.id}" ${isRight ? 'checked' : ''}>
                            <label class="btn btn-outline-primary" for="right_${file.id}" data-file-id="${file.id}" data-side="right">
                                R <i class="bi bi-arrow-right"></i>
                            </label>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary" title="Rename" data-action="rename" data-file-id="${file.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" title="Delete" data-action="delete" data-file-id="${file.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

        // Attach event listeners to file items
        this.attachFileItemListeners();
    },

    /**
     * Attach event listeners to file items
     */
    attachFileItemListeners() {
        const container = document.getElementById('fileLibraryList');
        if (!container) return;

        // Selection buttons
        container.querySelectorAll('label[data-file-id][data-side]').forEach(label => {
            label.addEventListener('click', (e) => {
                const fileId = e.currentTarget.getAttribute('data-file-id');
                const side = e.currentTarget.getAttribute('data-side');
                this.selectFile(fileId, side);
            });
        });

        // Action buttons
        container.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.getAttribute('data-action');
                const fileId = e.currentTarget.getAttribute('data-file-id');

                if (action === 'rename') {
                    this.renameFile(fileId);
                } else if (action === 'delete') {
                    this.removeFile(fileId);
                }
            });
        });
    },

    /**
     * Get human-readable time ago string
     * @param {Date} date - Date object
     * @returns {string} - Time ago string
     */
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FileLibrary.init());
} else {
    FileLibrary.init();
}
