import mongoose from 'mongoose';
const { Schema } = mongoose;

// Categories Schema
const CategoriesSchema = new Schema({
  category_name: { type: String, required: true }
});

const CategoriesModel = mongoose.model('Categories', CategoriesSchema);
export default CategoriesModel