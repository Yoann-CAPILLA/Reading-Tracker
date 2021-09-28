const express = require('express');
const router = express.Router();

const articleController = require('./controllers/articleController');

// Create a new Article
router.post("/", articleController.create);

// Retrieve all Articles
router.get("/", articleController.findAll);

// Retrieve all unread Articles
router.get("/unread", articleController.findAllUnread);

// Retrieve an Article with id
router.get("/:id", articleController.findOne);

// Update an Article with id
router.put("/:id", articleController.update);

// Delete an Article with id
router.delete("/:id", articleController.delete);

// Delete all Articles
router.delete("/", articleController.deleteAll);

module.exports = router;