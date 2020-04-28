import { schema, normalize } from 'normalizr';

const data = [
    { id: 1, type: 'admin' },
    { id: 2, type: 'user' },
];

const userSchema = new schema.Entity('users');
const adminSchema = new schema.Entity('admins');

const schema_0 = new schema.Array(
    {
        admins: adminSchema,
        users: userSchema,
    },
    (input, parent, key) => `${input.type}s`,
);
console.log(normalize(data, schema_0));

const schema_1 = new schema.Array(
    {
        admins: adminSchema,
        users: userSchema,
    },
    (input, parent, key) => `${input.type}s`,
);

console.log(normalize(data, schema_1));

console.log('-----一般操作--------');
