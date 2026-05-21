const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sigla: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);