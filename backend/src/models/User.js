import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.models.User || mongoose.model('User', UserSchema);
