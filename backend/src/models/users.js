import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const UsersSchema = new Schema({
  username: String,
  password: String,
  timestamp: Date
});

// Creating a table within database with the defined schema
const Users = mongoose.model('Users', UsersSchema);

// Exporting table for querying and mutating
export default Users;