const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
    try {
        const filtro = {};
        if (req.query.curso) filtro.curso = req.query.curso;
        if (req.query.ativo) filtro.ativo = req.query.ativo === 'true';

        const alunos = await Aluno.find(filtro).populate('curso');
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar alunos' });
    }
};

exports.buscar = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id).populate('curso');
        if (!aluno) return res.status(404).json({ erro: 'Nao encontrado' });
        res.json(aluno);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar aluno' });
    }
};

exports.criar = async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json(aluno);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ erro: err.message });
        }
        res.status(500).json({ erro: 'Erro do servidor' });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!aluno) return res.status(404).json({ erro: 'Nao encontrado' });
        res.json(aluno);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ erro: err.message });
        }
        res.status(500).json({ erro: 'Erro do servidor' });
    }
};

exports.remover = async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        if (!aluno) return res.status(404).json({ erro: 'Nao encontrado' });
        res.json({ mensagem: 'Removido com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao remover aluno' });
    }
};