/**
 * JSONata Query Renderer
 * Displays differences as JSONata transformation queries
 */

const JSONataRenderer = {
    /**
     * Render JSONata queries
     * @param {object} changes - Diff changes
     */
    render(changes) {
        const container = document.getElementById('jsonata-queries');
        if (!container) return;

        // Generate JSONata queries
        const queries = DiffEngine.generateJSONataQueries(changes);

        if (queries.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-code-square"></i>
                    <p>No changes detected</p>
                    <small>Input and output are identical</small>
                </div>
            `;
            return;
        }

        // Group queries by type
        const grouped = {
            addition: queries.filter(q => q.type === 'addition'),
            deletion: queries.filter(q => q.type === 'deletion'),
            modification: queries.filter(q => q.type === 'modification')
        };

        // Render grouped queries
        let html = '';

        if (grouped.addition.length > 0) {
            html += this.renderQueryGroup('Additions', grouped.addition, 'success');
        }

        if (grouped.deletion.length > 0) {
            html += this.renderQueryGroup('Deletions', grouped.deletion, 'danger');
        }

        if (grouped.modification.length > 0) {
            html += this.renderQueryGroup('Modifications', grouped.modification, 'warning');
        }

        container.innerHTML = html;

        // Attach copy event listeners
        this.attachCopyListeners();
    },

    /**
     * Render a group of queries
     * @param {string} title - Group title
     * @param {array} queries - Queries in this group
     * @param {string} variant - Bootstrap color variant
     * @returns {string} - HTML content
     */
    renderQueryGroup(title, queries, variant) {
        let html = `
            <div class="mb-4">
                <h6 class="mb-3">
                    <span class="badge bg-${variant}">${queries.length}</span>
                    ${title}
                </h6>
        `;

        queries.forEach((query, index) => {
            html += this.renderQueryBlock(query, index, variant);
        });

        html += '</div>';
        return html;
    },

    /**
     * Render a single query block
     * @param {object} query - Query object
     * @param {number} index - Query index
     * @param {string} variant - Color variant
     * @returns {string} - HTML content
     */
    renderQueryBlock(query, index, variant) {
        const queryId = `query-${query.type}-${index}`;

        return `
            <div class="jsonata-query-block">
                <div class="jsonata-query-header">
                    <div>
                        <span class="badge query-type-badge bg-${variant}">${query.type}</span>
                        <strong class="ms-2">${Utils.escapeHTML(query.path)}</strong>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary copy-query-btn" data-query-id="${queryId}">
                        <i class="bi bi-clipboard"></i> Copy
                    </button>
                </div>
                <div class="jsonata-query-content">
                    <p class="text-muted small mb-2">${Utils.escapeHTML(query.description)}</p>
                    <div class="jsonata-query" id="${queryId}">${this.formatQuery(query)}</div>
                    ${this.renderValuePreview(query)}
                </div>
            </div>
        `;
    },

    /**
     * Format JSONata query for display
     * @param {object} query - Query object
     * @returns {string} - Formatted query
     */
    formatQuery(query) {
        // Simplified query format for readability
        const path = query.path;

        switch (query.type) {
            case 'addition':
                return `// Add new field\n${path} := ${this.formatValue(query.value)}`;

            case 'deletion':
                return `// Remove field\n${path} := undefined`;

            case 'modification':
                return `// Update field\n${path} := ${this.formatValue(query.newValue)}`;

            default:
                return query.query || '';
        }
    },

    /**
     * Render value preview
     * @param {object} query - Query object
     * @returns {string} - HTML content
     */
    renderValuePreview(query) {
        let html = '';

        if (query.type === 'addition' && query.value !== undefined) {
            html += `
                <div class="mt-2">
                    <small class="text-muted">New value:</small>
                    <pre class="code-block mt-1">${Utils.escapeHTML(JSON.stringify(query.value, null, 2))}</pre>
                </div>
            `;
        }

        if (query.type === 'deletion' && query.oldValue !== undefined) {
            html += `
                <div class="mt-2">
                    <small class="text-muted">Removed value:</small>
                    <pre class="code-block mt-1">${Utils.escapeHTML(JSON.stringify(query.oldValue, null, 2))}</pre>
                </div>
            `;
        }

        if (query.type === 'modification') {
            html += `
                <div class="mt-2">
                    <div class="row">
                        <div class="col-md-6">
                            <small class="text-muted">Old value:</small>
                            <pre class="code-block mt-1">${Utils.escapeHTML(JSON.stringify(query.oldValue, null, 2))}</pre>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted">New value:</small>
                            <pre class="code-block mt-1">${Utils.escapeHTML(JSON.stringify(query.newValue, null, 2))}</pre>
                        </div>
                    </div>
                </div>
            `;
        }

        return html;
    },

    /**
     * Format value for query
     * @param {any} value - Value to format
     * @returns {string} - Formatted value
     */
    formatValue(value) {
        if (value === null || value === undefined) {
            return 'null';
        }

        if (typeof value === 'string') {
            return `"${value}"`;
        }

        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }

        return String(value);
    },

    /**
     * Attach copy button event listeners
     */
    attachCopyListeners() {
        document.querySelectorAll('.copy-query-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const queryId = btn.getAttribute('data-query-id');
                const queryElement = document.getElementById(queryId);

                if (queryElement) {
                    const text = queryElement.textContent;
                    const success = await Utils.copyToClipboard(text);

                    if (success) {
                        Utils.showToast('Query copied to clipboard', 'success');
                        btn.innerHTML = '<i class="bi bi-check"></i> Copied';
                        setTimeout(() => {
                            btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                        }, 2000);
                    } else {
                        Utils.showToast('Failed to copy to clipboard', 'error');
                    }
                }
            });
        });
    },

    /**
     * Clear JSONata view
     */
    clear() {
        const container = document.getElementById('jsonata-queries');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-code-square"></i>
                    <p>No queries available</p>
                    <small>Upload input and receive output to generate transformation queries</small>
                </div>
            `;
        }
    }
};
