/**
 * Utility Functions for maDMP Validator & Diff Tool
 */

const Utils = {
    /**
     * Parse JSON with error handling
     * @param {string} jsonString - JSON string to parse
     * @returns {Object} - { success: boolean, data: object|null, error: string|null }
     */
    parseJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            return { success: true, data, error: null };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: error.message
            };
        }
    },

    /**
     * Format JSON for display
     * @param {object} data - JSON object
     * @param {number} indent - Indentation spaces
     * @returns {string} - Formatted JSON string
     */
    formatJSON(data, indent = 2) {
        try {
            return JSON.stringify(data, null, indent);
        } catch (error) {
            console.error('Error formatting JSON:', error);
            return '';
        }
    },

    /**
     * Read file as text
     * @param {File} file - File object
     * @returns {Promise<string>} - File content
     */
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    },

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Toast type (success, error, warning, info)
     */
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = `toast-${Date.now()}`;

        const bgColor = {
            success: 'bg-success',
            error: 'bg-danger',
            warning: 'bg-warning',
            info: 'bg-info'
        }[type] || 'bg-info';

        const icon = {
            success: 'check-circle-fill',
            error: 'exclamation-triangle-fill',
            warning: 'exclamation-circle-fill',
            info: 'info-circle-fill'
        }[type] || 'info-circle-fill';

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-${icon} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    },

    /**
     * Show/hide loading overlay
     * @param {boolean} show - Show or hide
     */
    toggleLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('d-none');
        } else {
            overlay.classList.add('d-none');
        }
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} - Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Deep clone object
     * @param {object} obj - Object to clone
     * @returns {object} - Cloned object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Get nested property value
     * @param {object} obj - Object
     * @param {string} path - Property path (e.g., 'dmp.title')
     * @returns {any} - Property value
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    },

    /**
     * Set nested property value
     * @param {object} obj - Object
     * @param {string} path - Property path
     * @param {any} value - Value to set
     */
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((acc, key) => {
            if (!acc[key]) acc[key] = {};
            return acc[key];
        }, obj);
        target[lastKey] = value;
    },

    /**
     * Download content as file
     * @param {string} content - File content
     * @param {string} filename - Filename
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType = 'application/json') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - Success status
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        }
    },

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Syntax highlight JSON
     * @param {string} json - JSON string
     * @returns {string} - HTML with syntax highlighting
     */
    syntaxHighlightJSON(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    },

    /**
     * Calculate object statistics
     * @param {object} obj - JSON object
     * @returns {object} - Statistics
     */
    calculateStats(obj) {
        const stats = {
            totalKeys: 0,
            totalArrays: 0,
            totalObjects: 0,
            totalPrimitives: 0,
            depth: 0,
            size: 0
        };

        function traverse(node, depth = 0) {
            stats.depth = Math.max(stats.depth, depth);

            if (Array.isArray(node)) {
                stats.totalArrays++;
                node.forEach(item => traverse(item, depth + 1));
            } else if (node !== null && typeof node === 'object') {
                stats.totalObjects++;
                Object.keys(node).forEach(key => {
                    stats.totalKeys++;
                    traverse(node[key], depth + 1);
                });
            } else {
                stats.totalPrimitives++;
            }
        }

        traverse(obj);
        stats.size = JSON.stringify(obj).length;
        return stats;
    },

    /**
     * Format bytes to human readable
     * @param {number} bytes - Bytes
     * @param {number} decimals - Decimal places
     * @returns {string} - Formatted string
     */
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    /**
     * Format date/time
     * @param {string|Date} date - Date
     * @returns {string} - Formatted date
     */
    formatDateTime(date) {
        const d = new Date(date);
        return d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Generate unique ID
     * @returns {string} - Unique ID
     */
    generateId() {
        return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Validate URL
     * @param {string} url - URL to validate
     * @returns {boolean} - Is valid
     */
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * LocalStorage helpers
     */
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch {
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        }
    }
};
