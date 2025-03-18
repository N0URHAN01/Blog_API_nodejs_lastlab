const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new comment (Authenticated User)
exports.createComment = async (req, res) => {
  try {
    const { content, parentId } = req.body;
    const { postId } = req.params;
    const authorId = req.user.id; // Get user ID from token

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId,
        parentId
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post
exports.getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { author: true },
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment (Only author can update)
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const authorId = req.user.id; 

    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (parseInt(comment.authorId) !== parseInt(authorId)) {
      return res.status(403).json({ error: "Forbidden: You can only update your own comments" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete a comment (Only author can delete)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id; // Get user ID from token

    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (parseInt(comment.authorId) !== parseInt(authorId)) {
      return res.status(403).json({ error: "Forbidden: You can only delete your own comments" });
    }

    await prisma.comment.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
