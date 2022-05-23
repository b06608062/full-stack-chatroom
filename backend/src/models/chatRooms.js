import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const ChatRoomsSchema = new Schema({
    rName: String,
    rId: String,
    members: Array,
    timestamp: Date,
    messages: Array
});

// Creating a table within database with the defined schema
const ChatRooms = mongoose.model('ChatRooms', ChatRoomsSchema);

// Exporting table for querying and mutating
export default ChatRooms;