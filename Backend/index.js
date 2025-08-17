// Question–Answer route
// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // test route
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from backend!" });
// });

// // your Q&A route
// app.post("/api/ask", (req, res) => {
//   const { question } = req.body; // frontend se question aayega
//   res.json({ answer: `You asked: "${question}". Here is a demo answer.` });
// });

// // start server
// app.listen(5003, () => {
//   console.log("✅ Backend running on http://localhost:5003");
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(5003).json({ error: "Something went wrong" });
  }
});

app.listen(5003, () => {
  console.log("✅ Backend running on http://localhost:5003");
});
