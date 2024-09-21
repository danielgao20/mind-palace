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

async function createEdge(description, tag) {
  try {
      const completionCreateResponse = await cerebrasClient.chat.completions.create({
          messages: [{ 
              role: 'user', 
              content: `Generate an edge for a knowledge graph where the description is "${description}" and the tag is "${tag}". The edge should have a 'from' node, a 'to' node, and a 'label' representing the relationship. Return the result in JSON format with the keys 'from', 'to', and 'label'.` 
          }],
          model: 'llama3.1-8b',
      });

      const responseContent = completionCreateResponse.choices[0].message.content.trim();
      const edge = JSON.parse(responseContent); 
      
      if (edge.from && edge.to && edge.label) {
          return edge; 
      } else {
          throw new Error('Invalid edge structure');
      }
  } catch (error) {
      console.error('Error creating edge:', error);
      return null;
  }
}

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/add/item', async (req, res) => {
    const { description, tag } = req.body;
    const newItem = new Item({
      description,
      tag,
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