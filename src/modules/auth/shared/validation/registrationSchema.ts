import { JSONSchemaType } from 'ajv';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface RegistrationSchema {
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  address: Address;
  phone: string;
}

const registrationSchema: JSONSchemaType<RegistrationSchema> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    passwordHash: { type: 'string', minLength: 6 },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        postalCode: { type: 'string' },
        country: { type: 'string' },
      },
      required: ['street', 'city', 'state', 'postalCode', 'country'],
    },
    phone: {
      type: 'string',
      pattern:
        '^[+]?[0-9]{1,4}?[-.\\s]?([(]?[0-9]{1,3}[)]?)?[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}$',
    },
  },
  required: [
    'username',
    'email',
    'passwordHash',
    'firstName',
    'lastName',
    'address',
    'phone',
  ],
};

export default registrationSchema;
