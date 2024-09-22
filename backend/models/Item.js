const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String, 
    default: "",
  },
  embedding: {
    type: [Number],
    required: true,
  },
  edges: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
  }]
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
