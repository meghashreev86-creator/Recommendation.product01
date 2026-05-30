import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
