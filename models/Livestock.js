const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Goat or Sheep
  breed: { type: String, required: true },

  // keep existing age/weight semantics
  age: { type: String, required: true },
  // ADDED WEIGHT FIELD HERE
  weight: { type: String, required: true },

  price: { type: Number, required: true },

  // MULTI-IMAGE SUPPORT
  images: [
    {
      data: { type: Buffer },
      contentType: { type: String }
    }
  ], // Binary image data (optional)

  tags: [String],
  status: { type: String, default: 'Available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livestock', livestockSchema);
