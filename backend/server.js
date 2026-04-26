// server.js
// Updated for model: openrouter/auto

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Kira backend running.");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], system = "" } = req.body;

    const finalMessages = [];

    if (system?.trim()) {
      finalMessages.push({
        role: "system",
        content: system
      });
    }

    for (const msg of messages) {
      if (!msg?.role || !msg?.content) continue;

      finalMessages.push({
        role: msg.role,
        content: msg.content
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Kira"
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: finalMessages,
          temperature: 0.9,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return res.status(500).json({
        reply: "My thoughts are cloudy right now..."
      });
    }

    const text =
      data?.choices?.[0]?.message?.content ||
      "I don't know what to say right now...";

    // Supports your existing callClaude()
    res.json({
      reply: text,
      content: [
        {
          text: text
        }
      ]
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      reply: "Connection to my mind was interrupted..."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});