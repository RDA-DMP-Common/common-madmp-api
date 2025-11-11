/**
 * CSV Exporter
 * Exports diff results as CSV file
 */

const CSVExporter = {
    /**
     * Export diff as CSV
     */
    export() {
        const store = useStore.getState();

        if (!store.diffResult) {
            Utils.showToast('No diff to export', 'warning');
            return;
        }

        try {
            const csv = this.generateCSV(store.diffResult, store.diffStats);
            const filename = `madmp-diff-${Date.now()}.csv`;

            Utils.downloadFile(csv, filename, 'text/csv');
            Utils.showToast('CSV exported successfully', 'success');
        } catch (error) {
            console.error('CSV export error:', error);
            Utils.showToast('Error exporting CSV: ' + error.message, 'error');
        }
    },

    /**
     * Generate CSV content
     * @param {object} changes - Changes object
     * @param {object} stats - Statistics
     * @returns {string} - CSV content
     */
    generateCSV(changes, stats) {
        let csv = '';

        // Header
        csv += 'maDMP Comparison Report\n';
        csv += `Generated,${new Date().toISOString()}\n`;
        csv += '\n';

        // Statistics
        csv += 'STATISTICS\n';
        csv += 'Metric,Value\n';
        csv += `Total Changes,${stats.totalChanges}\n`;
        csv += `Added,${stats.added}\n`;
        csv += `Removed,${stats.removed}\n`;
        csv += `Modified,${stats.modified}\n`;
        csv += `Unchanged,${stats.unchanged}\n`;
        csv += `Change Percentage,${stats.changePercentage}%\n`;
        csv += '\n';

        // Added fields
        if (changes.added.length > 0) {
            csv += 'ADDED FIELDS\n';
            csv += 'Path,Value,Type\n';
            changes.added.forEach(change => {
                csv += this.formatCSVRow([
                    change.path,
                    this.formatValue(change.value),
                    change.type
                ]);
            });
            csv += '\n';
        }

        // Removed fields
        if (changes.removed.length > 0) {
            csv += 'REMOVED FIELDS\n';
            csv += 'Path,Value,Type\n';
            changes.removed.forEach(change => {
                csv += this.formatCSVRow([
                    change.path,
                    this.formatValue(change.value),
                    change.type
                ]);
            });
            csv += '\n';
        }

        // Modified fields
        if (changes.modified.length > 0) {
            csv += 'MODIFIED FIELDS\n';
            csv += 'Path,Old Value,New Value,Type\n';
            changes.modified.forEach(change => {
                csv += this.formatCSVRow([
                    change.path,
                    this.formatValue(change.oldValue),
                    this.formatValue(change.newValue),
                    change.type || 'primitive'
                ]);
            });
            csv += '\n';
        }

        return csv;
    },

    /**
     * Format CSV row
     * @param {array} values - Row values
     * @returns {string} - CSV row
     */
    formatCSVRow(values) {
        return values.map(v => this.escapeCSV(v)).join(',') + '\n';
    },

    /**
     * Escape CSV value
     * @param {any} value - Value
     * @returns {string} - Escaped value
     */
    escapeCSV(value) {
        if (value === null || value === undefined) return '""';

        const str = String(value);

        // If contains comma, quote, or newline, wrap in quotes and escape quotes
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }

        return str;
    },

    /**
     * Format value for CSV
     * @param {any} value - Value
     * @returns {string} - Formatted value
     */
    formatValue(value) {
        if (value === null || value === undefined) return 'null';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }
};
