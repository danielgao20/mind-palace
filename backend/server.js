const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const Item = require('./models/item'); 

const app = express();
app.use(cors());
app.use(express.json());

const client = new Cerebras({
    apiKey: process.env['CEREBRAS_API_KEY'],
});

async function generateEmbedding(text) {
    try {
        const response = await axios.post('http://localhost:8001/generate-embedding', { text });
        return response.data.embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        return null;
    }
}

// Call Cerebras API
async function summarizeDescription(description) {
    try {
        const completionCreateResponse = await client.chat.completions.create({
        messages: [{ role: 'user', content: `Summarize this description into one sentence: "${description}"` }],
        model: 'llama3.1-8b',
        });
        const improvedDescription = completionCreateResponse.choices[0].message.content.trim();
        console.log("Cerebras response: " + improvedDescription);
        return improvedDescription;
    } catch (error) {
        console.error('Error summarizing description:', error);
        return description;
    }
}

app.post('/summarize', async (req, res) => {
    const { description } = req.body;
    try {
        const summarizedDescription = await summarizeDescription(description);
        res.json({ summarizedDescription, embedding });
    } catch (error) {
        res.status(500).json({ message: 'Error summarizing description', error });
    }
});

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
    const summarizedDescription = await summarizeDescription(description);

    const embedding = await generateEmbedding(summarizedDescription);
    if (!embedding) {
        return res.status(500).json({ message: 'Error generating embedding' });
    }
    
    const newItem = new Item({
      description: summarizedDescription,
      tag,
      embedding,
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

app.delete('/delete/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Item.findByIdAndDelete(id);
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));