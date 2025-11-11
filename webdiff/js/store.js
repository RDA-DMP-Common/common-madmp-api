/**
 * Vanilla JS Store for maDMP Validator & Diff Tool
 * Manages application state using a simple reactive state management pattern
 *
 * @fileoverview Custom vanilla JavaScript state management store
 * @version 2.0.0
 * @author maDMP Validator Team
 */

/**
 * Creates a reactive state management store
 *
 * @param {Function} initializer - Function that initializes the store state
 * @param {Function} initializer.set - Function to update state
 * @param {Function} initializer.get - Function to get current state
 * @returns {Object} Store API with getState, setState, and subscribe methods
 *
 * @example
 * const store = createStore((set, get) => ({
 *   count: 0,
 *   increment: () => set({ count: get().count + 1 })
 * }));
 */
function createStore(initializer) {
    const state = {};
    const listeners = new Set();

    const api = {
        getState: () => state,
        setState: (partial) => {
            Object.assign(state, typeof partial === 'function' ? partial(state) : partial);
            listeners.forEach(listener => listener(state));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };

    const set = (partial) => api.setState(partial);
    const get = () => api.getState();

    Object.assign(state, initializer(set, get));

    return api;
}

const useStore = createStore((set, get) => ({
    // ========================================
    // State Properties
    // ========================================

    // Input JSON (original maDMP)
    inputJSON: null,
    inputJSONString: '',
    inputValidation: null,

    // Output JSON (merged from API)
    outputJSON: null,
    outputJSONString: '',
    outputValidation: null,

    // API configuration
    apiEndpoint: Utils.storage.get('apiEndpoint', ''),
    apiResponse: null,
    apiError: null,
    apiLoading: false,

    // Diff results
    diffResult: null,
    diffStats: null,

    // UI state
    activeView: 'sidebyside',
    darkMode: Utils.storage.get('darkMode', false),
    fullscreen: false,

    // File Library state
    uploadedFiles: [],
    selectedLeftFile: null,
    selectedRightFile: null,
    persistFiles: Utils.storage.get('persistFiles', false),
    addToLibrary: true, // Flag to control if uploads go to library

    // ========================================
    // Actions
    // ========================================

    /**
     * Set input JSON
     */
    setInputJSON: (json, jsonString) => {
        set({
            inputJSON: json,
            inputJSONString: jsonString || Utils.formatJSON(json)
        });

        // Auto-calculate stats
        if (json) {
            const stats = Utils.calculateStats(json);
            get().updateInputStats(stats);
        }

        // Clear diff if output exists
        if (get().outputJSON) {
            get().calculateDiff();
        }
    },

    /**
     * Set output JSON
     */
    setOutputJSON: (json, jsonString) => {
        set({
            outputJSON: json,
            outputJSONString: jsonString || Utils.formatJSON(json)
        });

        // Calculate diff if input exists
        if (get().inputJSON) {
            get().calculateDiff();
        }
    },

    /**
     * Set input validation result
     */
    setInputValidation: (validation) => {
        set({ inputValidation: validation });
    },

    /**
     * Set output validation result
     */
    setOutputValidation: (validation) => {
        set({ outputValidation: validation });
    },

    /**
     * Set API endpoint
     */
    setAPIEndpoint: (endpoint) => {
        set({ apiEndpoint: endpoint });
        Utils.storage.set('apiEndpoint', endpoint);
    },

    /**
     * Set API loading state
     */
    setAPILoading: (loading) => {
        set({ apiLoading: loading });
    },

    /**
     * Set API response
     */
    setAPIResponse: (response) => {
        set({ apiResponse: response, apiError: null });
    },

    /**
     * Set API error
     */
    setAPIError: (error) => {
        set({ apiError: error, apiResponse: null });
    },

    /**
     * Calculate diff between input and output
     */
    calculateDiff: () => {
        const { inputJSON, outputJSON } = get();

        if (!inputJSON || !outputJSON) {
            set({ diffResult: null, diffStats: null });
            return;
        }

        try {
            const diffResult = DiffEngine.compare(inputJSON, outputJSON);
            const diffStats = DiffEngine.calculateStats(diffResult);

            set({
                diffResult,
                diffStats
            });
        } catch (error) {
            console.error('Error calculating diff:', error);
            Utils.showToast('Error calculating diff: ' + error.message, 'error');
        }
    },

    /**
     * Update input stats
     */
    updateInputStats: (stats) => {
        set({ inputStats: stats });
    },

    /**
     * Update output stats
     */
    updateOutputStats: (stats) => {
        set({ outputStats: stats });
    },

    /**
     * Set active view
     */
    setActiveView: (view) => {
        set({ activeView: view });
    },

    /**
     * Toggle dark mode
     */
    toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        Utils.storage.set('darkMode', newMode);

        // Update body class
        if (newMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    },

    /**
     * Toggle fullscreen
     */
    toggleFullscreen: () => {
        set({ fullscreen: !get().fullscreen });
    },

    /**
     * Reset state
     */
    reset: () => {
        set({
            inputJSON: null,
            inputJSONString: '',
            inputValidation: null,
            outputJSON: null,
            outputJSONString: '',
            outputValidation: null,
            apiResponse: null,
            apiError: null,
            diffResult: null,
            diffStats: null
        });
    },

    /**
     * Clear input
     */
    clearInput: () => {
        set({
            inputJSON: null,
            inputJSONString: '',
            inputValidation: null
        });

        // Recalculate diff if output exists
        if (get().outputJSON) {
            set({ diffResult: null, diffStats: null });
        }
    },

    /**
     * Clear output
     */
    clearOutput: () => {
        set({
            outputJSON: null,
            outputJSONString: '',
            outputValidation: null,
            apiResponse: null,
            apiError: null,
            diffResult: null,
            diffStats: null
        });
    },

    /**
     * Export current state
     */
    exportState: () => {
        const state = get();
        return {
            inputJSON: state.inputJSON,
            outputJSON: state.outputJSON,
            inputValidation: state.inputValidation,
            outputValidation: state.outputValidation,
            diffResult: state.diffResult,
            diffStats: state.diffStats,
            timestamp: new Date().toISOString()
        };
    },

    /**
     * Import state
     */
    importState: (stateData) => {
        set({
            inputJSON: stateData.inputJSON,
            outputJSON: stateData.outputJSON,
            inputValidation: stateData.inputValidation,
            outputValidation: stateData.outputValidation,
            diffResult: stateData.diffResult,
            diffStats: stateData.diffStats
        });
    },

    // ========================================
    // File Library Actions
    // ========================================

    /**
     * Add file to library
     * @param {object} fileData - File object with content, name, etc.
     */
    addFile: (fileData) => {
        const files = [...get().uploadedFiles];
        files.unshift(fileData); // Add to beginning
        set({ uploadedFiles: files });

        // Save to localStorage if persistence enabled
        if (get().persistFiles) {
            Utils.storage.set('madmp-file-library', files);
        }
    },

    /**
     * Remove file from library
     * @param {string} fileId - File ID to remove
     */
    removeFile: (fileId) => {
        const files = get().uploadedFiles.filter(f => f.id !== fileId);
        set({ uploadedFiles: files });

        // Clear selection if removed file was selected
        if (get().selectedLeftFile === fileId) {
            set({ selectedLeftFile: null });
        }
        if (get().selectedRightFile === fileId) {
            set({ selectedRightFile: null });
        }

        // Update localStorage if persistence enabled
        if (get().persistFiles) {
            Utils.storage.set('madmp-file-library', files);
        }
    },

    /**
     * Rename file in library
     * @param {string} fileId - File ID
     * @param {string} newName - New display name
     */
    renameFile: (fileId, newName) => {
        const files = get().uploadedFiles.map(f =>
            f.id === fileId ? { ...f, name: newName } : f
        );
        set({ uploadedFiles: files });

        // Update localStorage if persistence enabled
        if (get().persistFiles) {
            Utils.storage.set('madmp-file-library', files);
        }
    },

    /**
     * Clear all files from library
     */
    clearAllFiles: () => {
        set({
            uploadedFiles: [],
            selectedLeftFile: null,
            selectedRightFile: null
        });

        // Clear localStorage
        Utils.storage.remove('madmp-file-library');
    },

    /**
     * Set selected files for comparison
     * @param {string} leftId - Left file ID (can be null)
     * @param {string} rightId - Right file ID (can be null)
     */
    setSelectedFiles: (leftId, rightId) => {
        set({
            selectedLeftFile: leftId,
            selectedRightFile: rightId
        });

        // If both selected, trigger comparison
        if (leftId && rightId) {
            const files = get().uploadedFiles;
            const leftFile = files.find(f => f.id === leftId);
            const rightFile = files.find(f => f.id === rightId);

            if (leftFile && rightFile) {
                // Set as input and output
                get().setInputJSON(leftFile.content, leftFile.contentString);
                get().setInputValidation(leftFile.validation);
                get().setOutputJSON(rightFile.content, rightFile.contentString);
                get().setOutputValidation(rightFile.validation);
            }
        }
    },

    /**
     * Toggle file persistence setting
     */
    toggleFilePersistence: () => {
        const newValue = !get().persistFiles;
        set({ persistFiles: newValue });
        Utils.storage.set('persistFiles', newValue);

        // Save current files if enabling persistence
        if (newValue && get().uploadedFiles.length > 0) {
            Utils.storage.set('madmp-file-library', get().uploadedFiles);
        }
        // Clear storage if disabling persistence
        else if (!newValue) {
            Utils.storage.remove('madmp-file-library');
        }
    },

    /**
     * Toggle add to library flag
     */
    toggleAddToLibrary: () => {
        set({ addToLibrary: !get().addToLibrary });
    },

    /**
     * Export file library as JSON
     * @returns {string} - JSON string of all files
     */
    exportFileLibrary: () => {
        const files = get().uploadedFiles;
        return JSON.stringify(files, null, 2);
    },

    /**
     * Import file library from JSON
     * @param {array} filesData - Array of file objects
     * @param {boolean} merge - If true, merge with existing; if false, replace
     */
    importFileLibrary: (filesData, merge = false) => {
        const files = merge ? [...get().uploadedFiles, ...filesData] : filesData;
        set({ uploadedFiles: files });

        // Update localStorage if persistence enabled
        if (get().persistFiles) {
            Utils.storage.set('madmp-file-library', files);
        }
    },

    /**
     * Get file by ID
     * @param {string} fileId - File ID
     * @returns {object|null} - File object or null
     */
    getFileById: (fileId) => {
        return get().uploadedFiles.find(f => f.id === fileId) || null;
    }
}));

// ========================================
// Subscribe to state changes for debugging
// ========================================
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    useStore.subscribe((state) => {
        console.log('State updated:', state);
    });
}

// Helper to get current state
window.getStoreState = () => useStore.getState();
