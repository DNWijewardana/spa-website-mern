import BlogPost from '../models/BlogPost.js';

// GET /api/blog  (?category=)
export const getPosts = async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    if (req.query.category) filter.category = req.query.category;
    const posts = await BlogPost.find(filter)
      .select('-content')
      .sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/:slug
export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    // Related posts (same category, excluding this one)
    const related = await BlogPost.find({
      isPublished: true,
      category: post.category,
      _id: { $ne: post._id },
    })
      .select('title slug excerpt coverImage readTime')
      .limit(3);
    res.json({ post, related });
  } catch (err) {
    next(err);
  }
};
