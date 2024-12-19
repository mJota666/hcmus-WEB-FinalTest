import mongoose from 'mongoose';
const { Schema } = mongoose;

// Articles Schema  
const ArticlesSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    abstract: { type: String, required: true },
    content: { type: String, required: true, set: (value) => value.toString() },
    is_premium: { type: Boolean, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Categories' },
  });

const ArticlesModel = mongoose.model('Articles', ArticlesSchema);

export default ArticlesModel