/**
 * Tree Diff Renderer
 * Displays differences in hierarchical tree structure
 */

const TreeRenderer = {
    /**
     * Render tree diff
     * @param {object} inputJSON - Input JSON object
     * @param {object} outputJSON - Output JSON object
     * @param {object} changes - Diff changes
     */
    render(inputJSON, outputJSON, changes) {
        const container = document.getElementById('tree-diff');
        if (!container) return;

        // Merge both objects to show complete structure
        const merged = this.mergeObjects(inputJSON, outputJSON);

        // Build tree
        const tree = this.buildTree(merged, '', changes);

        container.innerHTML = tree;

        // Attach toggle event listeners
        this.attachToggleListeners();
    },

    /**
     * Merge two objects to show complete structure
     * @param {object} obj1 - First object
     * @param {object} obj2 - Second object
     * @returns {object} - Merged object
     */
    mergeObjects(obj1, obj2) {
        // Use output as base, add missing keys from input
        const merged = Utils.deepClone(obj2 || {});

        function merge(target, source) {
            Object.keys(source).forEach(key => {
                if (!(key in target)) {
                    target[key] = source[key];
                } else if (typeof target[key] === 'object' && typeof source[key] === 'object') {
                    if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                        // Merge arrays
                        const maxLen = Math.max(target[key].length, source[key].length);
                        for (let i = 0; i < maxLen; i++) {
                            if (i >= target[key].length && i < source[key].length) {
                                target[key].push(source[key][i]);
                            }
                        }
                    } else if (!Array.isArray(target[key]) && !Array.isArray(source[key])) {
                        // Merge objects
                        merge(target[key], source[key]);
                    }
                }
            });
        }

        if (obj1) {
            merge(merged, obj1);
        }

        return merged;
    },

    /**
     * Build tree HTML
     * @param {any} node - Current node
     * @param {string} path - Current path
     * @param {object} changes - Diff changes
     * @param {number} depth - Current depth
     * @returns {string} - HTML content
     */
    buildTree(node, path, changes, depth = 0) {
        if (node === null || node === undefined) {
            return this.renderLeafNode('null', path, changes, depth);
        }

        const nodeType = DiffEngine.getType(node);

        if (nodeType === 'primitive') {
            return this.renderLeafNode(node, path, changes, depth);
        }

        if (Array.isArray(node)) {
            return this.renderArrayNode(node, path, changes, depth);
        }

        return this.renderObjectNode(node, path, changes, depth);
    },

    /**
     * Render object node
     * @param {object} obj - Object
     * @param {string} path - Path
     * @param {object} changes - Changes
     * @param {number} depth - Depth
     * @returns {string} - HTML
     */
    renderObjectNode(obj, path, changes, depth) {
        const keys = Object.keys(obj);
        const changeIndicator = this.getChangeIndicator(path, changes);
        const nodeId = Utils.generateId();

        let html = `
            <div class="tree-node" data-depth="${depth}">
                <div class="tree-node-header ${changeIndicator ? 'changed' : ''}" data-node-id="${nodeId}">
                    <span class="tree-toggle">${keys.length > 0 ? '▼' : ''}</span>
                    <i class="bi bi-braces tree-icon"></i>
                    <span class="tree-key">${path ? this.getKeyFromPath(path) : 'root'}</span>
                    <span class="text-muted small">{${keys.length} ${keys.length === 1 ? 'key' : 'keys'}}</span>
                    ${changeIndicator ? `<span class="tree-change-indicator ${changeIndicator}">${changeIndicator}</span>` : ''}
                </div>
                <div class="tree-children" data-parent="${nodeId}">
        `;

        keys.forEach(key => {
            const newPath = path ? `${path}.${key}` : key;
            html += this.buildTree(obj[key], newPath, changes, depth + 1);
        });

        html += '</div></div>';
        return html;
    },

    /**
     * Render array node
     * @param {array} arr - Array
     * @param {string} path - Path
     * @param {object} changes - Changes
     * @param {number} depth - Depth
     * @returns {string} - HTML
     */
    renderArrayNode(arr, path, changes, depth) {
        const changeIndicator = this.getChangeIndicator(path, changes);
        const nodeId = Utils.generateId();

        let html = `
            <div class="tree-node" data-depth="${depth}">
                <div class="tree-node-header ${changeIndicator ? 'changed' : ''}" data-node-id="${nodeId}">
                    <span class="tree-toggle">${arr.length > 0 ? '▼' : ''}</span>
                    <i class="bi bi-list-ul tree-icon"></i>
                    <span class="tree-key">${this.getKeyFromPath(path)}</span>
                    <span class="text-muted small">[${arr.length} ${arr.length === 1 ? 'item' : 'items'}]</span>
                    ${changeIndicator ? `<span class="tree-change-indicator ${changeIndicator}">${changeIndicator}</span>` : ''}
                </div>
                <div class="tree-children" data-parent="${nodeId}">
        `;

        arr.forEach((item, index) => {
            const newPath = `${path}[${index}]`;
            html += this.buildTree(item, newPath, changes, depth + 1);
        });

        html += '</div></div>';
        return html;
    },

    /**
     * Render leaf node (primitive value)
     * @param {any} value - Value
     * @param {string} path - Path
     * @param {object} changes - Changes
     * @param {number} depth - Depth
     * @returns {string} - HTML
     */
    renderLeafNode(value, path, changes, depth) {
        const changeIndicator = this.getChangeIndicator(path, changes);
        const icon = this.getValueIcon(value);
        const formattedValue = this.formatLeafValue(value);

        return `
            <div class="tree-node" data-depth="${depth}">
                <div class="tree-node-header ${changeIndicator ? 'changed' : ''}">
                    <span class="tree-toggle"></span>
                    <i class="bi bi-${icon} tree-icon"></i>
                    <span class="tree-key">${this.getKeyFromPath(path)}</span>
                    <span class="tree-value">${formattedValue}</span>
                    ${changeIndicator ? `<span class="tree-change-indicator ${changeIndicator}">${changeIndicator}</span>` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Get change indicator for a path
     * @param {string} path - Path
     * @param {object} changes - Changes
     * @returns {string|null} - Change type or null
     */
    getChangeIndicator(path, changes) {
        if (!changes) return null;

        // Check if this exact path has changes
        if (changes.added.some(c => c.path === path)) return 'added';
        if (changes.removed.some(c => c.path === path)) return 'removed';
        if (changes.modified.some(c => c.path === path)) return 'modified';

        // Check if any child path has changes
        const hasChildChanges = [
            ...changes.added,
            ...changes.removed,
            ...changes.modified
        ].some(c => c.path.startsWith(path + '.') || c.path.startsWith(path + '['));

        return hasChildChanges ? null : null;
    },

    /**
     * Get icon for value type
     * @param {any} value - Value
     * @returns {string} - Icon name
     */
    getValueIcon(value) {
        if (value === null || value === undefined) return 'x-circle';
        if (typeof value === 'boolean') return value ? 'check-circle' : 'x-circle';
        if (typeof value === 'number') return 'hash';
        if (typeof value === 'string') return 'quote';
        return 'file-text';
    },

    /**
     * Format leaf value for display
     * @param {any} value - Value
     * @returns {string} - Formatted value
     */
    formatLeafValue(value) {
        if (value === null || value === undefined) {
            return '<span class="text-muted">null</span>';
        }

        if (typeof value === 'boolean') {
            return `<span class="json-boolean">${value}</span>`;
        }

        if (typeof value === 'number') {
            return `<span class="json-number">${value}</span>`;
        }

        if (typeof value === 'string') {
            const truncated = value.length > 50 ? value.substring(0, 50) + '...' : value;
            return `<span class="json-string">"${Utils.escapeHTML(truncated)}"</span>`;
        }

        return String(value);
    },

    /**
     * Get key from path
     * @param {string} path - Full path
     * @returns {string} - Key name
     */
    getKeyFromPath(path) {
        const parts = path.split('.');
        const lastPart = parts[parts.length - 1];

        // Handle array indices
        const match = lastPart.match(/(.+)\[(\d+)\]/);
        if (match) {
            return `${match[1]}[${match[2]}]`;
        }

        return lastPart;
    },

    /**
     * Attach toggle event listeners
     */
    attachToggleListeners() {
        document.querySelectorAll('.tree-node-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation();

                const nodeId = header.getAttribute('data-node-id');
                if (!nodeId) return;

                const children = document.querySelector(`.tree-children[data-parent="${nodeId}"]`);
                const toggle = header.querySelector('.tree-toggle');

                if (children && toggle) {
                    children.classList.toggle('collapsed');

                    if (children.classList.contains('collapsed')) {
                        toggle.textContent = '▶';
                    } else {
                        toggle.textContent = '▼';
                    }
                }
            });
        });
    },

    /**
     * Clear tree view
     */
    clear() {
        const container = document.getElementById('tree-diff');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-diagram-3"></i>
                    <p>No tree available</p>
                    <small>Upload input and receive output to see structural differences</small>
                </div>
            `;
        }
    }
};
