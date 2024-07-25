import { JSONSchemaType } from 'ajv';

interface LoginSchema {
    username: string;
    password: string;
}

const loginSchema: JSONSchemaType<LoginSchema> = {
    type: "object",
    properties: {
        username: { type: "string", minLength: 3 },
        password: { type: "string", minLength: 6 }
    },
    required: ["username", "password"]
};

export default loginSchema;
