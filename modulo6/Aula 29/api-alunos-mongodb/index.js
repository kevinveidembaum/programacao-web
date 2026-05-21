require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.log('Erro:', err));

app.use('/alunos', require('./routes/alunoRoutes'));
app.use('/cursos', require('./routes/cursoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});