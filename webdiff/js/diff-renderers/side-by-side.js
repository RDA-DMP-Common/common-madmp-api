/**
 * Side-by-Side Diff Renderer
 * Displays input and output JSON in two panels with highlighted differences
 */

const SideBySideRenderer = {
    /**
     * Render side-by-side diff
     * @param {string} leftJSON - Left (input) JSON string
     * @param {string} rightJSON - Right (output) JSON string
     * @param {object} changes - Diff changes
     */
    render(leftJSON, rightJSON, changes) {
        const leftPanel = document.getElementById('sidebyside-left');
        const rightPanel = document.getElementById('sidebyside-right');

        if (!leftPanel || !rightPanel) return;

        // Use jsdiff to get aligned diff parts
        let diffParts;
        if (typeof Diff !== 'undefined') {
            diffParts = Diff.diffLines(leftJSON, rightJSON);
        } else {
            // Fallback: render without alignment
            diffParts = this.generateSimpleDiff(leftJSON, rightJSON);
        }

        // Build aligned left and right panels
        const aligned = this.buildAlignedPanels(diffParts);

        // Render both panels
        leftPanel.innerHTML = aligned.left;
        rightPanel.innerHTML = aligned.right;

        // Setup synchronized scrolling
        this.setupSyncScroll(leftPanel, rightPanel);
    },

    /**
     * Build aligned left and right panels from diff parts
     * @param {array} diffParts - Diff parts from jsdiff
     * @returns {object} - Object with left and right HTML strings
     */
    buildAlignedPanels(diffParts) {
        let leftHTML = '';
        let rightHTML = '';
        let leftLineNum = 1;
        let rightLineNum = 1;

        diffParts.forEach(part => {
            // Split by newline and remove the last element if it's empty
            // This happens because diffLines includes trailing newlines
            let lines = part.value.split('\n');

            // Remove trailing empty string if present
            if (lines.length > 0 && lines[lines.length - 1] === '') {
                lines = lines.slice(0, -1);
            }

            // Skip if no lines
            if (lines.length === 0) {
                return;
            }

            if (!part.added && !part.removed) {
                // Unchanged lines - show on both sides
                lines.forEach(line => {
                    leftHTML += this.renderLine(line, leftLineNum, 'unchanged');
                    rightHTML += this.renderLine(line, rightLineNum, 'unchanged');
                    leftLineNum++;
                    rightLineNum++;
                });
            } else if (part.removed) {
                // Removed lines - show on left, blank on right
                lines.forEach(line => {
                    leftHTML += this.renderLine(line, leftLineNum, 'removed');
                    rightHTML += this.renderBlankLine();
                    leftLineNum++;
                });
            } else if (part.added) {
                // Added lines - blank on left, show on right
                lines.forEach(line => {
                    leftHTML += this.renderBlankLine();
                    rightHTML += this.renderLine(line, rightLineNum, 'added');
                    rightLineNum++;
                });
            }
        });

        return { left: leftHTML, right: rightHTML };
    },

    /**
     * Render a single line
     * @param {string} content - Line content
     * @param {number} lineNum - Line number
     * @param {string} changeType - Type of change (unchanged, removed, added, modified)
     * @returns {string} - HTML for the line
     */
    renderLine(content, lineNum, changeType) {
        const cssClass = `diff-line ${changeType}`;
        const highlightedContent = this.highlightLine(content);

        return `
            <div class="${cssClass}" data-line="${lineNum}">
                <span class="diff-line-number">${lineNum}</span>
                <span class="diff-line-content">${highlightedContent}</span>
            </div>
        `;
    },

    /**
     * Render a blank/spacer line for alignment
     * @returns {string} - HTML for blank line
     */
    renderBlankLine() {
        return `
            <div class="diff-line blank">
                <span class="diff-line-number"></span>
                <span class="diff-line-content">&nbsp;</span>
            </div>
        `;
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
     * Highlight JSON syntax in a line
     * @param {string} line - Line to highlight
     * @returns {string} - HTML with syntax highlighting
     */
    highlightLine(line) {
        const escaped = Utils.escapeHTML(line);
        return Utils.syntaxHighlightJSON(escaped);
    },

    /**
     * Setup synchronized scrolling between panels
     * @param {HTMLElement} leftPanel - Left panel
     * @param {HTMLElement} rightPanel - Right panel
     */
    setupSyncScroll(leftPanel, rightPanel) {
        let isLeftScrolling = false;
        let isRightScrolling = false;

        leftPanel.addEventListener('scroll', () => {
            if (isRightScrolling) return;
            isLeftScrolling = true;
            rightPanel.scrollTop = leftPanel.scrollTop;
            setTimeout(() => { isLeftScrolling = false; }, 10);
        });

        rightPanel.addEventListener('scroll', () => {
            if (isLeftScrolling) return;
            isRightScrolling = true;
            leftPanel.scrollTop = rightPanel.scrollTop;
            setTimeout(() => { isRightScrolling = false; }, 10);
        });
    },

    /**
     * Clear side-by-side view
     */
    clear() {
        const leftPanel = document.getElementById('sidebyside-left');
        const rightPanel = document.getElementById('sidebyside-right');

        if (leftPanel) {
            leftPanel.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-file-earmark-text"></i>
                    <p>No input JSON loaded</p>
                </div>
            `;
        }

        if (rightPanel) {
            rightPanel.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-file-earmark-text"></i>
                    <p>No output JSON available</p>
                </div>
            `;
        }
    }
};
