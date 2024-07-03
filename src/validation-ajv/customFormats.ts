import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize Ajv instance with allErrors set to true for comprehensive error reporting
const ajv = new Ajv({ allErrors: true });

// Add additional formats from ajv-formats package to Ajv instance
addFormats(ajv);

// Export the configured Ajv instance for use in validation modules
export default ajv;
