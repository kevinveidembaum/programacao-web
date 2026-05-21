const Produto = require('../models/Produto');

exports.listar = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excluidores = ['page', 'sort', 'limit', 'fields', 'preco_min', 'preco_max'];
        excluidores.forEach(el => delete queryObj[el]);

        let filtro = { ...queryObj };

        if (req.query.preco_min || req.query.preco_max) {
            filtro.preco = {};
            if (req.query.preco_min) filtro.preco.$gte = Number(req.query.preco_min);
            if (req.query.preco_max) filtro.preco.$lte = Number(req.query.preco_max);
        }

        let resultado = Produto.find(filtro);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            resultado = resultado.sort(sortBy);
        } else {
            resultado = resultado.sort('-createdAt');
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            resultado = resultado.select(fields);
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        resultado = resultado.skip(skip).limit(limit);

        const produtos = await resultado;
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.estatisticas = async (req, res) => {
    try {
        const stats = await Produto.aggregate([
            {
                $group: {
                    _id: '$categoria',
                    totalProdutos: { $sum: 1 },
                    precoMedio: { $avg: '$preco' }
                }
            }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const novo = await Produto.create(req.body);
        res.status(201).json(novo);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.status(404).json({ erro: 'Não encontrado' });
        res.json(produto);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!produto) return res.status(404).json({ erro: 'Não encontrado' });
        res.json(produto);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.remover = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) return res.status(404).json({ erro: 'Não encontrado' });
        res.json({ mensagem: 'Removido com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};