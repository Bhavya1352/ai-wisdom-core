const Knowledge = require("../models/Knowledge");

// Add Knowledge
exports.addKnowledge = async (req, res) => {
  try {
    const knowledge = new Knowledge(req.body);
    await knowledge.save();
    res.status(201).json(knowledge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Knowledge
exports.getAllKnowledge = async (req, res) => {
  try {
    const knowledgeList = await Knowledge.find();
    res.json(knowledgeList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Knowledge by ID
exports.getKnowledgeById = async (req, res) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);
    if (!knowledge) return res.status(404).json({ message: "Not found" });
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
