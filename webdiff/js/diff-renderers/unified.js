/**
 * Unified Diff Renderer
 * Displays differences in git-style unified diff format
 */

const UnifiedRenderer = {
    /**
     * Render unified diff
     * @param {string} oldJSON - Old JSON string
     * @param {string} newJSON - New JSON string
     * @param {object} changes - Diff changes
     */
    render(oldJSON, newJSON, changes) {
        const container = document.getElementById('unified-diff');
        if (!container) return;

        // Generate text diff using jsdiff
        let diffParts;
        if (typeof Diff !== 'undefined') {
            diffParts = Diff.diffLines(oldJSON, newJSON);
        } else {
            // Fallback if jsdiff is not available
            diffParts = this.generateSimpleDiff(oldJSON, newJSON);
        }

        // Render diff
        container.innerHTML = this.renderDiffParts(diffParts);
    },

    /**
     * Render diff parts
     * @param {array} parts - Diff parts from jsdiff
     * @returns {string} - HTML content
     */
    renderDiffParts(parts) {
        let html = '<div class="unified-header">maDMP Comparison</div>';

        parts.forEach(part => {
            const lines = part.value.split('\n').filter(line => line.trim());

            lines.forEach(line => {
                let cssClass = 'unified-line';
                let prefix = '';

                if (part.added) {
                    cssClass += ' addition';
                } else if (part.removed) {
                    cssClass += ' deletion';
                } else {
                    cssClass += ' context';
                }

                const highlightedLine = this.highlightLine(line);

                html += `<div class="${cssClass}">${highlightedLine}</div>`;
            });
        });

        return html;
    },

    /**
     * Generate simple diff (fallback)
     * @param {string} oldText - Old text
     * @param {string} newText - New text
     * @returns {array} - Diff parts
     */
    generateSimpleDiff(oldText, newText) {
        const oldLines = oldText.split('\n');
        const newLines = newText.split('\n');
        const parts = [];

        const maxLength = Math.max(oldLines.length, newLines.length);

        for (let i = 0; i < maxLength; i++) {
            const oldLine = oldLines[i] || '';
            const newLine = newLines[i] || '';

            if (oldLine === newLine) {
                parts.push({ value: oldLine + '\n' });
            } else {
                if (oldLine) {
                    parts.push({ value: oldLine + '\n', removed: true });
                }
                if (newLine) {
                    parts.push({ value: newLine + '\n', added: true });
                }
            }
        }

        return parts;
    },

    /**
     * Highlight JSON syntax
     * @param {string} line - Line to highlight
     * @returns {string} - HTML with syntax highlighting
     */
    highlightLine(line) {
        const escaped = Utils.escapeHTML(line);
        return Utils.syntaxHighlightJSON(escaped);
    },

    /**
     * Clear unified view
     */
    clear() {
        const container = document.getElementById('unified-diff');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-file-diff"></i>
                    <p>No diff available</p>
                    <small>Upload input and receive output to see differences</small>
                </div>
            `;
        }
    }
};
