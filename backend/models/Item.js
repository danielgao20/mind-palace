const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], 
    default: [],
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
