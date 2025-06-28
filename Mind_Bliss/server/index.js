const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',   // ✅ Updated model
        messages: [
          { role: 'system', content: 'You are a friendly chatbot for MindBliss helping users relax.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await groqResponse.json();
    console.log('Groq API raw response:', data);

    if (data.choices && data.choices.length > 0) {
      const botReply = data.choices[0].message.content;
      res.json({ reply: botReply });
    } else {
      res.status(500).json({ error: 'Groq API returned unexpected response.', details: data });
    }
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to get AI reply.', details: error.message });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on port 5000');
});
