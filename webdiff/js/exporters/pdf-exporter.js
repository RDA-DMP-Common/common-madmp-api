/**
 * PDF Exporter
 * Exports diff results as PDF document
 * Requires jsPDF library
 */

const PDFExporter = {
    /**
     * Export diff as PDF
     * @param {object} options - Export options
     */
    async export(options = {}) {
        const store = useStore.getState();

        if (!store.diffResult) {
            Utils.showToast('No diff to export', 'warning');
            return;
        }

        // Check if jsPDF is available
        if (typeof jspdf === 'undefined') {
            Utils.showToast('PDF library not loaded. Please refresh the page.', 'error');
            return;
        }

        try {
            Utils.toggleLoading(true);

            const { jsPDF } = jspdf;
            const doc = new jsPDF();

            // Set font
            doc.setFont('helvetica');

            // Title
            doc.setFontSize(20);
            doc.text('maDMP Comparison Report', 20, 20);

            // Timestamp
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

            // Reset color
            doc.setTextColor(0);

            let yPos = 45;

            // Statistics Section
            yPos = this.addStatistics(doc, yPos, store.diffStats);

            // Changes Summary
            yPos = this.addChangesSummary(doc, yPos, store.diffResult);

            // Detailed Changes
            yPos = this.addDetailedChanges(doc, yPos, store.diffResult, options);

            // Save PDF
            const filename = `madmp-diff-${Date.now()}.pdf`;
            doc.save(filename);

            Utils.showToast('PDF exported successfully', 'success');
        } catch (error) {
            console.error('PDF export error:', error);
            Utils.showToast('Error exporting PDF: ' + error.message, 'error');
        } finally {
            Utils.toggleLoading(false);
        }
    },

    /**
     * Add statistics section
     * @param {object} doc - jsPDF document
     * @param {number} yPos - Y position
     * @param {object} stats - Statistics
     * @returns {number} - New Y position
     */
    addStatistics(doc, yPos, stats) {
        if (!stats) return yPos;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Statistics', 20, yPos);

        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        const statsText = [
            `Total Changes: ${stats.totalChanges}`,
            `Added: ${stats.added}`,
            `Removed: ${stats.removed}`,
            `Modified: ${stats.modified}`,
            `Change Percentage: ${stats.changePercentage}%`
        ];

        statsText.forEach(line => {
            doc.text(line, 25, yPos);
            yPos += 6;
        });

        return yPos + 10;
    },

    /**
     * Add changes summary
     * @param {object} doc - jsPDF document
     * @param {number} yPos - Y position
     * @param {object} changes - Changes object
     * @returns {number} - New Y position
     */
    addChangesSummary(doc, yPos, changes) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Changes Summary', 20, yPos);

        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Added
        if (changes.added.length > 0) {
            doc.setTextColor(0, 128, 0);
            doc.text(`Added Fields (${changes.added.length}):`, 25, yPos);
            yPos += 6;
            doc.setTextColor(0);

            changes.added.slice(0, 10).forEach(change => {
                const text = this.truncate(`  • ${change.path}`, 80);
                doc.text(text, 30, yPos);
                yPos += 5;

                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            if (changes.added.length > 10) {
                doc.setTextColor(100);
                doc.text(`  ... and ${changes.added.length - 10} more`, 30, yPos);
                yPos += 5;
                doc.setTextColor(0);
            }

            yPos += 5;
        }

        // Removed
        if (changes.removed.length > 0) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setTextColor(128, 0, 0);
            doc.text(`Removed Fields (${changes.removed.length}):`, 25, yPos);
            yPos += 6;
            doc.setTextColor(0);

            changes.removed.slice(0, 10).forEach(change => {
                const text = this.truncate(`  • ${change.path}`, 80);
                doc.text(text, 30, yPos);
                yPos += 5;

                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            if (changes.removed.length > 10) {
                doc.setTextColor(100);
                doc.text(`  ... and ${changes.removed.length - 10} more`, 30, yPos);
                yPos += 5;
                doc.setTextColor(0);
            }

            yPos += 5;
        }

        // Modified
        if (changes.modified.length > 0) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setTextColor(128, 128, 0);
            doc.text(`Modified Fields (${changes.modified.length}):`, 25, yPos);
            yPos += 6;
            doc.setTextColor(0);

            changes.modified.slice(0, 10).forEach(change => {
                const text = this.truncate(`  • ${change.path}`, 80);
                doc.text(text, 30, yPos);
                yPos += 5;

                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            if (changes.modified.length > 10) {
                doc.setTextColor(100);
                doc.text(`  ... and ${changes.modified.length - 10} more`, 30, yPos);
                yPos += 5;
                doc.setTextColor(0);
            }
        }

        return yPos;
    },

    /**
     * Add detailed changes
     * @param {object} doc - jsPDF document
     * @param {number} yPos - Y position
     * @param {object} changes - Changes object
     * @param {object} options - Options
     * @returns {number} - New Y position
     */
    addDetailedChanges(doc, yPos, changes, options) {
        if (!options.includeDetails) return yPos;

        doc.addPage();
        yPos = 20;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Detailed Changes', 20, yPos);

        yPos += 10;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        // Add modified fields with values
        changes.modified.forEach(change => {
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.text(this.truncate(change.path, 85), 25, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(128, 0, 0);
            doc.text(`Old: ${this.truncate(this.formatValue(change.oldValue), 75)}`, 30, yPos);
            yPos += 5;

            doc.setTextColor(0, 128, 0);
            doc.text(`New: ${this.truncate(this.formatValue(change.newValue), 75)}`, 30, yPos);
            yPos += 7;

            doc.setTextColor(0);
        });

        return yPos;
    },

    /**
     * Format value for display
     * @param {any} value - Value
     * @returns {string} - Formatted value
     */
    formatValue(value) {
        if (value === null || value === undefined) return 'null';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    },

    /**
     * Truncate text
     * @param {string} text - Text
     * @param {number} maxLength - Max length
     * @returns {string} - Truncated text
     */
    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }
};
