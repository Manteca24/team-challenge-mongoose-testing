const Post = require("../models/Post");

const PostController = {
    async create (req, res) {
        try {
            const post = await Post.create(req.body);
            res.status(201).json(post);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    },
    async getAll (req,res) {
        try {
            const posts = await Post.find();
            res.json(posts);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    async getbyID (req, res) {
        try {
            const post = await Post.findById(req.params._id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    async getbyTitle (req, res) {
        try {
            const post = await Post.findOne({title: req.query.title});
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    async update (req, res) {
        try {
            const post = await Post.findOne({ title: req.params.title });
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    async deletePost (req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json({ message: 'Post deleted' });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    async pagination (req, res) {
        const { page = 1, limit = 10 } = req.query;
        try {
            const posts = await Post.find()
                .limit(limit * 1)
                .skip((page - 1) * limit);
            const count = await Post.countDocuments();
            res.json({
                posts,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PostController;

