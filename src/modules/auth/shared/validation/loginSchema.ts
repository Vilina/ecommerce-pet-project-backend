import { JSONSchemaType } from 'ajv';

interface LoginSchema {
  username?: string;
  email?: string;
  password: string;
}

const loginSchema: JSONSchemaType<LoginSchema> | any = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['password'],
  anyOf: [{ required: ['username'] }, { required: ['email'] }],
  additionalProperties: false,
};

export default loginSchema;
