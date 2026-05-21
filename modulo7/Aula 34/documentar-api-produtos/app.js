const express = require('express');
const { calcularMedia } = require('./utils');

const app = express();
app.use(express.json());

app.post('/alunos/aprovacao', (req, res) => {
    const { notas } = req.body;

    if (!notas || !Array.isArray(notas)) {
        return res.status(400).json({ erro: "O campo notas deve ser um array." });
    }

    const media = calcularMedia(notas);
    const aprovado = media >= 6;

    res.json({ media, aprovado });
});

module.exports = app;