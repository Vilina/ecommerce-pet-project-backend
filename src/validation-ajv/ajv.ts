import ajv from './customFormats';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to validate request body against a JSON schema using Ajv.
 * @param schema - JSON schema object to validate against.
 * @returns Express middleware function.
 */
export const validateSchema = <T>(schema: object) => {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        const valid = validate(req.body);

        if (!valid) {
            return res.status(400).json({ errors: validate.errors });
        }

        next();
    };
};
