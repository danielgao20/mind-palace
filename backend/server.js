const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const Item = require('./models/item');
const Edge = require('./models/edge'); // Import the Edge model


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
        messages: [{ role: 'user', content: `Summarize this into one sentence: "${description}"` }],
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

// Helper function for cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Helper function to determine if embeddings are similar
function isEmbeddingSimilar(embeddingA, embeddingB, threshold = 0.8) {
  const similarity = cosineSimilarity(embeddingA, embeddingB);
  return similarity > threshold;
}

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Update: Fetch items and create edges between them
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        const edges = await Edge.find({});

        res.status(200).json({ items, edges });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items or edges', error });
    }
});

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

        // After saving, find similar items to create edges
        const items = await Item.find({ _id: { $ne: savedItem._id } });

        // Create edges based on tag or embedding similarity
        for (let item of items) {
            if (item.tag === savedItem.tag) {
                await new Edge({
                    from: savedItem._id,
                    to: item._id,
                    label: `Related by tag: ${savedItem.tag}`
                }).save();
            } else if (isEmbeddingSimilar(savedItem.embedding, item.embedding)) {
                await new Edge({
                    from: savedItem._id,
                    to: item._id,
                    label: 'Related by embedding similarity'
                }).save();
            }
        }

        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error saving item or creating edges', error });
    }
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
