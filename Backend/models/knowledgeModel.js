const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  metadata: { type: Object, default: {} },
  embedding: { type: Array, default: [] }, // AI vector for semantic search
}, { timestamps: true });

module.exports = mongoose.model("Knowledge", KnowledgeSchema);
