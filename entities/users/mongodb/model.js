import mongoose from 'mongoose';
import schema from './schema.js';

export default mongoose.model('User', schema);