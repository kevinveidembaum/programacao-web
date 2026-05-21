const Curso = require('../models/Curso');

exports.listar = async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar cursos' });
    }
};

exports.criar = async (req, res) => {
    try {
        const curso = await Curso.create(req.body);
        res.status(201).json(curso);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar curso' });
    }
};