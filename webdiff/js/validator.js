/**
 * JSON Schema Validator for maDMP
 *
 * @fileoverview Validates machine-actionable Data Management Plans (maDMP) against
 * the RDA DMP Common Standard v1.2 using Ajv JSON Schema validator
 *
 * @version 2.0.0
 * @requires Ajv v8 (window.ajv2020)
 * @see {@link https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard|RDA DMP Common Standard}
 */

const Validator = {
    /** @type {Object|null} The loaded maDMP JSON schema */
    schema: null,

    /** @type {Object|null} The Ajv validator instance */
    validator: null,

    /** @type {string} Path to the maDMP schema file */
    schemaPath: 'schemas/maDMP-schema-1.2.json',

    /**
     * Load schema from local file using XMLHttpRequest
     * Fallback method for file:// protocol where fetch() is blocked by CORS
     *
     * @param {string} path - Path to the schema JSON file
     * @returns {Promise<Object>} Resolves with the parsed schema object
     * @throws {Error} If schema loading or parsing fails
     */
    loadSchemaLocal(path) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.overrideMimeType('application/json');

            xhr.onload = function() {
                if (xhr.status === 200 || xhr.status === 0) {
                    try {
                        const schema = JSON.parse(xhr.responseText);
                        resolve(schema);
                    } catch (e) {
                        reject(new Error('Failed to parse schema: ' + e.message));
                    }
                } else {
                    reject(new Error('Failed to load schema: ' + xhr.statusText));
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error loading schema'));
            };

            xhr.send();
        });
    },

    /**
     * Initialize the validator
     * Loads the maDMP schema and creates an Ajv validator instance
     *
     * @async
     * @returns {Promise<boolean>} Resolves to true if initialization successful
     * @throws {Error} If schema loading or validator initialization fails
     *
     * @example
     * await Validator.init();
     * const result = Validator.validateJSON(myDMP);
     */
    async init() {
        try {
            // Load schema - handle both local file and HTTP
            let schemaData;

            // Check if running on file:// protocol
            if (window.location.protocol === 'file:') {
                // For local file testing, we'll try to load via XMLHttpRequest
                schemaData = await this.loadSchemaLocal(this.schemaPath);
            } else {
                const response = await fetch(this.schemaPath);
                if (!response.ok) {
                    throw new Error(`Failed to load schema: ${response.statusText}`);
                }
                schemaData = await response.json();
            }

            this.schema = schemaData;

            // Initialize Ajv with options
            const Ajv = window.ajv2020 || window.ajv7 || window.Ajv;
            this.validator = new Ajv({
                strict: false,
                allErrors: true,
                verbose: true,
                validateFormats: true
            });

            // Add custom formats if needed
            this.addCustomFormats();

            // Compile schema
            this.validate = this.validator.compile(this.schema);

            console.log('Validator initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing validator:', error);
            Utils.showToast('Failed to load validation schema: ' + error.message, 'error');
            return false;
        }
    },

    /**
     * Add custom format validators
     */
    addCustomFormats() {
        // Email format
        if (!this.validator.formats.email) {
            this.validator.addFormat('email', {
                validate: (data) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
                }
            });
        }

        // URL format
        if (!this.validator.formats.url) {
            this.validator.addFormat('url', {
                validate: (data) => {
                    try {
                        new URL(data);
                        return true;
                    } catch {
                        return false;
                    }
                }
            });
        }

        // Date format (ISO 8601 date)
        if (!this.validator.formats.date) {
            this.validator.addFormat('date', {
                validate: (data) => {
                    return /^\d{4}-\d{2}-\d{2}$/.test(data);
                }
            });
        }

        // Date-time format (ISO 8601 datetime)
        if (!this.validator.formats['date-time']) {
            this.validator.addFormat('date-time', {
                validate: (data) => {
                    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(data);
                }
            });
        }
    },

    /**
     * Validate JSON data against maDMP schema
     * @param {object} data - JSON data to validate
     * @returns {object} - Validation result
     */
    validateData(data) {
        if (!this.validate) {
            return {
                valid: false,
                errors: [{
                    message: 'Validator not initialized. Please refresh the page.'
                }]
            };
        }

        try {
            const valid = this.validate(data);

            if (valid) {
                return {
                    valid: true,
                    errors: []
                };
            } else {
                return {
                    valid: false,
                    errors: this.formatErrors(this.validate.errors)
                };
            }
        } catch (error) {
            console.error('Validation error:', error);
            return {
                valid: false,
                errors: [{
                    message: 'Validation failed: ' + error.message
                }]
            };
        }
    },

    /**
     * Format Ajv validation errors
     * @param {array} errors - Ajv errors
     * @returns {array} - Formatted errors
     */
    formatErrors(errors) {
        if (!errors || errors.length === 0) {
            return [];
        }

        return errors.map(error => {
            let path = error.instancePath || '/';
            let message = error.message;

            // Add more context based on error type
            switch (error.keyword) {
                case 'required':
                    message = `Missing required property: ${error.params.missingProperty}`;
                    break;

                case 'type':
                    message = `Invalid type: expected ${error.params.type}, got ${typeof error.data}`;
                    break;

                case 'enum':
                    message = `Invalid value. Allowed values: ${error.params.allowedValues.join(', ')}`;
                    break;

                case 'format':
                    message = `Invalid format for ${error.params.format}: ${message}`;
                    break;

                case 'minLength':
                    message = `String too short. Minimum length: ${error.params.limit}`;
                    break;

                case 'maxLength':
                    message = `String too long. Maximum length: ${error.params.limit}`;
                    break;

                case 'minimum':
                    message = `Value too small. Minimum: ${error.params.limit}`;
                    break;

                case 'maximum':
                    message = `Value too large. Maximum: ${error.params.limit}`;
                    break;

                case 'pattern':
                    message = `String does not match pattern: ${error.params.pattern}`;
                    break;

                case 'additionalProperties':
                    message = `Additional property not allowed: ${error.params.additionalProperty}`;
                    break;

                default:
                    // Use default message
                    break;
            }

            return {
                path: path === '' ? '/' : path,
                message: message,
                keyword: error.keyword,
                params: error.params,
                data: error.data
            };
        });
    },

    /**
     * Render validation result to DOM
     * @param {object} validation - Validation result
     * @param {string} containerId - Container element ID
     */
    renderValidation(validation, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        if (validation.valid) {
            container.innerHTML = `
                <div class="validation-badge success">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <strong>Valid maDMP</strong>
                    <p class="mb-0 mt-1 small">Document conforms to maDMP schema v1.2</p>
                </div>
            `;
        } else {
            const errorCount = validation.errors.length;
            const errorsHTML = validation.errors.map(error => `
                <div class="validation-error-item">
                    <div class="error-path">${Utils.escapeHTML(error.path)}</div>
                    <div class="error-message">${Utils.escapeHTML(error.message)}</div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="validation-badge error">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Invalid maDMP</strong>
                    <p class="mb-0 mt-1 small">${errorCount} validation error${errorCount > 1 ? 's' : ''} found</p>
                </div>
                <div class="validation-errors mt-2">
                    ${errorsHTML}
                </div>
            `;
        }
    },

    /**
     * Get validation summary
     * @param {object} validation - Validation result
     * @returns {string} - Summary text
     */
    getValidationSummary(validation) {
        if (validation.valid) {
            return 'Document is valid according to maDMP schema v1.2';
        } else {
            const errorCount = validation.errors.length;
            return `Found ${errorCount} validation error${errorCount > 1 ? 's' : ''}`;
        }
    },

    /**
     * Export validation report
     * @param {object} validation - Validation result
     * @param {object} data - Original data
     * @returns {string} - JSON report
     */
    exportValidationReport(validation, data) {
        const report = {
            timestamp: new Date().toISOString(),
            schema: 'maDMP-schema-1.2',
            valid: validation.valid,
            errorCount: validation.errors.length,
            errors: validation.errors,
            data: {
                title: Utils.getNestedValue(data, 'dmp.title'),
                created: Utils.getNestedValue(data, 'dmp.created'),
                modified: Utils.getNestedValue(data, 'dmp.modified')
            }
        };

        return JSON.stringify(report, null, 2);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Validator.init());
} else {
    Validator.init();
}
