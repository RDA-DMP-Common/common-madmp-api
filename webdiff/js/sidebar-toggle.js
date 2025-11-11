/**
 * Sidebar Toggle Functionality
 * Handles collapsing and expanding the left sidebar panel
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'madmp-sidebar-collapsed';

    /**
     * Initialize sidebar toggle
     */
    function init() {
        const toggleBtn = document.getElementById('sidebarToggle');
        if (!toggleBtn) {
            console.warn('Sidebar toggle button not found');
            return;
        }

        // Restore saved state
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState === 'true') {
            collapseSidebar(false);
        }

        // Setup toggle button click handler
        toggleBtn.addEventListener('click', toggleSidebar);

        // Handle keyboard shortcut (Ctrl/Cmd + B)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
        });

        console.log('Sidebar toggle initialized');
    }

    /**
     * Toggle sidebar collapsed state
     */
    function toggleSidebar() {
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');

        if (isCollapsed) {
            expandSidebar();
        } else {
            collapseSidebar();
        }
    }

    /**
     * Collapse the sidebar
     * @param {boolean} animate - Whether to animate the transition
     */
    function collapseSidebar(animate = true) {
        const toggleBtn = document.getElementById('sidebarToggle');
        const icon = toggleBtn.querySelector('i');

        if (!animate) {
            document.body.style.transition = 'none';
        }

        document.body.classList.add('sidebar-collapsed');
        icon.classList.remove('bi-chevron-left');
        icon.classList.add('bi-chevron-right');

        // Save state
        localStorage.setItem(STORAGE_KEY, 'true');

        if (!animate) {
            // Force reflow
            void document.body.offsetHeight;
            document.body.style.transition = '';
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('sidebar-toggled', {
            detail: { collapsed: true }
        }));
    }

    /**
     * Expand the sidebar
     */
    function expandSidebar() {
        const toggleBtn = document.getElementById('sidebarToggle');
        const icon = toggleBtn.querySelector('i');

        document.body.classList.remove('sidebar-collapsed');
        icon.classList.remove('bi-chevron-right');
        icon.classList.add('bi-chevron-left');

        // Save state
        localStorage.setItem(STORAGE_KEY, 'false');

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('sidebar-toggled', {
            detail: { collapsed: false }
        }));
    }

    /**
     * Check if sidebar is currently collapsed
     * @returns {boolean}
     */
    function isCollapsed() {
        return document.body.classList.contains('sidebar-collapsed');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export API
    window.SidebarToggle = {
        toggle: toggleSidebar,
        collapse: collapseSidebar,
        expand: expandSidebar,
        isCollapsed: isCollapsed
    };
})();
