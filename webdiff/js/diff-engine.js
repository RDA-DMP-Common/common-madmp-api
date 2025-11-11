/**
 * Diff Engine for comparing maDMP JSON objects
 *
 * @fileoverview Deep comparison engine that generates structured diff data
 * for visualization in multiple formats (Side-by-Side, Unified, JSONata, Tree)
 *
 * @version 2.0.0
 * @requires jsdiff v5 (for text-based diffs)
 */

const DiffEngine = {
    /**
     * Compare two JSON objects and identify all changes
     * Performs deep recursive comparison to find added, removed, modified, and unchanged fields
     *
     * @param {Object} oldObj - Original maDMP JSON object
     * @param {Object} newObj - Modified maDMP JSON object
     * @returns {Object} Diff result containing categorized changes
     * @returns {Array} returns.added - Fields added in newObj
     * @returns {Array} returns.removed - Fields removed from oldObj
     * @returns {Array} returns.modified - Fields with changed values
     * @returns {Array} returns.unchanged - Fields with identical values
     *
     * @example
     * const diff = DiffEngine.compare(
     *   { dmp: { title: "Old Title" } },
     *   { dmp: { title: "New Title" } }
     * );
     * // Returns: { added: [], removed: [], modified: [{path: "dmp.title", ...}], unchanged: [] }
     */
    compare(oldObj, newObj) {
        const changes = {
            added: [],
            removed: [],
            modified: [],
            unchanged: []
        };

        // Deep comparison
        this.deepCompare(oldObj, newObj, '', changes);

        return changes;
    },

    /**
     * Deep compare objects recursively
     * @param {any} oldVal - Old value
     * @param {any} newVal - New value
     * @param {string} path - Current path
     * @param {object} changes - Changes accumulator
     */
    deepCompare(oldVal, newVal, path, changes) {
        const oldType = this.getType(oldVal);
        const newType = this.getType(newVal);

        // Check if both are null/undefined
        if (oldVal === null && newVal === null) {
            changes.unchanged.push({ path, value: null, type: 'null' });
            return;
        }

        // One is null/undefined
        if (oldVal === null || newVal === null) {
            if (oldVal === null) {
                changes.added.push({ path, value: newVal, type: newType });
            } else {
                changes.removed.push({ path, value: oldVal, type: oldType });
            }
            return;
        }

        // Different types
        if (oldType !== newType) {
            changes.modified.push({
                path,
                oldValue: oldVal,
                newValue: newVal,
                oldType,
                newType
            });
            return;
        }

        // Same type - compare based on type
        switch (oldType) {
            case 'object':
                this.compareObjects(oldVal, newVal, path, changes);
                break;

            case 'array':
                this.compareArrays(oldVal, newVal, path, changes);
                break;

            case 'primitive':
                if (oldVal !== newVal) {
                    changes.modified.push({
                        path,
                        oldValue: oldVal,
                        newValue: newVal,
                        type: oldType
                    });
                } else {
                    changes.unchanged.push({ path, value: oldVal, type: oldType });
                }
                break;
        }
    },

    /**
     * Compare objects
     * @param {object} oldObj - Old object
     * @param {object} newObj - New object
     * @param {string} path - Current path
     * @param {object} changes - Changes accumulator
     */
    compareObjects(oldObj, newObj, path, changes) {
        const oldKeys = Object.keys(oldObj);
        const newKeys = Object.keys(newObj);
        const allKeys = new Set([...oldKeys, ...newKeys]);

        allKeys.forEach(key => {
            const newPath = path ? `${path}.${key}` : key;
            const hasOld = oldKeys.includes(key);
            const hasNew = newKeys.includes(key);

            if (hasOld && hasNew) {
                // Key exists in both - compare values
                this.deepCompare(oldObj[key], newObj[key], newPath, changes);
            } else if (hasOld) {
                // Key only in old - removed
                changes.removed.push({
                    path: newPath,
                    value: oldObj[key],
                    type: this.getType(oldObj[key])
                });
            } else {
                // Key only in new - added
                changes.added.push({
                    path: newPath,
                    value: newObj[key],
                    type: this.getType(newObj[key])
                });
            }
        });
    },

    /**
     * Compare arrays
     * @param {array} oldArr - Old array
     * @param {array} newArr - New array
     * @param {string} path - Current path
     * @param {object} changes - Changes accumulator
     */
    compareArrays(oldArr, newArr, path, changes) {
        const maxLength = Math.max(oldArr.length, newArr.length);

        for (let i = 0; i < maxLength; i++) {
            const newPath = `${path}[${i}]`;

            if (i < oldArr.length && i < newArr.length) {
                // Both have element at index
                this.deepCompare(oldArr[i], newArr[i], newPath, changes);
            } else if (i < oldArr.length) {
                // Old has element, new doesn't - removed
                changes.removed.push({
                    path: newPath,
                    value: oldArr[i],
                    type: this.getType(oldArr[i])
                });
            } else {
                // New has element, old doesn't - added
                changes.added.push({
                    path: newPath,
                    value: newArr[i],
                    type: this.getType(newArr[i])
                });
            }
        }
    },

    /**
     * Get value type
     * @param {any} value - Value to check
     * @returns {string} - Type (object, array, primitive, null)
     */
    getType(value) {
        if (value === null || value === undefined) {
            return 'null';
        }
        if (Array.isArray(value)) {
            return 'array';
        }
        if (typeof value === 'object') {
            return 'object';
        }
        return 'primitive';
    },

    /**
     * Calculate statistics from diff result
     * @param {object} changes - Diff result
     * @returns {object} - Statistics
     */
    calculateStats(changes) {
        return {
            totalChanges: changes.added.length + changes.removed.length + changes.modified.length,
            added: changes.added.length,
            removed: changes.removed.length,
            modified: changes.modified.length,
            unchanged: changes.unchanged.length,
            changePercentage: this.calculateChangePercentage(changes)
        };
    },

    /**
     * Calculate change percentage
     * @param {object} changes - Diff result
     * @returns {number} - Percentage
     */
    calculateChangePercentage(changes) {
        const total = changes.added.length + changes.removed.length +
                     changes.modified.length + changes.unchanged.length;

        if (total === 0) return 0;

        const changed = changes.added.length + changes.removed.length + changes.modified.length;
        return Math.round((changed / total) * 100);
    },

    /**
     * Generate text diff using jsdiff library
     * @param {string} oldText - Old text
     * @param {string} newText - New text
     * @returns {array} - Diff parts
     */
    generateTextDiff(oldText, newText) {
        if (typeof Diff !== 'undefined') {
            return Diff.diffLines(oldText, newText);
        }
        return [];
    },

    /**
     * Format value for display
     * @param {any} value - Value
     * @param {number} maxLength - Max string length
     * @returns {string} - Formatted value
     */
    formatValue(value, maxLength = 100) {
        if (value === null || value === undefined) {
            return 'null';
        }

        if (typeof value === 'object') {
            const str = JSON.stringify(value);
            return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
        }

        const str = String(value);
        return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    },

    /**
     * Get change type for a path
     * @param {string} path - Path to check
     * @param {object} changes - Diff result
     * @returns {string|null} - Change type (added, removed, modified, unchanged)
     */
    getChangeType(path, changes) {
        if (changes.added.find(c => c.path === path)) return 'added';
        if (changes.removed.find(c => c.path === path)) return 'removed';
        if (changes.modified.find(c => c.path === path)) return 'modified';
        if (changes.unchanged.find(c => c.path === path)) return 'unchanged';
        return null;
    },

    /**
     * Get all changed paths
     * @param {object} changes - Diff result
     * @returns {array} - List of changed paths
     */
    getChangedPaths(changes) {
        const paths = new Set();

        changes.added.forEach(c => paths.add(c.path));
        changes.removed.forEach(c => paths.add(c.path));
        changes.modified.forEach(c => paths.add(c.path));

        return Array.from(paths).sort();
    },

    /**
     * Generate JSONata queries for changes
     * @param {object} changes - Diff result
     * @returns {array} - JSONata queries
     */
    generateJSONataQueries(changes) {
        const queries = [];

        // Added fields
        changes.added.forEach(change => {
            queries.push({
                type: 'addition',
                path: change.path,
                query: `$ ~> | $ | { "${change.path}": ${JSON.stringify(change.value)} } |`,
                description: `Add field ${change.path}`,
                value: change.value
            });
        });

        // Removed fields
        changes.removed.forEach(change => {
            queries.push({
                type: 'deletion',
                path: change.path,
                query: `$ ~> | $ | { "${change.path}": undefined } |`,
                description: `Remove field ${change.path}`,
                oldValue: change.value
            });
        });

        // Modified fields
        changes.modified.forEach(change => {
            queries.push({
                type: 'modification',
                path: change.path,
                query: `$ ~> | $ | { "${change.path}": ${JSON.stringify(change.newValue)} } |`,
                description: `Change ${change.path} from ${this.formatValue(change.oldValue, 50)} to ${this.formatValue(change.newValue, 50)}`,
                oldValue: change.oldValue,
                newValue: change.newValue
            });
        });

        return queries;
    },

    /**
     * Export diff as JSON
     * @param {object} changes - Diff result
     * @param {object} stats - Statistics
     * @returns {string} - JSON string
     */
    exportAsJSON(changes, stats) {
        const exportData = {
            timestamp: new Date().toISOString(),
            statistics: stats,
            changes: changes
        };

        return JSON.stringify(exportData, null, 2);
    },

    /**
     * Export diff as text
     * @param {object} changes - Diff result
     * @returns {string} - Text format
     */
    exportAsText(changes) {
        let text = 'maDMP Comparison Report\n';
        text += '='.repeat(50) + '\n\n';

        text += 'Added Fields:\n';
        text += '-'.repeat(50) + '\n';
        changes.added.forEach(c => {
            text += `+ ${c.path}: ${this.formatValue(c.value)}\n`;
        });

        text += '\nRemoved Fields:\n';
        text += '-'.repeat(50) + '\n';
        changes.removed.forEach(c => {
            text += `- ${c.path}: ${this.formatValue(c.value)}\n`;
        });

        text += '\nModified Fields:\n';
        text += '-'.repeat(50) + '\n';
        changes.modified.forEach(c => {
            text += `~ ${c.path}:\n`;
            text += `  Old: ${this.formatValue(c.oldValue)}\n`;
            text += `  New: ${this.formatValue(c.newValue)}\n`;
        });

        return text;
    }
};
