const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const Item = require('./models/item'); 

const app = express();
app.use(cors());
app.use(express.json());

const client = new Cerebras({
    apiKey: process.env['CEREBRAS_API_KEY'],
});

// Call Cerebras API
async function summarizeDescription(description) {
    try {
        const completionCreateResponse = await cerebrasClient.chat.completions.create({
        messages: [{ role: 'user', content: `Summarize this description into one sentence: "${description}"` }],
        model: 'llama3.1-8b',
        });
        const improvedDescription = completionCreateResponse.choices[0].message.content.trim();
        return improvedDescription;
    } catch (error) {
        console.error('Error summarizing description:', error);
        return description;
    }
}

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/add/item', async (req, res) => {
    const { description, tags } = req.body;
    const newItem = new Item({
      description,
      tags,
    });
  
    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: 'Error saving item', error });
    }
});

app.get('/items', async (req, res) => {
    try {
      const items = await Item.find({});
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));