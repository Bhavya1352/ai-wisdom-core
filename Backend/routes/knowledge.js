const express = require("express");
const router = express.Router();
const {
  createKnowledge,
  getAllKnowledge,
  getKnowledgeById,
  searchKnowledge,
} = require("../controllers/knowledgeController");

// Create a knowledge item
router.post("/", createKnowledge);

// Get all knowledge items
router.get("/", getAllKnowledge);

// Get single knowledge item
router.get("/:id", getKnowledgeById);

// Search knowledge items (AI-powered)
router.get("/search/query", searchKnowledge);

module.exports = router;
