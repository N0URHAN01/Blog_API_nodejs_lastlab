const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new post (JWT authorId)
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user.id; 

        if (!authorId) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        const post = await prisma.post.create({
            data: { title, content, authorId: parseInt(authorId) }
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post (Only the author can update)
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const authorId = req.user.id; 
       
        const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (parseInt(post.authorId) !== parseInt(authorId)) {
            return res.status(403).json({ error: "Forbidden: You can only update your own posts" });
        }

        // Update the post
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { title, content }
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all posts with author & comments
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true, comments: true }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { author: true, comments: true }
        });

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete post (Only author can delete)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (parseInt(post.authorId) !== parseInt(req.user.id)) {
            return res.status(403).json({ error: "Forbidden: You can only delete your own posts" });
        }

        await prisma.post.delete({ where: { id: parseInt(id) } });

        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
