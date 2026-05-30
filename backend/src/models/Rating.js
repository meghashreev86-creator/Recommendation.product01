import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
