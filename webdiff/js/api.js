/**
 * API Integration Module for common-madmp-api
 * Handles communication with the maDMP API
 */

const API = {
    /**
     * Send maDMP to API
     * @param {string} endpoint - API endpoint URL
     * @param {object} madmpData - maDMP JSON data
     * @returns {Promise<object>} - API response
     */
    async sendMaDMP(endpoint, madmpData) {
        if (!endpoint) {
            throw new Error('API endpoint is not configured');
        }

        if (!Utils.isValidURL(endpoint)) {
            throw new Error('Invalid API endpoint URL');
        }

        if (!madmpData) {
            throw new Error('No maDMP data to send');
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/vnd.org.rd-alliance.dmp-common.v1.2+json',
                    'Accept': 'application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json'
                },
                body: JSON.stringify(madmpData)
            });

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                try {
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                } catch {
                    // Use default error message
                }

                throw new Error(errorMessage);
            }

            // Parse response
            const responseData = await response.json();

            return {
                success: true,
                data: responseData,
                headers: {
                    contentType: response.headers.get('Content-Type'),
                    lastModified: response.headers.get('Last-Modified')
                }
            };
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },

    /**
     * Test API connection
     * @param {string} endpoint - API endpoint URL
     * @returns {Promise<object>} - Connection test result
     */
    async testConnection(endpoint) {
        if (!endpoint) {
            return {
                success: false,
                message: 'API endpoint is not configured'
            };
        }

        if (!Utils.isValidURL(endpoint)) {
            return {
                success: false,
                message: 'Invalid API endpoint URL'
            };
        }

        try {
            // Try OPTIONS request first (CORS preflight)
            const optionsResponse = await fetch(endpoint, {
                method: 'OPTIONS'
            });

            if (optionsResponse.ok) {
                return {
                    success: true,
                    message: 'API endpoint is accessible',
                    status: optionsResponse.status,
                    corsEnabled: optionsResponse.headers.has('Access-Control-Allow-Origin')
                };
            }

            // If OPTIONS fails, try HEAD or GET
            const headResponse = await fetch(endpoint, {
                method: 'HEAD'
            }).catch(() => null);

            if (headResponse && headResponse.ok) {
                return {
                    success: true,
                    message: 'API endpoint is accessible',
                    status: headResponse.status
                };
            }

            return {
                success: false,
                message: 'API endpoint is not accessible',
                status: headResponse?.status
            };
        } catch (error) {
            console.error('Connection test failed:', error);
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    },

    /**
     * Handle API response
     * @param {object} response - API response
     */
    handleResponse(response) {
        const store = useStore.getState();

        if (response.success) {
            // Store response
            store.setAPIResponse(response);

            // Set output JSON
            store.setOutputJSON(response.data);

            // Validate output
            const validation = Validator.validateData(response.data);
            store.setOutputValidation(validation);

            // Render validation
            Validator.renderValidation(validation, 'outputValidationStatus');

            // Show success message
            Utils.showToast('API request successful! Merged maDMP received.', 'success');

            // Calculate diff
            store.calculateDiff();
        } else {
            throw new Error(response.message || 'API request failed');
        }
    },

    /**
     * Handle API error
     * @param {Error} error - Error object
     */
    handleError(error) {
        const store = useStore.getState();

        store.setAPIError(error.message);
        Utils.showToast('API Error: ' + error.message, 'error');

        // Clear output validation
        const container = document.getElementById('outputValidationStatus');
        if (container) {
            container.innerHTML = `
                <div class="validation-badge error">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>API Error</strong>
                    <p class="mb-0 mt-1 small">${Utils.escapeHTML(error.message)}</p>
                </div>
            `;
        }
    },

    /**
     * Send maDMP to API (high-level function)
     */
    async send() {
        const store = useStore.getState();

        // Validate prerequisites
        if (!store.inputJSON) {
            Utils.showToast('Please upload a maDMP JSON file first', 'warning');
            return;
        }

        if (!store.apiEndpoint) {
            Utils.showToast('Please configure API endpoint first', 'warning');
            return;
        }

        // Validate input before sending
        if (!store.inputValidation || !store.inputValidation.valid) {
            Utils.showToast('Input maDMP is not valid. Please fix validation errors first.', 'error');
            return;
        }

        try {
            // Show loading
            store.setAPILoading(true);
            Utils.toggleLoading(true);

            // Send request
            const response = await this.sendMaDMP(store.apiEndpoint, store.inputJSON);

            // Handle response
            this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        } finally {
            // Hide loading
            store.setAPILoading(false);
            Utils.toggleLoading(false);
        }
    },

    /**
     * Test connection (high-level function)
     */
    async test() {
        const store = useStore.getState();

        if (!store.apiEndpoint) {
            Utils.showToast('Please enter API endpoint URL first', 'warning');
            return;
        }

        try {
            Utils.toggleLoading(true);

            const result = await this.testConnection(store.apiEndpoint);

            if (result.success) {
                Utils.showToast(result.message, 'success');

                if (result.corsEnabled === false) {
                    Utils.showToast('Warning: CORS may not be enabled on this endpoint', 'warning');
                }
            } else {
                Utils.showToast('Connection failed: ' + result.message, 'error');
            }
        } catch (error) {
            Utils.showToast('Connection test error: ' + error.message, 'error');
        } finally {
            Utils.toggleLoading(false);
        }
    }
};
