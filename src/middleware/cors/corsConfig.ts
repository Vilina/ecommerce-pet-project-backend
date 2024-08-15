import { CorsOptions } from 'cors';
import config from '../../config';

// List of allowed origins
const allowedOrigins: string[] = config.allowed_origins
  .split(',')
  .map((origin: string) => origin.trim());

const dynamicOriginPatternString = config.dynamic_origin_pattern.replace(
  '*',
  '[\\w-]+',
);
const dynamicOriginPattern = new RegExp(dynamicOriginPatternString);

// CORS configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true); // Allow the origin
    } else if (
      config.dynamic_origin_pattern &&
      dynamicOriginPattern.test(origin)
    ) {
      // Allow if the origin matches the dynamic subdomain pattern
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS')); // Block the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

export default corsOptions;
