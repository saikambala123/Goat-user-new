const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Goat, Sheep, etc.
    breed: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    
    // Updated to allow multiple images (from your second snippet)
    images: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    
    tags: [String],
    status: { type: String, default: 'Available' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livestock', livestockSchema);
