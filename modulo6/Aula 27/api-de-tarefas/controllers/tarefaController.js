const tarefas = require('../models/tarefa');

const listar = (req, res) => {
    res.json(tarefas);
};

const criar = (req, res) => {
    const nova = {
        id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
        titulo: req.body.titulo,
        feita: req.body.feita || false
    };
    tarefas.push(nova);
    res.status(201).json(nova);
};

const atualizar = (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    if (!tarefa) {
        const erro = new Error("Tarefa não encontrada.");
        erro.status = 404;
        return next(erro);
    }
    Object.assign(tarefa, req.body);
    res.json(tarefa);
};

const remover = (req, res, next) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        const erro = new Error("Tarefa não encontrada.");
        erro.status = 404;
        return next(erro);
    }
    tarefas.splice(index, 1);
    res.json({ mensagem: "Removida" });
};

module.exports = {
    listar,
    criar,
    atualizar,
    remover
};