import { CorsOptions } from 'cors';

// List of allowed origins
const allowedOrigins: string[] = [
  'http://localhost:3000',
  'https://nuxt-ecommerce-pet-project.vercel.app/',
];

// CORS configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

export default corsOptions;
