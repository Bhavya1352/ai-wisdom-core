const Knowledge = require("../models/knowledgeModel");
const { generateEmbedding } = require("../utils/aiUtils");

// Create a knowledge item
const createKnowledge = async (req, res) => {
  try {
    const { title, content, metadata } = req.body;
    const embedding = await generateEmbedding(content);

    const knowledge = new Knowledge({ title, content, metadata, embedding });
    await knowledge.save();
    res.status(201).json(knowledge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create knowledge item" });
  }
};

// Get all knowledge items
const getAllKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({ createdAt: -1 });
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch knowledge items" });
  }
};

// Get knowledge by ID
const getKnowledgeById = async (req, res) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);
    if (!knowledge) return res.status(404).json({ error: "Not found" });
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch knowledge item" });
  }
};

// AI-powered search (cosine similarity)
const searchKnowledge = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query required" });

    const queryEmbedding = await generateEmbedding(query);
    const knowledgeItems = await Knowledge.find();

    // Simple cosine similarity search
    const cosineSimilarity = (vecA, vecB) => {
      const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
      const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
      const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
      return dotProduct / (magnitudeA * magnitudeB);
    };

    const results = knowledgeItems
      .map(item => ({
        item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)  // top 10 results
      .map(r => r.item);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = { createKnowledge, getAllKnowledge, getKnowledgeById, searchKnowledge };
