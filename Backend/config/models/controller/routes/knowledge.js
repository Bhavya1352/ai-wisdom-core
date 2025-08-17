const express = require("express");
const router = express.Router();
const {
  addKnowledge,
  getAllKnowledge,
  getKnowledgeById,
} = require("../controllers/knowledgeController");

router.post("/", addKnowledge);
router.get("/", getAllKnowledge);
router.get("/:id", getKnowledgeById);

module.exports = router;
