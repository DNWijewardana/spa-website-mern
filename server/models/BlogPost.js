import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, default: 'Serenity Team' },
    category: { type: String, default: 'Wellness' },
    tags: [{ type: String }],
    readTime: { type: Number, default: 4 }, // minutes
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);
