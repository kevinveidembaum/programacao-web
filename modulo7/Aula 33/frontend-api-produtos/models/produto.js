const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true
    },
    estoque: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);