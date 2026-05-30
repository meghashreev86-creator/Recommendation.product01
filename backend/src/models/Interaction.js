import mongoose from 'mongoose';

const InteractionSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.models.Interaction || mongoose.model('Interaction', InteractionSchema);
