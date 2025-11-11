/**
 * Diff Navigation Module
 * Provides next/previous navigation through changes
 */

const DiffNavigation = {
    changes: [],
    currentIndex: -1,

    /**
     * Initialize navigation
     */
    init() {
        this.attachEventListeners();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const prevBtn = document.getElementById('prevChange');
        const nextBtn = document.getElementById('nextChange');
        const changeCounter = document.getElementById('changeCounter');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previous());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + Arrow keys for navigation
            if (e.altKey) {
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previous();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                }
            }
        });
    },

    /**
     * Build changes list from diff result
     * @param {object} diffResult - Diff result from store
     */
    buildChangesList(diffResult) {
        if (!diffResult) {
            this.changes = [];
            this.currentIndex = -1;
            this.updateUI();
            return;
        }

        // Combine all changes with their paths
        this.changes = [];

        diffResult.added.forEach(change => {
            this.changes.push({
                type: 'added',
                path: change.path,
                data: change
            });
        });

        diffResult.removed.forEach(change => {
            this.changes.push({
                type: 'removed',
                path: change.path,
                data: change
            });
        });

        diffResult.modified.forEach(change => {
            this.changes.push({
                type: 'modified',
                path: change.path,
                data: change
            });
        });

        // Sort by path for predictable navigation
        this.changes.sort((a, b) => a.path.localeCompare(b.path));

        // Reset to first change
        if (this.changes.length > 0) {
            this.currentIndex = 0;
            this.navigateToChange(0);
        } else {
            this.currentIndex = -1;
        }

        this.updateUI();
    },

    /**
     * Navigate to next change
     */
    next() {
        if (this.changes.length === 0) {
            Utils.showToast('No changes to navigate', 'info');
            return;
        }

        const nextIndex = (this.currentIndex + 1) % this.changes.length;
        this.navigateToChange(nextIndex);
    },

    /**
     * Navigate to previous change
     */
    previous() {
        if (this.changes.length === 0) {
            Utils.showToast('No changes to navigate', 'info');
            return;
        }

        const prevIndex = this.currentIndex - 1 < 0 ?
            this.changes.length - 1 :
            this.currentIndex - 1;
        this.navigateToChange(prevIndex);
    },

    /**
     * Navigate to specific change by index
     * @param {number} index - Change index
     */
    navigateToChange(index) {
        if (index < 0 || index >= this.changes.length) return;

        this.currentIndex = index;
        const change = this.changes[index];

        // Remove previous highlights
        document.querySelectorAll('.nav-highlight').forEach(el => {
            el.classList.remove('nav-highlight');
        });

        // Find and highlight the change in current view
        this.highlightChangeInView(change);

        // Update UI
        this.updateUI();
    },

    /**
     * Highlight change in current active view
     * @param {object} change - Change to highlight
     */
    highlightChangeInView(change) {
        // Determine active diff view
        const activeTab = document.querySelector('.nav-pills .nav-link.active');
        if (!activeTab) return;

        const viewId = activeTab.getAttribute('data-bs-target')?.substring(1);

        switch (viewId) {
            case 'sidebyside-view':
                this.highlightInSideBySide(change);
                break;

            case 'unified-view':
                this.highlightInUnified(change);
                break;

            case 'jsonata-view':
                this.highlightInJSONata(change);
                break;

            case 'tree-view':
                this.highlightInTree(change);
                break;
        }
    },

    /**
     * Highlight in side-by-side view
     * @param {object} change - Change object
     */
    highlightInSideBySide(change) {
        const leftPanel = document.getElementById('sidebyside-left');
        const rightPanel = document.getElementById('sidebyside-right');

        if (!leftPanel || !rightPanel) return;

        // Find lines containing the change path
        const pathParts = this.getPathParts(change.path);
        const searchText = pathParts[pathParts.length - 1];

        let targetElement = null;

        // Search in appropriate panel
        const panel = change.type === 'added' ? rightPanel : leftPanel;
        const lines = panel.querySelectorAll('.diff-line');

        lines.forEach(line => {
            const content = line.textContent;
            if (content.includes(`"${searchText}"`) || content.includes(change.path)) {
                targetElement = line;
            }
        });

        if (targetElement) {
            targetElement.classList.add('nav-highlight');
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Highlight in unified view
     * @param {object} change - Change object
     */
    highlightInUnified(change) {
        const container = document.getElementById('unified-diff');
        if (!container) return;

        const pathParts = this.getPathParts(change.path);
        const searchText = pathParts[pathParts.length - 1];

        const lines = container.querySelectorAll('.unified-line');
        let targetElement = null;

        lines.forEach(line => {
            const content = line.textContent;
            if (content.includes(`"${searchText}"`) || content.includes(change.path)) {
                // Check if line type matches change type
                const isAddition = line.classList.contains('addition');
                const isDeletion = line.classList.contains('deletion');

                if ((change.type === 'added' && isAddition) ||
                    (change.type === 'removed' && isDeletion) ||
                    change.type === 'modified') {
                    targetElement = line;
                }
            }
        });

        if (targetElement) {
            targetElement.classList.add('nav-highlight');
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Highlight in JSONata view
     * @param {object} change - Change object
     */
    highlightInJSONata(change) {
        const container = document.getElementById('jsonata-queries');
        if (!container) return;

        const blocks = container.querySelectorAll('.jsonata-query-block');

        blocks.forEach(block => {
            const header = block.querySelector('.jsonata-query-header strong');
            if (header && header.textContent.includes(change.path)) {
                block.classList.add('nav-highlight');
                block.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    },

    /**
     * Highlight in tree view
     * @param {object} change - Change object
     */
    highlightInTree(change) {
        const container = document.getElementById('tree-diff');
        if (!container) return;

        const pathParts = this.getPathParts(change.path);
        const targetKey = pathParts[pathParts.length - 1];

        const nodes = container.querySelectorAll('.tree-node-header');

        nodes.forEach(node => {
            const keyElement = node.querySelector('.tree-key');
            if (keyElement && keyElement.textContent === targetKey) {
                // Check if this node has the right change indicator
                const indicator = node.querySelector('.tree-change-indicator');
                if (indicator && indicator.classList.contains(change.type)) {
                    node.classList.add('nav-highlight');
                    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    },

    /**
     * Get path parts
     * @param {string} path - Path string
     * @returns {array} - Path parts
     */
    getPathParts(path) {
        return path.split('.').map(part => {
            // Handle array indices
            return part.replace(/\[\d+\]/, '');
        });
    },

    /**
     * Update navigation UI
     */
    updateUI() {
        const prevBtn = document.getElementById('prevChange');
        const nextBtn = document.getElementById('nextChange');
        const counter = document.getElementById('changeCounter');

        if (!prevBtn || !nextBtn || !counter) return;

        if (this.changes.length === 0) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            counter.textContent = 'No changes';
        } else {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            counter.textContent = `${this.currentIndex + 1} / ${this.changes.length}`;

            // Update button tooltips
            if (this.currentIndex >= 0 && this.currentIndex < this.changes.length) {
                const change = this.changes[this.currentIndex];
                counter.title = `${change.type}: ${change.path}`;
            }
        }
    },

    /**
     * Jump to specific change type
     * @param {string} type - Change type (added, removed, modified)
     */
    jumpToType(type) {
        const changes = this.changes.filter(c => c.type === type);

        if (changes.length === 0) {
            Utils.showToast(`No ${type} changes found`, 'info');
            return;
        }

        // Find next change of this type from current position
        let targetIndex = -1;

        for (let i = this.currentIndex + 1; i < this.changes.length; i++) {
            if (this.changes[i].type === type) {
                targetIndex = i;
                break;
            }
        }

        // If not found after current, search from beginning
        if (targetIndex === -1) {
            for (let i = 0; i <= this.currentIndex; i++) {
                if (this.changes[i].type === type) {
                    targetIndex = i;
                    break;
                }
            }
        }

        if (targetIndex >= 0) {
            this.navigateToChange(targetIndex);
        }
    },

    /**
     * Get current change
     * @returns {object|null} - Current change or null
     */
    getCurrentChange() {
        if (this.currentIndex >= 0 && this.currentIndex < this.changes.length) {
            return this.changes[this.currentIndex];
        }
        return null;
    }
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DiffNavigation.init());
} else {
    DiffNavigation.init();
}
